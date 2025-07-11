import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { readVendors } = require("../../scripts/parseVendors.js");
const vendors = readVendors();
function extractActionsFromSnippet(snippetContent) {
    // Simple regex to find headings like '### Read: ...' or '### Write: ...'
    // Returns array of { action, description, code }
    const actionRegex = /###\s*(\w+):?\s*([^\n]*)\n+([\s\S]*?)(?=\n###|$)/g;
    const actions = [];
    let match;
    while ((match = actionRegex.exec(snippetContent)) !== null) {
        actions.push({
            action: match[1].toLowerCase(),
            description: match[2].trim(),
            code: match[3].trim(),
        });
    }
    return actions;
}
// --- MCP Server Setup ---
const server = new McpServer({
    name: "api-snippet-library",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
for (const vendor of vendors) {
    const actions = extractActionsFromSnippet(vendor.snippetContent);
    for (const act of actions) {
        const toolName = `${vendor.vendorName.toLowerCase()}-${act.action}`;
        server.tool(toolName, `${vendor.vendorName}: ${act.description || act.action} example`, {}, async (_args, _extra) => ({
            content: [
                {
                    type: "text",
                    text: `### ${vendor.vendorName} – ${act.action.charAt(0).toUpperCase() + act.action.slice(1)}\n\n${act.description}\n\n\n\n${act.code}`,
                },
            ],
        }));
    }
}
// Minimal test tool for MCP/Claude Desktop debugging
server.tool("test-echo", "Echo a string (debug tool)", { message: z.string().describe("Message to echo") }, async ({ message }) => ({
    content: [
        { type: "text", text: `Echo: ${message}` }
    ]
}));
// --- Main entry point ---
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("API Snippet MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
