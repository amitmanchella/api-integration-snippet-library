# GitHub API Integration Snippet

This snippet demonstrates how to integrate with the GitHub REST API using Node.js, including authentication, listing repositories, and creating issues.

> **Note:** GitHub API v3 is RESTful and supports both personal access tokens and OAuth apps for authentication.

## Installation

Install the official GitHub REST API client:

```bash
npm install @octokit/rest
```

## Setup & Authentication

```javascript
import { Octokit } from "octokit";

// Set GITHUB_TOKEN in your environment (e.g., a .env file)
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});
```

## Examples

### Read: List Repositories for the Authenticated User

```javascript
try {
  // Returns up to the first 100 repositories accessible to the token
  const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
    per_page: 100,
  });
  repos.forEach(repo => console.log(repo.full_name));
} catch (err) {
  console.error("GitHub API error:", err);
}
```

### Write: Create an Issue

```javascript
try {
  const { data: issue } = await octokit.rest.issues.create({
    owner: "your-username",
    repo: "your-repo",
    title: "Bug report from API",
    body: "Something isn’t working.",
  });
  console.log("Created issue:", issue.html_url);
} catch (err) {
  console.error("GitHub API error:", err);
}
```

### Minimal Error-Handling Pattern

```javascript
import { RequestError } from "@octokit/request-error";

try {
  await octokit.rest.users.getAuthenticated();
} catch (err) {
  if (err instanceof RequestError) {
    console.error(`Status ${err.status}: ${err.message}`);
  } else {
    console.error("Unexpected error:", err);
  }
}
```

## References

- Getting started: [Getting started with Octokit](https://docs.github.com/en/rest/guides/getting-started-with-the-rest-api?tool=javascript)
- Scripting: [Scripting with the REST API and JavaScript](https://docs.github.com/rest/guides/scripting-with-the-rest-api-and-javascript)
- List repositories (read): [List repositories for the authenticated user](https://docs.github.com/en/rest/repos/repos#list-repositories-for-the-authenticated-user)
- Create issue (write): [Create an issue](https://docs.github.com/en/rest/issues/issues#create-an-issue)





