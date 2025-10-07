import { CfnOutput, RemovalPolicy, Stack, type StackProps } from "aws-cdk-lib";
import {
	Certificate,
	CertificateValidation,
} from "aws-cdk-lib/aws-certificatemanager";
import {
	CachePolicy,
	Distribution,
	OriginAccessIdentity,
	ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
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
			blockPublicAccess: BlockPublicAccess.BLOCK_ACLS,
			removalPolicy: RemovalPolicy.DESTROY,
		});

		// Deploy website files from ../public to S3 bucket
		new BucketDeployment(this, "WebsiteDeployment", {
			sources: [Source.asset("../dist")],
			destinationBucket: websiteBucket,
		});

		const hostedZone = HostedZone.fromLookup(this, "HostedZone", {
			domainName,
		});

		// Create single SSL certificate for all domains
		const certificate = new Certificate(this, "Certificate", {
			domainName,
			validation: CertificateValidation.fromDns(hostedZone),
		});

		// Create origin access identity for S3
		const originAccessIdentity = new OriginAccessIdentity(
			this,
			"OriginAccessIdentity",
		);
		websiteBucket.grantRead(originAccessIdentity);

		// Create CloudFront distribution for website
		const websiteDistribution = new Distribution(this, "WebsiteDistribution", {
			certificate: certificate,
			domainNames: [domainName],
			defaultBehavior: {
				origin: new S3Origin(websiteBucket, { originAccessIdentity }),
				viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
				cachePolicy: CachePolicy.CACHING_OPTIMIZED,
			},
		});

		// Create DNS records for website
		new ARecord(this, "RootDomainARecord", {
			zone: hostedZone,
			recordName: domainName,
			target: RecordTarget.fromAlias(new CloudFrontTarget(websiteDistribution)),
		});

		new ARecord(this, "WwwARecord", {
			zone: hostedZone,
			recordName: `www.${domainName}`,
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
