import {
  getFirstGuardianProfilesCollection,
  getFirstGuardianThreadMemoriesCollection,
  type FirstGuardianProfile,
  type FirstGuardianThreadMemory,
} from '@/lib/db';

const MAX_TRACKED_ITEMS = 8;
const MAX_RECENT_THREADS = 5;

function uniqueLimited(values: string[], maxItems = MAX_TRACKED_ITEMS) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].slice(0, maxItems);
}

function clipText(value: string, maxLength = 240) {
  const normalized = value.replace(/\s+/g, ' ').trim();
  return normalized.length <= maxLength ? normalized : `${normalized.slice(0, maxLength - 3)}...`;
}

export function detectFirstGuardianThread(message: string) {
  const lowerMessage = message.toLowerCase();

  const threadMatchers: Array<{ key: string; title: string; topic: string; patterns: string[] }> = [
    { key: 'child-safety', title: 'Child Safety and Protection', topic: 'child-safety', patterns: ['kids', 'children', 'child', 'baby', 'minor'] },
    { key: 'household-boundaries', title: 'Household Boundaries', topic: 'boundaries', patterns: ['boundary', 'respect', 'disrespect', 'attitude'] },
    { key: 'family-chaos', title: 'Family Chaos and De-Escalation', topic: 'family-conflict', patterns: ['chaos', 'drama', 'messy', 'family crisis', 'tense'] },
    { key: 'money-pressure', title: 'Money Pressure and Household Stress', topic: 'money', patterns: ['money', 'bills', 'rent', 'financial'] },
    { key: 'co-parenting', title: 'Co-Parenting and Child Stability', topic: 'co-parenting', patterns: ['coparent', 'co-parent', 'baby daddy', 'baby mama'] },
    { key: 'relationship-red-flags', title: 'Relationship Red Flags', topic: 'relationships', patterns: ['relationship', 'boyfriend', 'girlfriend', 'red flag', 'love'] },
    { key: 'grown-kids', title: 'Grown Kids and Consequences', topic: 'grown-children', patterns: ['grown', 'adult child', 'my son', 'my daughter'] },
    { key: 'caregiver-pressure', title: 'Caregiver Pressure and Self-Preservation', topic: 'caregiving', patterns: ['overwhelmed', 'tired', 'carrying everybody', 'burned out'] },
  ];

  const match = threadMatchers.find((item) =>
    item.patterns.some((pattern) => lowerMessage.includes(pattern)),
  );

  if (match) {
    return match;
  }

  if (lowerMessage.includes('home') || lowerMessage.includes('house') || lowerMessage.includes('family')) {
    return {
      key: 'home-first-general',
      title: 'Home First Guidance',
      topic: 'household',
    };
  }

  return {
    key: 'life-advice-general',
    title: 'Michelle Voice Life Advice',
    topic: 'life-advice',
  };
}

function detectHouseholdNeeds(message: string) {
  const lowerMessage = message.toLowerCase();
  const needs: string[] = [];

  if (lowerMessage.includes('boundary') || lowerMessage.includes('respect') || lowerMessage.includes('disrespect')) {
    needs.push('stronger boundaries');
  }
  if (lowerMessage.includes('kids') || lowerMessage.includes('children') || lowerMessage.includes('child')) {
    needs.push('child protection');
  }
  if (lowerMessage.includes('calm') || lowerMessage.includes('chaos') || lowerMessage.includes('drama')) {
    needs.push('de-escalation and peace');
  }
  if (lowerMessage.includes('money') || lowerMessage.includes('bills') || lowerMessage.includes('rent')) {
    needs.push('financial steadiness');
  }
  if (lowerMessage.includes('relationship') || lowerMessage.includes('love') || lowerMessage.includes('red flag')) {
    needs.push('relationship clarity');
  }
  if (lowerMessage.includes('overwhelmed') || lowerMessage.includes('burned out') || lowerMessage.includes('tired')) {
    needs.push('rest and self-preservation');
  }
  if (lowerMessage.includes('coparent') || lowerMessage.includes('co-parent')) {
    needs.push('co-parenting steadiness');
  }

  return uniqueLimited(needs);
}

function extractQuestionOrComment(message: string) {
  const normalized = clipText(message, 220);
  if (message.includes('?')) {
    return { question: normalized };
  }
  return { comment: normalized };
}

function buildThreadSummary(message: string, threadTitle: string) {
  return `Recent focus: ${threadTitle}. Latest user input: ${clipText(message, 180)}`;
}

export async function getFirstGuardianMemoryContext(userId: string | null | undefined) {
  if (!userId) {
    return null;
  }

  const [profilesCollection, threadsCollection] = await Promise.all([
    getFirstGuardianProfilesCollection(),
    getFirstGuardianThreadMemoriesCollection(),
  ]);

  const [profile, threadMemories] = await Promise.all([
    profilesCollection.findOne({ userId }),
    threadsCollection.find({ userId }).sort({ lastDiscussedAt: -1 }).limit(MAX_RECENT_THREADS).toArray(),
  ]);

  return {
    profile,
    threadMemories,
  };
}

export function buildFirstGuardianMemorySystemMessage(memory: {
  profile: FirstGuardianProfile | null;
  threadMemories: FirstGuardianThreadMemory[];
} | null) {
  if (!memory || (!memory.profile && memory.threadMemories.length === 0)) {
    return null;
  }

  const profileLines: string[] = [];
  if (memory.profile?.userName) {
    profileLines.push(`User name: ${memory.profile.userName}`);
  }
  if (memory.profile?.currentFocus) {
    profileLines.push(`Current focus: ${memory.profile.currentFocus}`);
  }
  if (memory.profile?.householdNeeds?.length) {
    profileLines.push(`Household needs: ${memory.profile.householdNeeds.join(', ')}`);
  }
  if (memory.profile?.boundaryGoals?.length) {
    profileLines.push(`Boundary goals: ${memory.profile.boundaryGoals.join(' | ')}`);
  }
  if (memory.profile?.childSafetyNotes?.length) {
    profileLines.push(`Child safety notes: ${memory.profile.childSafetyNotes.join(' | ')}`);
  }
  if (memory.profile?.openQuestions?.length) {
    profileLines.push(`Open questions: ${memory.profile.openQuestions.join(' | ')}`);
  }
  if (memory.profile?.recentWins?.length) {
    profileLines.push(`Recent wins: ${memory.profile.recentWins.join(' | ')}`);
  }
  if (memory.profile?.householdProfileSummary) {
    profileLines.push(`Household profile summary: ${memory.profile.householdProfileSummary}`);
  }

  const threadLines = memory.threadMemories.map((thread) => {
    const parts = [
      `${thread.threadTitle} (${thread.topic})`,
      thread.notesSummary ? `summary: ${thread.notesSummary}` : '',
      thread.userQuestions.length ? `questions: ${thread.userQuestions.join(' | ')}` : '',
      thread.userComments.length ? `comments: ${thread.userComments.join(' | ')}` : '',
      thread.followUpIdeas.length ? `follow-up: ${thread.followUpIdeas.join(' | ')}` : '',
    ].filter(Boolean);

    return parts.join(' | ');
  });

  return [
    'FIRST GUARDIAN PERSONAL MEMORY',
    "Use this memory to guide the user with continuity, care, and firm Home First protection.",
    "Do not claim memory you were not given. Do use the memory below to remember prior household patterns, follow up on boundaries already discussed, and acknowledge progress naturally.",
    'If a user name is present below, you may acknowledge them by name naturally and warmly.',
    ...profileLines,
    ...(threadLines.length ? ['Recent thread memory:', ...threadLines] : []),
  ].join('\n');
}

export async function updateFirstGuardianMemory(params: {
  userId: string;
  userName?: string | null;
  message: string;
  response: string;
  source: 'auth' | 'guest';
}) {
  const { userId, userName, message, response, source } = params;
  const now = new Date();
  const thread = detectFirstGuardianThread(message);
  const threadSummary = buildThreadSummary(message, thread.title);
  const needUpdates = detectHouseholdNeeds(message);
  const { question, comment } = extractQuestionOrComment(message);

  const [profilesCollection, threadsCollection] = await Promise.all([
    getFirstGuardianProfilesCollection(),
    getFirstGuardianThreadMemoriesCollection(),
  ]);

  const existingProfile = await profilesCollection.findOne({ userId });

  const boundaryGoals = uniqueLimited([
    ...(existingProfile?.boundaryGoals || []),
    ...(message.toLowerCase().includes('boundary') || message.toLowerCase().includes('respect')
      ? [`Boundary goal: ${clipText(message, 120)}`]
      : []),
  ]);

  const childSafetyNotes = uniqueLimited([
    ...(existingProfile?.childSafetyNotes || []),
    ...(message.toLowerCase().includes('kids') || message.toLowerCase().includes('children') || message.toLowerCase().includes('child')
      ? [clipText(message, 120)]
      : []),
  ]);

  const openQuestions = uniqueLimited([
    ...(existingProfile?.openQuestions || []),
    ...(question ? [question] : []),
  ]);

  const recentWins = uniqueLimited([
    ...(existingProfile?.recentWins || []),
    ...(response.toLowerCase().includes('distance do what arguing could not do')
      ? ['User was encouraged to use distance instead of conflict.']
      : []),
    ...(response.toLowerCase().includes('boundary')
      ? [`Latest boundary coaching: ${clipText(response, 120)}`]
      : []),
  ]);

  const combinedNeeds = uniqueLimited([...(existingProfile?.householdNeeds || []), ...needUpdates]);

  const profileUpdate: Partial<FirstGuardianProfile> = {
    userName: userName || existingProfile?.userName,
    source,
    currentFocus: thread.title,
    householdNeeds: combinedNeeds,
    childSafetyNotes,
    boundaryGoals,
    openQuestions,
    recentWins,
    householdProfileSummary: `First Guardian is helping this user with ${thread.title} and a household focus on ${combinedNeeds.join(', ') || 'peace, clarity, and protection'}.`,
    lastConversationAt: now,
    updatedAt: now,
  };

  await profilesCollection.updateOne(
    { userId },
    {
      $set: profileUpdate,
      $setOnInsert: {
        createdAt: now,
      },
    },
    { upsert: true },
  );

  await threadsCollection.updateOne(
    { userId, threadKey: thread.key },
    {
      $set: {
        threadTitle: thread.title,
        topic: thread.topic,
        notesSummary: threadSummary,
        updatedAt: now,
        lastDiscussedAt: now,
      },
      $setOnInsert: {
        createdAt: now,
      },
      $inc: {
        messageCount: 1,
      },
      ...(question ? { $addToSet: { userQuestions: question } } : {}),
      ...(comment ? { $addToSet: { userComments: comment } } : {}),
      $push: {
        followUpIdeas: {
          $each: [`Follow up on ${thread.title} and the boundary plan with this user soon.`],
          $slice: -MAX_TRACKED_ITEMS,
        },
      },
    },
    { upsert: true },
  );
}
