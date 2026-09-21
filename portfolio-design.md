# Portfolio Design and Extension Guide

This is the operating manual for AI agents working on this portfolio. Read this file before changing `index.html`, adding a project, changing navigation, adding a page, or touching the visual system.

The goal is not to redesign the portfolio. The goal is to extend the existing site without breaking its visual language, runtime, interactions, responsive behavior, or project data.

## 1. Non-negotiable rules

1. **Treat the current rendered site as the source of truth.** Preserve its layout, copy style, motion, spacing, colors, typography, and playful interactions unless the user explicitly asks for a redesign.
2. **Do not edit anything inside `ref/`.** It is the untouched archive used for comparison and recovery. All working changes belong in the `site2.0` root.
3. **Do not convert the site to React, Next.js, Vite, Tailwind, or another framework unless the user explicitly asks.** The current site already uses React internally through the Design Component runtime in `support.js`.
4. **Do not replace `support.js`, `image-slot.js`, `kiwi-piece.jsx`, or `kiwi-stats.js` with simplified versions.** They contain real behavior used across the site.
5. **Do not open `index.html` directly with `file://`.** Run `npm start` and use `http://127.0.0.1:4173`. Component imports, modules, audio, and nested assets require an HTTP server.
6. **Never invent project facts, metrics, roles, links, outcomes, dates, or research findings.** Use only content supplied by the user.
7. **A project is not complete because its card appears.** Verify its card, click behavior, case-study path or external link, previous/next navigation, mobile layout, assets, and console.
8. **Preserve accessibility behavior.** Interactive elements need keyboard activation, visible focus, accurate labels, and reduced-motion support.
9. **Preserve the current brand.** New sections should look like they have always belonged here.

## 2. How this site works

The site is a single-page Design Component application.

- `index.html` contains the visual template, state, project data, case-study data, navigation methods, responsive values, and theme values.
- `support.js` parses `<x-dc>`, `<sc-if>`, `<sc-for>`, interpolations such as `{{ value }}`, and the logic inside `<script data-dc-script>`.
- `kiwi-piece.jsx` contains the Kiwi character, food picker, sleep control, and related interactions.
- `kiwi-stats.js` stores local exploration and achievement state.
- `image-slot.js` supports editable image slots. A missing `.image-slots.state.json` file is allowed; the component falls back to its declared `src`.
- `SavesideTile.dc.html` is a retained legacy component. The current Daud portfolio does not render it, but keep the file unless the user explicitly approves cleanup.
- `assets/` contains project images, icons, audio, and embedded HTML experiences.
- `uploads/perfectly-nineties-regular.otf` is the local display font.
- `server.mjs` is the dependency-free local server.

Do not write normal JSX directly into the `<x-dc>` template. Follow the existing runtime syntax and patterns already present in `index.html`.

## 3. Creative north star

**An AI systems engineer's working notebook inside a tiny night-sky world.**

The portfolio balances AI engineering, research evidence, and practical software projects with personal, tactile details. The work stays readable and structured, while small rotations, paper-like cards, stars, Kiwi interactions, tooltips, stamps, sound, and hidden discoveries stop it from feeling like a corporate template.

The personality is curious, direct, technically intentional, and slightly playful. It is not luxury minimalism, a generic SaaS landing page, a neon developer portfolio, or a dense agency showcase.

Key characteristics:

- Editorial serif headings paired with a clean sans-serif body.
- Deep navy typography on soft white surfaces.
- A blue-purple-pink starfield navigation rail.
- Warm yellow for active, celebratory, and primary-action moments.
- Soft blue for highlighted ideas and explanatory surfaces.
- Paper cards with thin borders, gentle rotations, and tactile hover movement.
- Small monospace labels for metadata, tags, captions, and system-like details.
- Playfulness supports the work; it never hides the project evidence.

## 4. Color system

Use the values already defined inside `renderVals()` in `index.html`. Do not create a second theme object.

### Light mode

| Role | Value | Usage |
|---|---:|---|
| Page background | `#f8f8f8` | Default page canvas |
| Main text | `#26262e` | General text |
| Primary heading | `#001666` | Large headings and primary links |
| Alternate heading | `#1c1c24` | Card and secondary headings |
| Body text | `#3a3a44` | Paragraphs |
| Muted text | `#6d6d78` | Metadata and supporting copy |
| Surface | `#ffffff` | Cards and elevated content |
| Warm surface | `#fffdf8` | Soft editorial surfaces |
| Warm band | `#fbeec6` | Feature bands and warm emphasis |
| Soft blue | `#cadcfc` | Selected words, active tabs, hover states |
| Active yellow | `#fff6d9` | Expanded navigation cards |
| Action yellow | `#FFCF3A` | Primary buttons and celebration |
| Chip background | `#f4f1ea` | Tags and draggable skill chips |
| Fine border | `rgba(0,22,102,0.1)` | Default card borders |
| Medium border | `rgba(0,22,102,0.12)` | Chips and stronger dividers |

### Navigation gradient

Use the existing vertical gradient exactly:

```css
linear-gradient(180deg, #5D7CE0 0%, #9B6FDB 45%, #F4A0C4 100%)
```

### Kiwi dark mode

Dark mode is tied to `s.view === 'kiwi'`. Do not add a separate global dark-mode toggle without explicit approval. Use the dark values already in `renderVals()`.

### Color rules

**The Navy Voice Rule.** Main editorial headings use deep navy, not black.

**The Yellow Rarity Rule.** Yellow marks actions, active navigation, achievements, and small moments of delight. Do not turn it into a large background color across ordinary sections.

**The One Gradient Rule.** The blue-purple-pink gradient belongs to the navigation and welcome world. Do not introduce unrelated gradients into project cards.

## 5. Typography

### Families

- **Display and editorial headings:** `Perfectly Nineties`, then `serif`.
- **Body and UI:** `Figtree`, then `system-ui`, then `sans-serif`.
- **Metadata and labels:** `ui-monospace`, `SFMono-Regular`, `Menlo`, `Consolas`, `monospace`.

### Existing hierarchy

- Hero display: `60px` desktop, `46px` mobile, weight `400`, line-height around `1.12`.
- Page heading: normally `42px` to `48px`, Perfectly Nineties, weight `400`.
- Section heading: normally `36px` to `44px`, Perfectly Nineties, weight `400`.
- Card heading: `22px`, Perfectly Nineties, weight `400`, `0.5px` tracking.
- Lead/body copy: `16px` to `17px`, line-height `1.6` to `1.7`.
- Card copy: `13px` to `14px`, line-height `1.5` to `1.6`.
- Metadata: `11px` to `12px`, monospace, usually uppercase with `0.5px` or wider tracking.

### Typography rules

**The Serif-for-Story Rule.** Use Perfectly Nineties for identity, page titles, section titles, project titles, and narrative moments. Do not use it for long paragraphs or control labels.

**The Mono-for-Metadata Rule.** Tags, dates, small captions, system labels, counters, and hints use monospace. Do not use monospace for primary body copy.

**The Readable Measure Rule.** Long paragraphs should normally stay between `46ch` and `65ch`. Do not stretch case-study prose across the whole viewport.

## 6. Layout and responsive behavior

### Desktop

- Desktop begins above `860px`.
- The fixed navigation rail sits `16px` from the top, left, and bottom.
- Navigation width is `250px`.
- Normal page content uses `298px` left margin to clear the rail.
- Case-study and Kiwi views hide the normal rail and use the full viewport.
- Content containers use centered maximum widths. Existing pages use widths such as `760px`, `900px`, `980px`, and `1200px` based on content density.
- Project grids use two columns. Even cards appear in the left column, odd cards in the right.

### Mobile

- Mobile is `window.innerWidth <= 860`.
- The main content margin becomes `0`.
- Page horizontal padding becomes `16px`.
- The navigation becomes an off-canvas drawer with width `min(80%, 330px)`.
- The menu button is fixed at the top-right and is `46px × 46px`.
- Project grids become one column.
- Multi-column sections such as Learn More collapse to one column.
- Do not hide project content on mobile to make the layout easier. Reflow it.

### Spacing rhythm

The site mostly uses an 8px-derived rhythm: `8`, `12`, `16`, `24`, `32`, `40`, `48`, `56`, `64`, `80`, `96`, and `120px`.

Use small values inside components and larger values between narrative sections. Do not add arbitrary gaps such as `37px` unless matching an existing, measured composition.

## 7. Shapes, borders, and depth

- Main project cards: `16px` radius, `1px` fine navy-tinted border, white surface.
- Media inside cards: `8px` radius and `16:9` aspect ratio unless the existing section specifies something else.
- Navigation cards: `6px` radius.
- Primary buttons: `8px` radius.
- Tooltips and popovers: usually `10px` to `12px` radius on `#1c1c24`.
- Badges: pill-shaped only when they are genuinely small status/count indicators.

Cards are flat at rest. Hover provides depth through a small upward move, rotation settling to zero, and the existing neutral offset shadow:

```css
transform: translateY(-8px) rotate(0deg);
box-shadow: 6px 10px 0 rgba(0,0,0,0.05), 0 3px 6px rgba(0,0,0,0.05);
```

Do not add permanent heavy shadows, glassmorphism, blur panels, or glossy gradients.

## 8. Motion and interaction

- Default state transitions use `cubic-bezier(0.4, 0, 0.2, 1)`.
- Small UI transitions are normally `0.18s` to `0.35s`.
- Section and welcome transitions may run `0.5s` to `0.75s`.
- Small rotations are intentional. Project cards cycle through approximately `-1.6°`, `1.4°`, `-1.1°`, and `1.8°`, then straighten on hover.
- Media zooms subtly to `scale(1.05)` on hover.
- Playful bounce easing is reserved for physical-feeling pieces such as falling chips, Kiwi, stamps, or small props. Do not use bounce easing for ordinary page navigation.
- Every new animation must have a sensible `prefers-reduced-motion: reduce` state.
- Do not autoplay new audio. Audio must remain user-controlled and failure-tolerant.

## 9. Existing navigation and views

The normal navigation order and numbering are fixed:

1. Projects
2. About
3. What I bring
4. Playground
5. Contact

Current `view` values include:

- `home`
- `work`
- `playground`
- `about`
- `case`
- `kiwi`

Do not create a new view name without adding all required state, template conditionals, navigation behavior, mobile behavior, history behavior if needed, and visual QA.

Internal case studies use `openCase(slug)`. External projects use explicit handlers in `renderVals()`. The current external projects are:

- `cam-cabinet` is the internal slot used by SupportGuard and retains the old external URL until a real SupportGuard URL is supplied.
- `saveside` is the internal slot used by DocOps Approval Agent and retains the old external URL until a real DocOps URL is supplied.
- `cookbookly` is the legacy internal slot used by triONDA and opens `https://daudibrahimhasan.github.io/triONDA/`. MarkLens remains a separate item in the Papers section.

Do not add a slug to `externalCaseSlugs` unless it truly opens an external site. Do not create empty case data for an external-only project.

## 10. Adding a normal project card

Add one object to `state.projects` in `index.html`:

```js
{
  slug: 'project-slug',
  title: 'Project Name',
  blurb: 'One short, factual sentence describing the project or outcome.',
  comingSoon: false,
  thumbImg: './assets/project-slug-thumb.webp',
  coverImg: './assets/project-slug-cover.webp',
  tags: ['AI Agents', 'RAG']
}
```

Rules:

- `slug` must be lowercase kebab-case and unique.
- `title` must match the case-study title.
- `blurb` should normally fit within two short lines on desktop.
- `comingSoon: true` disables normal case navigation.
- `thumbImg` is the grid card image.
- `coverImg` is optional and is used by internal case-study presentation.
- Store local assets in `assets/` and use relative paths beginning with `./assets/`.
- Use WebP for screenshots and photographic project thumbnails when practical. Keep SVG for real vector marks and icons.
- A new project automatically affects the displayed project count.

To feature a project on the homepage, add the same slug to `featuredSlugs`. Keep exactly four featured projects unless the user asks to change the homepage composition.

If the project has a special role label, add it to `roleLabels` inside `renderVals()`. Otherwise the case subtitle becomes the fallback.

## 11. Adding an internal case study

An internal project needs both:

1. A project object in `state.projects`.
2. A matching object in `state.cases` using the exact same slug.

Start with the smallest honest schema:

```js
'project-slug': {
  title: 'Project Name',
  subtitle: 'Company or project type',
  tags: ['AI Systems', 'Research'],
  coverImg: './assets/project-slug-cover.webp',
  role: 'A factual description of the person’s role and ownership.',
  impact: 'A factual outcome. Do not invent metrics.',
  overview: 'A concise explanation of the product, problem, and context.',
  owned: [],
  objectives: [],
  constraints: [],
  researchInputs: [],
  kpis: [],
  colorSystem: [],
  observations: null,
  solution: [],
  solutionBreakdown: [],
  outcomes: [],
  reflection: '',
  reflectionExtra: [],
  reflectionStrengths: [],
  moreTime: []
}
```

Only include sections supported by real material. The template conditionally renders most optional arrays, so omit unsupported claims instead of filling them with generic text.

### Supported case-study fields

- `title`: case-study title.
- `subtitle`: organization or project context.
- `tags`: short metadata labels.
- `coverImg`: top image.
- `role`: ownership and responsibilities.
- `impact`: primary result or product effect.
- `overview`: product and problem context.
- `owned`: bullet list of responsibilities.
- `objectives`: objects shaped like `{ goal, question }`.
- `opportunity`: alternative to objectives in special case structures.
- `scopeReach`: scope or reach items.
- `constraints`: objects shaped like `{ label, response }`.
- `componentLibrary`: object shaped like `{ intro, tradeoffs }`.
- `researchInputs`: string list.
- `kpis`: objects shaped like `{ label, why, what: [], reason }`.
- `insightMap`: objects shaped like `{ insight, implication }`.
- `colorSystem`: existing case-specific color columns.
- `observations`: object with `heading`, `leftLabel`, `rightLabel`, `left`, and `right`.
- `solution`: tabbed solution objects. Existing objects use `title`, `copy`, `tradeoffs`, and `thinking`; optional label overrides are `listLabel` and `paragraphLabel`.
- `solutionBreakdown`: section objects with `section`, `rawImages`, optional `imageCount`, and `items`.
- `outcomes`: outcome groups with factual supporting items.
- `reflection`: primary reflection paragraph.
- `reflectionExtra`: extra reflection paragraphs.
- `reflectionStrengths`: short evidence-based strength labels.
- `moreTime`: future-work objects shaped like `{ title, copy }`.

### Case-study table of contents

The table of contents is generated automatically from available fields. Do not hardcode a separate TOC for each new case unless the entire case template changes.

The normal sequence is:

1. Overview
2. Objectives
3. Constraints & components, when present
4. Research & KPIs, when present
5. Color System, when present
6. Observations & Strategy, when present
7. Solution
8. Outcome & Reflection

Do not reuse the existing slug-specific exceptions for a new project. Those exceptions exist for specific legacy case structures. Prefer data-driven conditions for new work.

## 12. Adding an external project

For a project that should open a live site instead of an internal case:

1. Add its project object to `state.projects`.
2. Add an explicit opener beside the existing external project handlers.
3. Add the slug to `externalCaseSlugs`.
4. Map it in `withGo()`.
5. Use `window.open(url, '_blank', 'noopener')`.
6. Call `countExternalView(slug)` before opening so the Kiwi exploration system stays accurate.
7. Verify that previous/next internal case navigation excludes it.

Do not silently make every project external. Internal case studies are part of the portfolio’s main storytelling system.

## 13. Adding a Playground experiment

Playground items are defined in the `playgroundCards` array inside `renderVals()`.

Image-based example:

```js
{
  slug: 'experiment-slug',
  title: 'Experiment Name',
  tags: ['Side Quest'],
  blurb: 'A short explanation of what it is.',
  rotate: -0.4,
  img: 'assets/experiment-slug.webp',
  href: 'https://example.com/',
  hasHref: true,
  cta: 'Check it out →',
  note: 'A factual note about what was designed or built.'
}
```

Embed-based items use `embed: 'tile-name/index.html'`. The nested HTML and all of its assets must exist locally and must be verified independently.

Playground work can be more playful than case studies, but it must keep the same card, type, spacing, and hover grammar.

## 14. Image and asset rules

- Project thumbnails should use a `16:9` composition with the important UI safely inside the center area.
- Do not bake card padding, rounded corners, tags, or titles into thumbnail images. The page supplies those.
- Use descriptive kebab-case filenames such as `project-slug-thumb.webp` and `project-slug-cover.webp`.
- Reuse one source for thumbnail and cover only when the crop works in both contexts.
- Always provide meaningful `alt` text for informative images. Decorative images use `alt=""`.
- Do not hotlink project images when a local asset is available.
- Do not replace the custom Perfectly Nineties font.
- Do not modify the Kiwi artwork unless the user explicitly asks.

## 15. Component rules

### Project cards

- White surface, fine navy-tinted border, `16px` radius, `16px` padding.
- Media is `16:9` with `8px` radius.
- Card has a slight resting rotation and straightens while lifting on hover.
- Title uses Perfectly Nineties at `22px`.
- Tags are small uppercase monospace chips.
- Description stays short and muted.
- The role and CTA reveal should follow the existing card behavior.

### Buttons

- Primary action: yellow background, dark text, `8px` radius, `14px 26px` padding.
- Hover/active behavior uses the existing subtle shadow and scale response.
- Do not introduce giant pill CTAs.
- Do not remove visible focus treatment. The global focus ring is `2.5px solid #1749AD` with `3px` offset.

### Navigation cards

- White at rest, soft blue on hover, warm yellow on active/expanded state.
- Keep the numeric badges and current order.
- Expanded details are contextual previews, not full page content.

### Tags and chips

- Monospace, uppercase, `11px`, light warm-neutral background, thin border, `6px` radius.
- Keep labels short. Two or three tags is normally enough.

## 16. Copy rules

- Write directly and specifically.
- Use the project evidence to make the work impressive. Do not add promotional adjectives.
- Project blurbs should state what the thing is or what changed.
- Roles must distinguish leadership, sole ownership, collaboration, and contribution accurately.
- Metrics need a real source supplied by the user.
- Keep the current conversational personality. Small lines such as “things I made just to see if I could” fit. Corporate portfolio language does not.
- Do not change existing facts while “cleaning up” prose.

## 17. Accessibility requirements

Every new interactive element must have:

- A semantic element such as `<button>` or `<a>` when possible.
- Keyboard support for Enter and Space when a non-native `role="button"` pattern must be used.
- A useful accessible name.
- A visible focus state.
- Sufficient contrast in both the normal light view and Kiwi dark view when applicable.
- Reduced-motion behavior when it animates.
- No hover-only information required to understand or use the interface.

Do not copy the current duplicate `role` or `tabindex` attributes into new markup. Preserve existing behavior, but write new markup cleanly.

## 18. Safe editing workflow

Before editing:

1. Read this file.
2. Inspect the relevant template block and its corresponding state/render values.
3. Confirm whether the new item is an internal case study, external project, coming-soon card, or Playground experiment.
4. Inventory the supplied text, metrics, links, and assets. Stop rather than inventing missing facts.
5. Keep `ref/` untouched.

While editing:

1. Make the smallest change that fully supports the requested addition.
2. Reuse existing fields, arrays, layout values, and card patterns.
3. Keep slugs identical across project data, case data, navigation, role labels, and assets.
4. Preserve unrelated user changes.
5. Do not rewrite the whole 300KB `index.html` for a small data addition.

After editing:

1. Run `npm start`.
2. Load `http://127.0.0.1:4173` through HTTP.
3. Dismiss the welcome screen and verify the homepage.
4. Open Projects and verify the new card.
5. Activate the card with both pointer and keyboard.
6. For an internal case, verify every rendered section and previous/next navigation.
7. For an external project, verify the exact URL and `noopener` behavior.
8. Test above and below the `860px` breakpoint.
9. Check image loading, overflow, focus states, and reduced motion.
10. Check the browser console for new errors.
11. Confirm existing Kiwi, music, navigation, About, Playground, and Contact behavior still works.

## 19. Definition of done

A change is complete only when all applicable statements are true:

- [ ] The project/section uses the existing visual system.
- [ ] No facts, links, metrics, or roles were invented.
- [ ] The slug is unique and consistent everywhere.
- [ ] All local asset paths return successfully.
- [ ] The card appears in the intended list and, if requested, in `featuredSlugs`.
- [ ] The project count updates correctly.
- [ ] Internal/external/coming-soon behavior is correct.
- [ ] Case-study sections render only when supported by real content.
- [ ] Previous/next case navigation remains correct.
- [ ] Desktop layout works above `860px`.
- [ ] Mobile layout works at and below `860px`.
- [ ] Keyboard, focus, labels, and reduced-motion behavior are preserved.
- [ ] No new console errors appear.
- [ ] `ref/` remains unchanged.

## 20. Things an AI agent must not do

- Do not redesign the site while adding one project.
- Do not flatten the site into a screenshot or static image.
- Do not delete the welcome screen, Kiwi system, stars, music controls, or hidden interactions because they look nonessential.
- Do not replace the custom runtime with a partial approximation.
- Do not add new libraries for a change the current runtime already supports.
- Do not use placeholder lorem ipsum in finished work.
- Do not fabricate case-study process sections to make a project look complete.
- Do not make every card identical and perfectly aligned; the slight rotation and tactile variation are part of the system.
- Do not add glassmorphism, neon glows, generic gradient text, oversized pills, or dashboard-style UI.
- Do not change the navigation order or numbering as a side effect.
- Do not edit or delete the reference archive.

When uncertain, preserve the existing implementation and ask for the missing project fact, asset, or intended behavior. A smaller truthful addition is better than a polished fictional case study.
