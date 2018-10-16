# Harmony
## Components
1. Cloud Services
2. Web Client

## Building the Application

### Install Global Tools
Ensure you have node v8.11.3 or newer installed
```
node -v
```

```
npm install -g serverless
npm install -g serverless-offline
npm install -g serverless-finch
```
Ensure that serverless has been added to your PATH
```
serverless help
```

### Install dependencies
From both the deployment-config, and then the graphql-service and client directories, run:
```
npm install
```

### Configure your AWS credentials
```
serverless config credentials --provider aws --key <key> --secret <secret key>
```

### Configure the application
The application configuration is handled by the deployment-config module. Configurations are stored in individual json files in the configs subdirectory.

Configuration files can be pushed to and pulled from an S3 bucket automatically, by navigating to the deployment-configuration module directory and running
```
npm run pull <stage>
```
or
```
npm run push <stage>
```

These commands are authenticated using the above configured AWS credentials.

Alternatively, new configuration files can be added. Configurations must match the format of the template provided in /configs

## Deploying to AWS
### React Client
From the client directory, run:
```
npm run build
```
```
serverless client deploy
```
### Cloud Services
From the graphql-api directory, run:
```
serverless deploy
```
## Deploying Locally
### React Client
From the client directory, run:
```
npm run build
```
```
npm start
```
### Cloud services
To emulate API Gateway and Lambda locally, run
```
./start-sls-offline <stage>
