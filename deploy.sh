#!/bin/bash

if [ -n "$(git status --porcelain)" ]; then
  echo "error: There are uncommitted changes; commit before deploying.  Check 'git status'.";
  exit 1
fi

yarn build && aws s3 sync dist/ s3://sandbox.homecodeclass.com && aws cloudfront create-invalidation --distribution-id E348ULSOYM7QFD --paths "/*"