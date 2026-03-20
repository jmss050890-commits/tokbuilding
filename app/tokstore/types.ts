// App Store Types & Definitions

export interface AppCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
}

export interface AppVersion {
  version: string;
  releaseDate: Date;
  changelog: string;
  downloadUrl: string;
  fileSize: number; // in bytes
  minOsVersion?: string;
}

export interface TokApp {
  id: string;
  name: string;
  category: string;
  emoji: string;
  description: string;
  longDescription: string;
  developer: string;
  icon: string; // URL or base64
  screenshots: string[]; // Array of image URLs
  rating: number; // 0-5
  downloads: number;
  reviews: number;
  featured: boolean;
  version: string;
  latestVersion: AppVersion;
  previousVersions: AppVersion[];
  requirements: string[];
  permissions: string[];
  privacy: string;
  support: {
    email?: string;
    website?: string;
    github?: string;
  };
  status: 'available' | 'beta' | 'coming-soon' | 'retired';
  releaseDate: Date;
}

export interface AppDownloadRecord {
  id: string;
  userId: string;
  appId: string;
  version: string;
  downloadedAt: Date;
  installStatus: 'pending' | 'installed' | 'failed';
}

export interface AppReview {
  id: string;
  appId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  timestamp: Date;
  helpful: number;
}

export const APP_CATEGORIES: AppCategory[] = [
  { id: 'health', name: 'Health & Wellness', emoji: '🏥', description: 'Medical and health tracking' },
  { id: 'safety', name: 'Safety', emoji: '🚨', description: 'Emergency and personal safety' },
  { id: 'lifestyle', name: 'Lifestyle', emoji: '🎯', description: 'Daily life improvement' },
  { id: 'productivity', name: 'Productivity', emoji: '⚙️', description: 'Work and task management' },
  { id: 'communication', name: 'Communication', emoji: '💬', description: 'Messaging and social' },
  { id: 'utilities', name: 'Utilities', emoji: '🛠️', description: 'Tools and helpers' },
];

// Mock app store data - replace with API calls in production
export const FEATURED_APPS: TokApp[] = [
  {
    id: 'tokhealth',
    name: 'Tok Health VCC',
    category: 'health',
    emoji: '🏥',
    description: 'Comprehensive health tracking and medical records',
    longDescription: 'Tok Health VCC is your personal health companion. Track meals, medications, vital signs, and maintain comprehensive health records. Export medical documentation for doctors with just one click.',
    developer: 'Tok Development Team',
    icon: '🏥',
    screenshots: [],
    rating: 4.8,
    downloads: 15420,
    reviews: 342,
    featured: true,
    version: '2.1.0',
    latestVersion: {
      version: '2.1.0',
      releaseDate: new Date('2026-03-20'),
      changelog: 'Added camera support for meal and prescription logging, improved voice recognition',
      downloadUrl: '/apps/tokhealth-2.1.0.apk',
      fileSize: 45000000,
      minOsVersion: 'Android 8.0',
    },
    previousVersions: [
      {
        version: '2.0.5',
        releaseDate: new Date('2026-03-10'),
        changelog: 'Bug fixes and UI improvements',
        downloadUrl: '/apps/tokhealth-2.0.5.apk',
        fileSize: 44500000,
        minOsVersion: 'Android 8.0',
      },
    ],
    requirements: ['Microphone access', 'Camera access', 'Health data permissions'],
    permissions: ['Camera', 'Microphone', 'Storage', 'Health data'],
    privacy: 'https://tok.health/privacy',
    support: {
      email: 'support@tok.health',
      website: 'https://tok.health',
    },
    status: 'available',
    releaseDate: new Date('2025-06-15'),
  },
  {
    id: 'tokthru',
    name: 'Tok Thru - Safety First',
    category: 'safety',
    emoji: '🚨',
    description: 'Emergency alert and safety navigation system',
    longDescription: 'Tok Thru helps you navigate safely with emergency alerts, SOS features, safe spot mapping, and quick access to emergency services. Share your location with trusted contacts instantly.',
    developer: 'Tok Development Team',
    icon: '🚨',
    screenshots: [],
    rating: 4.9,
    downloads: 22150,
    reviews: 389,
    featured: true,
    version: '3.0.2',
    latestVersion: {
      version: '3.0.2',
      releaseDate: new Date('2026-03-18'),
      changelog: 'Improved location tracking, enhanced emergency contact system',
      downloadUrl: '/apps/tokthru-3.0.2.apk',
      fileSize: 52000000,
      minOsVersion: 'Android 8.0',
    },
    previousVersions: [],
    requirements: ['GPS access', 'Emergency contacts'],
    permissions: ['Location', 'Phone calls', 'Messages', 'Contacts'],
    privacy: 'https://tok.thru/privacy',
    support: {
      email: 'help@tokthru.app',
      website: 'https://tokthru.app',
    },
    status: 'available',
    releaseDate: new Date('2025-08-20'),
  },
];
