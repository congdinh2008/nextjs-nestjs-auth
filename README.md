# nextjs-nestjs-auth
NextJS Authentication with NestJS and JWT

# Setup
- Using environments folder
- Remove 'example' in *.env.example
- Config with your setting info
- nest-cli.json:

```bash
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "generateOptions": {
    "spec": false
  },
  "compilerOptions": {
    "assets": ["environments/*"]
  }
}

```
