<<<<<<< HEAD
# 🚀 Sanders Viopro Labs LLC Domain Setup Guide

**Goal**: Register `sandersvioprolabsllc.com` and configure it with Vercel, Stripe, and SendGrid  
=======
# 🚀 Sanders Viopro Labs Domain Setup Guide

**Goal**: Register `sandersvioprolabs.com` and configure it with Vercel, Stripe, and SendGrid  
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
**Timeline**: 15-30 minutes total  
**Status**: Ready to Execute

---

## STEP 1: Register Domain (5 minutes)

### Option A: **Recommended** - Vercel Domains (Easiest)
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your `tokbuilding` project
3. Go to **Settings → Domains**
4. Click **"Add Domain"**
<<<<<<< HEAD
5. Enter: `sandersvioprolabsllc.com`
=======
5. Enter: `sandersvioprolabs.com`
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
6. Follow prompts to purchase directly ($10-12/year)
7. ✅ Auto-configured with Vercel nameservers

**Vercel automatically:**
- Registers the domain
- Points DNS to Vercel
- Enables HTTPS
- Sets up redirects

---

### Option B: External Registrar (GoDaddy, Namecheap)
If you prefer a different registrar:

1. **Go to [Namecheap.com](https://www.namecheap.com)** (cheapest option)
<<<<<<< HEAD
   - Search: `sandersvioprolabsllc.com`
=======
   - Search: `sandersvioprolabs.com`
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
   - Price: ~$8.88/year
   - Click **"Add to Cart"** → Complete checkout

2. **Point DNS to Vercel** (after registration)
   - In Namecheap dashboard: **Domain List → Manage**
   - Go to **Nameserver Settings**
   - Change to:
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ```
   - Save (takes 24 hours to propagate, but usually 2-4 hours)

3. **Add to Vercel** (Domains tab)
   - Vercel will detect the external domain
   - Click **"Add"** when nameservers are detected

---

## STEP 2: Configure in Vercel (3 minutes)

### In Vercel Dashboard:
1. Go to **tokbuilding project → Settings → Domains**
<<<<<<< HEAD
2. Add domain: `sandersvioprolabsllc.com`
3. Also add: `www.sandersvioprolabsllc.com` (alias)
4. Set primary domain to `sandersvioprolabsllc.com`
5. ✅ Vercel handles SSL certificate automatically

**Result**: Both work:
- `sandersvioprolabsllc.com` → SVL Hub
- `www.sandersvioprolabsllc.com` → SVL Hub
=======
2. Add domain: `sandersvioprolabs.com`
3. Also add: `www.sandersvioprolabs.com` (alias)
4. Set primary domain to `sandersvioprolabs.com`
5. ✅ Vercel handles SSL certificate automatically

**Result**: Both work:
- `sandersvioprolabs.com` → SVL Hub
- `www.sandersvioprolabs.com` → SVL Hub
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b

---

## STEP 3: Update Your .env Variables (2 minutes)

Update your environment variables on Vercel:

```bash
# In Vercel Project Settings → Environment Variables

# Update existing variables:
<<<<<<< HEAD
NEXT_PUBLIC_BASE_URL=https://sandersvioprolabsllc.com
=======
NEXT_PUBLIC_BASE_URL=https://sandersvioprolabs.com
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=[your key]
STRIPE_SECRET_KEY=[your key]

# Webhook URLs will use new domain automatically
```

---

## STEP 4: Update Stripe Webhook (3 minutes)

### In Stripe Dashboard:
1. Go to **Developers → Webhooks**
2. Find your existing webhook or create new one
3. **Endpoint URL**: Change to:
   ```
<<<<<<< HEAD
   https://sandersvioprolabsllc.com/api/webhooks/stripe
=======
   https://sandersvioprolabs.com/api/webhooks/stripe
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
   ```
   *(was: tokbuilding.vercel.app/api/webhooks/stripe)*

4. **Events to send**: Keep existing (payment_intent.succeeded, etc.)
5. ✅ Save webhook

**Why**: Stripe needs to know the new domain to send payments correctly.

---

## STEP 5: Verify SendGrid Domain (5 minutes)

### In SendGrid Dashboard:
1. Go to **Settings → Sender Authentication → Verify a Domain**
2. Click **"Create New"**
<<<<<<< HEAD
3. Domain: `sandersvioprolabsllc.com`
4. Subdomain selector: Leave default (or use `mail.sandersvioprolabsllc.com`)
=======
3. Domain: `sandersvioprolabs.com`
4. Subdomain selector: Leave default (or use `mail.sandersvioprolabs.com`)
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
5. Click **"Next"**
6. SendGrid shows 3 DNS records (CNAME)
7. **Add to your domain registrar**:

   **If Vercel domains**: 
<<<<<<< HEAD
   - Go back to Vercel → Domains → `sandersvioprolabsllc.com`
=======
   - Go back to Vercel → Domains → `sandersvioprolabs.com`
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
   - Click **"Edit"** → Add DNS records
   - Paste the 3 CNAME records from SendGrid
   
   **If external registrar**:
   - Log in to Namecheap/GoDaddy
   - Go to **Advanced DNS**
   - Add 3 CNAME records from SendGrid
   - Click **"Save"**

8. Wait for DNS propagation (5-30 minutes)
9. In SendGrid, click **"Verify DNS"**
10. ✅ Once verified, SendGrid can send from your domain

---

## STEP 6: Update Email Senders (2 minutes)

### Update `.env.local`:
```bash
# SVL Parent Brand
<<<<<<< HEAD
SVL_EMAIL=noreply@sandersvioprolabsllc.com

# Product Brands
TOKAWAY_EMAIL=noreply-tokaway@sandersvioprolabsllc.com
TOKHEALTH_EMAIL=noreply-tokhealth@sandersvioprolabsllc.com
TOKTHRU_EMAIL=noreply-tokthru@sandersvioprolabsllc.com
TOKSTORE_EMAIL=noreply-store@sandersvioprolabsllc.com
TOK2MYIA_EMAIL=noreply-tok2myia@sandersvioprolabsllc.com
TOKSMART_EMAIL=noreply-toksmart@sandersvioprolabsllc.com

# Support
SUPPORT_EMAIL=support@sandersvioprolabsllc.com
=======
SVL_EMAIL=noreply@sandersvioprolabs.com

# Product Brands
TOKAWAY_EMAIL=noreply-tokaway@sandersvioprolabs.com
TOKHEALTH_EMAIL=noreply-tokhealth@sandersvioprolabs.com
TOKTHRU_EMAIL=noreply-tokthru@sandersvioprolabs.com
TOKSTORE_EMAIL=noreply-store@sandersvioprolabs.com
TOK2MYIA_EMAIL=noreply-tok2myia@sandersvioprolabs.com
TOKSMART_EMAIL=noreply-toksmart@sandersvioprolabs.com

# Support
SUPPORT_EMAIL=support@sandersvioprolabs.com
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
```

### Then in Vercel:
- Go to **Settings → Environment Variables**
- Update all email addresses to match above
- Deploy

---

## STEP 7: Commit & Deploy (2 minutes)

```bash
# In VS Code terminal:
git add .env.local DOMAIN_SETUP_GUIDE.md
<<<<<<< HEAD
git commit -m "chore: Configure sandersvioprolabsllc.com domain and update email senders"
=======
git commit -m "chore: Configure sandersvioprolabs.com domain and update email senders"
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
git push
```

Vercel will auto-deploy. Your site will be live at:
<<<<<<< HEAD
- **https://sandersvioprolabsllc.com**
- **https://sandersvioprolabsllc.com/tokstore**
- **https://sandersvioprolabsllc.com/agent/mr-kpa**
=======
- **https://sandersvioprolabs.com**
- **https://sandersvioprolabs.com/tokstore**
- **https://sandersvioprolabs.com/agent/mr-kpa**
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b

---

## STEP 8: Verify Everything Works (3 minutes)

### Checklist:
<<<<<<< HEAD
- [ ] Domain registered (`sandersvioprolabsllc.com`)
=======
- [ ] Domain registered (`sandersvioprolabs.com`)
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
- [ ] DNS propagated (test at [whatsmydns.net](https://www.whatsmydns.net/))
- [ ] Vercel showing domain as primary
- [ ] HTTPS certificate working (green lock 🔒)
- [ ] Stripe webhook URL updated
- [ ] SendGrid domain verified
- [ ] Email environment variables updated
- [ ] Code deployed to Vercel
<<<<<<< HEAD
- [ ] Site loads at `sandersvioprolabsllc.com` ✅
- [ ] TokStore checkout works (test payment)
- [ ] License emails send from `noreply@sandersvioprolabsllc.com` ✅
=======
- [ ] Site loads at `sandersvioprolabs.com` ✅
- [ ] TokStore checkout works (test payment)
- [ ] License emails send from `noreply@sandersvioprolabs.com` ✅
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b

---

## Timeline Summary

| Step | Task | Time | Status |
|------|------|------|--------|
| 1 | Register domain | 5 min | ⏳ Ready |
| 2 | Configure Vercel | 3 min | ⏳ Ready |
| 3 | Update .env | 2 min | ⏳ Ready |
| 4 | Update Stripe | 3 min | ⏳ Ready |
| 5 | Verify SendGrid | 5 min | ⏳ Ready |
| 6 | Update emails | 2 min | ⏳ Ready |
| 7 | Deploy | 2 min | ⏳ Ready |
| 8 | Test | 3 min | ⏳ Ready |
| **TOTAL** | **Full Setup** | **~25 min** | **🚀 Ready** |

---

## CRITICAL: DNS Propagation Wait Times

- **Vercel domains**: Instant (auto-configured)
- **External registrar**: 24 hours max, usually 2-4 hours
- **SendGrid verification**: 5-30 minutes after DNS records added

<<<<<<< HEAD
**Tip**: You can check propagation at [whatsmydns.net](https://www.whatsmydns.net/) - enter `sandersvioprolabsllc.com` and select your registrar
=======
**Tip**: You can check propagation at [whatsmydns.net](https://www.whatsmydns.net/) - enter `sandersvioprolabs.com` and select your registrar
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b

---

## Support Contacts

If stuck:
- **Vercel help**: [vercel.com/support](https://vercel.com/support)
- **Stripe webhooks**: [stripe.com/docs/webhooks](https://stripe.com/docs/webhooks)
- **SendGrid domains**: [sendgrid.com/docs/for-developers/sending-email/domain-verification/](https://sendgrid.com/docs/for-developers/sending-email/domain-verification/)

---

## Post-Domain Notes

### Your Landing Pages Will Be:
<<<<<<< HEAD
- **Home**: `sandersvioprolabsllc.com` → SVL Hub ✅
- **Store**: `sandersvioprolabsllc.com/tokstore` ✅
- **Mr. KPA**: `sandersvioprolabsllc.com/agent/mr-kpa` ✅
- **Product Pages**:
  - `sandersvioprolabsllc.com/tokaway-landing`
  - `sandersvioprolabsllc.com/tokhealth-landing`
  - `sandersvioprolabsllc.com/tokthru-landing`
=======
- **Home**: `sandersvioprolabs.com` → SVL Hub ✅
- **Store**: `sandersvioprolabs.com/tokstore` ✅
- **Mr. KPA**: `sandersvioprolabs.com/agent/mr-kpa` ✅
- **Product Pages**:
  - `sandersvioprolabs.com/tokaway-landing`
  - `sandersvioprolabs.com/tokhealth-landing`
  - `sandersvioprolabs.com/tokthru-landing`
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
  - etc.

### Email Receipts Will Show:
```
<<<<<<< HEAD
From: TokAway Safety <noreply-tokaway@sandersvioprolabsllc.com>
From: Sanders Viopro Labs LLC <noreply@sandersvioprolabsllc.com>
=======
From: TokAway Safety <noreply-tokaway@sandersvioprolabs.com>
From: Sanders Viopro Labs <noreply@sandersvioprolabs.com>
>>>>>>> 3d5804cf919a4203b6d2ef62f0e011b4b7f9862b
```

All branded with SVL colors, KPA mission messaging, and professional tone.

---

**Ready to execute?** Start with **STEP 1** and let me know when you complete each step!
