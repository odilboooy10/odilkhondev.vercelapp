export const site = {
  name: "Odilkhon",
  role: "Product Engineer",
  url: "https://odilkhondev.vercel.app",
  // One specific sentence. Neither reference portfolio could write this one.
  tagline:
    "I build commercial web platforms — multi-vendor commerce, regulated B2B catalogs, and enterprise SaaS.",
  location: "Seoul, Republic of Korea", // TODO: confirm
  languages: ["English", "Korean", "Russian", "Uzbek"], // TODO: trim to what you actually work in
  email: "odilkhon318@gmail.com",
  social: {
    github: "", // TODO
    linkedin: "", // TODO
  },
} as const;

export type Project = {
  slug: string;
  name: string;
  domain: string;
  href: string;
  year: string;
  kind: string;
  /** One line, concrete, no adjectives. */
  summary: string;
  role: string;
  stack: string[];
  /** The hard part. This is what a reader is actually here for. */
  problem: string;
  constraints: string[];
  /** Real forks in the road. Decision + why. */
  decisions: { title: string; body: string }[];
  /** Only verifiable facts. Measured 2026-10-06 from the live sites. */
  evidence: { label: string; value: string }[];
  /** Highest-signal section for a working engineer. Be honest. */
  retro: string[];
};

export const projects: Project[] = [
  {
    slug: "medistan",
    name: "Medistan",
    domain: "medistan.co.kr",
    href: "https://medistan.co.kr",
    year: "2024—", // TODO: confirm
    kind: "Regulated B2B catalog",
    summary:
      "Factory-direct wholesale catalog for Korean dental bone grafts and barrier membranes, selling to oral surgeons worldwide.",
    role: "TODO: your actual role — sole developer? design + build? client engagement?",
    stack: ["Next.js", "TypeScript", "Locale routing", "Inter + Fraunces", "GA4"],
    problem:
      "A surgeon choosing a bone graft is making a clinical and regulatory decision, not a purchase. The site has to earn that trust before it can ask for a quote — which means specification-level honesty, visible certification, and traceability, not marketing language.",
    constraints: [
      "Medical-device claims are regulated — copy cannot overstate clearance",
      "Buyers are international; procurement happens by quote, not checkout",
      "Catalog is small (7 SKUs), so depth per product matters more than breadth",
    ],
    decisions: [
      {
        title: "Spec-level copy over marketing copy",
        body: "Every product leads with resorption timeline, composition, and material class — 80/20 cortical/cancellous, Type I atelocollagen, 4-month resorption — because the audience reads specs and distrusts adjectives. The absence of superlatives is the persuasion.",
      },
      {
        title: "A trust ladder, in a fixed order",
        body: "Certification (K-FDA, CE, ISO 13485) → lot traceability → named practitioners with cities → direct contact. Each rung answers the objection raised by the one before it. Testimonials come last because they are the weakest evidence, not the strongest.",
      },
      {
        title: "English and Russian, not Korean",
        body: "TODO — this is the decision a reader will question hardest, so answer it directly. If the strategy is export-only wholesale to foreign clinics, say so plainly; CIS is a major dental-materials market and en/ru is a deliberate pair, not an oversight.",
      },
      {
        title: "Organization schema for machine readers",
        body: "JSON-LD describes the manufacturer, address, and clearances so search engines and procurement tools can parse the entity without scraping prose.",
      },
    ],
    evidence: [
      { label: "HTML transferred", value: "17 KB gzipped" },
      { label: "Time to first byte", value: "0.49 s" },
      { label: "Locales live", value: "en, ru" },
      { label: "Structured data", value: "Organization JSON-LD" },
    ],
    retro: [
      "Add Product/Offer JSON-LD. The catalog already carries specs and material classes in the markup; marking them up is what surfaces them in search.",
      "The Organization schema claims 200 employees against a 2024 founding date and 7 SKUs. Those facts don't sit together, and it's in machine-readable form where it can be cross-checked. Correct it or drop the field.",
      "/ko returns 404 on a .co.kr domain. Either ship Korean or make the export-only positioning explicit, because right now it reads as broken rather than deliberate.",
      "Testimonials describe twelve months of use by a company founded in 2024. Check the dates line up before a buyer does.",
    ],
  },
  {
    slug: "greenbazaar",
    name: "GreenBazaar",
    domain: "greenbazaar.cloud",
    href: "https://greenbazaar.cloud",
    year: "TODO",
    kind: "Multi-vendor marketplace",
    summary:
      "Online grocery marketplace with multi-vendor onboarding, a tiered deals engine, and same-day delivery positioning.",
    role: "TODO: your actual role",
    stack: ["Next.js 15", "Turbopack", "MUI", "Emotion", "TypeScript"],
    problem:
      "A marketplace has to stay navigable while three independent axes grow at once: a deep category tree, an open set of vendors, and overlapping promotions. Any one of them is simple; the interaction between them is where the modelling gets hard.",
    constraints: [
      "Vendors self-onboard, so catalog shape cannot be hand-curated",
      "Deals span three tiers (flash, weekly, clearance) and must not contradict vendor pricing",
      "Grocery buying is mobile-first and habitual — repeat purchase speed beats discovery",
    ],
    decisions: [
      {
        title: "Ten categories, each one level deep",
        body: "Produce taxonomies tempt you into four levels of nesting. Capping at two keeps every product three taps from the homepage and keeps the mobile category sheet legible.",
      },
      {
        title: "Deals as a separate axis from catalog",
        body: "Flash sales, weekly deals, and clearance are their own routes rather than category filters, so a promotion can span vendors and categories without duplicating product records.",
      },
      {
        title: "MUI for delivery speed",
        body: "A component library covered cart, mini-cart, ratings, and forms immediately. That was the right call for shipping — and it carried a cost I'd now weigh differently (see below).",
      },
      {
        title: "Persistent mobile bottom navigation",
        body: "Home / Category / Cart / Account stays fixed, because grocery is a returning-user product where cart access matters more than screen real estate.",
      },
    ],
    evidence: [
      { label: "Categories / subcategories", value: "10 / ~45" },
      { label: "Homepage HTML", value: "68 KB gzipped" },
      { label: "First-load JS chunks", value: "28" },
      { label: "Time to first byte", value: "0.51 s" },
    ],
    retro: [
      "Emotion's runtime CSS-in-JS inlines every rule into the document on render — that is most of the 68 KB gzipped homepage. I'd choose a zero-runtime approach (Tailwind, or CSS Modules) and keep MUI only where its behaviour earns the weight.",
      "No Open Graph tags at all. A marketplace that grows by sharing renders as a dead link on WhatsApp, Telegram, and KakaoTalk. Cheapest high-impact fix on the project.",
      "The title is 'Grocery Store - Fresh Food & Delivery' — a category, not a brand. The brand name belongs in it.",
      "No Product/Offer JSON-LD, despite prices, ratings, and review counts already being in the DOM. That's the difference between a plain blue link and a result with stars and a price.",
      "28 first-load chunks wants route-level code splitting and a real performance budget.",
    ],
  },
  {
    slug: "keico-plus",
    name: "Keico Plus",
    domain: "keicoplus.com",
    href: "https://keicoplus.com",
    year: "TODO",
    kind: "Enterprise SaaS",
    summary:
      "Bilingual marketing and product site for ACTIVE-EMCS, an AI/IoT building energy management platform sold to Korean facility owners.",
    role: "TODO: your actual role",
    stack: ["React", "Vite", "React Router", "i18next", "Tailwind", "three.js"],
    problem:
      "The product's value sits inside Korean electricity-market mechanics — KEPCO tariff structures, 15-minute peak demand intervals, ESCO investment recovery, ZEB certification, Demand Response revenue. A facility owner has to understand enough of that to see the saving, without reading a white paper.",
    constraints: [
      "Two audiences at different depths: facility managers and executive buyers",
      "Korean and English in full, with no partial translation",
      "Competing against incumbent BEMS/BAS vendors, so differentiation has to be technical",
    ],
    decisions: [
      {
        title: "Position against BEMS/BAS, not against 'high bills'",
        body: "Buyers already own a building management system. The content leads with what ACTIVE-EMCS does that BEMS and BAS don't — unified site control plus equipment-level actuation — because that's the only argument that moves someone who already bought the alternative.",
      },
      {
        title: "Explain the mechanism, not just the outcome",
        body: "IR occupancy sensing and infrared controllers driving 15-minute interval peak shaving. Naming the mechanism is what makes a savings claim credible to an engineer.",
      },
      {
        title: "Full runtime i18n with i18next",
        body: "Korean and English share one deeply nested content tree, switched at runtime so a visitor can flip language without losing their place in a long technical page.",
      },
    ],
    evidence: [
      { label: "Locales", value: "ko, en (full parity)" },
      { label: "Domain concepts modelled", value: "BEMS/BAS, ESCO, DR, ZEB, AMI, REC/PPA" },
      { label: "First-load JS", value: "379 KB gzipped" },
    ],
    retro: [
      "og:image and the favicon both point at /vite.svg — the default Vite logo. Every LinkedIn and KakaoTalk share of an enterprise site shows a build-tool logo. Fixed first; it cost twenty minutes and should never have shipped.",
      "A client-rendered SPA with a 1.1 KB HTML shell was the wrong architecture for this buyer. Naver's crawler handles client-side rendering poorly, and Korean facility owners are the primary market. I'd prerender or move to SSR — this is the decision I'd most want back.",
      "379 KB gzipped in a single chunk, no route splitting, on a site whose entire pitch is efficiency.",
      "lang is hardcoded to 'ko' while the app switches language at runtime, so English pages announce themselves as Korean to screen readers and search engines. hreflang points both locales at the same URL.",
      "naver-site-verification shipped with an empty content attribute — verification was never completed on the market that matters most.",
    ],
  },
];

export const stack = {
  "Core": ["TypeScript", "React", "Next.js", "Node.js"],
  "Styling": ["Tailwind CSS", "CSS Modules", "MUI", "Emotion"],
  "Data": ["MongoDB", "PostgreSQL", "REST"], // TODO: trim to what's true
  "Practice": ["i18n (ko/en/ru)", "Technical SEO & JSON-LD", "Core Web Vitals", "Vercel"],
} as const;
