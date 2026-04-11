# SVL Email System Setup Guide

## Overview
This email system is structured to mirror your SVL agent ecosystem—brand-aware, centralized configuration, product-specific sending addresses, and professional templates for each brand.

## Architecture

**File Structure:**
```
lib/
├── email-config.ts          # Brand configuration (like agents.ts)
└── email.ts                 # Email service + SendGrid integration
```

**Supported Brands:**
<<<<<<< HEAD
- `svl` — Sanders Viopro Labs LLC (parent)
=======
- `svl` — Sanders Viopro Labs (parent)
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
- `tokaway` — TokAway Safety App
- `tokhealth` — TokHealth Wellness
- `toksmart` — TokSmart Business
- `tokthru` — TokThru Crisis Support
- `tokstore` — TokStore Shop

---

## Setup Steps

### 1. Get SendGrid API Key
1. Go to [sendgrid.com](https://sendgrid.com)
2. Sign up for a free account
3. Navigate to **API Keys** section
4. Create a new API key
5. Copy the key

### 2. Set Environment Variables
1. Copy `.env.local.example` to `.env.local`
2. Paste your SendGrid API key:
   ```
   SENDGRID_API_KEY=SG.xxxxxx...
   ```
3. Update email addresses if you have custom domains:
   ```
   SVL_EMAIL=noreply@yourdomain.com
   TOKAWAY_EMAIL=noreply-tokaway@yourdomain.com
   ```

### 3. Verify Sender Email (SendGrid)
- Each email address you send from must be **verified** in SendGrid
- For development: SendGrid provides a sandbox domain (no real emails sent)
- For production: Verify your domain or use SendGrid's default

---

## Usage

### Send License Email
```typescript
import { sendLicenseEmail } from '@/lib/email';

await sendLicenseEmail({
  brand: 'tokaway',  // or 'tokhealth', 'toksmart', etc.
  email: 'customer@example.com',
  licenseKey: 'TOK-AWAY-ABC123XYZ',
  productName: 'TokAway',
  planName: 'Lifetime Access',
  downloadLink: 'https://tokbuilding.com/download/tokaway',
  recipientName: 'John',
  expiryDate: '2027-03-20'
});
```

Output:
```
<<<<<<< HEAD
From: TokAway Safety <noreply-tokaway@sandersvioprolabsllc.com>
=======
From: TokAway Safety <noreply-tokaway@sandersvioprolabs.com>
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
Subject: Your TokAway License Key
(Brand-colored HTML email with license key, download button, support links)
```

---

### Send Order Confirmation
```typescript
import { sendOrderConfirmationEmail } from '@/lib/email';

await sendOrderConfirmationEmail({
  brand: 'toksmart',
  email: 'buyer@example.com',
  recipientName: 'Jane',
  orderId: 'ORD-2026-001234',
  productName: 'TokSmart Business Suite',
  planName: 'Annual Plan',
  amount: 9999,  // in cents: $99.99
  date: new Date().toLocaleDateString(),
  downloadLink: 'https://tokbuilding.com/download/toksmart'
});
```

Output:
```
<<<<<<< HEAD
From: TokSmart Business <noreply-toksmart@sandersvioprolabsllc.com>
=======
From: TokSmart Business <noreply-toksmart@sandersvioprolabs.com>
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
Subject: Order Confirmation: TokSmart Business Suite
(Brand-colored order summary with amount, product details, next steps)
```

---

### Send Welcome Email
```typescript
import { sendWelcomeEmail } from '@/lib/email';

await sendWelcomeEmail(
  'newuser@example.com',
  'Alex',
  'tokhealth'  // brand
);
```

Output:
```
<<<<<<< HEAD
From: TokHealth Wellness <noreply-tokhealth@sandersvioprolabsllc.com>
=======
From: TokHealth Wellness <noreply-tokhealth@sandersvioprolabs.com>
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
Subject: Welcome to TokHealth
(Brand-colored welcome with call-to-action, documentation links)
```

---

## Brand Colors (Auto-Applied)
Each brand email uses its configured color in templates:
- **SVL**: `#c9a84c` (gold)
- **TokAway**: `#0ea5e9` (cyan)
- **TokHealth**: `#10b981` (green)
- **TokSmart**: `#f59e0b` (amber)
- **TokThru**: `#ec4899` (pink)
- **TokStore**: `#8b5cf6` (purple)

---

## Demo Mode (No SendGrid Key)
If `SENDGRID_API_KEY` is not set:
- Emails log to console instead of sending
- Useful for development/testing
- Check terminal output to verify template rendering

---

## Integration with Order Routes
Update your order endpoints to send emails:

```typescript
// app/api/store/orders/route.ts
import { sendOrderConfirmationEmail, sendLicenseEmail } from '@/lib/email';

export async function POST(req) {
  // ... process order ...

  // Send order confirmation
  await sendOrderConfirmationEmail({
    brand: 'tokstore',
    email: customer.email,
    recipientName: customer.name,
    orderId: order._id,
    productName: product.name,
    planName: product.plan,
    amount: order.totalAmount,
    date: new Date().toLocaleDateString(),
    downloadLink: `/api/downloads/${order._id}`
  });

  // If purchase includes license, send license email
  if (license) {
    await sendLicenseEmail({
      brand: product.brand,
      email: customer.email,
      licenseKey: license.key,
      productName: product.name,
      planName: product.plan,
      downloadLink: `/api/downloads/${order._id}`,
      recipientName: customer.name
    });
  }

  return { success: true, orderId: order._id };
}
```

---

## Customization

### Change a Brand's Email Address
Edit `lib/email-config.ts`:
```typescript
tokaway: {
  senderEmail: process.env.TOKAWAY_EMAIL || "custom@yourdomain.com",  // ← change here
  ...
}
```

### Change Brand Color
Edit `lib/email-config.ts`:
```typescript
tokaway: {
  brandColor: "#FF6B35",  // new color
  ...
}
```

### Add New Brand
1. Edit `lib/email-config.ts`:
```typescript
newbrand: {
  brand: "Your Brand",
  productName: "Your Product",
<<<<<<< HEAD
  senderEmail: process.env.NEWBRAND_EMAIL || "noreply-newbrand@sandersvioprolabsllc.com",
=======
  senderEmail: process.env.NEWBRAND_EMAIL || "noreply-newbrand@sandersvioprolabs.com",
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
  senderName: "Your Brand",
  brandColor: "#FF00FF",
  supportEmail: "Loop2008tokhealth@outlook.com",
  website: "https://tokbuilding.com/newbrand",
}
```

2. Add env var to `.env.local.example`:
```
<<<<<<< HEAD
NEWBRAND_EMAIL=noreply-newbrand@sandersvioprolabsllc.com
=======
NEWBRAND_EMAIL=noreply-newbrand@sandersvioprolabs.com
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
```

3. Use in code:
```typescript
await sendOrderConfirmationEmail({
  brand: 'newbrand',  // ← new key
  ...
});
```

---

## Production Checklist

- [ ] SendGrid account created and verified
- [ ] API key added to production environment
- [ ] All sender email addresses verified in SendGrid
- [ ] Test emails sent and received to verify formatting
- [ ] Brand colors and support email are correct
- [ ] Order routes integrated to send confirmation emails
- [ ] License routes send license delivery emails
- [ ] Welcome emails trigger on user signup
- [ ] Email logs reviewed for errors

---

## Troubleshooting

**Emails not sending?**
- Check `SENDGRID_API_KEY` is set in `.env.local`
- Verify sender email is verified in SendGrid dashboard
- Check console logs for "Email Service" messages

**Emails going to spam?**
- Add SPF and DKIM records for your domain (SendGrid shows how)
- Use proper sender name (not just the email address)
- Include unsubscribe link (templates already have this)

**Wrong brand colors?**
- Verify `brandColor` in `email-config.ts`
- Check you're using correct `brand` parameter in function call

---

## Support
Email: Loop2008tokhealth@outlook.com
Docs: https://docs.tokbuilding.com/email
