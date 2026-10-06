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

	test("bucket is private and removable", () => {
		template.hasResourceProperties("AWS::S3::Bucket", {
			PublicAccessBlockConfiguration: {
				BlockPublicAcls: true,
				BlockPublicPolicy: true,
				IgnorePublicAcls: true,
				RestrictPublicBuckets: true,
			},
		});
		template.resourceCountIs("Custom::S3AutoDeleteObjects", 1);
		template.hasResource("AWS::S3::Bucket", { DeletionPolicy: "Delete" });
	});

	test("bucket has no website hosting", () => {
		const buckets = template.findResources("AWS::S3::Bucket");
		for (const bucket of Object.values(buckets)) {
			expect(bucket.Properties.WebsiteConfiguration).toBeUndefined();
		}
	});

	test("CloudFront reads the bucket through origin access control", () => {
		template.resourceCountIs("AWS::CloudFront::OriginAccessControl", 1);
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

	test("missing pages return the 404 page", () => {
		template.hasResourceProperties("AWS::CloudFront::Distribution", {
			DistributionConfig: Match.objectLike({
				CustomErrorResponses: Match.arrayWith([
					Match.objectLike({ ErrorCode: 403, ResponseCode: 404, ResponsePagePath: "/404.html" }),
					Match.objectLike({ ErrorCode: 404, ResponseCode: 404, ResponsePagePath: "/404.html" }),
				]),
			}),
		});
	});

	test("directory URLs are rewritten to index.html", () => {
		template.hasResourceProperties("AWS::CloudFront::Function", {
			FunctionConfig: Match.objectLike({ Runtime: "cloudfront-js-2.0" }),
		});
	});
});
