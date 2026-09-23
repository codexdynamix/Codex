// @ts-nocheck
export const DEFAULT_SITE_CONFIG = {
  siteName: "Codex Dynamics",
  copyrightYear: "2026",
  formSubmitEmail: "codexdynamix@gmail.com",

  // Theme & Colors
  colors: {
    primary: "#0071e3",
    background: "#f5f5f7",
    cardBg: "#ffffff",
    textMain: "#1d1d1f",
    textMuted: "#6e6e73",
    accent: "#0071e3",
  },

  // Contacts & Socials (Supports MULTIPLE contacts per social channel)
  socialContacts: [
    {
      id: "wa-1",
      type: "whatsapp",
      label: "Main WhatsApp",
      value: "+380636406783",
      href: "https://wa.me/380636406783",
      isPrimary: true,
    },
    {
      id: "wa-2",
      type: "whatsapp",
      label: "Support Desk WhatsApp",
      value: "+380636406783",
      href: "https://wa.me/380636406783",
      isPrimary: false,
    },
    {
      id: "ph-1",
      type: "phone",
      label: "Direct Call / Desk",
      value: "+380 63 640 6783",
      href: "tel:+380636406783",
      isPrimary: true,
    },
    {
      id: "ph-2",
      type: "phone",
      label: "Kyiv Office Landline",
      value: "+380 44 233 4567",
      href: "tel:+380442334567",
      isPrimary: false,
    },
    {
      id: "tg-1",
      type: "telegram",
      label: "Official Telegram",
      value: "+380636406783",
      href: "https://t.me/+380636406783",
      isPrimary: true,
    },
    {
      id: "tg-2",
      type: "telegram",
      label: "Client Success Desk",
      value: "@codex_desk",
      href: "https://t.me/codex_desk",
      isPrimary: false,
    },
    {
      id: "vb-1",
      type: "viber",
      label: "Direct Viber",
      value: "+380636406783",
      href: "viber://chat?number=%2B380636406783",
      isPrimary: true,
    },
    {
      id: "vb-2",
      type: "viber",
      label: "Support Line Viber",
      value: "+380 50 123 4567",
      href: "viber://chat?number=%2B380501234567",
      isPrimary: false,
    },
    {
      id: "em-1",
      type: "email",
      label: "Primary Email",
      value: "codexdynamix@gmail.com",
      href: "mailto:codexdynamix@gmail.com",
      isPrimary: true,
    },
    {
      id: "em-2",
      type: "email",
      label: "Direct Agency Desk",
      value: "hello@codexdynamics.com",
      href: "mailto:hello@codexdynamics.com",
      isPrimary: false,
    },
    {
      id: "ig-1",
      type: "instagram",
      label: "Instagram Profile",
      value: "@codex_dynamics",
      href: "https://www.instagram.com/codex_dynamics/",
      isPrimary: true,
    },
    {
      id: "fb-1",
      type: "facebook",
      label: "Facebook Page",
      value: "Codex Dynamics",
      href: "https://www.facebook.com/profile.php?id=61571219783449",
      isPrimary: true,
    },
  ],

  // Addresses (Supports MULTIPLE physical addresses)
  addresses: [
    {
      id: "addr-1",
      label: "Kyiv Office (HQ)",
      street: "Sportyvna, 1A",
      city: "Kyiv, 012023, Ukraine",
      fullAddress: "Sportyvna, 1A, Kyiv, 012023, Ukraine",
      lat: 50.438743,
      lng: 30.523177,
      isPrimary: true,
    },
    {
      id: "addr-2",
      label: "Gulliver Tower Desk",
      street: "Ploshcha Sportyvna, 1A",
      city: "Kyiv, Ukraine",
      fullAddress: "Ploshcha Sportyvna 1A, Gulliver Tower A, Kyiv",
      lat: 50.438743,
      lng: 30.523177,
      isPrimary: false,
    },
  ],

  // Hero Section
  hero: {
    badge: "Codex Dynamics",
    title: "Precision on every screen.",
    subtitle:
      "Websites, web apps, and social campaigns — composed with the care of a product launch.",
    clips: [
      {
        id: "clip-1",
        label: "Codex Dynamics",
        line: "Digital Agency. The standard.",
        src: "/hero/studio.mp4",
        poster: "/hero/studio.jpg",
      },
      {
        id: "clip-2",
        label: "Web Development",
        line: "Websites and web apps, assembled like a product.",
        src: "/hero/web-dev.mp4",
        poster: "/hero/web-dev.jpg",
      },
      {
        id: "clip-3",
        label: "Web Design",
        line: "Type, color, and layout as one material.",
        src: "/hero/design.mp4",
        poster: "/hero/design.jpg",
      },
      {
        id: "clip-4",
        label: "Social Media",
        line: "Content, campaigns, and growth — in one system.",
        src: "/hero/social.mp4",
        poster: "/hero/social.jpg",
      },
    ],
  },

  // Highlights Section
  highlights: {
    items: [
      {
        href: "#work",
        kicker: "Work",
        title: "Sites that convert.",
        copy: "Storefronts, web apps, and campaigns built as one product.",
      },
      {
        href: "#process",
        kicker: "Process",
        title: "Brief to live campaigns.",
        copy: "Design, development, and social media in a single loop.",
      },
      {
        href: "#about",
        kicker: "About",
        title: "One standard.",
        copy: "The same care on the page, in the brand, and in the feed.",
      },
    ],
  },

  // Services Section
  services: {
    badge: "What We Do For You",
    title: "Complete Digital Services Built & Managed For You",
    subtitle:
      "We don't just hand you templates or tell you what to do. Our team does the actual heavy lifting — custom coding websites, building web apps, crafting graphic design, creating CRMs with calling systems, and driving high-converting email and social media marketing on Meta & Google.",
    items: [
      {
        id: "web-dev",
        kicker: "01  /  Websites",
        title: "Web Development & Websites",
        role: "Bespoke Business Websites, Landing Pages & Fast Storefronts",
        description:
          "We build and code custom, lightning-fast websites tailored specifically to your business operations. Whether you need a high-converting corporate website, an e-commerce storefront, or a direct-response sales funnel, we write clean, scalable code that loads in under a second and drives qualified inquiries.",
        whatWeDo:
          "We take your project from architecture and wireframes to full responsive implementation, payment integrations, and turnkey server deployment. You get a bulletproof, secure digital asset you 100% own.",
        points: [
          "Custom React & TypeScript Code",
          "Sub-Second Load Times (95+ PageSpeed)",
          "E-Commerce & Stripe Checkout",
          "Automated Lead & WhatsApp Alerts",
          "No Bloated Plugins or Theme Builders",
        ],
        deliverables: [
          {
            title: "Custom Responsive Website",
            desc: "Bespoke frontend built with modern React, TypeScript, and Tailwind CSS rendering seamlessly on mobile, tablet, and desktop.",
          },
          {
            title: "Client-Friendly Content Management",
            desc: "An intuitive administration panel so you and your team can effortlessly update copy, team members, blog posts, and projects.",
          },
          {
            title: "Core Web Vitals & Speed Optimization",
            desc: "Image compression pipelines (WebP/AVIF), code-splitting, and caching configured to achieve 95+ Google PageSpeed benchmarks.",
          },
        ],
        techStack: ["React 19", "TypeScript", "Tailwind CSS", "Node.js", "Stripe API", "Vite", "Cloudflare"],
        timeline: "Typical Delivery: 2 to 4 Weeks",
        idealFor: "Businesses and founders needing high-performing websites that scale without monthly builder subscription lock-ins.",
        offYourPlate: "No wrestling with broken WordPress plugins, outdated PHP versions, or unreliable offshore developers.",
        src: "/hero/web-dev.mp4",
        poster: "/hero/web-dev.jpg",
      },
      {
        id: "web-apps",
        kicker: "02  /  Applications",
        title: "Custom Web Applications",
        role: "Portals, Dashboards, Client Workspaces & Interactive Tools",
        description:
          "When an off-the-shelf website isn't enough, we engineer full-featured web applications tailored to your proprietary workflow. From client portals and interactive estimation tools to operational dashboards and customer accounts, we build scalable software.",
        whatWeDo:
          "We architect relational databases, write secure authentication and role-based access systems, and craft intuitive user interfaces designed for daily productivity and zero friction.",
        points: [
          "Full-Stack Web App Architecture",
          "Secure Authentication & Team Roles",
          "Real-Time Data & WebSockets",
          "Interactive Forms & Calculations",
          "Comprehensive API Integrations",
        ],
        deliverables: [
          {
            title: "Production Web Application",
            desc: "Secure, responsive application architecture with typed interfaces, automated error boundary recovery, and state management.",
          },
          {
            title: "Client & Admin Portals",
            desc: "Granular access control allowing clients to review deliverables, upload documents, track orders, or manage their profile.",
          },
          {
            title: "REST & Webhook Integrations",
            desc: "Bi-directional data sync with payment processors, databases, accounting platforms, and internal tools.",
          },
        ],
        techStack: ["React 19", "TypeScript", "Tailwind CSS", "Node.js", "SQLite / Postgres", "WebSockets"],
        timeline: "Typical Delivery: 3 to 6 Weeks",
        idealFor: "Companies requiring custom business software, client self-service portals, or high-density operational dashboards.",
        offYourPlate: "No paying thousands every month for rigid third-party software that forces your team to compromise on workflow.",
        src: "/hero/web-apps.mp4",
        poster: "/hero/web-apps.jpg",
      },
      {
        id: "graphic-design",
        kicker: "03  /  Branding & UI",
        title: "Graphics Design & Brand Identity",
        role: "Visual Identity, Vector Logos, Marketing Graphics & Figma UI",
        description:
          "We design premium, conversion-optimized visuals that immediately position your company as the top leader in your niche. Every color palette, typography hierarchy, logo mark, and marketing graphic is crafted to establish credibility and elevate perceived market value.",
        whatWeDo:
          "We develop comprehensive brand identity kits, vector logos, advertising creatives, pitch decks, and pixel-perfect Figma UI kits ready for development.",
        points: [
          "Complete Brand Identity & Guidelines",
          "Vector Logo Suite (Dark/Light/Monochrome)",
          "High-Fidelity Figma UI/UX Systems",
          "Social Media & Ad Creative Graphics",
          "Marketing Collateral & Presentation Decks",
        ],
        deliverables: [
          {
            title: "Comprehensive Brand Identity Guide",
            desc: "Color palettes with accessible contrast, typography hierarchy pairings, logo usage rules, and visual style guides.",
          },
          {
            title: "Vector Logo & Asset Suite",
            desc: "High-resolution SVG, PNG, and PDF exports for print, digital billboards, mobile apps, and social avatars.",
          },
          {
            title: "Figma UI/UX Component Library",
            desc: "Clean design tokens, buttons, form inputs, navigation bars, and mobile-first layouts ready for immediate production.",
          },
        ],
        techStack: ["Figma", "Adobe Illustrator", "Photoshop", "Vector SVGs", "Design Tokens"],
        timeline: "Typical Delivery: 1 to 3 Weeks",
        idealFor: "Established brands and modern startups seeking to elevate their visual positioning and charge premium rates.",
        offYourPlate: "No amateur, inconsistent graphics or pixelated logos holding back your business credibility.",
        src: "/hero/design.mp4",
        poster: "/hero/design.jpg",
      },
      {
        id: "crm-calling",
        kicker: "04  /  Sales Automation",
        title: "Custom CRMs & Calling Systems",
        role: "Bespoke Sales Desks, Integrated VoIP Softphones & Telephony",
        description:
          "We build bespoke CRM platforms with integrated browser calling systems that empower your sales team to close deals faster. Includes click-to-call softphones, call recording and transcription, pipeline tracking, and instant automated lead alerts.",
        whatWeDo:
          "We integrate VoIP telephony (Twilio / WebRTC) directly into a tailored CRM interface, giving your sales agents single-screen efficiency without juggling external hardware or third-party phone apps.",
        points: [
          "Integrated Browser VoIP Telephony",
          "Automatic Call Audio Recording",
          "Visual Kanban Deal Pipeline",
          "Instant Lead Dispatch to WhatsApp & SMS",
          "Zero Per-User Seat SaaS Licensing Fees",
        ],
        deliverables: [
          {
            title: "Bespoke Sales CRM Workspace",
            desc: "Custom lead management with customizable pipeline stages, activity histories, notes, and deal valuation tracking.",
          },
          {
            title: "In-Browser VoIP Softphone Dialer",
            desc: "One-click dialing directly from lead cards with mute, transfer, caller ID, and real-time audio visualization.",
          },
          {
            title: "Call Recording & Audio Playback",
            desc: "Encrypted call storage and in-app audio playback player for quality assurance, training, and customer dispute resolution.",
          },
        ],
        techStack: ["WebRTC", "Twilio Voice API", "React", "TypeScript", "Node.js", "SQLite"],
        timeline: "Typical Delivery: 3 to 5 Weeks",
        idealFor: "Outbound and inbound sales teams, real estate agencies, call centers, and agencies that want to own their calling infrastructure.",
        offYourPlate: "No expensive per-seat software charges ($150+/agent/month) and no disjointed calling apps.",
        src: "/services/crm-calling.jpg",
        poster: "/services/crm-calling.jpg",
      },
      {
        id: "email-marketing",
        kicker: "05  /  Acquisition & Retention",
        title: "Email Marketing & Social Media (Meta & Google Ads)",
        role: "Automated Drip Sequences & High-ROAS Paid Ad Campaigns",
        description:
          "We drive qualified prospective clients into your ecosystem through targeted Meta and Google ad campaigns, and convert them into repeat buyers through high-deliverability automated email marketing drip funnels.",
        whatWeDo:
          "We write persuasive direct-response ad copy, produce scroll-stopping video and static creatives, manage paid ad budgets on Meta and Google, and set up automated email welcome sequences and re-engagement campaigns.",
        points: [
          "Meta Ads (Instagram & Facebook) Management",
          "High-Intent Google Search & Display Ads",
          "Automated Email Drip Sequences & Nurturing",
          "Inbox Deliverability Hardening (SPF/DKIM/DMARC)",
          "Conversion API & Pixel Tracking Attribution",
        ],
        deliverables: [
          {
            title: "Full-Funnel Paid Advertising Campaigns",
            desc: "Cold prospect capture, retargeting funnels, and high-intent Google search campaigns engineered for measurable ROAS.",
          },
          {
            title: "Automated Email Drip Sequences",
            desc: "Custom branded HTML email templates for welcome series, abandoned inquiries, promotional broadcasts, and lead re-activation.",
          },
          {
            title: "Deliverability Setup & Domain Authentication",
            desc: "Bulletproof DNS configuration ensuring your emails land in primary inboxes, not the spam or promotions folder.",
          },
        ],
        techStack: ["Meta Ads Manager", "Google Ads", "Meta CAPI", "Klaviyo / Sendgrid", "GA4", "HTML Email"],
        timeline: "Setup: 1 to 2 Weeks + Monthly Sprints",
        idealFor: "Businesses looking for a consistent, scalable engine of new inquiries and automated lifetime customer value.",
        offYourPlate: "No wasting ad budget on ineffective boosted posts or watching leads go cold without automated follow-up.",
        src: "/hero/acquisition.mp4",
        poster: "/services/acquisition-retention.jpg",
      },
    ],
  },

  // About / Process Section
  about: {
    badge: "How we work",
    title: "From brief to live campaigns.",
    subtitle:
      "Design, development, and social media in one loop — not a handoff graveyard. Typical engagement: four to six weeks.",
    steps: [
      {
        number: "01",
        title: "Brief",
        description: "Goals, audience, offer, and the social data we already have.",
      },
      {
        number: "02",
        title: "Web Design",
        description: "Wireframes, brand system, and high-fidelity pages that convert.",
      },
      {
        number: "03",
        title: "Web Development",
        description: "Production websites and web apps — fast, accessible, built to last.",
      },
      {
        number: "04",
        title: "Launch",
        description: "QA, analytics, pixels, and a cutover that does not break ads.",
      },
      {
        number: "05",
        title: "Social Growth",
        description: "Creative tests, audiences, and landing-page loops after ship.",
      },
    ],
    gallery: [
      {
        id: "gal-1",
        src: "/studio/interior.jpg",
        alt: "The Codex Dynamics studio overlooking the city",
        label: "Studio Interior",
      },
      {
        id: "gal-2",
        src: "/studio/code.jpg",
        alt: "Engineer writing production code",
        label: "Production Engineering",
      },
      {
        id: "gal-3",
        src: "/studio/design.jpg",
        alt: "Designer reviewing a web interface",
        label: "Design Review",
      },
      {
        id: "gal-4",
        src: "/studio/wireframes.jpg",
        alt: "Website wireframes on a desk",
        label: "Wireframes & System",
      },
      {
        id: "gal-5",
        src: "/studio/social.jpg",
        alt: "Social media creative on a phone",
        label: "Social Media Feed",
      },
      {
        id: "gal-6",
        src: "/studio/analytics.jpg",
        alt: "Performance dashboard and analytics",
        label: "Analytics & Telemetry",
      },
    ],
  },

  // About / Company Section
  studio: {
    badge: "About Us",
    title: "Direct Access. Proven Results.",
    subtitle:
      "Codex Dynamics is an agile agency. Senior developers, designers, and growth specialists handle your project directly — and stay on the work until it performs.",
    heroImage: "/hero/studio.jpg",
    heroImageAlt: "Codex Dynamics office, Sportyvna 1A, Kyiv",
    studioCityTag: "Kyiv",
    studioLocationTag: "Gulliver · Open in Maps",
    principles: [
      {
        title: "Clarity over noise",
        copy: "If it does not serve the offer, it does not ship. Hierarchy, type, and motion are decided — never decorated.",
      },
      {
        title: "One system",
        copy: "The website, the brand, and the social account share a language. No three-vendor tax. No stale PDFs.",
      },
      {
        title: "Built to be measured",
        copy: "Pixels, events, and pages that a board can read. We optimize for conversion, not applause.",
      },
    ],
  },

  // Results Section
  results: {
    badge: "Proof",
    title: "Measured the way a board measures it.",
    subtitle: "Speed, conversion, and paid social return — not a 40-page deck.",
    metrics: [
      { value: 140, suffix: "+", label: "Websites shipped", decimals: 0 },
      { value: 4.8, suffix: "x", label: "Avg. social ROAS", decimals: 1 },
      { value: 28, suffix: " days", label: "Typical build", decimals: 0 },
      { value: 60, suffix: "+", label: "Brands in market", decimals: 0 },
    ],
  },

  // Contact Section
  contact: {
    badge: "Start a project",
    title: "Tell us what you want to build.",
    subtitle: "Drop a brief, a loom, or a note. A partner replies within one business day.",
    responseTimeText: "Typically responds within 2 hours during business hours.",
    phoneCardTitle: "Call the desk",
    phoneCardSubtitle: "Mon–Fri · 9:00–19:00 EET",
    emailCardTitle: "Email us",
    emailCardSubtitle: "Briefs, RFPs, decks",
    locationCardTitle: "Kyiv Office",
    locationCardSubtitle: "Visits by appointment",
  },

  // Footer Section
  footer: {
    tagline:
      "Web development, web design, and social media marketing. We build the site, then we grow it.",
    copyrightText: "Codex Dynamics. All rights reserved.",
  },

  // Themes (WordPress Appearance & Components)
  theme: {
    activeTheme: "codex-pro",
    preset: "default",
    fontFamily: "system",
    containerWidth: "1280px",
    borderRadius: "modern",
    headerStyle: "floating",
    heroLayout: "streamer",
    fontSizeScale: "normal",
    cardStyle: "glass",
    activeComponents: [
      "header-builder",
      "hero-clip",
      "bento-highlights",
      "portfolio-showcase",
      "results-counter",
      "reviews-slider",
      "services-carousel",
      "gutenberg-blocks",
      "footer-widgets",
      "sticky-contact-dock",
    ],
  },

  // Tidio Live Chat Integration
  tidio: {
    enabled: true,
    publicKey: "tmteup6i0hhn7fxdh0yqmww0rhe8dg7l",
    disableOnAdmin: true,
    hideOnMobile: false,
    position: "bottom-right",
    welcomeMessage: "Hi! How can we help you today? Leave us a message and our team will get right back to you.",
  },

  // Header Social Buttons (Controls visibility and links on header)
  headerSocials: {
    linkedin: {
      enabled: true,
      url: "https://linkedin.com/company/codexdynamics",
      label: "LinkedIn",
    },
    x: {
      enabled: true,
      url: "https://x.com/codexdynamics",
      label: "X (Twitter)",
    },
    github: {
      enabled: true,
      url: "https://github.com/codexdynamics",
      label: "GitHub",
    },
    instagram: {
      enabled: true,
      url: "https://www.instagram.com/codex_dynamics/",
      label: "Instagram",
    },
    facebook: {
      enabled: true,
      url: "https://www.facebook.com/profile.php?id=61571219783449",
      label: "Facebook",
    },
  },

  // Branding & Assets
  branding: {
    accentPreset: "blue",
    logoDark: "",
    logoLight: "",
    favicon: "/favicon.svg",
  },

  // Top Announcement Banner
  banner: {
    enabled: false,
    text: "✨ Exclusive Q4 Digital Strategy: Accelerate your business with bespoke web development.",
    ctaText: "Book Discovery",
    ctaUrl: "#contact",
    styleVariant: "blue",
    closable: true,
  },

  // WhatsApp & Floating Action Dock
  whatsapp: {
    enabled: true,
    number: "+380636406783",
    defaultMessage: "Hello Codex Dynamics, I'm interested in building a high-performance web project.",
    position: "bottom-right",
    showExtraChannels: true,
  },

  // Contact Form Field Customizer
  contactForm: {
    showBudget: true,
    showTimeline: true,
    showCompany: true,
    showServiceSelect: true,
  },

  // SEO & Social OpenGraph
  seo: {
    metaTitle: "Codex Dynamics — High-Performance Websites & Digital Agency",
    metaDescription: "High-performance websites, web design, web development, and digital marketing agency. Precision quality on every screen.",
    canonicalUrl: "https://codexdynamics.com",
    ogImage: "/hero/studio.jpg",
    gaId: "",
    gscVerification: "",
    pixelId: "",
    metaPixelId: "",
  },

  // Maintenance & Emergency Mode
  emergency: {
    maintenanceMode: false,
    headline: "System Maintenance & Upgrades in Progress",
    subtext: "We are fine-tuning our high-performance digital platform. We will be back shortly with enhanced capabilities.",
    message: "We are fine-tuning our high-performance digital platform. We will be back shortly with enhanced capabilities.",
    estimatedLaunch: "2026-10-01T12:00",
    estimatedReturn: "2026-10-01T12:00",
    notifyEmail: "codexdynamix@gmail.com",
    emergencyContact: "codexdynamix@gmail.com",
  },

  // Custom Code Injections
  codeInjection: {
    headerCode: "",
    footerCode: "",
  },

  // Saved snapshots for 1-click restore
  snapshots: [],
};
