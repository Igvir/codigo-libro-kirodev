// mcp-servers/jira-server.ts
// Nota: Esto es un ejemplo conceptual
// Consulta la documentación de MCP en https://kiro.dev/docs/mcp/

interface JiraServer {
name: "jira";

tools: {
createIssue: (summary: string, description: string) => JiraIssue;
updateIssue: (issueKey: string, fields: object) => void;
transitionIssue: (issueKey: string, status: string) => void;
addComment: (issueKey: string, comment: string) => void;
};
}
