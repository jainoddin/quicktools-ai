# QuickTools Prompt and Learn Indexing Quality Remediation

Date: August 17, 2026  
Scope: Prompt duplicate-intent protection and future Learn lesson-content quality.

## Why this work was done

The production sitemap exposes hundreds of Prompt and Learn URLs. Google Search Console has reported many URLs as `Discovered - currently not indexed`. The sitemap and routes are broadly valid, so the next code-level priority was reducing repetitive prompt intent and improving generic Learn fallback content.

The daily editorial schedule was intentionally preserved. This change does not disable or alter the existing daily Blog, Article, or News publishing schedule.

## Changes completed

### 1. Stronger prompt duplicate-intent detection

File: `backend/src/services/promptGenerator.ts`

Before:

- Semantic duplicate detection used broad word-overlap similarity.
- Its default threshold was `0.90`.
- Paraphrased titles could target the same search intent while using enough different words to pass the check.
- A dead `jaccardSimilarity` function returned `0` and was not used.

After:

- Removed the unused similarity function.
- Added intent-focused token extraction.
- Common template words such as `guide`, `prompt`, `generator`, `best`, `create`, `tool`, and year values are ignored when comparing intent.
- Duplicate detection now combines:
  - Full title-and-description similarity.
  - Title similarity.
  - Meaningful shared title terms and intent overlap.
- Added exported `isLikelyDuplicateIntent(...)` logic so the behavior is directly testable.
- The default semantic threshold is now `0.78`.

Expected result:

- Obvious exact duplicates remain rejected.
- Closely paraphrased prompts targeting the same user goal are more likely to be rejected.
- Prompts in the same category can still publish when they solve genuinely different tasks.

### 2. Prompt scheduler quality gate aligned

File: `backend/src/cron/promptScheduler.ts`

Before:

- The scheduler passed a `0.90` semantic-similarity threshold.

After:

- The scheduler uses `0.78` to match the improved intent detector.
- A source comment documents why paraphrased duplicate intent must be rejected before publication.

Unchanged:

- Prompt target volume.
- Prompt quality-score threshold.
- Blog schedule.
- Article schedule.
- News schedule.
- Existing publish routes and APIs.

### 3. Learn fallback lesson content improved

File: `backend/src/scripts/lesson-content.ts`

Before:

- Unrecognized lesson types received generic text about mastering advanced concepts.
- The same generic takeaways were reused, such as experimenting with settings and staying updated.

After:

- Fallback content derives a lesson-specific focus from the lesson title.
- It explains the lesson in the context of its actual course/tool.
- It adds a practical step-by-step workflow.
- It adds a quality checklist covering relevance, factual verification, sensitive information, and audience editing.
- It adds clear verification guidance instead of unsupported outcome claims.

Expected result:

- Future fallback lesson pages contain more useful and differentiated server-stored content.
- Generic repeated paragraphs are reduced.
- Users receive actionable guidance even when a lesson does not have a custom content branch.

### 4. Learn seed excerpts made lesson-specific

File: `backend/src/scripts/seedLearnDev.ts`

Before:

- Seeded lessons used the generic excerpt: `Learn about [lesson] in this comprehensive lesson.`

After:

- Excerpts incorporate the course, module, lesson, workflow, decisions, and practical checks.

Safety note:

- The seed script was modified but was **not executed**.
- Existing production Learn data was not deleted, overwritten, or migrated.
- The script contains destructive reseeding behavior, so it must not be run against production without a reviewed migration and backup.

### 5. Regression tests added

File: `backend/tests/prompt-intent.test.js`

Coverage added:

- Confirms that two paraphrased thought-leadership prompts targeting the same intent are rejected.
- Confirms that two prompts in the same broad category but with different real purposes are allowed.

## Verification completed

| Check | Result |
|---|---|
| Backend TypeScript build | PASS |
| Backend Node tests | PASS — 4 tests, 0 failures |
| New duplicate-intent tests | PASS — 2 tests |
| Prompt SEO validator | PASS |
| Tool SEO coverage validator | PASS — 111/111 routes |
| Git whitespace/error check | PASS |

## Files intentionally not changed

- `backend/scripts/force_news.ts` was not edited or executed.
- Frontend UI and routes were not changed.
- Blog, Article, and News scheduling was not changed.
- Existing production Prompt/Learn database records were not bulk-modified.
- The production sitemap structure was not changed by this remediation.

## Remaining live-data work

These code changes improve future generation and seeding, but they do not automatically rewrite weak pages already stored in MongoDB.

Recommended next checks:

1. Export 10–20 Prompt URLs and 10–20 Learn URLs from the Search Console `Discovered - currently not indexed` examples.
2. Check each sample for HTTP status, canonical, sitemap presence, internal links, content depth, and duplicate search intent.
3. Run a read-only MongoDB quality audit to identify existing generic excerpts, short lessons, duplicate prompt intent, and thin published records.
4. Prepare a separate non-destructive migration for confirmed weak records.
5. Deploy this code before expecting future generated content to use the new rules.
6. Monitor indexing and crawl behavior over the following weeks; indexing remains a Google decision.

## Final status

The code-level Prompt duplicate-intent gate and future Learn fallback quality are improved and verified locally. Daily Blog, Article, and News publishing remains unchanged. Existing production Learn/Prompt records still require a separate live-data audit before claiming that every previously published page has been improved.
