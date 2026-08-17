# QuickTools GSC Discovered-Not-Indexed Export Audit

Date: August 17, 2026  
Source: `C:\Users\jain\Downloads\https___quicktool.space_-Coverage-Drilldown-2026-08-17.zip`

## Confirmed report

The downloaded Google Search Console export is for:

- Sitemap scope: `All known pages`
- Issue: `Discovered - currently not indexed`
- Exported URLs: **611**
- URLs with `Last crawled = 1970-01-01`: **611**

In this export, the `1970-01-01` value is the empty/default crawl date. It means Google knows these URLs but has not recorded a crawl for them in this report.

## URL breakdown

| URL family | Count | Share |
|---|---:|---:|
| Prompts | 326 | 53.4% |
| Tools | 111 | 18.2% |
| Learn lessons | 89 | 14.6% |
| News | 41 | 6.7% |
| Blog | 25 | 4.1% |
| Articles | 17 | 2.8% |
| Community | 1 | 0.2% |
| Author | 1 | 0.2% |
| **Total** | **611** | **100%** |

Prompts, Tools, and Learn together account for **526 of 611 URLs (86.1%)**. Therefore, daily Blog, Article, and News publishing is not the primary pattern in this report.

## Prompt breakdown

| Prompt URL type | Count |
|---|---:|
| Prompt detail pages | 308 |
| Category pages | 10 |
| Model pages | 4 |
| Models hub | 1 |
| Generator | 1 |
| All-prompts page | 1 |
| Prompts hub | 1 |
| **Total** | **326** |

## Learn breakdown

All **89 Learn URLs** in this export are lesson-level URLs. The Learn hub/course hubs are not the pattern represented in this 611-URL export.

## Host and duplicate checks

- All 611 URLs use the canonical host `quicktool.space`.
- No `www.quicktool.space` duplicates are present in this export.
- No duplicate paths were found in the exported table.

## Timeline clue

The chart increased from **187 affected pages on August 10** to **611 on August 11**. This large one-day increase strongly suggests Google discovered a much larger sitemap/internal-link inventory at once. It does not prove a penalty.

## Interpretation

The immediate problem is crawl prioritization and perceived page value across large programmatic URL families, especially:

1. 308 Prompt detail pages.
2. All 111 Tool pages.
3. 89 Learn lesson pages.

The current future-generation safeguards improve new Prompt/Learn content but do not rewrite existing MongoDB records. Existing records still require a read-only content-quality audit before any migration.

## Safe next actions

1. Run a read-only MongoDB audit of all published Prompt and Learn records.
2. Group existing records by thin content, repeated/generic copy, duplicate intent, missing internal links, and weak metadata.
3. Sample priority Tool URLs and verify HTTP 200, canonical, rendered content depth, schema, and contextual inbound links.
4. Prepare a non-destructive migration only for records confirmed weak by the audit.
5. Keep daily 1 Blog + 1 Article + 1 News publishing enabled, subject to existing quality gates.
6. After deployment, inspect representative URLs in Search Console and monitor whether the 611 count decreases over several weeks.

## Final conclusion

The downloaded report confirms the 611 URLs exactly. The strongest common pattern is not editorial frequency: **86.1% of affected URLs are Prompt, Tool, or Learn pages**. The next justified step is a read-only live-data quality audit, followed by targeted improvement of confirmed weak records rather than bulk deletion or another broad sitemap change.
