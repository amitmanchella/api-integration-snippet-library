# API Integration Snippet Library

A curated, up-to-date library of API integration snippets (Stripe, Twilio, GitHub) with a modern searchable web app and MCP server for Claude Desktop integration.

## Directory Structure
```
api-integration-snippet-library/
├── vendors/
│   ├── stripe/
│   │   ├── snippet.md          # Stripe API integration examples
│   │   └── metadata.json       # Vendor metadata
│   ├── twilio/
│   │   ├── snippet.md          # Twilio SMS API integration examples
│   │   └── metadata.json       # Vendor metadata
│   └── github/
│       ├── snippet.md          # GitHub API integration examples
│       └── metadata.json       # Vendor metadata
├── metadata-index.json         # Combined metadata for web app
├── web-app/                    # Web app source code
├── api-snippet-library-mcp/    # MCP server for Claude Desktop
└── README.md                   
```

## Quick Start

### Web App
- Run locally: `cd web-app && python3 -m http.server 8000`
- Open [http://localhost:8000/](http://localhost:8000/)

### MCP Server (Claude Desktop)

**To use the API Snippet Library MCP server in Claude Desktop:**

1. **Build the server:**
   ```bash
   cd api-snippet-library-mcp
   npm install  # Only needed the first time or after changing dependencies
   npm run build
   ```

2. **Configure Claude Desktop:**
   - Open your Claude Desktop config file:
     - On Mac: `~/Library/Application Support/Claude/claude_desktop_config.json`

   - **If your config uses the old format (`mcpServers`):**
     ```json
     {
       "mcpServers": {
         "api-snippet-library": {
           "command": "node",
           "args": [
             "/path/to/your/project/api-snippet-library-mcp/build/index.js"
           ]
         }
       }
     }
     ```
   - **If your config uses the new format (`servers`):**
     ```json
     {
       "servers": [
         {
           "name": "API Snippet Library",
           "command": "node",
           "args": ["build/index.js"],
           "cwd": "/path/to/your/project/api-snippet-library-mcp",
           "type": "node"
         }
       ]
     }
     ```
   - Replace `/path/to/your/project` with the actual path to your project directory.
   - Save the file.

3. **Restart Claude Desktop:**
   - Fully quit and reopen Claude Desktop to reload the config.

4. **Select the API Snippet Library server:**
   - Go to the Developer tab in Claude Desktop settings.
   - You should see "API Snippet Library" as an available server/tool.

5. **Troubleshooting:**
   - Make sure Node.js is installed and available system-wide (`node --version` should print v18 or v20).
   - If you don't see the server, double-check the config file path, JSON syntax, and that you have built the server.
   - If you see errors, try moving the project to a simpler path (e.g., `~/testmcp`) and update the config accordingly.
   - For more help, see the project README or contact support.

## Add a Vendor
1. Add a folder in `vendors/` with `snippet.md` and `metadata.json`.
2. Update `metadata-index.json`.
3. Add corresponding tools to `api-snippet-library-mcp/src/index.ts`.
4. Push to GitHub (public).

## Features
- **Web App**: Search/filter by vendor or topic, click a vendor to view rendered Markdown snippets
- **MCP Server**: 12 tools for Stripe, Twilio, and GitHub (auth, read, write, error handling)
- Easy to extend with new APIs

## MCP Tools Available
- **Stripe**: `stripe-auth`, `stripe-read`, `stripe-write`, `stripe-error`
- **Twilio**: `twilio-auth`, `twilio-read`, `twilio-write`, `twilio-error`
- **GitHub**: `github-auth`, `github-read`, `github-write`, `github-error`

---

