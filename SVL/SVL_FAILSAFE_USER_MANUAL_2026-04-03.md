# SVL Failsafe User Manual

Timestamp: 2026-04-03
Scope: SVL-KPA daily operations, releases, Search Atlas execution, and emergency recovery

## 1. Mission Lock

SVL standard is KPA: Keep People Alive.

Every action must pass this test:
1. Does it protect people?
2. Does it reduce harm?
3. Does it support health, family, or community stability?
4. Is the tone calm, human, and purposeful?

If any answer is no, do not ship.

## 2. Daily Operator Routine (15 Minutes)

1. Open Search Atlas and review:
- technical issues (critical/high)
- ranking movement
- tracked keyword health

2. Open repo status:
- `git status -sb`
- `git branch --show-current`

3. Confirm production branch state:
- `git log --oneline origin/main -n 3`

4. Confirm KPA standards before edits:
- mission visible in user-facing copy
- no reckless language
- voice behaviors remain natural

## 3. Weekly Execution Rhythm

Monday:
1. Clear all critical/high technical SEO issues.
2. Confirm indexability and crawl health.
3. Update scorecard metrics.

Wednesday:
1. Publish or refresh at least 2 mission-aligned pages.
2. Improve internal links from hub pages.
3. Validate metadata on updated pages.

Friday:
1. Run outreach/backlink sprint.
2. Review conversion pages and CTA clarity.
3. Save weekly report in SVL folder.

## 4. Failsafe Release Procedure

Use this exactly for every release.

1. Preflight checks:
- `git status -sb`
- ensure only intended files changed
- run diagnostics on edited files

2. Standards checks:
- KPA mission language present
- voice quality is human and purposeful
- mobile layout still functional

3. Commit and push:
- `git add <files>`
- `git commit -m "<clear purpose message>"`
- `git push origin <branch>`

4. Main promotion (safe path):
- create or use a clean main-based integration branch
- cherry-pick approved commits
- push integration branch
- push integration branch to main

5. Post-release verification:
- confirm remote heads
- verify target links load
- verify expected content appears

## 5. Emergency Recovery Procedures

### A) Merge Conflict Explosion

1. Stop changes and inspect:
- `git status -sb`

2. Abort merge safely:
- `git merge --abort`

3. If branch switching is blocked by filesystem locks:
- use a separate worktree from `origin/main`
- replay only approved commits

4. Re-verify before pushing main.

### B) Accidental File Deletions

1. Restore tracked files:
- `git restore --worktree --staged .`

2. If filesystem still missing tracked files:
- `git checkout-index -f -a`

3. Re-check:
- `git status -sb`

### C) Wrong Branch Pushed

1. Do not force push immediately.
2. Identify correct commit hashes.
3. Build corrected integration branch from `origin/main`.
4. Cherry-pick approved commits only.
5. Push corrected branch and promote to main.

## 6. Search Atlas Failsafe Use

1. Always operate from a keyword cluster map.
2. Prioritize technical blockers before content writing.
3. Track every weekly output in scorecard.
4. Tie each SEO task to a KPA-aligned outcome.

Minimum weekly deliverables:
1. Critical issues resolved: target 0
2. Pages improved or published: target 3+
3. Ranking improvements on priority terms: target positive week-over-week
4. Organic conversion movement: target positive trend

## 7. Voice and UX Standards (Non-Negotiable)

1. Voice output must avoid robotic/default fallback behavior when possible.
2. Include user controls for audio where audio exists:
- mute toggle
- replay briefing

3. Copy standards:
- direct
- calm
- intentional
- no panic language

## 8. Custom Domain and Production Truth

Production truth is the commit on `origin/main`.

Before saying "live":
1. confirm commit hash exists on `origin/main`
2. verify target URL loads expected update
3. document verification timestamp

## 9. Required SVL Artifacts Per Sprint

For each sprint, create or update:
1. progress log file in `SVL/`
2. scorecard values in CSV
3. one standards note on what improved and what risk remains

## 10. Weekly Report Template

Use this exact structure:

Date:
Owner:
Branch:
Main Commit:

Completed:
1.
2.
3.

KPA Compliance:
1. Mission language present: Yes/No
2. Voice standards pass: Yes/No
3. Safety and calm tone pass: Yes/No

SEO Metrics:
1. Critical issues:
2. Pages updated:
3. Ranking movement:
4. Organic conversion trend:

Risks:
1.
2.

Next Actions:
1.
2.
3.

## 11. Operator Rule

Fast is good.
Safe is required.
Mission-first is mandatory.

If speed and standards conflict, standards win.
