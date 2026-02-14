// mcp-servers/confluence-server.js
// Ejemplo educativo - no producción

const { MCPServer } = require('@modelcontextprotocol/sdk');

const server = new MCPServer({
name: 'confluence',
version: '1.0.0'
});

// Define una "tool" que Kiro puede usar
server.addTool({
name: 'search_confluence',
description: 'Busca en documentación de Confluence',
parameters: {
query: {
type: 'string',
description: 'Término de búsqueda'
}
},
handler: async ({ query }) => {
// Llamada a API de Confluence
const response = await fetch(
`${process.env.CONFLUENCE_URL}/rest/api/content/search?cql=text~"${query}"`,
{
headers: {
'Authorization': `Bearer ${process.env.CONFLUENCE_TOKEN}`
}
}
);

const data = await response.json();

return {
results: data.results.map(r => ({
title: r.title,
url: `${process.env.CONFLUENCE_URL}${r._links.webui}`,
excerpt: r.excerpt
}))
};
}
});

server.start();
