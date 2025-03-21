# Test Neon MCP Server in GitHub Actions

This repository contains a script and workflow that connects to the Neon MCP Server from a Node.js environment, using the Anthropic API. It demonstrates how to list your Neon projects with a natural language prompt like:

> List my Neon projects

## Getting Started

This example uses both the Neon API and Anthropic API. You'll need API keys for both to run this Action.

### Local Testing

For local testing, rename `.env.example` to `.env` and add your API keys. For example:

```shell
NEON_API_KEY=
ANTHROPIC_API_KEY=
```

Run the following in your terminal to test the script locally:

```shell
node .github/scripts/run-neon-mcp-server.mjs
```

### Output

The script will output the `id` and `name` of the Neon projects associated with the account that created the API key. Example:

```shell
id: blue-night-05049448, name: test-oops-proof
id: polished-water-58114712, name: branch-management-dev
id: autumn-bush-97691534, name: branch-management-test
id: cool-water-48588839, name: dev-test-twin-workflows-pg16
id: calm-base-08471876, name: prod-test-twin-workflows-pg16
id: twilight-frog-20967403, name: prod-ping-thing
```

### GitHub Actions Testing - ISSUES

- Current issues relate to GitHub Actions not supporting websockets. I don't know if the modelcontextprotocol `Client` can also support HTTP requests.

~~Add both of the above environment variables to your GitHub Secrets. Navigate to **Settings** > **Secrets and cariables** > **Actions** to add them.~~

~~Trigger the workflow manually from the Actions UI to test it in the GitHub Actions environment.~~

## Helpful Links

- [Neon MCP Server (Docs)](https://neon.tech/guides/neon-mcp-server)
- [Neon MCP Server (GitHub)](https://github.com/neondatabase-labs/mcp-server-neon)
- [Smithery - Neon Database (Quick Start)](https://smithery.ai/server/neon/api)
- [Smithery Typescript SDK (GitHub)](https://github.com/smithery-ai/typescript-sdk)
