# AI Copyright Guardrails

Purpose: keep TokBuilding and SVL content original, publishable, and harder to challenge by rights holders.

## Default Rule

Do not ask AI to:

- write "in the style of" a named living author, illustrator, artist, or brand voice
- continue or extend an existing book series, film franchise, game universe, or copyrighted character world
- recreate recognizable characters, covers, blurbs, packaging, or art direction from someone else's property
- reproduce or closely paraphrase copyrighted text, lyrics, scripts, books, articles, prompts, or product copy

Use AI to create new work from a clean brief instead.

## Safe Prompt Pattern

Ask for:

- audience
- age range or reading level
- tone
- pacing
- themes
- format
- length
- business goal or user outcome
- banned references

Example:

"Write an original children's adventure about a small dragon-like explorer on Mars for ages 6 to 8. Make it funny, optimistic, and easy to read aloud. Do not imitate any existing author, book series, character, or illustration style."

## Unsafe Prompt Pattern

Avoid prompts like:

- "Write a Coconut the Little Dragon story on Mars"
- "Make this sound like [living author]"
- "Create a cover in the style of [named illustrator]"
- "Give me a new chapter of [copyrighted series]"

## Team Rules

- Build from original briefs, not borrowed franchises.
- Treat homage as risk, not a defense.
- Strip named creators, brands, and fictional universes out of prompts before generation.
- Require human editing before publishing externally.
- Keep a provenance log for important assets: date, tool, prompt, editor, and major revisions.
- Run a similarity check on high-stakes copy before publishing.
- If something feels derivative, do not ship it.

## Safe Fallback When Users Ask For Protected Material

Use this move:

1. decline the imitation or continuation request
2. identify the non-protected traits the user actually wants
3. offer an original alternative built from those traits

Example redirect:

"I can't write a new entry in that series or mimic that creator's style. I can write an original story that keeps the sense of wonder, humor, and young-reader pacing you want."

## Publishing Checklist

- No named living creator style references
- No copyrighted characters or franchise continuations
- No copied or near-copied passages
- No recognizable art direction tied to a protected property
- Human review completed
- Provenance noted for important deliverables

## Where To Apply This

- system prompts
- agent templates
- marketing copy generation
- story or lesson generation
- cover/image briefing
- contractor prompt handoffs