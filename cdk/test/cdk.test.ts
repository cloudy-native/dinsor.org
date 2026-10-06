import { describe, expect, test } from "bun:test";
import { App } from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";
import { DinsorOrgStack } from "../lib/dinsor.org-stack";

const env = { account: "123456789012", region: "us-east-1" };

function synth(): Template {
	const app = new App({
		context: {
			[`hosted-zone:account=${env.account}:domainName=dinsor.org:region=${env.region}`]: {
				Id: "/hostedzone/Z123",
				Name: "dinsor.org.",
			},
		},
	});
	return Template.fromStack(
		new DinsorOrgStack(app, "Test", { domainName: "dinsor.org", env }),
	);
}

describe("DinsorOrgStack", () => {
	const template = synth();

	test("bucket serves the site with index and 404 documents", () => {
		template.hasResourceProperties("AWS::S3::Bucket", {
			WebsiteConfiguration: { IndexDocument: "index.html", ErrorDocument: "404.html" },
		});
	});

	test("teardown empties and deletes the bucket", () => {
		template.resourceCountIs("Custom::S3AutoDeleteObjects", 1);
		template.hasResource("AWS::S3::Bucket", { DeletionPolicy: "Delete" });
	});

	test("certificate and distribution cover apex and www", () => {
		template.hasResourceProperties("AWS::CertificateManager::Certificate", {
			DomainName: "dinsor.org",
			SubjectAlternativeNames: ["www.dinsor.org"],
		});
		template.hasResourceProperties("AWS::CloudFront::Distribution", {
			DistributionConfig: Match.objectLike({
				Aliases: ["dinsor.org", "www.dinsor.org"],
			}),
		});
		template.resourceCountIs("AWS::Route53::RecordSet", 2);
	});

	test("responses carry security headers", () => {
		template.hasResourceProperties("AWS::CloudFront::ResponseHeadersPolicy", {
			ResponseHeadersPolicyConfig: Match.objectLike({
				SecurityHeadersConfig: Match.objectLike({
					StrictTransportSecurity: Match.objectLike({ Override: true }),
					ContentTypeOptions: { Override: true },
					FrameOptions: { FrameOption: "DENY", Override: true },
					ContentSecurityPolicy: Match.objectLike({
						ContentSecurityPolicy: Match.stringLikeRegexp("frame-ancestors 'none'"),
					}),
				}),
			}),
		});
	});

	test("deployment handler has headroom and does not wait on invalidation", () => {
		template.hasResourceProperties("Custom::CDKBucketDeployment", {
			WaitForDistributionInvalidation: false,
		});
		const fns = Object.values(template.findResources("AWS::Lambda::Function")) as any[];
		const handler = fns.find((f) => f.Properties.Runtime?.startsWith("python"));
		expect(handler.Properties.MemorySize).toBe(1024);
	});
});
