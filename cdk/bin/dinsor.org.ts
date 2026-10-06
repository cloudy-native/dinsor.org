#!/usr/bin/env node
import { App } from "aws-cdk-lib";
import { DinsorOrgStack } from "../lib/dinsor.org-stack";

const app = new App();

const tags = {
  Project: "dinsor.org",
  Environment: "production",
  Author: "stephen",
};

const domainName = "dinsor.org";

new DinsorOrgStack(app, "DinsorOrgStack", {
  domainName,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    // CloudFront only accepts ACM certificates from us-east-1, and the whole
    // stack (certificate included) lives in one region.
    region: "us-east-1",
  },
  tags,
  description: "dinsor.org",
});
