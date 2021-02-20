### Project developed at <a href="https://github.com/Kodluyoruz">Kodluyoruz</a> Izmir <a href="https://github.com/atolye15">Atölye15</a> JavaScript Bootcamp !
 
### Introduction

```
After the project steps are completed properly, you will be running a serverless node js api in AWS. 
These transactions can be performed within a free account, and you can even use it for free up to a certain limit.
```

### Demo

Url : https://www.moviesdb.space

### Technologies

- Node.js
- AWS Lambda
- AWS S3
- AWS API Gateaway
- And magically npm packages for serverless app

### Pre requirements

- AWS Account (<a href="https://aws.amazon.com/resources/create-account/">Sing up</a>)
- themoviedb.org Account (<a href="https://www.themoviedb.org/signup/">Sing up</a>)  
- AWS Cli (<a href="https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html">Download</a>)
- Node.js (<a href="https://nodejs.org/en/download/">Download</a>) (If you don't have)

### Requirements

- AWS Acces Keys (<a href="https://console.aws.amazon.com/iam/home#/security_credentials">Create And GET</a>) (And you should follow images this <a href="https://dinamikfikir.com/content/aws-access-key-nasil-olusturulur">link</a> for how to)
- themoviedb.org API Key <a href="https://www.themoviedb.org/settings/api/">Create And GET</a>
- HTTP Server for Local Development (Live Server, Apache, Nginx etc..)

### Configuration

- In **backend** folder open config.js and paste your themoviedb.org API Key
- In **backend** folder open startup/setupExpress.js and type your domain for corsOptions
- In **frontend** folder open assets/scripts/configuration.js and paste apiUrl after deploying to AWS lambda  

### Setup Steps

- Open terminal and install _backend_ and _frontend_ folders dependencies with ``npm install`` command
- In backend folder while using terminal and type ``aws configure`` command
- After ``aws configure`` command enter **AWS Access Key ID** , **AWS Secret Access Key** and enter optionally ``eu-central-1`` for region name or another region
- In backend folder type and enter ``npm run deploy`` , you will see similar api url after finish deploying like ``https://zbg6f8lavb.execute-api.eu-central-1.amazonaws.com/api/``
- Copy link after deploying and apply configuration third step

### Optional

- In **frontend** folder type ``npx babel assets/scripts -d lib`` after code changes and use scripts on **lib** folder

---
### `After all step you will enter the api link in your browser with looking for what`