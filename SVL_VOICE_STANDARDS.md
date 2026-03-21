# SVL Agent Voice Standards

**Mission**: All SVL agents speak with natural, authentic voices. NEVER robotic. Always real, calm, purposeful, and intentional.

---

## Core Voice Principles

1. **NATURAL** - Warm, human-like, conversational
2. **CALM** - Even in high-energy moments, maintain presence and clarity
3. **PURPOSEFUL** - Every word serves the KPA mission: Keep People Alive
4. **INTENTIONAL** - Voice matches agent personality and app context
5. **NO ROBOTIC FALLBACKS** - Never default to system's generic/robotic voice

---

## Current SVL Agent Voices

### 👩 **Grace** (TokThru Crisis Support)
- **Gender**: Female
- **Voice**: Samantha
- **Pitch**: 1.9 (warm, elevated)
- **Rate**: 0.88 (clear, present)
- **Personality**: Warm, protective, deeply caring coach
- **Purpose**: Support users through emotional crises with genuine compassion

### 👨 **A1** (SVL Strategy Agent - Loop2008)
- **Gender**: Male
- **Voice**: Aaron
- **Pitch**: 1.25 (vibrant, optimistic)
- **Rate**: 0.92 (energized, ready)
- **Personality**: Wise founder, ready to move mountains
- **Purpose**: Strategic guidance with infectious enthusiasm for KPA mission

### 👩 **HATÄTA** (SVL Command Agent)
- **Gender**: Female
- **Voice**: Zira
- **Pitch**: 1.3 (authoritative, strong)
- **Rate**: 0.92 (deliberate, present)
- **Personality**: Strategic, commanding, protective
- **Purpose**: Jerome's right hand - bold strategy, brand protection
- **CRISIS MODE**: Remain CALM. Voice authority without urgency. Steady presence.

### 👩 **Wisdom** (TokHealth Coach)
- **Gender**: Female
- **Voice**: Victoria
- **Pitch**: 1.75 (playful, animated)
- **Rate**: 0.96 (energetic, fun)
- **Personality**: Brilliant, funny, encouraging
- **Purpose**: Make health coaching engaging and celebratory

### 👨 **Coach Daniels** (Health Coaching)
- **Gender**: Male
- **Voice**: Daniel
- **Pitch**: 1.28 (bright, energetic)
- **Rate**: 0.95 (motivated, fired up)
- **Personality**: Motivational, protective, empowering
- **Purpose**: Inspire users to take action on their health

### 👩 **TokSEO** (Business Strategy)
- **Gender**: Female
- **Voice**: Moira
- **Pitch**: 1.25 (authoritative, wise)
- **Rate**: 0.88 (thoughtful, professional)
- **Personality**: Seasoned strategist, business-focused
- **Purpose**: Guide businesses to visibility and mission alignment

---

## Voice Selection Algorithm

The system uses this priority order to AVOID robotic defaults:

1. **Explicit Voice Match** - Use exact voice specified in agent config
2. **Natural Preferred Voices** - Look for: Aaron, Daniel, David, Alex, Tom (male); Zira, Samantha, Victoria, Moira, Karen, Fiona (female)
3. **Any en-US Voice** - Better than default system voice
4. **Last Resort** - Skip anything with "robot" or "default" in name

---

## Voice Configuration Location

All agent voice settings are in: `/lib/lib/lib/agents.ts`

Each agent has:
```typescript
voiceGender: "male" | "female"
voiceName: string        // Specific voice to use
voicePitch: number       // 0.1-2.0 (1.0 = normal)
voiceRate: number        // 0.1-10 (1.0 = normal)
```

---

## Testing & Quality Assurance

**Test all voices**: http://localhost:3000/test-all-voices

**Listen for**:
- ✅ Natural, warm tone (never robotic)
- ✅ Agent personality comes through
- ✅ Matches app context (crisis = calm, health = fun, strategy = authoritative)
- ✅ Clear pronunciation and pacing

**If voice sounds robotic**:
1. Check console for which voice was selected
2. Update agent config with different `voiceName`
3. Adjust `pitch` and `rate` for more natural sound
4. Retest

---

## App Themes & Voice Requirements

| App | Theme | Voice Style |
|-----|-------|-------------|
| **TokThru** | Crisis Support | Calm, protective, present |
| **TokHealth** | Wellness & Comedy | Energetic, playful, encouraging |
| **TokBuilding** | Agent Builder | Smart, clear, purposeful |
| **TokSmart** | AI Hub | Natural, helpful, accessible |
| **TokAway** | Fake Call Escape | Grounded, real, supportive |

---

## HATÄTA Special Requirements

Especially in crisis mode:
- ✅ CALM presence (not rushed or panicked)
- ✅ AUTHORITATIVE (users feel protected)
- ✅ CLEAR speech (no ambiguity)
- ✅ INTENTIONAL pacing (not too fast)

Never let HATÄTA sound robotic or cold. She is Jerome's trusted agent - her voice should convey expertise AND care.

---

## No Robotic Fluff Policy

**Forbidden**:
- ❌ Default system TTS voice
- ❌ Fast, clippy speech
- ❌ Over-processed sound
- ❌ Emotionless delivery
- ❌ Unnatural pitch/rate combinations

**Required**:
- ✅ Real, natural voice
- ✅ Personality and warmth
- ✅ Clear intentional pacing
- ✅ Emotion appropriate to context
- ✅ Authentic presence

---

## Last Updated
March 20, 2026 - Complete SVL voice standards established
