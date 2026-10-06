# dinsor.org infrastructure

AWS CDK stack for the static site: private S3 bucket, CloudFront with origin access control, ACM certificate (apex and `www`), Route 53 records, and security response headers.

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

- The bucket is private. CloudFront is the only reader.
- A CloudFront Function maps `/about` and `/about/` to `/about/index.html`.
- Missing pages (403 or 404 from S3) return `/404.html` with status 404.
- Teardown deletes the bucket contents. The site is rebuilt from source.
