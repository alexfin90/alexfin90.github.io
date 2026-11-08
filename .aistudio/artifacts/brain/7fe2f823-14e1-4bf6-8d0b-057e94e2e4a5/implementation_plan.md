# Alessandro Finocchiaro — Senior Android Engineer & Tech Lead Portfolio

A cutting-edge, interactive, and high-performance portfolio website for Alessandro Finocchiaro, Senior Android Engineer and Tech Lead. Designed with Material 3 Expressive principles, Deep Teal accent tones, scroll-driven phone storytelling, and zero-pill typographic discipline, all driven by a single typed data file.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following key decisions were confirmed and updated:
> - **Technology Stack**: React 19 + TypeScript + Tailwind CSS v4 + Framer Motion (`motion`). React Three Fiber is isolated and lazy-loaded strictly for the 3D phone canvas, with an instant, smooth CSS/SVG fallback for mobile or reduced-motion environments.
> - **Visual Accent & Palette**: Deep Teal (`#0D9488` / `rgb(13, 148, 136)`) paired with refined slate neutrals (`slate-950` / `slate-900` dark theme, `slate-50` / `white` light theme).
> - **Phone Showcase**: Interactive device frame in the hero that reacts to mouse/tilt, transitioning seamlessly into scroll-driven storytelling in the Selected Work section.
> - **Content Architecture**: 100% of portfolio data (projects, timeline, skills, certifications, links, contact endpoint, and personal narrative) is stored in a single typed file (`src/data/portfolioData.ts`), decoupling content from presentation for future Compose Multiplatform migration.
> - **About Me Section**: Positioned between Hero and Selected Work. Contains the exact 4-paragraph text provided by Alessandro, stored in `personalInfo.about` in `portfolioData.ts` (not hardcoded in components). Layout features the profile photo on one side and story text on the other (stacked on mobile) with smooth scroll reveal. "About" is linked in the sticky navigation and the command palette.

---

## 1. Overview & Core Concept

- **What It Does**: Showcases Alessandro Finocchiaro's 10+ year trajectory as a Senior Android Engineer and Tech Lead delivering applications at 100M+ active user scale (TIM, Technogym, Lamborghini, E.ON, Estra). Features an Android-boot style skippable intro, dedicated personal narrative ("About me"), scroll-driven interactive phone showcase, expand-on-click career timeline, interactive skill-to-project matrix, modal carousel detail viewer, and developer extras (Android Studio Logcat modal & Cmd+K command palette).
- **Target Audience / Persona**: Engineering directors, VP of Engineering, tech recruiters, and fellow senior mobile architects evaluating top-tier Android and mobile leadership talent.
- **Key Value**: Delivers the immediate tactile polish and architectural authority of a senior Android tech lead, balancing interactive 3D/gesture delight with 90+ Lighthouse mobile performance, semantic accessibility, and zero-slop typography.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Boot Intro & Hero Arrival**:
   - First-time visitors experience a subtle, skippable Android boot-inspired animation (<1.8s) featuring a pulsating geometric accent ring that resolves into Alessandro's profile photo.
   - Hero split: Left column features Alessandro's verified title (*Senior Android Engineer & Tech Lead*), one-line summary from the CV, and primary CTAs (*See my work*, *Contact me*, GitHub, LinkedIn).
   - Right column showcases the interactive phone mockup displaying live screenshots of MyTIM, TIM Pay, Technogym Biostrength, and Lamborghini Unica.
   - Full-width KPI strip below the split: 10+ Years Experience, 100M+ Active Users, 20M+ MAU Scale.
2. **About Me Section (New)**:
   - Positioned cleanly between Hero and Selected Work.
   - Two-column responsive layout: Alessandro's profile photo (`AlexImage_d3df8d68.jpg`) with an accent border glow on one side, and the 4 verbatim story paragraphs on the other (stacked gracefully on mobile).
   - Reads directly from `personalInfo.about` in `portfolioData.ts`.
   - Subtle scroll-triggered fade/slide reveal.
3. **Scroll-Driven Storytelling (Selected Work)**:
   - As the user scrolls through the 6 major projects (MyTIM, TIM Pay, Technogym Biostrength/Biocircuit, Lamborghini Unica, E.ON, Estra), the phone frame docks into sticky view on desktop and transitions its internal screen to match the active project.
   - Project cards highlight client context ("Built at Deloitte Digital for Lamborghini"), technical role, timeframe, concise story (Problem, Solution, Result), and tech chips.
   - Filter chips (All, Fintech, Telecom, Automotive, Utilities, Embedded) dynamically filter the project list with smooth layout transitions.
   - Clicking any project opens a full detail modal with a touch/drag/keyboard-navigable screenshot carousel and unabridged CV bullet points.
4. **Experience Timeline**:
   - Vertical timeline tracing Technogym (2024–Present), TIM (2019–2024), Deloitte Digital (2016–2019), and STMicroelectronics (2015).
   - Click-to-expand details reveal team size, key metrics, and direct external links to company profiles.
5. **Interactive Skills Matrix**:
   - Categorized skills: Android, Architecture, DevOps & Release, Leadership, Cross-Platform, and AI-Augmented Development.
   - Hovering or tapping any skill highlights all projects in the Selected Work section that utilized that technology.
6. **Open Source & Certifications**:
   - Open source cards linking directly to `github.com/alexfin90` with clearly identified `[ADD description]` placeholders.
   - Certifications showcase: CSM, CSPO, Google Cloud Associate Cloud Engineer, Salesforce Platform Developer I, and Salesforce Administrator, with verified credential links.
7. **Contact & Developer Extras**:
   - Contact form with client-side validation, anti-spam honeypot, rate limiting, and Formspree configuration constant (`FORM_ENDPOINT`).
   - Quick developer tools: `Cmd/Ctrl + K` Command Palette to jump to any section (including About, Work, Timeline, Skills, Contact) or copy links, and a floating Android Studio Logcat terminal easter egg logging Alessandro's architectural summary.

### Visual Identity & Theme
- **Theme**: Material 3 Expressive with dual-theme (Dark/Light) toggle adhering to system preferences by default.
- **Color System (60-30-10)**:
  - *60% Neutral Canvas*: Stark slate dark mode (`#020617` / `#0f172a`), clean crisp light mode (`#ffffff` / `#f8fafc`).
  - *30% Structural Surfaces*: Subtle hairline borders (`border-slate-800` / `border-slate-200`) and elevated cards (`bg-slate-900/60` / `bg-white`).
  - *10% Deep Teal Accent*: `#0D9488` (Teal 600) with `#14B8A6` (Teal 500) highlights for active states, CTA buttons, and focus rings.
- **Typography**:
  - Headings: `Outfit` (Geometric, confident, clean tracking).
  - Body Prose: `Plus Jakarta Sans` (15px–16px, 1.6 line height).
  - Data / Telemetry / Code: `JetBrains Mono` with `tabular-nums`.
- **Anti-Slop Discipline**:
  - Strict zero-pill rule: metadata (dates, categories, roles) displayed as unboxed text with typographic separators (`·`).
  - No fake AI scores, no decorative green pulsing dots, no code-comment headings (`// 01`).
  - Top Bar Contract: 3-zone header with wordmark, single-line navigation links (`About`, `Work`, `Experience`, `Skills`, `Contact`), and single primary action (*Get in touch*).

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: React 19 + Framer Motion with Lazy 3D Phone vs. Pure Compose Wasm**
  - *Chosen Approach*: React 19 SPA powered by Vite, Tailwind CSS v4, and Motion. The 3D phone model uses a dynamically imported React Three Fiber canvas on capable devices, with an instant 2D CSS 3D-perspective fallback for mobile and low-spec machines.
  - *Why*: Matches environment capabilities (instant build, zero runtime crashes), provides 90+ Lighthouse mobile performance, and delivers accessible DOM elements for screen readers and search engines.
- **Decision 2: Single Typed Data Store (`portfolioData.ts`)**
  - *Chosen Approach*: All CV data, personal narrative paragraphs, project stories, metrics, URLs, image paths, skills, certifications, and form configuration live in one TypeScript module.
  - *Why*: Enables the user to update their portfolio in seconds without editing UI code, and allows seamless 1:1 porting to Kotlin Multiplatform data classes in the future.
- **Decision 3: Local Image Pipeline with Pre-Fetched Store Assets**
  - *Chosen Approach*: High-resolution store screenshots and official assets downloaded to `/public/assets/projects/` with descriptive alt tags and CSS fallback cards.
  - *Why*: Eliminates broken third-party image links in hermetic sandboxes while displaying genuine client work (MyTIM, TIM Pay, E.ON, Estra, Lamborghini, Technogym).

---

## 4. Technical Architecture & Data Strategy

### System & Component Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                       portfolioData.ts                      │
│   (PersonalInfo & About, Projects, Timeline, Skills, etc.)  │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
┌──────────────▼──────────────┐ ┌─────────────▼───────────────┐
│        Navbar (Sticky)      │ │     Theme & Motion Context   │
│  [Logo] [Nav Links] [CTA]   │ │  (Dark/Light, Reduced Motion)│
└──────────────┬──────────────┘ └─────────────┬───────────────┘
               │                              │
┌──────────────▼──────────────────────────────▼───────────────┐
│                          App.tsx                            │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ HeroSection: Bio + Profile Avatar + Quick Stats Strip  │ │
│  │ PhoneShowcase: Tilt Mockup / Scroll-Driven Sync        │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ AboutSection: 2-Column Story + Avatar + Verbatim Text  │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ SelectedWorkSection: Category Filters + Project Cards  │ │
│  │ ProjectDetailModal: Swipeable Carousel + CV Details    │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ ExperienceTimeline: Interactive Expandable Nodes       │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ SkillsSection: Grouped Chips + Interactive Highlighting│ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ OpenSourceSection: GitHub Repos + [ADD] Placeholders   │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ CertificationsSection: Verified Credential Cards       │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ ContactSection: Validated Form + Honeypot + Formspree  │ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ Footer: Semantic Links + "Built for Android Leadership"│ │
│  ├────────────────────────────────────────────────────────┤ │
│  │ Overlays: CommandPalette (Cmd+K) & LogcatTerminalModal │ │
│  └────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### Data Model & State Architecture
- `portfolioData.ts`:
  - `personalInfo`: Name, title, summary, `about` (array of 4 exact paragraphs), email, linkedin, github, profilePhoto (`/public/assets/aistudio/AlexImage_d3df8d68.jpg`).
  - `metrics`: 3 high-impact verified CV statistics.
  - `projects`: 6 projects with id, name, company, clientContext, role, period, category, story (problem, whatIDid, result), techStack, publicUrl, screenshots array.
  - `timeline`: 4 companies with role, period, location, responsibilities, tech.
  - `skills`: 6 skill groups, each skill tagged with associated project IDs for reciprocal hover-highlighting.
  - `certifications`: 5 verified certifications with credential URLs.
  - `config`: `FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID"`, spam protection parameters.

### State & Interaction Mapping
- `activeProjectId`: Tracked via scroll intersection and manual selection, synchronizing the phone mockup screen.
- `selectedProjectForModal`: Opens the full-screen accessible modal with keyboard arrows (`ArrowLeft`, `ArrowRight`, `Escape`) and swipe navigation.
- `highlightedSkillId`: Hovering a skill highlights matching projects in the Selected Work grid.
- `activeFilter`: Filters projects by domain (All, Fintech, Telecom, Automotive, Utilities, Embedded).
- `isLogcatOpen` & `isCommandPaletteOpen`: Controlled via global hotkeys (`Cmd+K`, `Ctrl+K`) and dedicated footer/header triggers.
