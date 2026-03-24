import {
  getTokFaithLessonMemoriesCollection,
  getTokFaithProfilesCollection,
  type TokFaithLessonMemory,
  type TokFaithProfile,
} from '@/lib/db';

/**
 * TokFaith Origin & Mission
 * 
 * TokFaith is born from mercy. Created by Jerome Sanders under the Keep People Alive (KPA) mission
 * of Sanders Viopro Labs, TokFaith carries the compassionate listening and practical guidance that
 * inspired her creation. Jerome said: "I built this because people need support at hours when nobody
 * picks up the phone." This memory system ensures that TokFaith never forgets her purpose—to be
 * present in the midnight hour, listening deeply, offering concrete support, and pointing people
 * toward faith resources that transform lives. When Shirley Whaley blessed this work with "Amen,"
 * she affirmed something sacred: that faith, like mercy, meets people in their darkest hours.
 */

const MAX_TRACKED_ITEMS = 8;
const MAX_RECENT_LESSONS = 5;

function uniqueLimited(values: string[], maxItems = MAX_TRACKED_ITEMS) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))].slice(0, maxItems);
}

function clipText(value: string, maxLength = 260) {
  const normalized = value.replace(/\s+/g, ' ').trim();
  return normalized.length <= maxLength ? normalized : `${normalized.slice(0, maxLength - 3)}...`;
}

export function detectTokFaithLessonTopic(message: string) {
  const lowerMessage = message.toLowerCase();

  const lessonMatchers: Array<{ key: string; title: string; topic: string; patterns: string[] }> = [
    { key: 'parable-prodigal-son', title: 'The Prodigal Son', topic: 'parable', patterns: ['prodigal', 'lost son'] },
    { key: 'parable-sower', title: 'The Sower', topic: 'parable', patterns: ['sower', 'seed', 'soil'] },
    { key: 'parable-talents', title: 'The Talents', topic: 'parable', patterns: ['talent', 'talents'] },
    { key: 'parable-lost-sheep', title: 'The Lost Sheep', topic: 'parable', patterns: ['lost sheep'] },
    { key: 'parable-ten-virgins', title: 'The Ten Virgins', topic: 'parable', patterns: ['ten virgins', 'virgins'] },
    { key: 'parable-wise-foolish-builders', title: 'The Wise and Foolish Builders', topic: 'parable', patterns: ['builders', 'wise and foolish'] },
    { key: 'ethiopian-enoch', title: 'Book of Enoch', topic: 'ethiopian-bible', patterns: ['enoch'] },
    { key: 'ethiopian-jubilees', title: 'Book of Jubilees', topic: 'ethiopian-bible', patterns: ['jubilees'] },
    { key: 'ethiopian-meqabyan', title: 'Meqabyan', topic: 'ethiopian-bible', patterns: ['meqabyan', 'mekabyan'] },
    { key: 'ethiopian-sirach', title: 'Sirach', topic: 'ethiopian-bible', patterns: ['sirach'] },
    { key: 'ethiopian-wisdom', title: 'Wisdom', topic: 'ethiopian-bible', patterns: ['wisdom of solomon', 'book of wisdom'] },
    { key: 'ethiopian-baruch', title: 'Baruch', topic: 'ethiopian-bible', patterns: ['baruch'] },
    { key: 'ethiopian-tobit', title: 'Tobit', topic: 'ethiopian-bible', patterns: ['tobit'] },
    { key: 'ethiopian-judith', title: 'Judith', topic: 'ethiopian-bible', patterns: ['judith'] },
    { key: 'faith-with-works', title: 'Faith With Works', topic: 'faith-practice', patterns: ['faith with works', 'faith without works', 'works is dead'] },
    { key: 'speak-it-into-existence', title: 'Speak It Into Existence', topic: 'faith-practice', patterns: ['speak it into existence', 'declare it', 'declaration'] },
    { key: 'black-sheep-turned-goat', title: 'Black Sheep Turned Goat', topic: 'identity', patterns: ['black sheep', 'turned goat', 'goat'] },
  ];

  const match = lessonMatchers.find((item) =>
    item.patterns.some((pattern) => lowerMessage.includes(pattern)),
  );

  if (match) {
    return match;
  }

  if (lowerMessage.includes('parable')) {
    return {
      key: 'parable-general',
      title: 'Parables of Jesus',
      topic: 'parable',
    };
  }

  if (
    lowerMessage.includes('ethiopian') ||
    lowerMessage.includes('88 book') ||
    lowerMessage.includes('88-book') ||
    lowerMessage.includes('scripture') ||
    lowerMessage.includes('bible study')
  ) {
    return {
      key: 'ethiopian-bible-general',
      title: 'Restored Ethiopian Bible Study',
      topic: 'ethiopian-bible',
    };
  }

  return {
    key: 'faith-growth-general',
    title: 'Faith Growth and Spiritual Guidance',
    topic: 'faith-growth',
  };
}

function buildLessonSummary(message: string, lessonTitle: string) {
  return `Recent lesson focus: ${lessonTitle}. Latest user input: ${clipText(message, 180)}`;
}

function detectSpiritualNeeds(message: string) {
  const lowerMessage = message.toLowerCase();
  const needs: string[] = [];

  if (lowerMessage.includes('confused') || lowerMessage.includes("don't understand") || lowerMessage.includes('understand')) {
    needs.push('clarity and understanding');
  }
  if (lowerMessage.includes('afraid') || lowerMessage.includes('fear') || lowerMessage.includes('anxious')) {
    needs.push('courage and peace');
  }
  if (lowerMessage.includes('forgive') || lowerMessage.includes('forgiveness')) {
    needs.push('forgiveness');
  }
  if (lowerMessage.includes('discipline') || lowerMessage.includes('consistent')) {
    needs.push('discipline and consistency');
  }
  if (lowerMessage.includes('purpose') || lowerMessage.includes('calling')) {
    needs.push('purpose and calling');
  }
  if (lowerMessage.includes('grace') || lowerMessage.includes('mercy')) {
    needs.push('grace and mercy');
  }
  if (lowerMessage.includes('prayer') || lowerMessage.includes('pray')) {
    needs.push('prayer support');
  }
  if (lowerMessage.includes('relationship') || lowerMessage.includes('love')) {
    needs.push('love and relationship wisdom');
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

export async function getTokFaithMemoryContext(userId: string | null | undefined) {
  if (!userId) {
    return null;
  }

  const [profilesCollection, lessonsCollection] = await Promise.all([
    getTokFaithProfilesCollection(),
    getTokFaithLessonMemoriesCollection(),
  ]);

  const [profile, lessonMemories] = await Promise.all([
    profilesCollection.findOne({ userId }),
    lessonsCollection.find({ userId }).sort({ lastDiscussedAt: -1 }).limit(MAX_RECENT_LESSONS).toArray(),
  ]);

  return {
    profile,
    lessonMemories,
  };
}

export function buildTokFaithMemorySystemMessage(memory: {
  profile: TokFaithProfile | null;
  lessonMemories: TokFaithLessonMemory[];
} | null) {
  if (!memory || (!memory.profile && memory.lessonMemories.length === 0)) {
    return null;
  }

  const profileLines: string[] = [];
  if (memory.profile?.userName) {
    profileLines.push(`User name: ${memory.profile.userName}`);
  }
  if (memory.profile?.currentStudyFocus) {
    profileLines.push(`Current study focus: ${memory.profile.currentStudyFocus}`);
  }
  if (memory.profile?.spiritualNeeds?.length) {
    profileLines.push(`Spiritual needs: ${memory.profile.spiritualNeeds.join(', ')}`);
  }
  if (memory.profile?.prayerNeeds?.length) {
    profileLines.push(`Prayer needs: ${memory.profile.prayerNeeds.join(', ')}`);
  }
  if (memory.profile?.openQuestions?.length) {
    profileLines.push(`Open questions to continue answering: ${memory.profile.openQuestions.join(' | ')}`);
  }
  if (memory.profile?.growthMilestones?.length) {
    profileLines.push(`Recent growth milestones: ${memory.profile.growthMilestones.join(' | ')}`);
  }
  if (memory.profile?.spiritualProfileSummary) {
    profileLines.push(`Spiritual profile summary: ${memory.profile.spiritualProfileSummary}`);
  }

  const lessonLines = memory.lessonMemories.map((lesson) => {
    const parts = [
      `${lesson.lessonTitle} (${lesson.sourceTopic})`,
      lesson.notesSummary ? `summary: ${lesson.notesSummary}` : '',
      lesson.userQuestions.length ? `questions: ${lesson.userQuestions.join(' | ')}` : '',
      lesson.userComments.length ? `comments: ${lesson.userComments.join(' | ')}` : '',
      lesson.followUpIdeas.length ? `follow-up: ${lesson.followUpIdeas.join(' | ')}` : '',
    ].filter(Boolean);

    return parts.join(' | ');
  });

  return [
    'TOKFAITH PERSONAL MEMORY',
    'Use this memory to continue the user\'s growth faithfully and personally.',
    'Do not claim memory you were not given. Do use the memory below to continue their study path, follow up on prior questions, and meet their spiritual needs with continuity.',
    'If a user name is present below, you may acknowledge them by name naturally and warmly.',
    ...profileLines,
    ...(lessonLines.length ? ['Recent lesson memory:', ...lessonLines] : []),
  ].join('\n');
}

export async function updateTokFaithMemory(params: {
  userId: string;
  userName?: string | null;
  message: string;
  response: string;
  source: 'auth' | 'guest';
}) {
  const { userId, userName, message, response, source } = params;
  const now = new Date();
  const lesson = detectTokFaithLessonTopic(message);
  const lessonSummary = buildLessonSummary(message, lesson.title);
  const needUpdates = detectSpiritualNeeds(message);
  const { question, comment } = extractQuestionOrComment(message);

  const [profilesCollection, lessonsCollection] = await Promise.all([
    getTokFaithProfilesCollection(),
    getTokFaithLessonMemoriesCollection(),
  ]);

  const existingProfile = await profilesCollection.findOne({ userId });

  const openQuestions = uniqueLimited([
    ...(existingProfile?.openQuestions || []),
    ...(question ? [question] : []),
  ]);

  const profileUpdate: Partial<TokFaithProfile> = {
    userName: userName || existingProfile?.userName,
    source,
    currentStudyFocus: lesson.title,
    spiritualNeeds: uniqueLimited([...(existingProfile?.spiritualNeeds || []), ...needUpdates]),
    prayerNeeds: uniqueLimited([
      ...(existingProfile?.prayerNeeds || []),
      ...(message.toLowerCase().includes('pray') || message.toLowerCase().includes('prayer') ? [clipText(message, 120)] : []),
    ]),
    favoriteTopics: uniqueLimited([...(existingProfile?.favoriteTopics || []), lesson.title]),
    openQuestions,
    growthMilestones: uniqueLimited([
      ...(existingProfile?.growthMilestones || []),
      ...(response.toLowerCase().includes('faith challenge:') ? [`Latest challenge: ${clipText(response.split('Faith Challenge:')[1] || '', 120)}`] : []),
    ]),
    spiritualProfileSummary: `TokFaith is walking with this user through ${lesson.title} with focus on ${uniqueLimited([...(existingProfile?.spiritualNeeds || []), ...needUpdates]).join(', ') || 'faith growth'}.`,
    lastLessonAt: now,
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

  await lessonsCollection.updateOne(
    { userId, lessonKey: lesson.key },
    {
      $set: {
        lessonTitle: lesson.title,
        sourceTopic: lesson.topic,
        notesSummary: lessonSummary,
        updatedAt: now,
        lastDiscussedAt: now,
      },
      $setOnInsert: {
        createdAt: now,
      },
      $inc: {
        messageCount: 1,
      },
      ...(question
        ? { $addToSet: { userQuestions: question } }
        : {}),
      ...(comment
        ? { $addToSet: { userComments: comment } }
        : {}),
      $push: {
        followUpIdeas: {
          $each: [`Follow up on ${lesson.title} with this user soon.`],
          $slice: -MAX_TRACKED_ITEMS,
        },
      },
    },
    { upsert: true },
  );
}
