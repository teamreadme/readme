![](./public/meta-image.png)

# 👋 Welcome
Welcome to README! Want to learn more about what we're about? Check out our [website](https://readmefirst.co). Otherwise, continue below for hosting and contributing details. README is still in the early stages of being open-sourced, expect better documentation and code quality soon.

## Getting started
Want to run README yourself?

### Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Self-hosted
```
me@home~: docker-compose up -d --build 
me@home~: # Database will mount to ~/.data/postgres on your localhost for persistence
```


## Contributing

### Local dev
To get started locally, make sure Docker Desktop has access to the local directory, and run the following
```
me@home~: docker-compose -f docker-compose.dev.yml up -d # Launches db
me@home~: npm i
me@home~: npm run migrate
me@home~: npm run dev # http://localhost:3000 in your browser
```

#### Logging in
Create an account at https://ethereal.email/ and update the `.env` file to reference your authentication settings. That will be your email to sign in with

## Prisma
### Generate migration
`npx prisma migrate dev`

### Generate TS client
`npx prisma generate`