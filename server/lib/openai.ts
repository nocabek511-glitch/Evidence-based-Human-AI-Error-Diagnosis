import OpenAI from 'openai';
import { readEnvValue } from './env.ts';

const OPENAI_REQUEST_TIMEOUT_MS = 15000;

function readOpenAIAPIKey() {
  const apiKey = readEnvValue('OPENAI_API_KEY');

  if (!apiKey) {
    throw new Error('Missing OPENAI_API_KEY. Please add it to .env.local or .env.');
  }

  return apiKey;
}

let cachedClient: OpenAI | null = null;

export function getOpenAIClient() {
  if (!cachedClient) {
    cachedClient = new OpenAI({
      apiKey: readOpenAIAPIKey(),
      baseURL: readEnvValue('OPENAI_BASE_URL'),
      maxRetries: 0,
      timeout: OPENAI_REQUEST_TIMEOUT_MS,
    });
  }

  return cachedClient;
}

export async function testOpenAIConnection() {
  try {
    const response = await getOpenAIClient().responses.create(
      {
        model: 'gpt-5.5',
        input: '请只回复：OpenAI API connected.',
      },
      {
        timeout: OPENAI_REQUEST_TIMEOUT_MS,
      },
    );

    if (!response.output_text) {
      throw new Error('OpenAI response did not include output_text.');
    }

    return response.output_text.trim();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`OpenAI backend test failed: ${message}`);
  }
}
