# Button Layout & Responsiveness Audit Report

**Date:** March 20, 2026  
**Audited Applications:** TokSmart, TokHealth, TokBuilder, TokStore, TokThru, VCC Hub  
**Focus:** Button sizing, spacing, text overflow, and responsive breakpoints

---

## Executive Summary

**Status:** ⚠️ **ISSUES FOUND** - 5 critical responsive layout problems affecting user experience on mobile and tablet devices

**Problem Areas:**

1. **TokSmart**: Input form buttons don't scale properly on mobile
2. **TokHealth**: Scanner action buttons overlap on small screens; Feature grid has awkward layout
3. **TokThru**: Emergency tools grid creates 2-3-1 layout on tablets
4. **TokSmart Chat**: Alternative perspective buttons lack proper flex wrapping
5. **TokHealth Scanner**: Button text truncation with excessive padding reduction

---

## Detailed Issues & Recommendations

### 🔴 CRITICAL: TokSmart Chat - Input Form Buttons

**File:** `app/toksmart/chat/page.tsx`  
**Lines:** 498-504  
**Issue:** Input form in a flex row with 3 elements doesn't handle small screens well

**Current Code:**

```jsx
<form onSubmit={handleSendMessage} className="flex gap-4">
  {isVoiceAvailable && (
    <button className={`px-4 py-3 rounded-lg font-bold transition ...`}>
      {isListening ? '🎤 Listening...' : '🎤'}
    </button>
  )}
  <input
    className="flex-1 bg-white/20 ... text-sm"
    placeholder="Ask me anything..."
  />
  <button
    className="bg-white text-purple-600 font-bold py-3 px-4 rounded-lg ... whitespace-nowrap"
  >
    ↪️
  </button>
</form>
```

**Problems:**

- On screens < 640px: 3 elements compete for space; Listening text becomes "🎤 Listening..." which overflows
- The send button emoji "↪️" is ambiguous and doesn't scale well
- `whitespace-nowrap` prevents responsive text wrapping
- Gap-4 creates too much space on mobile (16px)

**Recommendation:**
```jsx
<form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3 sm:gap-4">
  {isVoiceAvailable && (
    <button
      className={`px-2 sm:px-4 py-2 sm:py-3 rounded-lg font-bold transition text-xs sm:text-sm ${...}`}
    >
      {isListening ? '🎤...' : '🎤'}
    </button>
  )}
  <input
    className="flex-1 bg-white/20 ... text-xs sm:text-sm"
    placeholder="Ask anything..."
  />
  <button
    className="bg-white text-purple-600 font-bold py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition"
  >
    Send
  </button>
</form>
```

**Changes:**

- Replace emoji-only send button with "Send" text (clearer)
- Scale padding from `px-4 py-3` → `px-2 sm:px-4 py-2 sm:py-3`
- Reduce gap on mobile from `gap-4` → `gap-2`
- Scale text from `text-sm` → `text-xs sm:text-sm`
- Shorten listening indicator: '🎤 Listening...' → '🎤...'

**Impact:** Medium - affects legibility and touch target size on mobile

---

### 🔴 CRITICAL: TokHealth Scanner - Action Buttons

**File:** `app/tokhealth/page.tsx`  
**Lines:** 661-697  
**Issue:** 3 buttons in a grid with insufficient padding and text scaling

**Current Code:**

```jsx
<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 mb-4">
  <button
    className="px-2 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition disabled:opacity-50 text-xs sm:text-sm whitespace-nowrap"
  >
    📷 Photo
  </button>
  <button className="px-2 py-3 ... text-xs sm:text-sm whitespace-nowrap">
    ✅ Log
  </button>
  <button className="px-2 py-3 ... text-xs sm:text-sm whitespace-nowrap">
    🎤 Voice
  </button>
</div>
```

**Problems:**

- `px-2` is too small (8px) on any screen; buttons look cramped
- Text size jump from `text-xs` (12px) to `sm:text-sm` (14px) is abrupt
- `py-3` (12px) + `text-xs` creates weird aspect ratio
- On mobile: buttons are too narrow for comfortable touch (need min 44px height)
- `whitespace-nowrap` prevents responsive text wrapping when needed

**Recommendation:**

```jsx
<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
  <button
    className="px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition disabled:opacity-50 text-xs sm:text-sm min-h-[40px] sm:min-h-[44px]"
  >
    📷 <span className="hidden sm:inline">Photo</span>
  </button>
  <button className="px-3 sm:px-4 py-2 sm:py-3 ... min-h-[40px] sm:min-h-[44px]">
    ✅ <span className="hidden sm:inline">Log</span>
  </button>
  <button className="px-3 sm:px-4 py-2 sm:py-3 ... min-h-[40px] sm:min-h-[44px]">
    🎤 <span className="hidden sm:inline">Voice</span>
  </button>
</div>
```

**Changes:**

- Increase minimum padding: `px-2` → `px-3 sm:px-4`
- Ensure mobile touch target: add `min-h-[40px] sm:min-h-[44px]`
- Hide text labels on mobile, show emoji only: `<span className="hidden sm:inline">Photo</span>`
- Remove `whitespace-nowrap` to allow wrapping
- Smooth transition: `py-3` → `py-2 sm:py-3`

**Impact:** High - affects mobile usability (touch target size is critical)

---

### 🟠 HIGH: TokHealth Feature Grid

**File:** `app/tokhealth/page.tsx`  
**Lines:** 472  
**Issue:** 7 buttons in a `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` creates awkward 2-3-2 layout on tablets

**Current Code:**

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
  {/* 7 feature buttons */}
</div>
```

**Visual Layout:**

- Mobile (< 640px): 7 rows (good)
- Tablet (640px-1024px): 2-3-2 layout (awkward)
- Desktop (> 1024px): 3-3-1 layout (acceptable)

**Problems:**

- Uneven distribution on md breakpoint
- Buttons look lopsided (2 items on second row, then 3, then 2)

**Recommendation:**

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-8">
  {/* Results in: mobile=1 col, tablet=3 col, desktop=3 col */}
</div>
```

**Alternative:** Use auto-fit with better minmax:

```jsx
<div className="grid grid-cols-1 gap-4 md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] mb-8">
  {/* Fluid: scales 1-2-3 cols based on available space */}
</div>
```

**Impact:** Medium - affects visual aesthetics on tablets

---

### 🟠 HIGH: TokThru Emergency Tools Grid

**File:** `app/tokthru/page.tsx`  
**Lines:** 365  
**Issue:** 6 buttons with same asymmetric layout issue; critical safety buttons

**Current Code:**

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* 6 emergency buttons: Silent SOS, Fake Call, Check-in, Scripts, Safe Spots, Chat */}
</div>
```

**Visual Layout:**

- Tablet: 2-2-2 (good) → but next 3 would be 2-1 (bad)
- Actually creates a 3-3 on lg, which is fine for 6 items

**Problems:**

- Uses inline styles instead of Tailwind for consistency
- Buttons have `transform hover:scale-105` which might cause layout shift
- Gap-4 might be excessive on mobile

**Recommendation:**

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
  {/* Already acceptable for 6 items, but tighten mobile gap */}
</div>
```

**Impact:** Low - current layout is actually fine, but needs gap adjustment for consistency

---

### 🟡 WARNING: TokSmart Chat - Alternative Perspective Buttons

**File:** `app/toksmart/chat/page.tsx`  
**Lines:** 430-440  
**Issue:** Alternative AI buttons use flex-wrap without proper constraints

**Current Code:**

```jsx
<div className="flex justify-start mt-3 gap-2 flex-wrap">
  <p className="text-xs text-white/60 w-full">🚀 Want another perspective?</p>
  {alternatives.map((alt) => (
    <button
      className="text-xs px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white transition disabled:opacity-50"
    >
      Try {getAIDisplayName(alt)}
    </button>
  ))}
</div>
```

**Problems:**

- `text-xs px-3 py-1` creates very small buttons (24px height)
- Button text "Try 📖 Scholar GPT" is quite long and may wrap awkwardly
- No max-width on individual buttons; could stretch full width on mobile
- Gap-2 is fine, but buttons need better sizing

**Recommendation:**

```jsx
<div className="flex justify-start mt-3 gap-2 flex-wrap">
  <p className="text-xs text-white/60 w-full">🚀 Want another perspective?</p>
  {alternatives.map((alt) => (
    <button
      className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition disabled:opacity-50 min-h-[28px] sm:min-h-[32px]"
    >
      {getAIDisplayName(alt).split(' ')[0]}
    </button>
  ))}
</div>
```

**Changes:**

- Increase text scale: `text-xs` → `text-xs sm:text-sm`
- Ensure touch target: add `min-h-[28px] sm:min-h-[32px]`
- Shorten button text by showing emoji + first word only
- Scale padding responsively: `px-3 py-1` → `px-2 sm:px-3 py-1 sm:py-2`

**Impact:** Low-Medium - affects mobile users wanting to try alternative AIs

---

### 🟢 GOOD: VCC Hub Product Grid

**File:** `app/vcc-hub/page.tsx`  
**Lines:** 206-207  
**Status:** ✅ No issues

**Code:**

```jsx
<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 30,
  }}
>
```

**Why It Works:**

- `auto-fit` with `minmax(320px, 1fr)` is responsive by design
- Creates 1 col on mobile, 2 on tablet, 3+ on desktop naturally
- No media queries needed
- Gap-30 is appropriate for card-style layouts

**Recommendation:** Keep as-is or consider reducing gap to gap-20-24 for tighter mobile spacing

---

## Summary by Application

| App | Layout Type | Status | Issue Severity | Fix Priority |
| --- | --- | --- | --- | --- |
| **TokSmart** | Input form (flex) | ⚠️ | HIGH | P1 |
| **TokSmart Chat** | "Try alternative" buttons | ⚠️ | MEDIUM | P2 |
| **TokHealth** | Feature grid (7 items) | ⚠️ | MEDIUM | P2 |
| **TokHealth** | Scanner buttons (3 items) | 🔴 | CRITICAL | P1 |
| **TokThru** | Emergency grid (6 items) | ✅ | LOW | P3 |
| **TokThru** | Emergency grid gaps | ⚠️ | LOW | P3 |
| **TokStore** | Sidebar+content | ✅ | NONE | N/A |
| **VCC Hub** | Product grid | ✅ | NONE | N/A |

---

## Mobile Breakpoints Recap

**Tailwind Breakpoints Used:**

- `sm` (640px): Most critical for fixing button overflow
- `md` (768px): Secondary breakpoint for grids
- `lg` (1024px): Desktop layout

**Minimum Touch Target Size:**

- iOS: 44px (Apple standard)
- Android: 48px (Material Design)
- **Current issues:** TokHealth scanner buttons (32px), TokSmart input (32px)

---

## Testing Checklist

- [ ] Test TokSmart input form on iPhone SE (375px width)
- [ ] Test TokSmart input form on iPhone 12 (390px width)
- [ ] Test TokSmart input form on iPad (768px width)
- [ ] Test TokHealth scanner buttons on mobile (portrait + landscape)
- [ ] Test TokHealth feature grid on iPad (check md breakpoint alignment)
- [ ] Test alternative AI buttons on all screen sizes
- [ ] Verify touch target sizes with browser dev tools (target: min 44px)
- [ ] Check for text overflow with longer AI model names
- [ ] Test on Chrome, Safari, and Firefox mobile

---

## Files Requiring Updates

**Priority 1 (Critical):**
1. `app/toksmart/chat/page.tsx` - Input form (lines 498-504)
2. `app/tokhealth/page.tsx` - Scanner buttons (lines 661-697)

**Priority 2 (High):**
3. `app/tokhealth/page.tsx` - Feature grid (lines 472)
4. `app/toksmart/chat/page.tsx` - Alternative buttons (lines 430-440)

**Priority 3 (Low):**
5. `app/tokthru/page.tsx` - Gap adjustments (line 365)

---

## Next Steps

1. **Immediate:** Implement P1 fixes for TokSmart and TokHealth
2. **Short-term:** Test on actual devices (mobile + tablet)
3. **Tracking:** Monitor analytics for bounce rates/interaction metrics
4. **Future:** Consider component library for consistent button sizing across all apps

---

*Audit completed: March 20, 2026*
*Prepared for: Jerome Sanders / SVL Team*
