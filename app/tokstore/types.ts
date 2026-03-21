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

export interface PricingTier {
  type: 'free' | 'one-time' | 'subscription';
  price: number;
  currency: string;
  interval?: 'monthly' | 'yearly'; // for subscription
  description: string;
  features: string[];
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
  pricing: PricingTier[];
  stripeProductId?: string;
  stripePriceIds?: Record<string, string>; // Maps pricing tier to Stripe price ID
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
    pricing: [
      {
        type: 'free',
        price: 0,
        currency: 'USD',
        description: 'Basic health tracking',
        features: ['Daily meal logging', 'Vital signs tracking', 'Basic reports']
      },
      {
        type: 'subscription',
        price: 9.99,
        currency: 'USD',
        interval: 'monthly',
        description: 'Premium Health Companion',
        features: ['Unlimited logging', 'Advanced AI insights', 'Doctor export', 'Prescription reminders', 'Family sharing']
      },
      {
        type: 'subscription',
        price: 99.99,
        currency: 'USD',
        interval: 'yearly',
        description: 'Premium yearly (save 17%)',
        features: ['All monthly features', '+3 family members', 'Priority support', 'Data backup to cloud']
      }
    ]
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
    pricing: [
      {
        type: 'free',
        price: 0,
        currency: 'USD',
        description: 'Basic Safety',
        features: ['Emergency SOS', 'Location sharing', 'Basic contacts (3)']
      },
      {
        type: 'subscription',
        price: 14.99,
        currency: 'USD',
        interval: 'monthly',
        description: 'Safety Pro',
        features: ['24/7 emergency dispatch', 'Unlimited trusted contacts', 'Real-time tracking', 'Incident reports', '24-hour support']
      }
    ]
  },
  {
    id: 'toksmart',
    name: 'TokSmart - AI Study Partner',
    category: 'productivity',
    emoji: '🧠',
    description: 'Intelligent AI routing for smarter answers and faster learning',
    longDescription: 'TokSmart intelligently routes your questions to the best AI for the job—Scholar GPT for academics, Gemini for research, ChatGPT for creativity, Claude for deep analysis. Powered by KPA: Keep People Alive mission. Perfect for students and professionals.',
    developer: 'Tok Development Team',
    icon: '🧠',
    screenshots: [],
    rating: 4.7,
    downloads: 8930,
    reviews: 187,
    featured: true,
    version: '1.2.1',
    latestVersion: {
      version: '1.2.1',
      releaseDate: new Date('2026-03-19'),
      changelog: 'Added multi-AI comparison view, improved question routing accuracy',
      downloadUrl: '/apps/toksmart-1.2.1.apk',
      fileSize: 38000000,
      minOsVersion: 'Android 9.0',
    },
    previousVersions: [
      {
        version: '1.1.0',
        releaseDate: new Date('2026-03-01'),
        changelog: 'Initial release with Scholar GPT, Gemini, ChatGPT, and Claude integration',
        downloadUrl: '/apps/toksmart-1.1.0.apk',
        fileSize: 36000000,
        minOsVersion: 'Android 9.0',
      },
    ],
    requirements: ['Internet connection', 'AI API access'],
    permissions: ['Internet', 'Storage', 'Microphone for voice input'],
    privacy: 'https://toksmart.app/privacy',
    support: {
      email: 'support@toksmart.app',
      website: 'https://toksmart.app',
    },
    status: 'available',
    releaseDate: new Date('2026-02-15'),
    pricing: [
      {
        type: 'free',
        price: 0,
        currency: 'USD',
        description: 'Starter',
        features: ['10 questions/day', 'Basic AI routing', 'Limited to ChatGPT']
      },
      {
        type: 'subscription',
        price: 7.99,
        currency: 'USD',
        interval: 'monthly',
        description: 'Scholar Pro',
        features: ['Unlimited questions', 'All 4 AI models', 'Comparison view', 'History & favorites', 'Priority support']
      },
      {
        type: 'subscription',
        price: 79.99,
        currency: 'USD',
        interval: 'yearly',
        description: 'Yearly Unlimited (save 17%)',
        features: ['Unlimited everything', 'Priority routing', 'Export studies', 'API access for teams']
      }
    ]
  },
  {
    id: 'tokaway',
    name: 'TokAway - Escape Plan Tool',
    category: 'safety',
    emoji: '🚨',
    description: 'Discreet fake call feature to help you leave uncomfortable situations',
    longDescription: 'TokAway creates realistic fake incoming calls with customizable contacts. When you\'re in an uncomfortable or unsafe situation, trigger a call to create a polite exit. Full-screen call interface with timer, answer/decline buttons. Private—all data saved locally on your device. Part of the KPA mission: Keep People Alive.',
    developer: 'Tok Development Team',
    icon: '☎️',
    screenshots: [],
    rating: 4.8,
    downloads: 12450,
    reviews: 298,
    featured: true,
    version: '1.0.3',
    latestVersion: {
      version: '1.0.3',
      releaseDate: new Date('2026-03-20'),
      changelog: 'Added contact persistence, improved call screen realism, UI improvements',
      downloadUrl: '/apps/tokaway-1.0.3.apk',
      fileSize: 12500000,
      minOsVersion: 'Android 8.0',
    },
    previousVersions: [
      {
        version: '1.0.0',
        releaseDate: new Date('2026-03-15'),
        changelog: 'Initial launch with fake call functionality and contact management',
        downloadUrl: '/apps/tokaway-1.0.0.apk',
        fileSize: 12000000,
        minOsVersion: 'Android 8.0',
      },
    ],
    requirements: ['Quick access to contacts', 'Full-screen phone control'],
    permissions: ['Device display', 'Storage for contact data'],
    privacy: 'https://tokaway.app/privacy',
    support: {
      email: 'support@tokaway.app',
      website: 'https://tokaway.app',
    },
    status: 'available',
    releaseDate: new Date('2026-03-15'),
    pricing: [
      {
        type: 'one-time',
        price: 4.99,
        currency: 'USD',
        description: 'TokAway Basic',
        features: ['Fake call generator', 'Custom contacts', 'Call timer', 'Call history']
      },
      {
        type: 'one-time',
        price: 9.99,
        currency: 'USD',
        description: 'TokAway Pro (Lifetime)',
        features: ['Everything in Basic', '+ SMS spoofing', '+ Scheduled calls', '+ Call scripts', '+ Lifetime updates']
      }
    ]
  },
];
