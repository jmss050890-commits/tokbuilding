# Search Atlas Integration - Quick Setup (After Brand Vault Tonight)

## ⏰ Tomorrow Morning Checklist (30 minutes)

After you complete Brand Vault setup tonight, do this tomorrow morning:

### Step 1: Get Your Credentials ✅
1. Log into Search Atlas
2. Go to **Settings → API Keys**
3. Create new API key (name: "TokSEO Integration")
4. Copy these values:
   - `API Key` (the secret token)
   - `Account ID` (from Settings)
5. Go to **Brand Vault → Settings**
6. Copy `Brand Vault ID`

### Step 2: Update .env.local (5 minutes)

Open `/tokbuilding/.env.local` and add these 3 lines:

```env
SEARCH_ATLAS_API_KEY=your_api_key_here
SEARCH_ATLAS_ACCOUNT_ID=your_account_id_here
SEARCH_ATLAS_BRAND_VAULT_ID=your_brand_vault_id_here
```

**Example** (not real):
```env
SEARCH_ATLAS_API_KEY=sa_live_abc123def456ghi789jkl012
SEARCH_ATLAS_ACCOUNT_ID=acct_5f2d8c1a9b
SEARCH_ATLAS_BRAND_VAULT_ID=vault_e4k2j9x8m1
```

### Step 3: Test Connection (5 minutes)

Run this command:
```bash
node scripts/test-search-atlas-connection.js
```

**Expected output**:
```
✅ Connected to Search Atlas
✅ Brand Vault: Sanders Viopro Labs
✅ Keywords tracked: 47
✅ Competitors: 6
```

If you see errors, check:
- API key is correct (copy/paste exactly)
- Brand Vault ID is correct
- No typos in `.env.local`

### Step 4: Restart Dev Server (2 minutes)

Kill and restart:
```bash
# Kill existing process
Get-Process node | Stop-Process -Force

# Start fresh
npm run dev
```

### Step 5: Test TokSEO Integration (10 minutes)

1. Open http://localhost:3000/agent/tokseo
2. Send message: "What are my top keywords right now?"
3. Should get response with real data from Search Atlas

**If it works** ✅:
```
TokSEO: "Based on your Brand Vault, your top keywords are:
- 'crisis support app' (Rank #12, 1,200 monthly searches)
- 'mental health coaching' (Rank #8, 890 searches)
... with competitors: Calm, Headspace, BetterHelp"
```

---

## 🔧 Implementation Details (Already Done)

The following is **already coded and ready**:

### Created Files:
- ✅ `/lib/services/search-atlas.ts` - Search Atlas API client
- ✅ `/app/api/tokseo/data/route.js` - Data endpoints
- ✅ `/app/api/tokseo/chat/route.js` - Updated chat with Search Atlas

### How It Works:

1. **User asks TokSEO a question**
2. **TokSEO chat detects keywords like "rank", "competitor", "opportunity"**
3. **Service layer fetches real data from Search Atlas**
4. **Claude AI gets context + data**
5. **Claude provides data-backed advice**
6. **User gets intelligent, specific recommendations**

### Three API Endpoints Ready:

**GET /api/tokseo/data?type=keywords**
Returns your top 50 keywords with rankings

**GET /api/tokseo/data?type=competitors**
Returns competitor analysis data

**GET /api/tokseo/data?type=gaps**
Returns content gap opportunities

---

## 📋 Files Already Modified

```
✅ /lib/services/search-atlas.ts (NEW)
   └─ SearchAtlasService class with 4 methods

✅ /app/api/tokseo/data/route.js (NEW)
   └─ GET/POST endpoints for SEO data

✅ /app/api/tokseo/chat/route.js (UPDATED)
   └─ Integrated Search Atlas context into Claude prompts
```

---

## 🎯 What Happens When Live

### Without Brand Vault Setup:
TokSEO uses **mock data** (demo keywords/competitors). Still works, but generic.

### With Brand Vault Setup + Credentials:
TokSEO uses **real data** from YOUR Brand Vault. Specific, actionable, powerful.

---

## 🚨 Troubleshooting

| Issue | Solution |
|-------|----------|
| "401 Unauthorized" | API key is wrong. Recopy from Search Atlas exactly |
| "404 Brand Vault not found" | Brand Vault ID is wrong. Check Settings |
| "No data returned" | Brand Vault still processing (wait 5 min) or hasn't synced. Refresh page. |
| "Connection timeout" | Search Atlas API down (rare). Try again in 5 min. |
| TokSEO still shows generic data | Restart dev server after adding `.env.local` |

---

## 🎉 You're Ready!

**Timeline**:
- Tonight: Complete Brand Vault in Search Atlas (2-3 hours)
- Tomorrow morning: Add 3 env vars (5 minutes)
- Tomorrow afternoon: TokSEO is live with real data! 🚀

---

## 📞 Questions?

If stuck:
- Check `.env.local` has all 3 variables
- Verify credentials are copy/pasted exactly
- Check Search Atlas dashboard that Brand Vault shows 40+ keywords
- Look at console logs for errors

**You've got this!** 💪
