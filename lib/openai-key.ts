export function getOpenAIApiKey() {
  const rawKey = process.env.OPENAI_API_KEY;

  if (!rawKey) return "";

  const trimmed = rawKey.trim();

  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}
