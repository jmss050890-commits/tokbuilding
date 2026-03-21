# TokStore Setup Guide

## Overview
TokStore is now fully functional with:
- ✅ **Pricing Tiers UI** - Displays all app pricing options with "Get Now" buttons
- ✅ **Stripe Checkout Integration** - Payment processing for one-time and subscription purchases
- ✅ **MongoDB Database** - Stores users, orders, subscriptions, and license keys
- ✅ **License Key Generation** - Automatic generation after purchase
- ✅ **Device Activation Tracking** - Limit license usage to N devices
- ✅ **Email Capture** - Optional email collection for checkout
- ✅ **Error Handling** - User-friendly error messages

## Environment Variables Setup

### 1. Required: Stripe API Keys
Get your keys from [Stripe Dashboard](https://dashboard.stripe.com/apikeys)

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 2. Required: MongoDB Connection
**Option A: Local MongoDB**
```env
MONGODB_URI=mongodb://localhost:27017/tokbuilding
MONGODB_DB_NAME=tokbuilding
```

**Option B: MongoDB Atlas (Cloud)**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/tokbuilding?retryWrites=true&w=majority
MONGODB_DB_NAME=tokbuilding
```

### 3. Already Configured
```env
OPENAI_API_KEY=sk-proj-... (already in .env.local)
```

## Local Development Testing

### Step 1: Install MongoDB Locally (if using local MongoDB)
```bash
# macOS with Homebrew
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Windows: Download from https://www.mongodb.com/try/download/community
# Linux: Follow MongoDB installation guide
```

### Step 2: Start Development Server
```bash
npm run dev
```

The store will be available at `http://localhost:3000/tokstore`

### Step 3: Test Stripe Integration
1. Navigate to `/tokstore`
2. Click any app to view pricing tiers
3. Click "Get Now" on a paid tier
4. Use Stripe test card: `4242 4242 4242 4242` (Expiry: any future date, CVC: any 3 digits)
5. Complete checkout to generate license key

### Step 4: Verify Database
```bash
# Connect to MongoDB
mongosh

# Switch to tokbuilding database
use tokbuilding

# View collections
show collections

# Check orders
db.orders.find()

# Check licenses
db.licenseKeys.find()
```

## API Endpoints

### User Authentication
- `POST /api/auth` - Sign up / Login
  - Body: `{ action: 'signup'|'login', email, password, name? }`

### Checkout
- `POST /api/store/checkout` - Create Stripe session
  - Body: `{ appId, pricingTierIndex, userEmail? }`
  - Response: `{ checkoutUrl, sessionId }`

### Orders
- `GET /api/store/orders` - Fetch user's orders (requires auth)
- `POST /api/store/orders` - Create order after Stripe payment
  - Body: `{ appId, stripeSessionId }`

### License Management
- `POST /api/store/download/[appId]` - Validate and activate license
  - Body: `{ licenseKey, deviceId }`
  - Response: `{ downloadUrl, validity: { type, expiryDate, remainingActivations } }`

### Webhooks
- `POST /api/store/webhook` - Stripe webhook handler
  - Listens for: `checkout.session.completed`, `customer.subscription.deleted`, `charge.refunded`

## Product Pricing

All 4 apps have pricing tiers configured:

### TokHealth
- Free (basic features)
- $9.99/month (pro features)
- $99.99/year (annual discount)

### TokThru
- Free (basic)
- $14.99/month (premium)

### TokSmart
- Free (basic)
- $7.99/month (standard)
- $79.99/year (annual)

### TokAway
- $4.99 (lite)
- $9.99 (full)

## Pending Implementations

### 1. Subscription Management API
Endpoint: `/api/store/subscriptions`
- GET: List user subscriptions
- POST: Create subscription
- PUT: Update subscription (change plan, pause/resume)
- DELETE: Cancel subscription

### 2. Admin Dashboard
Route: `/tokstore/admin`
- View all orders & subscriptions
- Revenue analytics
- Customer management
- License revocation
- Requires admin authentication

### 3. File Delivery
Current: Returns download URL in JSON
Todo: Serve actual APK files with:
- Permission validation
- Download tracking
- Rate limiting
- Optional: Virus scanning

### 4. Production Deployment
- [ ] Set Stripe production keys on Vercel
- [ ] Set MongoDB production URI on Vercel
- [ ] Configure webhook domain in Stripe dashboard
- [ ] Test full payment flow
- [ ] Set up monitoring/logging

## Troubleshooting

### "STRIPE_SECRET_KEY not set" warning
→ Add your keys to `.env.local`

### MongoDB connection error
→ Ensure MongoDB is running locally OR check your connection string

### Stripe checkout redirects to error page
→ Check browser console for detailed error message

### License key not generating
→ Verify Stripe webhook handler is receiving `checkout.session.completed` events

## File Structure

```
app/
  tokstore/
    page.tsx              # Main store UI with pricing tiers ✅
    admin/
      page.tsx            # (TODO) Admin dashboard
    types.ts              # App data & PricingTier interface ✅
  api/
    auth/
      route.ts            # Authentication endpoints ✅
    store/
      checkout/
        route.ts          # Stripe session creation ✅
      orders/
        route.ts          # Order management ✅
      download/
        [appId]/
          route.ts        # License validation ✅
      subscriptions/
        route.ts          # (TODO) Subscription management
      webhook/
        route.ts          # Stripe webhooks ✅

lib/
  stripe.ts               # Stripe utilities ✅
  db.ts                   # MongoDB schemas & connection ✅
```

## Support
For issues or questions about TokStore integration, check:
1. Browser DevTools Console (frontend errors)
2. Server logs in terminal (backend errors)
3. /api/store/webhook logs (payment issues)
4. MongoDB logs (database errors)
