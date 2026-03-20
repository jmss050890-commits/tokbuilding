export function selectAgent(message: string) {
  const lower = message.toLowerCase();

  if (
    lower.includes("chest") ||
    lower.includes("dizzy") ||
    lower.includes("help")
  ) {
    return "a1";
  }

  return "grace";
}