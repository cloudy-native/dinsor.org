#!/opt/homebrew/opt/node/bin/node
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
    region: process.env.CDK_DEFAULT_REGION,
  },
  tags,
  description: "dinsor.org",
});
