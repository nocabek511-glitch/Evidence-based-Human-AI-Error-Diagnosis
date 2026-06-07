export const PUBLIC_BASE_URL =
  'https://evidence-based-human-ai-error-diagn.vercel.app';

export const buildPublicUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${PUBLIC_BASE_URL}${normalizedPath}`;
};
