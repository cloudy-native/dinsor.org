import { CfnOutput, Duration, RemovalPolicy, Stack, type StackProps } from "aws-cdk-lib";
import {
	Certificate,
	CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import {
	CachePolicy,
	Distribution,
	HeadersFrameOption,
	HeadersReferrerPolicy,
	ResponseHeadersPolicy,
	ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3StaticWebsiteOrigin } from "aws-cdk-lib/aws-cloudfront-origins";
import { ARecord, HostedZone, RecordTarget } from "aws-cdk-lib/aws-route53";
import { CloudFrontTarget } from "aws-cdk-lib/aws-route53-targets";
import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import type { Construct } from "constructs";

export interface DinsorOrgStackProps extends StackProps {
	domainName: string;
}

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

		// S3 website hosting serves index.html for /about/ and 404.html for
		// missing pages. The site is public and rebuilt from source, so
		// teardown may delete the contents.
		const websiteBucket = new Bucket(this, "WebsiteBucket", {
			websiteIndexDocument: "index.html",
			websiteErrorDocument: "404.html",
			publicReadAccess: true,
			blockPublicAccess: BlockPublicAccess.BLOCK_ACLS_ONLY,
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

		// Create CloudFront distribution for website
		const websiteDistribution = new Distribution(this, "WebsiteDistribution", {
			certificate: certificate,
			domainNames: [domainName, wwwDomainName],
			defaultBehavior: {
				origin: new S3StaticWebsiteOrigin(websiteBucket),
				viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
				cachePolicy: CachePolicy.CACHING_OPTIMIZED,
				responseHeadersPolicy: securityHeaders,
			},
		});

		// Deploy website files and invalidate CloudFront cache.
		// The default 128MB handler runs the AWS CLI and can run out of memory.
		// Waiting for the invalidation keeps the Lambda alive until CloudFront
		// finishes, which can exceed its 15 minute limit while the distribution
		// is also being updated, so the invalidation is started but not awaited.
		new BucketDeployment(this, "WebsiteDeployment", {
			sources: [Source.asset("../dist")],
			destinationBucket: websiteBucket,
			distribution: websiteDistribution,
			distributionPaths: ["/*"],
			waitForDistributionInvalidation: false,
			memoryLimit: 1024,
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
