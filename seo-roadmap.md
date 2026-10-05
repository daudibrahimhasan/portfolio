# Portfolio SEO audit and roadmap

Audit date: 5 October 2026. Source: D:\demo-port-web\site2.0. Public site: https://daudibrahimhasan.pages.dev/.

Audience split: AI engineering clients and engineering/research opportunities equally. The 2025 roadmap has been checked against current official guidance. No design, CSS, theme, animation, project data or visible portfolio copy has been changed in this pass.

## What is measured and what is not

The live HTTP audit and local source checks cover the homepage, engineering page, research page, robots, sitemap, the Kiwi route and one deliberately nonexistent URL. This is not a complete external-link crawl or an index-coverage report. Evidence is stored outside the public root in `D:\demo-port-web\cleanup-review\seo-audit-baseline.json`.

No Search Console property/export was supplied. No keyword-volume, CPC, keyword-difficulty or backlink provider was connected. No conversion analytics or field Core Web Vitals were available. Those numbers are unknown, not zero. Competitor candidates are selected for topic and audience overlap; they are not a measured ranking of the market. No outreach has been sent. No production deployment has been made by this audit.

## 1. Technical audit, in priority order

| Priority | Finding | Evidence | Action/status |
|---|---|---|---|
| High | Nonexistent URLs return homepage HTML with status 200 | `/seo-audit-missing-page-20261005` returned 200 and canonical `/` | Added top-level 404.html and explicit Kiwi rewrites locally. Verify actual 404 on Cloudflare after deployment. |
| High | Project case studies are application states rather than independent crawlable pages | Internal cards use openCase; no dedicated project URLs in sitemap | Recommend static, deep-linkable case routes. Not implemented because changing navigation/routing deserves separate approval and interaction testing. |
| High | No search-performance baseline | User has no GSC export/property | Set up URL-prefix property, submit sitemap and inspect the three main URLs. |
| Medium | Demo/support HTML can be indexed separately | Retained runtime component and logo-review HTML are public assets | Added exact noindex header rules without deleting files or blocking their runtime use. |
| Medium | Same preview image on both audience pages | Both used triONDA image | Engineering now uses SupportGuard; research uses supplied report cover. Metadata only. |
| Medium | Potential media/performance overhead | Referenced files include 7.71 MB movie WebP and 2.10 MB group PNG | Measure actual requested media and LCP before optimizing. A file reference does not prove it loads on initial view. No asset re-encoding or lazy-loading changes made. |
| Low | Large source documents | Decoded HTML: home 322,645; engineering 360,002; research 372,228 bytes | Consider shared data/build generation later. Do not replace the custom runtime just for SEO. |

All three main pages returned 200, have unique titles and correct self-canonicals. Robots and sitemap returned 200. Literal local asset references in all three pages resolve. This is a useful baseline, not proof that every interactive state or outbound link is error-free.

Single-request header timings: home 239 ms, engineering 79 ms, research 79 ms. These are network samples from this environment, not Googlebot timings, page-load times or Core Web Vitals. No slow-load verdict is justified yet. Run PageSpeed Insights on all three main URLs on mobile and desktop, then collect field data when available. Prioritize LCP media, main-thread execution and layout shifts only where those reports show a problem.

Cloudflare's revalidation cache headers are normal; keep them. Unhashed filenames should not be given immutable caching. [Cloudflare serving behavior](https://developers.cloudflare.com/pages/configuration/serving-pages/) explains both its SPA fallback and cache defaults.

## 2. Competitive intelligence

| Candidate | Why compare | Useful pattern | Evidence |
|---|---|---|---|
| Winder.AI | Commercial AI-agent engineering benchmark; larger enterprise scope than yours | Specific service hub linked to use cases and case studies | [AI agent development](https://winder.ai/services/ai-agent-development/) |
| Dhairya Senjaliya | Individual consultant targeting RAG buyers | Explain project scope, failure modes, evaluation and a clear scoping call; public claims need evidence | [RAG consulting](https://dhairyasenjaliya.com/services/rag-consulting) |
| Neel Nanda | Research communication benchmark, not a like-for-like business competitor | Connect research explanations to papers, tools and usable research resources | [Personal site](https://www.neelnanda.io/) |

Do not copy another person's seniority, prices, affiliations, client outcomes or claims. Your engineering page can explain your actual workflow; your research page can show methods, contributions, limitations and artifacts.

Monitoring plan: weekly public-page checks for new service pages, case studies, research artifacts and visible referring-page mentions. A web-search result is not a reliable rank tracker. Numerical rankings require a fixed country, device, search engine, query set and provider. Backlink monitoring requires dated exports from a backlink index; public web searches alone cannot recover a complete backlink profile.

Enabled in this chat: Portfolio SEO watch, every Monday at 09:00 local time. It is read-only and reports meaningful changes, regressions or required user actions. It does not deploy, publish, contact people or pretend to have unavailable ranking/backlink data.

Suggested tracking fields: date, domain, URL, topic, observed change, source URL, query, country/device, rank/provider if available, new referring domain/provider if available, relevant action. Use English Bangladesh and English global buyer searches as separate views, not one blended rank number.

## 3. Keyword optimization

These are intent-based candidates, not verified low-difficulty/high-CPC keywords. CPC, KD, volume and conversion rate remain UNKNOWN for every row. Commercial intent is an inference from query wording, not measured conversion potential.

| Cluster/query | Audience | Current destination | Future page, only after route approval |
|---|---|---|---|
| AI agent developer Bangladesh | Client/hiring | /engineer/ | Keep engineering hub as owner |
| RAG evaluation consulting | Client | /engineer/ | /engineer/services/rag-evaluation/ |
| customer support AI with human escalation | Client | /engineer/ | /engineer/projects/supportguard/ |
| invoice approval AI agent | Client | /engineer/ | /engineer/projects/docops-approval-agent/ |
| MCP developer tools | Engineering | /engineer/ | /engineer/projects/skeletree/ |
| offline Quran recitation identification | Product/engineering | /engineer/ | /engineer/projects/ayah-ai/ |
| World Cup machine learning match predictor | ML portfolio | /engineer/ | /engineer/projects/trionda/ |
| AI safety research engineer | Research/hiring | /researcher/ | Keep research hub as owner |
| machine unlearning evaluation | Research | /researcher/ | Dedicated research page when supplied material supports it |
| LLM self-report fidelity structured provenance | Research | /researcher/ | Dedicated paper page with verified authors, status and artifacts |
| Daud Ibrahim Hassan / Daud Ibrahim Hasan | Branded | / | Same person; do not create competing spelling pages |
| Nexasity AI | Branded commercial | /engineer/ | Keep company relationship factual |

First validate commercial candidates in Keyword Planner for the intended markets and record date, currency, volume ranges and bid ranges. Keyword Planner bids are not organic difficulty. Use a keyword tool for KD and inspect the actual SERPs separately. Start with queries matched to real project evidence, not unrelated high-CPC terms. Research topics should be evaluated for useful readers and collaboration, not CPC.

## 4. Content and E-E-A-T

The existing work has specific project names and technical scope. Preserve that. The missing layer is inspectable evidence, not more marketing language. For each case study add, only when available: problem, your exact contribution, architecture, an actual failure you investigated, evaluation protocol, results with date and denominator, limitations, and code/demo/artifact links. Distinguish personal builds, deployed client work, collaborative research and work in progress.

Keep papers' publication status explicit. A sprint report or preprint must not become a peer-reviewed publication through editing. Mark unverified authors and missing links as pending. For any headline metric, record its source, time window, measurement method and your contribution. Do not generate testimonials or fill evidence gaps with confident prose.

Proposed engineering copy, based on supplied facts: “I build AI agents, RAG systems and approval workflows through Nexasity AI. SupportGuard uses an approved knowledge base, citations and human escalation. DocOps separates extraction from deterministic policy checks. I care about what happens when the model is uncertain, not just whether the demo works.”

Proposed research copy, based on supplied facts: “I work on empirical AI safety questions, including evaluation, self-report fidelity and monitor reliability. For each project I want to make the method, my contribution and the limits of the result clear.”

These are drafts, not edits to visible page copy. Add concrete examples in your own words after verifying the underlying artifacts. Google's [people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) prioritizes useful content and evidence of experience; merely changing AI-written wording is not a substitute.

## 5. Backlinks and outreach

One verified referring-page example: the [Alignment Forum AXRP interview](https://www.alignmentforum.org/s/2owK4Wra9acMaDyBo/p/r2yTwkGt3kbQG2mXi) links to Neel Nanda's site and research resources. This demonstrates the pattern of linking useful original work. It does NOT establish a whole-domain backlink gap against your site. A complete “links to competitors but not me” list remains blocked on backlink exports.

Targets to qualify: Alignment Forum/LessWrong for substantial original research discussion; MLOps Community for a hands-on evaluation/workflow contribution; official research-program contributor pages for work you actually contributed to. The latter two are relevance candidates, not verified competitor backlink gaps. Editorial inclusion is earned and never guaranteed. Check submission rules, evidence and audience fit first; do not buy links or ask for unrelated keyword anchors.

Draft 1, MLOps Community contact channel, not sent:

Subject: A practical session on human review in AI support workflows

Hi MLOps Community team,

I'm Daud, an AI systems engineer building through Nexasity AI. I built SupportGuard around an approved knowledge base, citations and human escalation.

I think a useful session would be about the actual boundary between model output and human review: what the system can answer, what it should escalate, and how to test that behavior. I can prepare a walkthrough with the implementation and its limits, rather than just a demo.

Would this fit your contributor format? My engineering work is here: https://daudibrahimhasan.pages.dev/engineer/.

Daud

Draft 2, research-program/editor contact channel, not sent:

Subject: Contributor page and artifacts for our self-report fidelity research

Hi [program/editor name],

I'm Daud Ibrahim Hassan, a co-author of “When the Record and the Report Diverge: Self-Report Fidelity Collapses Under Structured Provenance in Claude Haiku 4.5.”

I'm putting the research context and my contribution together on my portfolio. If you maintain a contributor or project page for this work, could you check whether my name and portfolio link are included correctly?

My research page is https://daudibrahimhasan.pages.dev/researcher/. I can send the verified project artifacts and author details before anything is added.

Thanks,
Daud

Only send draft 2 to the actual organization responsible for that project, after checking the final title and authors. No recipient addresses have been invented.

## 6. Brand distribution, equal audience split

Use Daud Ibrahim Hassan consistently as display name and Nexasity AI for the engineering work. Keep the Hasan spelling as an alternate identity, not a second brand. Use accurate links to both portfolio paths on GitHub and LinkedIn.

Four-week plan: week 1 engineering breakdown of SupportGuard's escalation boundary; week 2 research note explaining one method and limitation from a verified paper; week 3 DocOps walkthrough showing where deterministic checks replace model judgment; week 4 research replication/evaluation note with reproducible artifacts. Each week: one substantive LinkedIn post, one short follow-up explaining a real failure or tradeoff, and one relevant repository/artifact update. Reuse evidence, not identical promotional text everywhere.

Email: optional monthly opt-in update with two engineering items and two research items, clear unsubscribe and links. SMS: only consented meeting reminders or specifically requested updates; do not collect phone numbers or start promotional texts as an SEO tactic. There is no reason to add an SMS popup to this design.

Use UTM tags on distributed links to separate channels. Measure qualified inquiries, meeting requests, research conversations and branded-query impressions once tools exist. Do not claim distribution directly causes rankings or manufacture brand searches. No posts, messages, emails, trackers or signup UI were added.

## 7. Search Console and content refresh

No declining pages can be identified yet. First create a URL-prefix property for https://daudibrahimhasan.pages.dev/ and verify it with Google's provided HTML file or meta tag. Use the exact token Google supplies; none has been fabricated. Submit https://daudibrahimhasan.pages.dev/sitemap.xml. Inspect /, /engineer/ and /researcher/ after deployment. Record indexing exclusions and selected canonical URLs.

Export Performance by page/query, country and device after enough data accumulates. Where historical data is available, compare the last 28 complete days with the preceding 28 days and the same period last year. Start with pages that previously had meaningful clicks; do not call a change from one click to zero a robust trend. See Google's [Performance report guidance](https://support.google.com/webmasters/answer/7576553).

Diagnostic rule: impressions down with stable position may indicate demand change; position down suggests competition/content/indexing investigation; stable impressions with CTR down suggests snippet/SERP changes; stable clicks with fewer inquiries suggests conversion issues. These are hypotheses, not automatic diagnoses. Refresh only what needs correction: dead artifacts, outdated model versions, method details, current limitations and verified metrics. Don't change dates just to look fresh. Log before/after content and compare again after 4-8 weeks, controlling for query/device mix where possible.

## 8. Architecture and cannibalization

Current hierarchy is already useful: / is the identity/audience chooser; /engineer/ owns AI systems and commercial delivery; /researcher/ owns empirical safety research. Keep self-canonicals and these URLs. The sitemap should contain only real indexable URLs, not application-only states, Kiwi or demo assets.

Future hierarchy: /engineer/projects/{public-project-slug}/ and /researcher/papers/{paper-slug}/. Do not rename the legacy internal IDs: SupportGuard's cam-cabinet slot, DocOps's saveside slot and triONDA's cookbookly slot are coupled to working interactions. Map public slugs to those IDs instead. Preserve card design, internal previous/next controls and Kiwi behavior.

Each future page needs real static/rendered content, a unique title and description, self-canonical, ordinary crawlable links, and an update to the sitemap. A redirect to the hub is not an independently indexable case study. Google [normally discovers links through anchors with href](https://developers.google.com/search/docs/crawling-indexing/links-crawlable); button-only state navigation is a discovery constraint.

Cannibalization is not proven without query-level data. Assign one primary intent to each page before creating it. Link overlapping topics to the owner page. Do not create multiple near-identical RAG service pages, keyword spelling variants or duplicate project copies. Shared branding between the two hubs is normal and not itself cannibalization.

## Release and verification

Local branch: seo-audit-2026-10-05. Backup branch: backup-before-seo-2026-10-05. Deploy only after user approval. Local server checks cannot validate Cloudflare-specific _headers/_redirects processing. After deployment verify an invented path returns 404; /kiwi and /kiwi/ still open the Easter egg; header rules apply; all main pages remain 200; preview deployments stay noindex.

The regular portfolio pages' body markup, styles and application scripts should match HEAD exactly. The only HTML metadata edits are four social-preview tags on each audience page. 404.html is a new error response and does not change existing portfolio screens. Check links, images and console after release.
