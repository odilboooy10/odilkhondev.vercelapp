export const site = {
  name: "Odilkhon Yunusov",
  shortName: "Odilkhon",
  role: "Product Engineer",
  url: "https://odilkhondev.vercel.app",
  tagline:
    "I build commercial web platforms — multi-vendor commerce, regulated B2B catalogs, and enterprise SaaS.",
  location: "Seoul, Republic of Korea",
  since: "2023",
  availability: "Full-time roles and contract work",
  languages: [
    { name: "Uzbek", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "Korean", level: "Fluent" },
    { name: "Russian", level: "Advanced" },
    { name: "Turkish", level: "Advanced" },
  ],
  email: "odilkhon318@gmail.com",
  social: {
    github: "https://github.com/odilboooy10",
    linkedin: "https://www.linkedin.com/in/odilkhon-yunusov-a355a3140/",
  },
} as const;

export type Project = {
  slug: string;
  name: string;
  domain: string;
  href: string;
  year: string;
  kind: string;
  summary: string;
  role: string;
  stack: string[];
  problem: string;
  constraints: string[];
  decisions: { title: string; body: string }[];
  evidence: { label: string; value: string }[];
  retro: string[];
};

export const projects: Project[] = [
  {
    slug: "medistan",
    name: "Medistan",
    domain: "medistan.co.kr",
    href: "https://medistan.co.kr",
    year: "2026",
    kind: "Regulated B2B catalog",
    summary:
      "Export catalog for a Seoul manufacturer of dental bone grafts and barrier membranes, localised into five languages and selling factory-direct to clinics across Europe, Eurasia, and the Gulf.",
    role: "Sole developer — strategy, design, and build",
    stack: ["Next.js", "TypeScript", "Locale routing", "Inter + Fraunces", "GA4"],
    problem:
      "A surgeon choosing a bone graft is making a clinical and regulatory decision, not a purchase. The site has to earn that trust before it can ask for a quote — which means specification-level honesty, visible certification, and traceability, not marketing language.",
    constraints: [
      "Medical-device claims are regulated — copy cannot overstate clearance",
      "Buyers are international; procurement happens by quote, not checkout",
      "Catalog is small (7 SKUs), so depth per product matters more than breadth",
      "Korean manufacturing origin is the selling point, but Korea is not the market",
      "Five target markets, each needing full translation rather than a partial one",
    ],
    decisions: [
      {
        title: "Five languages, and deliberately none of them Korean",
        body: "The buyer isn't in Korea. Medistan manufactures in Seoul and sells outward, so the locale set is a market map rather than a translation checklist: German and French for the European clinical market, Russian for Eurasia, Arabic for the Gulf, English as the default. Korean-language pages would serve nobody in that funnel. The .co.kr domain still does its job — it signals manufacturing origin, which is the product's main credential — while the content targets the markets that actually buy. All five dictionaries carry full parity at 146 keys; a partial localisation in a regulated category reads as carelessness, which is the opposite of what the site is trying to establish. I speak Russian, which is why that localisation reads as written rather than commissioned.",
      },
      {
        title: "Spec-level copy over marketing copy",
        body: "Every product leads with resorption timeline, composition, and material class — 80/20 cortical/cancellous, Type I atelocollagen, 4-month resorption — because the audience reads specs and distrusts adjectives. The absence of superlatives is the persuasion.",
      },
      {
        title: "A trust ladder, in a fixed order",
        body: "Certification (K-FDA, CE, ISO 13485) → lot traceability → named practitioners with cities → direct contact. Each rung answers the objection raised by the one before it. Testimonials come last because they are the weakest evidence, not the strongest.",
      },
      {
        title: "Organization schema for machine readers",
        body: "JSON-LD describes the manufacturer, address, and clearances so search engines and procurement tools can parse the entity without scraping prose.",
      },
    ],
    evidence: [
      { label: "HTML transferred", value: "17 KB gzipped" },
      { label: "Time to first byte", value: "0.49 s" },
      { label: "Locales live", value: "en · de · fr · ru · ar" },
      { label: "Translation parity", value: "146 keys × 5" },
    ],
    retro: [
      "Add Product/Offer JSON-LD. The catalog already carries specs and material classes in the markup; marking them up is what surfaces them in search results.",
      "/ko currently returns a 404 rather than redirecting to /en. The export-only strategy is deliberate, but a hard 404 on a .co.kr domain reads as broken rather than intentional. A redirect costs one line and removes the ambiguity.",
      "The Organization schema claims 200 employees against a 2024 founding date and 7 SKUs. Those facts don't sit together, and it's in machine-readable form where it can be cross-checked. I'd correct it or drop the field.",
      "Testimonials describe twelve months of use. Worth confirming the dates line up before a buyer does the arithmetic.",
    ],
  },
  {
    slug: "greenbazaar",
    name: "GreenBazaar",
    domain: "greenbazaar.cloud",
    href: "https://greenbazaar.cloud",
    year: "2026",
    kind: "Multi-vendor marketplace",
    summary:
      "Online grocery marketplace with multi-vendor onboarding, a tiered deals engine, and same-day delivery positioning.",
    role: "Sole developer — design and build",
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
        body: "A component library covered cart, mini-cart, ratings, and forms immediately. That was the right call for shipping — and it carried a cost I'd now weigh differently.",
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
      "Emotion's runtime CSS-in-JS inlines every rule into the document on render — that is most of the 68 KB gzipped homepage. I'd choose a zero-runtime approach and keep MUI only where its behaviour earns the weight.",
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
    year: "2025",
    kind: "Enterprise SaaS",
    summary:
      "Bilingual product site for ACTIVE-EMCS, an AI/IoT building energy management platform sold to Korean facility owners.",
    role: "Sole developer — design and build",
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
      "og:image and the favicon both point at /vite.svg — the default Vite logo. Every LinkedIn and KakaoTalk share of an enterprise site shows a build-tool logo. It should never have shipped, and it is the first thing I am fixing.",
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
  "Data": ["MongoDB", "GraphQL"],
  "Practice": ["i18n — 6 locales shipped", "Technical SEO & JSON-LD", "Core Web Vitals", "Vercel"],
} as const;
