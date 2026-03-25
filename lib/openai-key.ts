export function getOpenAIApiKey() {
  if (process.env.SVL_DISABLE_OPENAI === "1") {
    return "";
  }

  const rawKey = process.env.OPENAI_API_KEY;

  if (!rawKey) return "";

  const trimmed = rawKey.trim();

  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    return trimmed.slice(1, -1).trim();
  }

  return trimmed;
}
