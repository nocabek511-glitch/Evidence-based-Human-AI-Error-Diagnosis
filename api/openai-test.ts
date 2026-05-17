import OpenAI from 'openai';

const OPENAI_REQUEST_TIMEOUT_MS = 15000;

function sendJSON(response: any, statusCode: number, payload: Record<string, unknown>) {
  response.status(statusCode).json(payload);
}

function readEnvValue(name: string) {
  const value = process.env[name]?.trim();

  if (!value || value === 'your_openai_api_key_here' || value === 'your_openai_base_url_here') {
    return undefined;
  }

  return value;
}

function getOpenAIClient() {
  const apiKey = readEnvValue('OPENAI_API_KEY');

  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY. Please add it to your deployment environment variables.');
  }

  return new OpenAI({
    apiKey,
    baseURL: readEnvValue('OPENAI_BASE_URL'),
    maxRetries: 0,
    timeout: OPENAI_REQUEST_TIMEOUT_MS,
  });
}

export default async function handler(request: any, response: any) {
  if (request.method === 'OPTIONS') {
    sendJSON(response, 200, { ok: true });
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
    const openai = getOpenAIClient();
    const result = await openai.responses.create(
      {
        model: 'gpt-5.5',
        input: '请只回复：OpenAI API connected.',
      },
      {
        timeout: OPENAI_REQUEST_TIMEOUT_MS,
      },
    );

    sendJSON(response, 200, {
      ok: true,
      message: result.output_text?.trim() || 'OpenAI API connected.',
    });
  } catch (error) {
    sendJSON(response, 500, {
      ok: false,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}
