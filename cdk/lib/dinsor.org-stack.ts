import { CfnOutput, Duration, RemovalPolicy, Stack, type StackProps } from "aws-cdk-lib";
import {
	Certificate,
	CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import {
	CachePolicy,
	Distribution,
	Function as CloudFrontFunction,
	FunctionCode,
	FunctionEventType,
	FunctionRuntime,
	HeadersFrameOption,
	HeadersReferrerPolicy,
	ResponseHeadersPolicy,
	ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3BucketOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import type { Construct } from "constructs";

export interface DinsorOrgStackProps extends StackProps {
	domainName: string;
}

// Astro builds /about/index.html. The S3 REST origin has no directory index,
// so map /, /about and /about/ to their index.html before the cache lookup.
const INDEX_REWRITE = `function handler(event) {
  var request = event.request;
  var uri = request.uri;
  if (uri.endsWith("/")) {
    request.uri = uri + "index.html";
  } else if (uri.indexOf(".") === -1) {
    request.uri = uri + "/index.html";
  }
  return request;
}`;

// Scripts and styles are external files (see astro.config.mjs), so no
// 'unsafe-inline' is needed. JSON-LD blocks are data, not executed.
const CONTENT_SECURITY_POLICY = [
	"default-src 'self'",
	"img-src 'self' data:",
	"object-src 'none'",
	"base-uri 'self'",
	"form-action 'self'",
	"frame-ancestors 'none'",
].join("; ");

export class DinsorOrgStack extends Stack {
	constructor(scope: Construct, id: string, props: DinsorOrgStackProps) {
		super(scope, id, props);

		const { domainName } = props;
		const wwwDomainName = `www.${domainName}`;

		// Private bucket. CloudFront reads it through origin access control.
		// The site is rebuilt from source, so teardown may delete the contents.
		const websiteBucket = new Bucket(this, "WebsiteBucket", {
			blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
			enforceSSL: true,
			removalPolicy: RemovalPolicy.DESTROY,
			autoDeleteObjects: true,
		});

		const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
			domainName,
		});

		// Create single SSL certificate for apex and www
		const certificate = new Certificate(this, "Certificate", {
			domainName,
			subjectAlternativeNames: [wwwDomainName],
			validation: CertificateValidation.fromDns(hostedZone),
		});

		const securityHeaders = new ResponseHeadersPolicy(this, "SecurityHeaders", {
			securityHeadersBehavior: {
				strictTransportSecurity: {
					accessControlMaxAge: Duration.days(365),
					includeSubdomains: false,
					preload: false,
					override: true,
				},
				contentTypeOptions: { override: true },
				frameOptions: { frameOption: HeadersFrameOption.DENY, override: true },
				referrerPolicy: {
					referrerPolicy: HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN,
					override: true,
				},
				contentSecurityPolicy: {
					contentSecurityPolicy: CONTENT_SECURITY_POLICY,
					override: true,
				},
			},
			customHeadersBehavior: {
				customHeaders: [
					{
						header: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
						override: true,
					},
				],
			},
		});

		const indexRewrite = new CloudFrontFunction(this, "IndexRewrite", {
			code: FunctionCode.fromInline(INDEX_REWRITE),
			runtime: FunctionRuntime.JS_2_0,
		});

		// Create CloudFront distribution for website
		const websiteDistribution = new Distribution(this, "WebsiteDistribution", {
			certificate: certificate,
			domainNames: [domainName, wwwDomainName],
			defaultBehavior: {
				origin: S3BucketOrigin.withOriginAccessControl(websiteBucket),
				viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
				cachePolicy: CachePolicy.CACHING_OPTIMIZED,
				responseHeadersPolicy: securityHeaders,
				functionAssociations: [
					{ function: indexRewrite, eventType: FunctionEventType.VIEWER_REQUEST },
				],
			},
			// A private bucket answers 403 for missing keys.
			errorResponses: [403, 404].map((httpStatus) => ({
				httpStatus,
				responseHttpStatus: 404,
				responsePagePath: "/404.html",
				ttl: Duration.minutes(5),
			})),
		});

		// Deploy website files and invalidate CloudFront cache
		new BucketDeployment(this, "WebsiteDeployment", {
			sources: [Source.asset("../dist")],
			destinationBucket: websiteBucket,
			distribution: websiteDistribution,
			distributionPaths: ["/*"],
		});

		// Create DNS records for website
		new ARecord(this, "RootDomainARecord", {
			zone: hostedZone,
			recordName: domainName,
			target: RecordTarget.fromAlias(new CloudFrontTarget(websiteDistribution)),
		});

		new ARecord(this, "WwwARecord", {
			zone: hostedZone,
			recordName: wwwDomainName,
			target: RecordTarget.fromAlias(new CloudFrontTarget(websiteDistribution)),
		});

		new CfnOutput(this, "WebsiteDistributionDomainName", {
			description: "The domain name of the website distribution",
			value: websiteDistribution.domainName,
		});

		new CfnOutput(this, "WebsiteBucketName", {
			description: "The name of the website bucket",
			value: websiteBucket.bucketName,
		});

		new CfnOutput(this, "CertificateArn", {
			description: "The ARN of the certificate",
			value: certificate.certificateArn,
		});
	}
}
