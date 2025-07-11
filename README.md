# API Integration Snippet Library

A curated, up-to-date library of API integration snippets (Stripe, Twilio, GitHub, and more) with a modern searchable web app and a dynamic MCP server for Claude Desktop integration.

---

## Demo

See a video demo of the MCP server in Claude Desktop: [Loom Video](https://www.loom.com/share/b2429b1bc9714d9eaee72f61ca86e467?sid=7415c62b-3489-4910-adcf-e9306b508e20)

---

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
├── metadata-index.json         # Combined metadata for web app (auto-generated)
├── scripts/                    # Utility scripts (parse, build, etc.)
├── web-app/                    # Web app source code
├── api-snippet-library-mcp/    # MCP server for Claude Desktop
└── README.md                   
```

---

## Running the App Locally

### Web App
1. Serve the web app directory:
   ```bash
   cd web-app
   python3 -m http.server 8000
   # or use any static server
   ```
2. Open [http://localhost:8000/](http://localhost:8000/) in your browser.

### MCP Server (Claude Desktop)
1. **Install dependencies and build:**
   ```bash
   cd api-snippet-library-mcp
   npm install
   npx tsc
   ```
2. **Run the MCP server:**
   ```bash
   node build/index.js
   # or use your preferred method to run the built server
   ```
3. **Configure Claude Desktop:**
   - Point Claude Desktop to your MCP server (see below for config details).
   - Restart Claude Desktop to pick up the new server/tools.

---

## 🆕 Adding a New API Snippet (Vendor)

1. **Add a new folder in `vendors/`**
   - Example: `vendors/myapi/`
   - Add a `snippet.md` (required) and `metadata.json` (optional, for extra metadata).
   - Use `### Action: Description` headings in your markdown for each tool (e.g., `### Auth:`, `### Read:`, `### Write:`).

2. **Regenerate the metadata index:**
   ```bash
   node scripts/generateMetadataIndex.js
   ```

3. **Restart the MCP server:**
   - The server will automatically expose new tools for each action in your markdown.
   - No code changes are needed!

4. **(Optional) Push to GitHub**
   - If you want the web app to show the new snippet, push your changes to GitHub.

---

## 🛠️ Claude Desktop Config Example

- Open your Claude Desktop config file (e.g., `~/Library/Application Support/Claude/claude_desktop_config.json` on Mac).
- Add or update the server entry:
  ```json
  {
    "servers": [
      {
        "name": "API Snippet Library",
        "command": "node",
        "args": ["dist/index.js"],
        "cwd": "/path/to/your/project/api-snippet-library-mcp",
        "type": "node"
      }
    ]
  }
  ```
- Save and restart Claude Desktop.

---

## Features
- **Web App**: Search/filter by vendor or topic, click a vendor to view rendered Markdown snippets (fetched from GitHub main branch)
- **Dynamic MCP Server**: Tools are auto-generated for every vendor/action in your markdown—no manual code changes needed
- **Easy to extend**: Just drop in a new folder with a markdown file and restart the server

---

## MCP Tools Available (Examples)
- **Stripe**: `stripe-auth`, `stripe-read`, `stripe-write`, etc.
- **Twilio**: `twilio-auth`, `twilio-read`, `twilio-write`, etc.
- **GitHub**: `github-auth`, `github-read`, `github-write`, etc.
- **Any new vendor/action you add will appear automatically!**

---

## Troubleshooting
- If you don’t see new snippets/tools, make sure you:
  - Regenerated `metadata-index.json`
  - Restarted the MCP server
  - Pushed changes to GitHub (for the web app)
  - Restarted Claude Desktop
- For local web app testing, ensure your static server is serving the latest files.

---

