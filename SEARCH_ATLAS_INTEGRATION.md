# Search Atlas Integration Guide for TokSEO

## 🎯 Overview

This guide connects TokSEO (SVL's SEO expert agent) to Search Atlas real-time data, enabling TokSEO to provide live ranking data, keyword insights, and competitive analysis to clients.

---

## 📊 Integration Architecture

```
Brand Vault (Your Setup)
    ↓
Search Atlas API
    ↓
TokSEO Backend (/api/tokseo)
    ↓
TokSEO Agent Response
    ↓
User Chat Interface
```

---

## 🔑 Search Atlas Setup Requirements

### 1. **Brand Vault Configuration** (You'll do tonight)

In Search Atlas, create your Brand Vault with:

#### A. Brand Profile
- **Brand Name**: Sanders Viopro Labs (SVL)
- **Primary Domain**: tokbuilding.com (or your domain)
- **Industry Keywords**: Health tech, crisis support, wellness, AI agents
- **Target Audience**: Health-conscious individuals, businesses needing safety tools

#### B. Tracked Keywords (Start with 10-20)
```
Primary Keywords:
- "crisis support app"
- "mental health coaching"
- "emergency safety app"
- "wellness AI"
- "health coaching"
- "personal safety"
- "emergency resources"
- "AI health coach"
- "crisis counselor app"
- "wellness platform"

Local Keywords (if applicable):
- "[Your City] mental health support"
- "[Your City] crisis help"
- "[Your City] wellness coach"
```

#### C. Competitor Analysis
Add 3-5 competitors:
- Similar crisis/wellness apps
- Mental health platforms
- Health coaching services
- Example: Calm, Headspace, BetterHelp, Talkspace

#### D. Location Targets (if applicable)
- Select primary service areas
- Add local ranking targets

---

## 🔐 Search Atlas API Setup

### Step 1: Get Your API Credentials

1. Log into Search Atlas
2. Go to **Settings → API Keys**
3. Create new API key for "TokSEO Integration"
4. Copy your:
   - **API Key** (secret - keep safe)
   - **Account ID** (if required)

### Step 2: Store in Environment Variables

In your `.env.local` file, add:

```env
SEARCH_ATLAS_API_KEY=your_api_key_here
SEARCH_ATLAS_ACCOUNT_ID=your_account_id_here
SEARCH_ATLAS_BASE_URL=https://api.searchatlas.com/v1
SEARCH_ATLAS_BRAND_VAULT_ID=your_brand_vault_id
```

Get these from Search Atlas account settings.

### Step 3: Test Connection

Create a simple test file to verify connection:

```javascript
// scripts/test-search-atlas.js
const axios = require('axios');

async function testConnection() {
  try {
    const response = await axios.get(
      `${process.env.SEARCH_ATLAS_BASE_URL}/search/keywords`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.SEARCH_ATLAS_API_KEY}`,
          'Content-Type': 'application/json'
        },
        params: {
          vault_id: process.env.SEARCH_ATLAS_BRAND_VAULT_ID
        }
      }
    );
    console.log('✅ Connected to Search Atlas');
    console.log('Keywords:', response.data);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
```

Run: `node scripts/test-search-atlas.js`

---

## 🛣️ TokSEO API Routes

Three main endpoints TokSEO will use:

### 1. **GET /api/tokseo/keywords**
Retrieves all tracked keywords with rankings

```javascript
// Response format:
{
  keywords: [
    {
      keyword: "crisis support app",
      rank: 12,
      volume: 1200,
      difficulty: 45,
      change: -2,
      trend: "stable"
    },
    // ... more keywords
  ],
  lastUpdated: "2026-03-20T10:30:00Z"
}
```

### 2. **GET /api/tokseo/competitors**
Retrieves competitor analysis data

```javascript
// Response format:
{
  competitors: [
    {
      name: "Calm",
      domain: "calm.com",
      keywords: 2345,
      topKeywords: ["meditation app", "stress relief"],
      estimatedTraffic: 5000000
    },
    // ... more competitors
  ]
}
```

### 3. **POST /api/tokseo/analysis**
Analyzes a client's domain against benchmarks

```javascript
// Request:
{
  clientDomain: "example-health-app.com",
  useCase: "crisis support"
}

// Response:
{
  domain: "example-health-app.com",
  analysis: {
    visibility: 35,
    gap: 65,
    opportunities: [
      "crisis counselor app",
      "emergency mental health",
      "24/7 support"
    ],
    competitors: ["calm.com", "headspace.com"]
  }
}
```

---

## 💻 Implementation Steps

### Step 1: Install Dependencies

```bash
npm install axios dotenv
```

### Step 2: Create Search Atlas Service

File: `/lib/services/search-atlas.ts`

```typescript
import axios from 'axios';

const API_BASE = process.env.SEARCH_ATLAS_BASE_URL;
const API_KEY = process.env.SEARCH_ATLAS_API_KEY;
const VAULT_ID = process.env.SEARCH_ATLAS_BRAND_VAULT_ID;

const searchAtlasClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

export async function getKeywordRankings() {
  try {
    const response = await searchAtlasClient.get('/keywords', {
      params: { vault_id: VAULT_ID }
    });
    return response.data;
  } catch (error) {
    console.error('Search Atlas error:', error);
    throw error;
  }
}

export async function getCompetitorData() {
  try {
    const response = await searchAtlasClient.get('/competitors', {
      params: { vault_id: VAULT_ID }
    });
    return response.data;
  } catch (error) {
    console.error('Search Atlas error:', error);
    throw error;
  }
}

export async function analyzeDomain(domain: string) {
  try {
    const response = await searchAtlasClient.post('/analysis', {
      domain,
      vault_id: VAULT_ID
    });
    return response.data;
  } catch (error) {
    console.error('Search Atlas error:', error);
    throw error;
  }
}
```

### Step 3: Create TokSEO Data Route

File: `/app/api/tokseo/data/route.js`

```javascript
import { getKeywordRankings, getCompetitorData } from '@/lib/services/search-atlas';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const dataType = searchParams.get('type') || 'keywords'; // keywords, competitors, analysis

    let data;

    if (dataType === 'keywords') {
      data = await getKeywordRankings();
    } else if (dataType === 'competitors') {
      data = await getCompetitorData();
    } else {
      return Response.json(
        { error: 'Unknown data type' },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
      dataType,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('TokSEO data route error:', error);
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
```

### Step 4: Update TokSEO Chat Route

File: `/app/api/tokseo/chat/route.js`

```javascript
import OpenAI from "openai";
import { getKeywordRankings } from '@/lib/services/search-atlas';

const TOKSEO_SYSTEM = `You are TokSEO — the SEO and Digital Visibility Agent...
[existing system prompt]

REAL DATA ACCESS:
You have access to current Search Atlas data including:
- Client keyword rankings and trends
- Competitor analysis
- Content gap opportunities
- Local SEO metrics

When relevant to user questions, reference actual data from your Search Atlas integration.`;

export async function POST(req) {
  try {
    const body = await req.json();
    const userMessage = body?.message?.trim();

    if (!userMessage) {
      return Response.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    // Get fresh data from Search Atlas if user asks about rankings/competitors
    let contextData = "";
    if (userMessage.toLowerCase().includes('rank') || 
        userMessage.toLowerCase().includes('competitor') ||
        userMessage.toLowerCase().includes('keyword')) {
      try {
        const rankings = await getKeywordRankings();
        contextData = `\n\nCurrent Rankings: ${JSON.stringify(rankings.keywords?.slice(0, 5))}`;
      } catch (e) {
        console.log('Could not fetch rankings');
      }
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1024,
      system: TOKSEO_SYSTEM + contextData,
      messages: [
        { role: "user", content: userMessage }
      ],
    });

    return Response.json({
      response: response.content[0].text || "I'm here to help with SEO strategy.",
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
```

---

## 🔄 Data Refresh Strategy

### Automatic Updates
Search Atlas typically updates data every 24 hours. Cache responses:

```typescript
// /lib/services/cache.ts
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function getCachedData(key: string, fetchFn: () => Promise<any>) {
  const cached = localStorage.getItem(`cache_${key}`);
  const timestamp = localStorage.getItem(`cache_${key}_time`);
  
  if (cached && timestamp && Date.now() - parseInt(timestamp) < CACHE_DURATION) {
    return JSON.parse(cached);
  }

  const data = await fetchFn();
  localStorage.setItem(`cache_${key}`, JSON.stringify(data));
  localStorage.setItem(`cache_${key}_time`, Date.now().toString());
  
  return data;
}
```

### Manual Refresh
Add button to TokSEO interface:

```typescript
<button onClick={async () => {
  const data = await fetch('/api/tokseo/data?type=keywords');
  // Refresh display
}}>
  🔄 Refresh Rankings
</button>
```

---

## 📋 Testing Checklist

- [ ] `.env.local` has all Search Atlas credentials
- [ ] `test-search-atlas.js` returns ✅ Connected
- [ ] Search Atlas service loads without errors
- [ ] TokSEO data route returns keyword data
- [ ] TokSEO chat route mentions search data
- [ ] Caching works (data persists 24 hours)
- [ ] Manual refresh button works
- [ ] No API errors in console

---

## 🚨 Troubleshooting

| Problem | Solution |
|---------|----------|
| 401 Unauthorized | Check API key in `.env.local` |
| 403 Forbidden | API key may lack permissions; regenerate in Search Atlas |
| Timeout errors | Brand Vault may be processing; try again in 5 min |
| No data returned | Verify Brand Vault ID and Vault has keywords |
| Rate limiting | Search Atlas free tier: 100 req/day; upgrade if needed |

---

## 🔒 Security Notes

- Never commit `.env.local` (add to `.gitignore`)
- Rotate API key monthly
- Use environment variables for all credentials
- Log API errors for monitoring
- Don't expose API key in client-side code

---

## 📈 Growth Plan

**Phase 1** (Now): Basic keyword rankings
**Phase 2** (Week 2): Competitor analysis + recommendations
**Phase 3** (Week 3): Content gap analysis + strategy engine
**Phase 4** (Month 2): Client dashboard + automated reports

---

## ✅ You're Ready!

Once you complete Brand Vault setup tonight:

1. Get API key from Search Atlas
2. Add to `.env.local`
3. Test connection with `test-search-atlas.js`
4. Implement service layer
5. TokSEO will have live data! 🎉

**Estimated setup time**: 2 hours (after Brand Vault is ready)
