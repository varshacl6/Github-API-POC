const express = require('express')
const app = express();
const { Octokit } = require("@octokit/core");
const { createAppAuth } =require("@octokit/auth-app");
const port = 3000
const dotenv = require('dotenv')

dotenv.config();

// createServer(createNodeMiddleware(app)).listen(3000);

app.get('/', async(req, res) => {
console.log("process.env.GITHUB_APP_IDENTIFIER", process.env.GITHUB_APP_IDENTIFIER)

const auth = createAppAuth({
    appId: process.env.GITHUB_APP_IDENTIFIER,
    privateKey: process.env.PRIVATE_KEY,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.GITHUB_WEBHOOK_SECRET,
    webhooks: { 
        secret: process.env.GITHUB_WEBHOOK_SECRET 
    },
  });
const  {token} = await auth({ type: "installation", installationId:"33983371" });
console.log("token", token)
const octokit = new Octokit({
    auth: token
  });
const issuesList=await octokit.request('GET /repos/{owner}/{repo}', {
  owner: 'varshacl6',
  repo: 'DemoApplication'
})


console.log(issuesList);

// const webhookConfig = await octokit.request('GET /app/hook/config', {})

// console.log(webhookConfig);

  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})