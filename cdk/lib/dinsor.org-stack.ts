import { CfnOutput, RemovalPolicy, Stack, type StackProps } from "aws-cdk-lib";
import {
	Certificate,
	CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import {
	CachePolicy,
	Distribution,
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

export class DinsorOrgStack extends Stack {
	constructor(scope: Construct, id: string, props: DinsorOrgStackProps) {
		super(scope, id, props);

		const { domainName } = props;

		// Create S3 bucket for website hosting
		const websiteBucket = new Bucket(this, "WebsiteBucket", {
			websiteIndexDocument: "index.html",
			websiteErrorDocument: "404.html",
			publicReadAccess: true,
			blockPublicAccess: BlockPublicAccess.BLOCK_ACLS_ONLY,
			removalPolicy: RemovalPolicy.DESTROY,
		});

		const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
			domainName,
		});

		const wwwDomainName = `www.${domainName}`;

		// Create single SSL certificate for apex and www
		const certificate = new Certificate(this, "Certificate", {
			domainName,
			subjectAlternativeNames: [wwwDomainName],
			validation: CertificateValidation.fromDns(hostedZone),
		});

		// Create CloudFront distribution for website
		const websiteDistribution = new Distribution(this, "WebsiteDistribution", {
			certificate: certificate,
			domainNames: [domainName, wwwDomainName],
			defaultBehavior: {
				origin: new S3StaticWebsiteOrigin(websiteBucket),
				viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
				cachePolicy: CachePolicy.CACHING_OPTIMIZED,
			},
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
