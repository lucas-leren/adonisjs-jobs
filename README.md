<div align="center">
  <h1><b>AdonisJS Jobs</b></h1>

  <p>Queue/Jobs worker for AdonisJS v6</p>
</div>

## Getting Started

This package is available in the npm registry.

```bash
pnpm install adonisjs-jobs
```

Next, configure the package by running the following command.

```bash
node ace configure adonisjs-jobs
```

## Creating Jobs
You can create a new job by running the following command.
```sh
node ace jobs:make SendEmail
```

## Listening for Jobs

First, you need to start the jobs listener, you can spawn multiple listeners to process jobs concurrently.
```sh
node ace jobs:listen
```

## Dispatching Jobs

Dispatching jobs is as simple as importing the job class and calling
```ts
import SendEmail from 'path/to/jobs/send_email.js'

await SendEmail.dispatch({ ... })

await SendEmail.dispatch({ ... }, {
  attempts: 3,
  delay: 1000,
})
```

## Import Aliases

update your `package.json` and `tsconfig.json` to use import aliases

`package.json`
```json
{
  "imports": {
    "#jobs/*": "./app/jobs/*.js"
  }
}
```
`tsconfig.json`
```json
{
  "compilerOptions": {
    "paths": {
      "#jobs/*": ["./app/jobs/*.js"]
    }
  }
}
```

```ts
import SendEmail from '#jobs/send_email.js'

await SendEmail.dispatch({ ... })
```