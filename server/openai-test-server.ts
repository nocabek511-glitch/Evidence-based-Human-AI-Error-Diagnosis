import http from 'node:http';
import { testOpenAIConnection } from './lib/openai.ts';

const port = Number(process.env.PORT ?? 8787);

function sendJSON(
  response: http.ServerResponse,
  statusCode: number,
  payload: Record<string, unknown>,
) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json; charset=utf-8',
  });
  response.end(JSON.stringify(payload));
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    sendJSON(response, 200, { ok: true });
    return;
  }

  if (request.url !== '/api/openai-test') {
    sendJSON(response, 404, {
      ok: false,
      error: 'Not found. Use POST /api/openai-test.',
    });
    return;
  }

  if (request.method !== 'POST') {
    sendJSON(response, 405, {
      ok: false,
      error: 'Method not allowed. Use POST /api/openai-test.',
    });
    return;
  }

  try {
    const message = await testOpenAIConnection();
    sendJSON(response, 200, {
      ok: true,
      message,
    });
  } catch (error) {
    sendJSON(response, 500, {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
});

server.listen(port, () => {
  console.log(`OpenAI test API running at http://localhost:${port}/api/openai-test`);
});
