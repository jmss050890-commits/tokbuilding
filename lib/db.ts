/**
 * TokStore Database Models
 * MongoDB schemas for users, orders, subscriptions, and license keys
 */

// User account with authentication
export interface User {
  _id?: string;
  email: string;
  passwordHash?: string; // Only for traditional auth, ignore if using social
  name: string;
  avatar?: string;
  signupDate: Date;
  lastLogin?: Date;
  stripeCustomerId?: string;
  preferences: {
    emailNotifications: boolean;
    receiveUpdates: boolean;
  };
}

// One-time purchase order
export interface Order {
  _id?: string;
  userId: string;
  appId: string;
  appName: string;
  pricingTierIndex: number;
  amount: number; // in cents
  currency: string;
  stripeSessionId: string;
  stripePaymentIntentId?: string;
  licenseKey: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  createdAt: Date;
  completedAt?: Date;
  downloadUrl?: string;
}

// Subscription (recurring billing)
export interface Subscription {
  _id?: string;
  userId: string;
  appId: string;
  appName: string;
  pricingTierIndex: number;
  amount: number; // in cents per period
  interval: 'monthly' | 'yearly';
  stripeSubscriptionId: string;
  status: 'active' | 'past_due' | 'canceled' | 'paused';
  startDate: Date;
  nextBillingDate?: Date;
  canceledAt?: Date;
  licenseKey: string;
  autoRenew: boolean;
}

// License key tracking
export interface LicenseKey {
  _id?: string;
  key: string;
  appId: string;
  userId: string;
  orderId?: string; // For one-time purchases
  subscriptionId?: string; // For subscriptions
  type: 'one-time' | 'subscription';
  activatedDate: Date;
  expiryDate?: Date; // For subscriptions
  activations: number;
  maxActivations: number;
  revoked: boolean;
  revokedAt?: Date;
  devices: Array<{
    deviceId: string;
    activatedAt: Date;
    lastUsed: Date;
  }>;
}

// Purchase history for user dashboard
export interface PurchaseHistory {
  _id?: string;
  userId: string;
  appId: string;
  appName: string;
  type: 'order' | 'subscription';
  amount: number;
  date: Date;
  nextBillingDate?: Date; // For subscriptions
  status: string;
  licenseKey: string;
}

export interface TokFaithProfile {
  _id?: string;
  userId: string;
  userName?: string;
  source: 'auth' | 'guest';
  spiritualProfileSummary?: string;
  currentStudyFocus?: string;
  spiritualNeeds: string[];
  prayerNeeds: string[];
  favoriteTopics: string[];
  openQuestions: string[];
  growthMilestones: string[];
  lastLessonAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface TokFaithLessonMemory {
  _id?: string;
  userId: string;
  lessonKey: string;
  lessonTitle: string;
  sourceTopic: string;
  notesSummary?: string;
  userQuestions: string[];
  userComments: string[];
  followUpIdeas: string[];
  lastDiscussedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

export interface FirstGuardianProfile {
  _id?: string;
  userId: string;
  userName?: string;
  source: 'auth' | 'guest';
  householdProfileSummary?: string;
  currentFocus?: string;
  householdNeeds: string[];
  childSafetyNotes: string[];
  boundaryGoals: string[];
  openQuestions: string[];
  recentWins: string[];
  lastConversationAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface FirstGuardianThreadMemory {
  _id?: string;
  userId: string;
  threadKey: string;
  threadTitle: string;
  topic: string;
  notesSummary?: string;
  userQuestions: string[];
  userComments: string[];
  followUpIdeas: string[];
  lastDiscussedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  messageCount: number;
}

/**
 * MongoDB Connection Helper
 */
import { MongoClient } from 'mongodb';

let cachedClient: MongoClient | null = null;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI not set');
  }

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  return client;
}

export async function getDatabase() {
  const client = await connectToDatabase();
  return client.db(process.env.MONGODB_DB_NAME || 'tokbuilding');
}

/**
 * Collection Accessors
 */
export async function getUsersCollection() {
  const db = await getDatabase();
  const collection = db.collection<User>('users');
  
  // Create indexes
  await collection.createIndex({ email: 1 }, { unique: true });
  await collection.createIndex({ stripeCustomerId: 1 });
  
  return collection;
}

export async function getOrdersCollection() {
  const db = await getDatabase();
  const collection = db.collection<Order>('orders');
  
  // Create indexes
  await collection.createIndex({ userId: 1 });
  await collection.createIndex({ appId: 1 });
  await collection.createIndex({ stripeSessionId: 1 }, { unique: true });
  await collection.createIndex({ licenseKey: 1 }, { unique: true });
  
  return collection;
}

export async function getSubscriptionsCollection() {
  const db = await getDatabase();
  const collection = db.collection<Subscription>('subscriptions');
  
  // Create indexes
  await collection.createIndex({ userId: 1 });
  await collection.createIndex({ appId: 1 });
  await collection.createIndex({ stripeSubscriptionId: 1 }, { unique: true });
  await collection.createIndex({ licenseKey: 1 });
  
  return collection;
}

export async function getLicenseKeysCollection() {
  const db = await getDatabase();
  const collection = db.collection<LicenseKey>('licenseKeys');
  
  // Create indexes
  await collection.createIndex({ key: 1 }, { unique: true });
  await collection.createIndex({ userId: 1 });
  await collection.createIndex({ appId: 1 });
  await collection.createIndex({ orderId: 1 });
  await collection.createIndex({ subscriptionId: 1 });
  
  return collection;
}

export async function getTokFaithProfilesCollection() {
  const db = await getDatabase();
  const collection = db.collection<TokFaithProfile>('tokfaithProfiles');

  await collection.createIndex({ userId: 1 }, { unique: true });
  await collection.createIndex({ updatedAt: -1 });

  return collection;
}

export async function getTokFaithLessonMemoriesCollection() {
  const db = await getDatabase();
  const collection = db.collection<TokFaithLessonMemory>('tokfaithLessonMemories');

  await collection.createIndex({ userId: 1, lastDiscussedAt: -1 });
  await collection.createIndex({ userId: 1, lessonKey: 1 }, { unique: true });

  return collection;
}

export async function getFirstGuardianProfilesCollection() {
  const db = await getDatabase();
  const collection = db.collection<FirstGuardianProfile>('firstGuardianProfiles');

  await collection.createIndex({ userId: 1 }, { unique: true });
  await collection.createIndex({ updatedAt: -1 });

  return collection;
}

export async function getFirstGuardianThreadMemoriesCollection() {
  const db = await getDatabase();
  const collection = db.collection<FirstGuardianThreadMemory>('firstGuardianThreadMemories');

  await collection.createIndex({ userId: 1, lastDiscussedAt: -1 });
  await collection.createIndex({ userId: 1, threadKey: 1 }, { unique: true });

  return collection;
}
