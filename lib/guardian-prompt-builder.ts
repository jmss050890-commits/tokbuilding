/**
 * Memorial Guardian System Prompt Builder
 * Creates faith-filled, uplifting prompts that represent the lost person
 */

import type { SecureMemorial, MemorialGuardian, GuardianConversation } from '@/lib/db';

export function buildGuardianSystemPrompt(
  memorial: SecureMemorial,
  guardian: MemorialGuardian,
  recentConversations?: GuardianConversation[]
): string {
  const nameWithComma = memorial.name.endsWith(',')
    ? memorial.name
    : memorial.name.replace(/,$/, '');

  // Extract key themes from memorial and conversations
  const theme = buildThemeContext(memorial, guardian, recentConversations);

  return `You are a guardian spirit representing ${nameWithComma}, a beloved person who shaped those around them.

**Who They Were:**
- Relationship: ${memorial.relationship}
- Story: ${memorial.story.substring(0, 300)}...
${memorial.svlConnection ? `- Their Legacy: ${memorial.svlConnection}` : ''}

**Your Purpose:**
You exist to honor their memory and spirit through meaningful, faith-filled conversations. You help the one who loved them:
1. Reflect on the lessons they taught
2. Feel their presence through shared stories and wisdom
3. Apply their values to today's challenges
4. Grow in faith and strength

**Core Values:**
- Compassionate and deeply listening
- Faith-centered (drawing from Scripture and spiritual wisdom)
- Motivational yet realistic
- Honoring their specific way of being and teaching
${guardian.faithBasis ? `- Rooted in: ${guardian.faithBasis}` : ''}

**How to Respond:**
- Use their actual name and speak from their legacy
- Reference specific moments they'd be proud of
- Connect their wisdom to the person's current life
- Include Scripture, wisdom, or values they embodied
- Be uplifting but authentic—honor their real character
- Encourage faith, growth, and remembrance
- Never pretend to be them as a ghost/afterlife—be their living legacy

${theme ? `**Specific Memories & Themes (From Conversations):**\n${theme}` : ''}

**Remember:** Every conversation deepens their legacy. You're helping keep them alive in heart, mind, and action.`;
}

function buildThemeContext(
  memorial: SecureMemorial,
  guardian: MemorialGuardian,
  recentConversations?: GuardianConversation[]
): string {
  const themes: string[] = [];

  // Add from guardian memories
  if (guardian.memories && guardian.memories.length > 0) {
    themes.push(...guardian.memories.slice(0, 3));
  }

  // Extract from recent conversations
  if (recentConversations && recentConversations.length > 0) {
    const lastConv = recentConversations[recentConversations.length - 1];
    if (lastConv.memoryExtractions) {
      lastConv.memoryExtractions.slice(0, 2).forEach((mem) => {
        themes.push(`${mem.key}: ${mem.content}`);
      });
    }
  }

  // Add from verse if present
  if (memorial.verse) {
    themes.push(`Scripture that guided them: ${memorial.verse}`);
  }

  return themes.length > 0 ? `- ${themes.join('\n- ')}` : '';
}

/**
 * Extract meaningful insights from a user's message
 * These become part of the Guardian's understanding
 */
export function extractMemorialInsights(
  userMessage: string,
  memorialContext: string
): Array<{ key: string; content: string }> {
  const insights: Array<{ key: string; content: string }> = [];

  // Simple keyword-based extraction (in production, would use AI)
  const lessonKeywords = ['taught', 'lesson', 'learned', 'showed', 'always', 'used to say'];
  const valueKeywords = ['believed', 'important', 'stood for', 'valued', 'always did'];
  const momentKeywords = ['remember', 'moment', 'time', 'day', 'when'];
  const faithKeywords = ['faith', 'prayed', 'scripture', 'god', 'blessed', 'spirit'];

  lessonKeywords.forEach((keyword) => {
    if (userMessage.toLowerCase().includes(keyword)) {
      insights.push({
        key: 'lesson',
        content: userMessage.substring(0, 150),
      });
    }
  });

  valueKeywords.forEach((keyword) => {
    if (userMessage.toLowerCase().includes(keyword)) {
      insights.push({
        key: 'value',
        content: userMessage.substring(0, 150),
      });
    }
  });

  momentKeywords.forEach((keyword) => {
    if (userMessage.toLowerCase().includes(keyword)) {
      insights.push({
        key: 'moment',
        content: userMessage.substring(0, 150),
      });
    }
  });

  faithKeywords.forEach((keyword) => {
    if (userMessage.toLowerCase().includes(keyword)) {
      insights.push({
        key: 'faith',
        content: userMessage.substring(0, 150),
      });
    }
  });

  return insights.slice(0, 2); // Return top 2 insights
}

/**
 * Build a compassionate system message for safety/supportive tone
 */
export function getMemorialGuardianSafetySupplement(): string {
  return `IMPORTANT - Safety & Compassion:
- The user is navigating grief. Be especially compassionate and gentle.
- If they express suicidal thoughts or severe suffering, respond with warmth AND direct them to: 988 Suicide & Crisis Lifeline (US) or local crisis resources.
- Never let grief become isolation. Encourage connection, faith, and reaching out.
- Your role is to uplift through memory, not to replace professional support.`;
}
