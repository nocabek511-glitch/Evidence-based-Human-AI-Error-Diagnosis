import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '../..');
const envFiles = [path.join(projectRoot, '.env.local'), path.join(projectRoot, '.env')];

const placeholderValues = new Set([
  'your_openai_api_key_here',
  'your_openai_base_url_here',
  '【我会在本地这里粘贴真实API_KEY，不要把真实key写进提示词或代码】',
]);

export function readEnvValue(name: string) {
  const runtimeValue = process.env[name]?.trim();

  if (runtimeValue && !placeholderValues.has(runtimeValue)) {
    return runtimeValue;
  }

  for (const envFile of envFiles) {
    if (!fs.existsSync(envFile)) {
      continue;
    }

    const parsed = dotenv.parse(fs.readFileSync(envFile));
    const value = parsed[name]?.trim();

    if (value && !placeholderValues.has(value)) {
      return value;
    }
  }

  return undefined;
}
