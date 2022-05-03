#!/bin/bash
java -jar swagger-codegen-cli.jar generate -i http://localhost:8080/v2/api-docs?group=partnerApi -l typescript-fetch -o api.tmp -D supportsES6=true
mv api.tmp/api.ts src/api/api.ts
mv api.tmp/configuration.ts src/api/configuration.ts
rm -rf api.tmp