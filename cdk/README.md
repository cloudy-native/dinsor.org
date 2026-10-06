# dinsor.org infrastructure

AWS CDK stack for the static site: S3 website bucket, CloudFront, ACM certificate (apex and `www`), Route 53 records, and security response headers.

## Deploy

```bash
bun run build          # from the repo root: writes dist/
cd cdk
bun run deploy         # needs AWS credentials for the account that owns the dinsor.org hosted zone
```

The stack deploys to `us-east-1` because CloudFront only accepts certificates from that region.

## Check

```bash
bun run typecheck
bun run test
```

## Notes

- S3 website hosting serves `index.html` for directory URLs and `404.html` for missing pages.
- CloudFront adds security headers (HSTS, CSP, `nosniff`, frame `DENY`, referrer and permissions policy). Scripts are external files (`assetsInlineLimit: 0` in `astro.config.mjs`), so the CSP needs no `unsafe-inline`.
- Teardown deletes the bucket contents. The site is rebuilt from source.
