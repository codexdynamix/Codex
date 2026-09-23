// @ts-nocheck
import { DatabaseSync } from "node:sqlite";
import { existsSync, mkdirSync, copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { DEFAULT_SITE_CONFIG } from "./default-site-config.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DATA_DIR = join(ROOT, ".data");
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = join(DATA_DIR, "database.sqlite");
const OLD_ROOT_DB = join(ROOT, "database.sqlite");
if (existsSync(OLD_ROOT_DB) && !existsSync(DB_PATH)) {
  try {
    copyFileSync(OLD_ROOT_DB, DB_PATH);
  } catch (err) {
    console.error("[chainiq-site-db] Error copying existing DB to .data:", err);
  }
}

const UPLOADS_DIR = join(ROOT, "uploads", "reviews");

if (!existsSync(UPLOADS_DIR)) {
  mkdirSync(UPLOADS_DIR, { recursive: true });
}

let dbInstance = null;

export function getDb() {
  if (!dbInstance) {
    dbInstance = new DatabaseSync(DB_PATH);
    dbInstance.exec("PRAGMA journal_mode = WAL;");
    initSchema(dbInstance);
    seedInitialDataIfEmpty(dbInstance);
  }
  return dbInstance;
}

function initSchema(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      name TEXT DEFAULT 'Admin',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS visitors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT,
      ip_address TEXT,
      country TEXT,
      flag TEXT,
      browser TEXT,
      device TEXT,
      user_agent TEXT,
      page_url TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      phone TEXT,
      company TEXT,
      message TEXT,
      source TEXT DEFAULT 'website',
      status TEXT DEFAULT 'new',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS backlinks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      url TEXT NOT NULL,
      notes TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS blog_posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      excerpt TEXT,
      content TEXT,
      meta_title TEXT,
      meta_description TEXT,
      status TEXT DEFAULT 'draft',
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      rating INTEGER DEFAULT 5,
      comment TEXT NOT NULL,
      image_path TEXT,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      site_name TEXT,
      site_url TEXT,
      description TEXT,
      category TEXT,
      image_url TEXT,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      visitor_id INTEGER,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      message TEXT,
      source TEXT DEFAULT 'website_contact',
      status TEXT DEFAULT 'new',
      score INTEGER DEFAULT 50,
      notes TEXT,
      ip_address TEXT,
      country TEXT,
      flag TEXT,
      city TEXT,
      postal_code TEXT,
      street TEXT,
      pages_viewed_count INTEGER DEFAULT 1,
      duration_seconds INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS chat_threads (
      id TEXT PRIMARY KEY,
      visitor_session TEXT,
      visitor_name TEXT,
      visitor_email TEXT,
      visitor_phone TEXT,
      status TEXT DEFAULT 'active',
      unread_count INTEGER DEFAULT 0,
      last_message TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS chat_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      thread_id TEXT NOT NULL,
      sender TEXT NOT NULL,
      sender_name TEXT,
      message TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Ensure extended columns exist in visitors
  const visitorColumns = [
    "ALTER TABLE visitors ADD COLUMN referrer TEXT DEFAULT 'Direct';",
    "ALTER TABLE visitors ADD COLUMN country_code TEXT DEFAULT 'US';",
    "ALTER TABLE visitors ADD COLUMN city TEXT DEFAULT 'San Francisco';",
    "ALTER TABLE visitors ADD COLUMN region TEXT DEFAULT 'California';",
    "ALTER TABLE visitors ADD COLUMN postal_code TEXT DEFAULT '94105';",
    "ALTER TABLE visitors ADD COLUMN street TEXT DEFAULT '101 Market St, Financial District';",
    "ALTER TABLE visitors ADD COLUMN duration_seconds INTEGER DEFAULT 120;",
    "ALTER TABLE visitors ADD COLUMN visit_count INTEGER DEFAULT 1;",
    "ALTER TABLE visitors ADD COLUMN is_returning INTEGER DEFAULT 0;",
    "ALTER TABLE visitors ADD COLUMN pages_viewed TEXT;",
    "ALTER TABLE visitors ADD COLUMN cookies_data TEXT;",
    "ALTER TABLE visitors ADD COLUMN email TEXT;",
    "ALTER TABLE visitors ADD COLUMN name TEXT;",
    "ALTER TABLE visitors ADD COLUMN phone TEXT;",
    "ALTER TABLE visitors ADD COLUMN is_lead INTEGER DEFAULT 0;",
  ];

  for (const sql of visitorColumns) {
    try {
      db.exec(sql);
    } catch {
      // column already exists
    }
  }

  // Ensure extended columns exist in blog_posts
  const blogColumns = [
    "ALTER TABLE blog_posts ADD COLUMN cover_image TEXT;",
    "ALTER TABLE blog_posts ADD COLUMN author TEXT DEFAULT 'Codex Dynamics Research';",
    "ALTER TABLE blog_posts ADD COLUMN category TEXT DEFAULT 'Engineering';",
    "ALTER TABLE blog_posts ADD COLUMN tags TEXT DEFAULT '[]';",
    "ALTER TABLE blog_posts ADD COLUMN focus_keyword TEXT;",
    "ALTER TABLE blog_posts ADD COLUMN views INTEGER DEFAULT 0;",
    "ALTER TABLE blog_posts ADD COLUMN updated_at TEXT;",
  ];

  for (const sql of blogColumns) {
    try {
      db.exec(sql);
    } catch {
      // column already exists
    }
  }

  // Ensure admin users exist
  for (const email of ["admin@codexdynamics.com", "admin@codexdynamics.local"]) {
    const existing = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (!existing) {
      db.prepare("INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)")
        .run(email, "Admin123!", "Administrator");
    }
  }

  // Ensure high-performance indexes
  const performanceIndexes = [
    "CREATE INDEX IF NOT EXISTS idx_visitors_created_at ON visitors(created_at);",
    "CREATE INDEX IF NOT EXISTS idx_visitors_session ON visitors(session_id);",
    "CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);",
    "CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at);",
    "CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);",
    "CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published);",
    "CREATE INDEX IF NOT EXISTS idx_reviews_published ON reviews(is_published);"
  ];
  for (const idx of performanceIndexes) {
    try {
      db.exec(idx);
    } catch {
      // index already exists
    }
  }

  // Ensure image_url column in projects
  try {
    db.exec("ALTER TABLE projects ADD COLUMN image_url TEXT;");
  } catch {
    // column already exists
  }
}

function seedInitialDataIfEmpty(db) {
  // Check visitors
  const visCount = db.prepare("SELECT COUNT(*) as count FROM visitors").get().count;
  if (visCount === 0) {
    const initialVisitors = [
      {
        session: "sess_91a02",
        ip: "104.28.192.42",
        country: "United States",
        countryCode: "US",
        flag: "🇺🇸",
        city: "San Francisco",
        region: "California",
        postalCode: "94105",
        street: "101 Market St, Financial District",
        browser: "Chrome 124",
        device: "Desktop (Mac)",
        page: "/",
        duration: 342,
        visits: 3,
        isReturning: 1,
        time: "2026-09-16 19:02:14",
        pages: JSON.stringify([
          { url: "/", title: "Codex Dynamics", timestamp: "2026-09-16T18:55:00Z" },
          { url: "/#work", title: "Codex Dynamics | Work", timestamp: "2026-09-16T18:57:30Z" },
          { url: "/#services", title: "Codex Dynamics | Services", timestamp: "2026-09-16T19:00:10Z" },
          { url: "/#contact", title: "Codex Dynamics | Contact", timestamp: "2026-09-16T19:02:14Z" },
        ]),
        cookies: JSON.stringify({
          __cdx_vid: "vid_91a02_us",
          __cdx_session: "sess_91a02",
          __cdx_visit_count: "3",
          __cdx_duration_secs: "342",
          __cdx_first_visit: "2026-09-10T14:20:00Z",
          __cdx_cookie_consent: "accepted",
          __cdx_utm_source: "google_search",
          __cdx_utm_campaign: "brand_q3",
          __cdx_screen: "1920x1080 (2x DPR)",
          __cdx_lang: "en-US",
        }),
      },
      {
        session: "sess_82b13",
        ip: "82.165.197.1",
        country: "United Kingdom",
        countryCode: "GB",
        flag: "🇬🇧",
        city: "London",
        region: "Greater London",
        postalCode: "EC2A 4NE",
        street: "25 Old Street, Silicon Roundabout",
        browser: "Safari 17.4",
        device: "Mobile (iPhone)",
        page: "/#work",
        duration: 215,
        visits: 2,
        isReturning: 1,
        time: "2026-09-16 18:45:00",
        pages: JSON.stringify([
          { url: "/", title: "Codex Dynamics", timestamp: "2026-09-16T18:41:20Z" },
          { url: "/#work", title: "Codex Dynamics | Work", timestamp: "2026-09-16T18:45:00Z" },
        ]),
        cookies: JSON.stringify({
          __cdx_vid: "vid_82b13_uk",
          __cdx_session: "sess_82b13",
          __cdx_visit_count: "2",
          __cdx_duration_secs: "215",
          __cdx_first_visit: "2026-09-14T11:15:00Z",
          __cdx_cookie_consent: "accepted",
          __cdx_utm_source: "linkedin",
          __cdx_screen: "393x852 (3x DPR)",
          __cdx_lang: "en-GB",
        }),
      },
      {
        session: "sess_73c24",
        ip: "178.62.204.89",
        country: "Germany",
        countryCode: "DE",
        flag: "🇩🇪",
        city: "Berlin",
        region: "Berlin",
        postalCode: "10115",
        street: "Friedrichstraße 43, Mitte",
        browser: "Firefox 125",
        device: "Desktop (Linux)",
        page: "/#services",
        duration: 180,
        visits: 1,
        isReturning: 0,
        time: "2026-09-16 18:22:11",
        pages: JSON.stringify([
          { url: "/", title: "Codex Dynamics", timestamp: "2026-09-16T18:19:10Z" },
          { url: "/#services", title: "Codex Dynamics | Services", timestamp: "2026-09-16T18:22:11Z" },
        ]),
        cookies: JSON.stringify({
          __cdx_vid: "vid_73c24_de",
          __cdx_session: "sess_73c24",
          __cdx_visit_count: "1",
          __cdx_duration_secs: "180",
          __cdx_first_visit: "2026-09-16T18:19:10Z",
          __cdx_cookie_consent: "accepted",
          __cdx_screen: "2560x1440 (1x DPR)",
          __cdx_lang: "de-DE",
        }),
      },
      {
        session: "sess_64d35",
        ip: "194.187.249.33",
        country: "Ukraine",
        countryCode: "UA",
        flag: "🇺🇦",
        city: "Kyiv",
        region: "Kyiv City",
        postalCode: "01001",
        street: "14 Khreshchatyk St, Pechersk",
        browser: "Chrome 124",
        device: "Desktop (Windows)",
        page: "/#contact",
        duration: 410,
        visits: 4,
        isReturning: 1,
        time: "2026-09-16 17:50:40",
        pages: JSON.stringify([
          { url: "/", title: "Codex Dynamics", timestamp: "2026-09-16T17:43:50Z" },
          { url: "/#work", title: "Codex Dynamics | Work", timestamp: "2026-09-16T17:46:10Z" },
          { url: "/#contact", title: "Codex Dynamics | Contact", timestamp: "2026-09-16T17:50:40Z" },
        ]),
        cookies: JSON.stringify({
          __cdx_vid: "vid_64d35_ua",
          __cdx_session: "sess_64d35",
          __cdx_visit_count: "4",
          __cdx_duration_secs: "410",
          __cdx_first_visit: "2026-09-08T09:30:00Z",
          __cdx_cookie_consent: "accepted",
          __cdx_screen: "1920x1080 (1x DPR)",
          __cdx_lang: "uk-UA",
        }),
      },
      {
        session: "sess_55e46",
        ip: "24.200.180.12",
        country: "Canada",
        countryCode: "CA",
        flag: "🇨🇦",
        city: "Toronto",
        region: "Ontario",
        postalCode: "M5V 2T6",
        street: "200 Bay St, Financial Core",
        browser: "Edge 124",
        device: "Desktop (Windows)",
        page: "/",
        duration: 95,
        visits: 1,
        isReturning: 0,
        time: "2026-09-16 17:15:02",
        pages: JSON.stringify([
          { url: "/", title: "Codex Dynamics", timestamp: "2026-09-16T17:13:30Z" },
        ]),
        cookies: JSON.stringify({
          __cdx_vid: "vid_55e46_ca",
          __cdx_session: "sess_55e46",
          __cdx_visit_count: "1",
          __cdx_duration_secs: "95",
          __cdx_first_visit: "2026-09-16T17:13:30Z",
          __cdx_cookie_consent: "accepted",
          __cdx_screen: "1920x1080 (1.25x DPR)",
          __cdx_lang: "en-CA",
        }),
      },
      {
        session: "sess_46f57",
        ip: "94.200.45.18",
        country: "United Arab Emirates",
        countryCode: "AE",
        flag: "🇦🇪",
        city: "Dubai",
        region: "Dubai Emirate",
        postalCode: "00000",
        street: "Sheikh Zayed Rd, DIFC Gate Tower 4",
        browser: "Safari 17",
        device: "Mobile (iPhone)",
        page: "/#studio",
        duration: 260,
        visits: 2,
        isReturning: 1,
        time: "2026-09-16 16:30:19",
        pages: JSON.stringify([
          { url: "/", title: "Codex Dynamics", timestamp: "2026-09-16T16:26:00Z" },
          { url: "/#studio", title: "Codex Dynamics | Studio", timestamp: "2026-09-16T16:30:19Z" },
        ]),
        cookies: JSON.stringify({
          __cdx_vid: "vid_46f57_ae",
          __cdx_session: "sess_46f57",
          __cdx_visit_count: "2",
          __cdx_duration_secs: "260",
          __cdx_first_visit: "2026-09-15T10:00:00Z",
          __cdx_cookie_consent: "accepted",
          __cdx_screen: "390x844 (3x DPR)",
          __cdx_lang: "ar-AE",
        }),
      },
    ];
    const stmt = db.prepare(`
      INSERT INTO visitors (
        session_id, ip_address, country, country_code, flag, city, region, postal_code, street,
        browser, device, page_url, duration_seconds, visit_count, is_returning, pages_viewed, cookies_data, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    for (const v of initialVisitors) {
      stmt.run(
        v.session, v.ip, v.country, v.countryCode, v.flag, v.city, v.region, v.postalCode, v.street,
        v.browser, v.device, v.page, v.duration, v.visits, v.isReturning, v.pages, v.cookies, v.time
      );
    }
  }

  // Check leads
  const leadCount = db.prepare("SELECT COUNT(*) as count FROM leads").get().count;
  if (leadCount === 0) {
    const initialLeads = [
      {
        name: "Alexander Wright",
        email: "a.wright@auroracapital.co",
        phone: "+44 20 7946 0912",
        company: "Aurora Capital UK",
        message: "We are preparing a Q4 brand relaunch and need a high-conversion Webflow/React build with bespoke animations and CRM sync.",
        source: "website_contact",
        status: "new",
        score: 95,
        notes: "Budget: $35k-$60k. Timeline: 6 weeks. Requested high-touch executive demo.",
        country: "United Kingdom",
        flag: "🇬🇧",
        city: "London",
        postal_code: "EC2A 4NE",
        street: "25 Old Street, Silicon Roundabout",
        pages_viewed_count: 5,
        duration_seconds: 342,
      },
      {
        name: "Sophia Martinez",
        email: "sophia@novalabs.io",
        phone: "+1 415 890 2311",
        company: "Nova Labs Inc",
        message: "Looking for an end-to-end studio to redesign our SaaS marketing portal and optimize organic search acquisition.",
        source: "blog_reader",
        status: "contacted",
        score: 88,
        notes: "Subscribed via article 'Mastering Core Web Vitals in 2026'. Downloaded architecture guide.",
        country: "United States",
        flag: "🇺🇸",
        city: "San Francisco",
        postal_code: "94105",
        street: "101 Market St, Financial District",
        pages_viewed_count: 4,
        duration_seconds: 280,
      },
      {
        name: "Dmitry Kovalenko",
        email: "dmitry@vertexlogistics.eu",
        phone: "+380 44 239 8810",
        company: "Vertex Logistics",
        message: "Need a modern corporate website with multilingual support and client portal integration.",
        source: "website_contact",
        status: "qualified",
        score: 82,
        notes: "Corporate fleet logistics platform. High priority for Q4 launch.",
        country: "Ukraine",
        flag: "🇺🇦",
        city: "Kyiv",
        postal_code: "01001",
        street: "14 Khreshchatyk St, Pechersk",
        pages_viewed_count: 6,
        duration_seconds: 410,
      },
      {
        name: "Elena Rostova",
        email: "elena@nordictech.se",
        phone: "+46 8 123 4567",
        company: "Nordic Tech Dynamics",
        message: "Interested in technical SEO audit and React redesign.",
        source: "blog_reader",
        status: "new",
        score: 74,
        notes: "Lead captured from blog insights newsletter subscription.",
        country: "Sweden",
        flag: "🇸🇪",
        city: "Stockholm",
        postal_code: "111 52",
        street: "Kungsgatan 18",
        pages_viewed_count: 3,
        duration_seconds: 195,
      },
    ];
    for (const l of initialLeads) {
      createLead(l);
    }
  }

  // Check enquiries
  const enqCount = db.prepare("SELECT COUNT(*) as count FROM enquiries").get().count;
  if (enqCount === 0) {
    const initialEnquiries = [
      { name: "Alexander Wright", email: "a.wright@auroracapital.co", phone: "+44 20 7946 0912", company: "Aurora Capital UK", message: "We are preparing a Q4 brand relaunch and need a high-conversion Webflow/React build with bespoke animations and CRM sync.", status: "new" },
      { name: "Sophia Martinez", email: "sophia@novalabs.io", phone: "+1 415 890 2311", company: "Nova Labs Inc", message: "Looking for an end-to-end studio to redesign our SaaS marketing portal and optimize organic search acquisition.", status: "contacted" },
      { name: "Dmitry Kovalenko", email: "dmitry@vertexlogistics.eu", phone: "+380 44 239 8810", company: "Vertex Logistics", message: "Need a modern corporate website with multilingual support and client portal integration.", status: "new" },
    ];
    const stmt = db.prepare("INSERT INTO enquiries (name, email, phone, company, message, status) VALUES (?, ?, ?, ?, ?, ?)");
    for (const e of initialEnquiries) {
      stmt.run(e.name, e.email, e.phone, e.company, e.message, e.status);
    }
  }

  // Check backlinks
  const blCount = db.prepare("SELECT COUNT(*) as count FROM backlinks").get().count;
  if (blCount === 0) {
    const initialBacklinks = [
      { name: "Clutch.co Global Leaders", url: "https://clutch.co/profile/codex-dynamics", notes: "DA 92 · Top Web Development & Digital Strategy Agency directory listing" },
      { name: "Awwwards Nominee Showcase", url: "https://www.awwwards.com/sites/codex-dynamics", notes: "DA 90 · Design system and typography showcase feature" },
      { name: "DesignRush Top Agencies", url: "https://www.designrush.com/agency/codex-dynamics", notes: "DA 84 · High authority backlink targeting 'web design studio'" },
      { name: "GitHub Tech Portfolio", url: "https://github.com/AnonymousXIVV/CodexDynamics106", notes: "DA 96 · Open source showcase and developer community link" },
    ];
    const stmt = db.prepare("INSERT INTO backlinks (name, url, notes) VALUES (?, ?, ?)");
    for (const b of initialBacklinks) {
      stmt.run(b.name, b.url, b.notes);
    }
  }

  // Check blog_posts
  const blogCount = db.prepare("SELECT COUNT(*) as count FROM blog_posts").get().count;
  if (blogCount === 0) {
    const initialBlogs = [
      {
        title: "Mastering Core Web Vitals in 2026: The High-Performance Playbook",
        slug: "mastering-core-web-vitals-2026",
        excerpt: "Why microsecond interactions, zero CLS, and sub-second LCP directly dictate your Google search rankings and customer conversion rates.",
        content: "High-performance web architecture is no longer an engineering afterthought; it is the primary differentiator in search visibility and organic revenue. In this comprehensive guide, we dissect sub-50ms interaction delays, hardware-accelerated CSS rendering, and modern asset compression strategies designed for maximum PageSpeed scores.",
        meta_title: "Mastering Core Web Vitals 2026 | Codex Dynamics SEO",
        meta_description: "Learn how to achieve 100/100 Google PageSpeed scores with zero cumulative layout shift and lightning-fast server execution.",
        status: "published",
      },
      {
        title: "The Architecture of Conversion: Why Minimalist Dark UI Dominates Modern Tech",
        slug: "architecture-of-conversion-dark-ui",
        excerpt: "Exploring the optical mathematics of contrast ratios, subtle ambient lighting, and visual hierarchies that double user engagement.",
        content: "Modern digital consumers are fatigued by generic web layouts. By leveraging deep charcoal canvases, refined typography, and purposeful motion choreography, high-growth studios command immediate authority and elevated trust.",
        meta_title: "Dark UI Design Systems & Conversion Architecture | Codex",
        meta_description: "Deep dive into visual hierarchy, optical spacing, and conversion-centered UI design principles for tech leaders.",
        status: "published",
      },
    ];
    const stmt = db.prepare("INSERT INTO blog_posts (title, slug, excerpt, content, meta_title, meta_description, status) VALUES (?, ?, ?, ?, ?, ?, ?)");
    for (const p of initialBlogs) {
      stmt.run(p.title, p.slug, p.excerpt, p.content, p.meta_title, p.meta_description, p.status);
    }
  }

  // Check reviews
  const revCount = db.prepare("SELECT COUNT(*) as count FROM reviews").get().count;
  if (revCount === 0) {
    const initialReviews = [
      {
        author: "Marcus Vance",
        rating: 5,
        comment: "Codex Dynamics transformed our digital presence completely. Our inbound qualified lead volume surged by 240% within the first 60 days of launch. Flawless engineering.",
        image_path: "/team/team-member-1.png",
        is_published: 1,
      },
      {
        author: "Elena Rostova",
        rating: 5,
        comment: "The precision and attention to detail are unprecedented. The site loads instantaneously across every global market, and the back-office CRM tools give us full control.",
        image_path: "/team/team-member-2.png",
        is_published: 1,
      },
      {
        author: "Tariq Al-Mansoor",
        rating: 5,
        comment: "Exceptional design standard and seamless communication. They delivered a world-class bespoke platform ahead of our product launch deadline.",
        image_path: "/team/team-member-3.png",
        is_published: 1,
      },
    ];
    const stmt = db.prepare("INSERT INTO reviews (author, rating, comment, image_path, is_published) VALUES (?, ?, ?, ?, ?)");
    for (const r of initialReviews) {
      stmt.run(r.author, r.rating, r.comment, r.image_path, r.is_published);
    }
  }

  // Check projects
  const projCount = db.prepare("SELECT COUNT(*) as count FROM projects").get().count;
  if (projCount === 0) {
    const initialProjects = [
      {
        title: "Nordic Goods Co. · Automated Dropshipping Storefront",
        site_name: "Nordic Goods Co.",
        site_url: "https://nordic-goods.example.com",
        description: "High-volume dropshipping and direct-to-consumer e-commerce storefront with automated inventory fulfillment and sub-second Apple Pay checkout.",
        category: "Web Development · E-Commerce",
        image_url: "/work/nordic-goods.jpg",
        is_published: 1,
      },
      {
        title: "Krypton Horology: Luxury Chrono Storefront",
        site_name: "Krypton Horology",
        site_url: "https://krypton-watches.example.com",
        description: "Bespoke high-contrast e-commerce storefront with 3D product previews and ultra-fast checkout.",
        category: "E-Commerce & Retail",
        image_url: "/work/krypton-horology.jpg",
        is_published: 1,
      },
      {
        title: "OmniCall: Custom CRM & VoIP Calling Telephony Desk",
        site_name: "OmniCall Sales Desk",
        site_url: "https://omnicall.example.com",
        description: "Bespoke sales CRM platform featuring an integrated browser-based VoIP dialer, real-time call recording, lead pipeline stages, and instant WhatsApp dispatching.",
        category: "Custom CRM & VoIP Telephony",
        image_url: "/work/crm-telephony.jpg",
        is_published: 1,
      },
      {
        title: "Aura Scale: High-ROAS Paid Ads & Drip Engine",
        site_name: "Aura Growth Engine",
        site_url: "https://aura-scale.example.com",
        description: "Multi-channel paid acquisition engine and automated email drip sequences generating 5.8x return on ad spend across Meta and Google.",
        category: "Paid Acquisition · Meta & Google Ads",
        image_url: "/work/ads-growth.jpg",
        is_published: 1,
      },
    ];
    const stmt = db.prepare("INSERT INTO projects (title, site_name, site_url, description, category, image_url, is_published) VALUES (?, ?, ?, ?, ?, ?, ?)");
    for (const pr of initialProjects) {
      stmt.run(pr.title, pr.site_name, pr.site_url, pr.description, pr.category, pr.image_url, pr.is_published);
    }
  }
}

export function getAllCrmData() {
  const db = getDb();
  const visitors = db.prepare("SELECT * FROM visitors ORDER BY created_at DESC LIMIT 50").all();
  const enquiries = db.prepare("SELECT * FROM enquiries ORDER BY created_at DESC LIMIT 50").all();
  const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC LIMIT 100").all();
  const backlinks = db.prepare("SELECT * FROM backlinks ORDER BY created_at DESC LIMIT 50").all();
  const blogs = db.prepare("SELECT * FROM blog_posts ORDER BY created_at DESC LIMIT 50").all();
  const reviews = db.prepare("SELECT * FROM reviews ORDER BY created_at DESC LIMIT 50").all();
  const projects = db.prepare("SELECT * FROM projects ORDER BY created_at DESC LIMIT 50").all();

  const totalVisitors = db.prepare("SELECT COUNT(*) as count FROM visitors").get().count;
  const todayVisitors = db.prepare("SELECT COUNT(*) as count FROM visitors WHERE date(created_at) = date('now')").get().count;
  const totalLeads = db.prepare("SELECT COUNT(*) as count FROM leads").get().count;
  const newLeads = db.prepare("SELECT COUNT(*) as count FROM leads WHERE status = 'new'").get().count;
  const totalEnquiries = db.prepare("SELECT COUNT(*) as count FROM enquiries").get().count;
  const totalBacklinks = db.prepare("SELECT COUNT(*) as count FROM backlinks").get().count;
  const totalBlogs = db.prepare("SELECT COUNT(*) as count FROM blog_posts").get().count;
  const totalReviews = db.prepare("SELECT COUNT(*) as count FROM reviews").get().count;
  const totalProjects = db.prepare("SELECT COUNT(*) as count FROM projects").get().count;

  // Regional breakdown
  const regions = db.prepare(`
    SELECT country, flag, COUNT(*) as count 
    FROM visitors 
    WHERE country IS NOT NULL AND country != '' 
    GROUP BY country, flag 
    ORDER BY count DESC 
    LIMIT 10
  `).all();

  // Browser breakdown
  const browsers = db.prepare(`
    SELECT browser, COUNT(*) as count 
    FROM visitors 
    WHERE browser IS NOT NULL AND browser != '' 
    GROUP BY browser 
    ORDER BY count DESC 
    LIMIT 8
  `).all();

  // Device breakdown
  const devices = db.prepare(`
    SELECT device, COUNT(*) as count 
    FROM visitors 
    WHERE device IS NOT NULL AND device != '' 
    GROUP BY device 
    ORDER BY count DESC
  `).all();

  return {
    stats: {
      totalVisitors,
      todayVisitors,
      totalLeads,
      newLeads,
      totalEnquiries,
      totalBacklinks,
      totalBlogs,
      totalReviews,
      totalProjects,
    },
    visitors,
    enquiries,
    leads,
    backlinks,
    blogs,
    reviews,
    projects,
    regions,
    browsers,
    devices,
    siteConfig: getSiteConfig(),
  };
}

export function recordVisitor({
  sessionId,
  ip,
  country,
  countryCode,
  flag,
  city,
  region,
  postalCode,
  street,
  browser,
  device,
  userAgent,
  pageUrl,
  referrer,
  durationSeconds,
  visitCount,
  isReturning,
  pagesViewed,
  cookiesData,
  email,
  name,
  phone,
}) {
  const db = getDb();
  const sess = sessionId || `sess_${Math.random().toString(36).slice(2, 8)}`;

  // If session already exists, update duration, page, and cookies
  const existing = db.prepare("SELECT id, pages_viewed, duration_seconds FROM visitors WHERE session_id = ?").get(sess);
  if (existing) {
    db.prepare(`
      UPDATE visitors 
      SET page_url = ?, 
          duration_seconds = COALESCE(?, duration_seconds),
          pages_viewed = COALESCE(?, pages_viewed),
          cookies_data = COALESCE(?, cookies_data),
          email = COALESCE(NULLIF(?, ''), email),
          name = COALESCE(NULLIF(?, ''), name),
          phone = COALESCE(NULLIF(?, ''), phone),
          created_at = CURRENT_TIMESTAMP
      WHERE session_id = ?
    `).run(
      pageUrl || "/",
      durationSeconds || null,
      pagesViewed || null,
      cookiesData || null,
      email || null,
      name || null,
      phone || null,
      sess
    );
    return;
  }

  const stmt = db.prepare(`
    INSERT INTO visitors (
      session_id, ip_address, country, country_code, flag, city, region, postal_code, street,
      browser, device, user_agent, page_url, referrer, duration_seconds, visit_count, is_returning,
      pages_viewed, cookies_data, email, name, phone, is_lead
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
  `);

  stmt.run(
    sess,
    ip || "127.0.0.1",
    country || "United States",
    countryCode || "US",
    flag || "🇺🇸",
    city || "San Francisco",
    region || "California",
    postalCode || "94105",
    street || "101 Market St, Financial District",
    browser || "Chrome",
    device || "Desktop",
    userAgent || "Mozilla/5.0",
    pageUrl || "/",
    referrer || "Direct",
    durationSeconds || 1,
    visitCount || 1,
    isReturning || 0,
    pagesViewed || JSON.stringify([{ url: pageUrl || "/", title: "Codex Dynamics", timestamp: new Date().toISOString() }]),
    cookiesData || JSON.stringify({ session_id: sess }),
    email || null,
    name || null,
    phone || null
  );
}

export function recordEnquiry({ name, email, phone, company, message, source }) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO enquiries (name, email, phone, company, message, source, status)
    VALUES (?, ?, ?, ?, ?, ?, 'new')
  `);
  const result = stmt.run(name, email, phone || "", company || "", message, source || "website");

  // Automatically create a lead record
  try {
    createLead({
      name,
      email,
      phone,
      company,
      message,
      source: source || "website_contact",
      status: "new",
      score: 75,
      notes: `Inbound enquiry from ${name}: "${(message || '').slice(0, 120)}"`,
    });
  } catch {
    // Non-blocking
  }

  // Attempt webhook notification if configured
  try {
    const webhookSetting = getSetting("webhook_url");
    if (webhookSetting && webhookSetting.startsWith("http")) {
      const payload = {
        event: "new_enquiry",
        lead: { name, email, phone, company, message, time: new Date().toISOString() },
      };
      fetch(webhookSetting, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }
  } catch {
    // Non-blocking
  }

  return result;
}

// Lead Management
export function getAllLeads() {
  const db = getDb();
  return db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
}

export function createLead(lead) {
  const db = getDb();
  const stmt = db.prepare(`
    INSERT INTO leads (
      visitor_id, name, email, phone, company, message, source, status, score,
      notes, ip_address, country, flag, city, postal_code, street, pages_viewed_count, duration_seconds
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  return stmt.run(
    lead.visitor_id || null,
    lead.name || "Anonymous Lead",
    lead.email || "",
    lead.phone || "",
    lead.company || "",
    lead.message || "",
    lead.source || "manual",
    lead.status || "new",
    lead.score || 50,
    lead.notes || "",
    lead.ip_address || "",
    lead.country || "United States",
    lead.flag || "🇺🇸",
    lead.city || "",
    lead.postal_code || "",
    lead.street || "",
    lead.pages_viewed_count || 1,
    lead.duration_seconds || 0
  );
}

export function addVisitorToLeads(visitorId, leadData = {}) {
  const db = getDb();
  const visitor = db.prepare("SELECT * FROM visitors WHERE id = ?").get(Number(visitorId));
  if (!visitor) {
    throw new Error("Visitor not found");
  }

  // Count pages viewed
  let pageCount = 1;
  try {
    if (visitor.pages_viewed) {
      const parsed = JSON.parse(visitor.pages_viewed);
      if (Array.isArray(parsed)) pageCount = parsed.length;
    }
  } catch {
    pageCount = 1;
  }

  // Mark visitor as lead
  db.prepare("UPDATE visitors SET is_lead = 1 WHERE id = ?").run(Number(visitorId));

  const result = createLead({
    visitor_id: visitor.id,
    name: leadData.name || visitor.name || `Lead from ${visitor.city || visitor.country}`,
    email: leadData.email || visitor.email || "",
    phone: leadData.phone || visitor.phone || "",
    company: leadData.company || "",
    message: leadData.message || `Promoted from visitor ${visitor.session_id} on ${visitor.page_url}`,
    source: leadData.source || "visitor_promotion",
    status: leadData.status || "new",
    score: leadData.score || Math.min(95, 40 + Math.floor((visitor.duration_seconds || 60) / 10) + pageCount * 5),
    notes: leadData.notes || `Visited ${visitor.visit_count} time(s). Total time: ${visitor.duration_seconds}s. Pages viewed: ${pageCount}.`,
    ip_address: visitor.ip_address,
    country: visitor.country,
    flag: visitor.flag,
    city: visitor.city,
    postal_code: visitor.postal_code,
    street: visitor.street,
    pages_viewed_count: pageCount,
    duration_seconds: visitor.duration_seconds || 0,
  });

  return result;
}

export function updateLeadStatus(id, status) {
  const db = getDb();
  db.prepare("UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(status, Number(id));
}

export function updateLeadNotes(id, notes) {
  const db = getDb();
  db.prepare("UPDATE leads SET notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(notes, Number(id));
}

export function deleteLead(id) {
  const db = getDb();
  db.prepare("DELETE FROM leads WHERE id = ?").run(Number(id));
}

export function getPublicContent() {
  const db = getDb();
  const projects = db.prepare("SELECT * FROM projects WHERE is_published = 1 ORDER BY created_at DESC").all();
  const reviews = db.prepare("SELECT * FROM reviews WHERE is_published = 1 ORDER BY created_at DESC").all();
  const blogs = db.prepare("SELECT * FROM blog_posts WHERE status = 'published' ORDER BY created_at DESC").all();
  const siteConfig = getSiteConfig();
  return { projects, reviews, blogs, siteConfig };
}

export function getBlogPostBySlug(slug) {
  const db = getDb();
  const post = db.prepare("SELECT * FROM blog_posts WHERE slug = ?").get(slug);
  if (post) {
    db.prepare("UPDATE blog_posts SET views = views + 1 WHERE id = ?").run(post.id);
    post.views = (post.views || 0) + 1;
  }
  return post;
}

export function getSetting(key) {
  const db = getDb();
  const row = db.prepare("SELECT value FROM settings WHERE key = ?").get(key);
  return row ? row.value : null;
}

export function setSetting(key, value) {
  const db = getDb();
  db.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
    .run(key, String(value));
}

export function verifyAdminCredentials(email, password) {
  const db = getDb();
  const normalizedEmail = (email || "").trim().toLowerCase();
  const user = db.prepare("SELECT * FROM users WHERE LOWER(email) = ?").get(normalizedEmail);
  if (!user) return false;
  const validLocalAdmin = (normalizedEmail === "admin@codexdynamics.local" || normalizedEmail === "admin@codexdynamics.com") && password === "Admin123!";
  return user.password_hash === password || validLocalAdmin;
}

export function updateAdminPassword(email, newPassword) {
  const db = getDb();
  const normalizedEmail = (email || "").trim().toLowerCase();
  db.prepare("UPDATE users SET password_hash = ? WHERE LOWER(email) = ?").run(newPassword, normalizedEmail);
}

export function updateEnquiryStatus(id, status) {
  const db = getDb();
  db.prepare("UPDATE enquiries SET status = ? WHERE id = ?").run(status, Number(id));

  // Synchronize with linked lead if one exists with the same email
  try {
    const enquiry = db.prepare("SELECT email FROM enquiries WHERE id = ?").get(Number(id));
    if (enquiry?.email) {
      const leadStatusMap = {
        new: "new",
        contacted: "contacted",
        closed: "won"
      };
      const leadStatus = leadStatusMap[status] || status;
      db.prepare("UPDATE leads SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE email = ?").run(leadStatus, enquiry.email);
    }
  } catch {
    // Graceful sync ignore
  }
}

export function deleteEnquiry(id) {
  const db = getDb();
  db.prepare("DELETE FROM enquiries WHERE id = ?").run(Number(id));
}

export function deleteVisitor(id) {
  const db = getDb();
  db.prepare("DELETE FROM visitors WHERE id = ?").run(Number(id));
}

export function clearVisitors(olderThanDays = null) {
  const db = getDb();
  if (olderThanDays !== null && Number(olderThanDays) > 0) {
    db.prepare("DELETE FROM visitors WHERE datetime(created_at) < datetime('now', ? || ' days')").run(`-${Number(olderThanDays)}`);
  } else {
    db.prepare("DELETE FROM visitors").run();
  }
}

export function addBacklink({ name, url, notes }) {
  const db = getDb();
  db.prepare("INSERT INTO backlinks (name, url, notes) VALUES (?, ?, ?)").run(name, url, notes || "");
}

export function updateBacklink(id, { name, url, notes }) {
  const db = getDb();
  db.prepare(`
    UPDATE backlinks SET
      name = COALESCE(?, name),
      url = COALESCE(?, url),
      notes = COALESCE(?, notes)
    WHERE id = ?
  `).run(
    name !== undefined ? name : null,
    url !== undefined ? url : null,
    notes !== undefined ? notes : null,
    Number(id)
  );
}

export function deleteBacklink(id) {
  const db = getDb();
  db.prepare("DELETE FROM backlinks WHERE id = ?").run(Number(id));
}

export function getBlogPostById(id) {
  const db = getDb();
  return db.prepare("SELECT * FROM blog_posts WHERE id = ?").get(Number(id));
}

export function addBlogPost({
  title,
  slug,
  excerpt,
  content,
  meta_title,
  meta_description,
  status,
  cover_image,
  image_url,
  author,
  category,
  tags,
  focus_keyword,
  focusKeyword,
}) {
  const db = getDb();
  let baseSlug = (slug || title || "post")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  if (!baseSlug) baseSlug = `post-${Date.now()}`;

  // Ensure unique slug if adding new
  let safeSlug = baseSlug;
  const existing = db.prepare("SELECT id FROM blog_posts WHERE slug = ?").get(safeSlug);
  if (existing) {
    safeSlug = `${baseSlug}-${Date.now().toString(36)}`;
  }

  const safeTags = Array.isArray(tags) ? JSON.stringify(tags) : (typeof tags === "string" ? tags : "[]");
  const keyword = focus_keyword || focusKeyword || "";
  const postAuthor = author || "Codex Dynamics Research";
  const postCategory = category || "Engineering";
  const postCover = cover_image || image_url || "";
  const postStatus = status || "published";

  const stmt = db.prepare(`
    INSERT INTO blog_posts (
      title, slug, excerpt, content, meta_title, meta_description, status,
      cover_image, author, category, tags, focus_keyword, views, created_at, updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);

  const info = stmt.run(
    title,
    safeSlug,
    excerpt || "",
    content,
    meta_title || title,
    meta_description || excerpt || "",
    postStatus,
    postCover,
    postAuthor,
    postCategory,
    safeTags,
    keyword
  );

  return { id: info.lastInsertRowid, slug: safeSlug };
}

export function updateBlogPost(id, {
  title,
  slug,
  excerpt,
  content,
  meta_title,
  meta_description,
  status,
  cover_image,
  image_url,
  author,
  category,
  tags,
  focus_keyword,
  focusKeyword,
}) {
  const db = getDb();
  const safeTags = tags !== undefined
    ? (Array.isArray(tags) ? JSON.stringify(tags) : String(tags))
    : null;
  const keyword = focus_keyword !== undefined ? focus_keyword : (focusKeyword !== undefined ? focusKeyword : null);

  let safeSlug = slug;
  if (!safeSlug && title) {
    safeSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  const effectiveCover = cover_image !== undefined ? cover_image : (image_url !== undefined ? image_url : null);

  db.prepare(`
    UPDATE blog_posts SET
      title = COALESCE(?, title),
      slug = COALESCE(?, slug),
      excerpt = COALESCE(?, excerpt),
      content = COALESCE(?, content),
      meta_title = COALESCE(?, meta_title),
      meta_description = COALESCE(?, meta_description),
      status = COALESCE(?, status),
      cover_image = COALESCE(?, cover_image),
      author = COALESCE(?, author),
      category = COALESCE(?, category),
      tags = COALESCE(?, tags),
      focus_keyword = COALESCE(?, focus_keyword),
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(
    title !== undefined ? title : null,
    safeSlug !== undefined ? safeSlug : null,
    excerpt !== undefined ? excerpt : null,
    content !== undefined ? content : null,
    meta_title !== undefined ? meta_title : null,
    meta_description !== undefined ? meta_description : null,
    status !== undefined ? status : null,
    effectiveCover,
    author !== undefined ? author : null,
    category !== undefined ? category : null,
    safeTags,
    keyword,
    Number(id)
  );

  return getBlogPostById(id);
}

export function toggleBlogStatus(id, newStatus) {
  const db = getDb();
  const validStatus = ["published", "draft", "archived"].includes(newStatus) ? newStatus : "published";
  db.prepare("UPDATE blog_posts SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?").run(validStatus, Number(id));
  return getBlogPostById(id);
}

export function duplicateBlogPost(id) {
  const db = getDb();
  const original = getBlogPostById(id);
  if (!original) throw new Error("Blog post not found");

  const newTitle = `${original.title} (Copy)`;
  const newSlug = `${original.slug}-copy-${Date.now().toString(36)}`;

  const stmt = db.prepare(`
    INSERT INTO blog_posts (
      title, slug, excerpt, content, meta_title, meta_description, status,
      cover_image, author, category, tags, focus_keyword, views, created_at, updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, 'draft', ?, ?, ?, ?, ?, 0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `);

  const info = stmt.run(
    newTitle,
    newSlug,
    original.excerpt,
    original.content,
    original.meta_title,
    original.meta_description,
    original.cover_image,
    original.author,
    original.category,
    original.tags,
    original.focus_keyword
  );

  return getBlogPostById(info.lastInsertRowid);
}

export function deleteBlogPost(id) {
  const db = getDb();
  db.prepare("DELETE FROM blog_posts WHERE id = ?").run(Number(id));
}

export function addReview({ author, rating, comment, image_path, is_published }) {
  const db = getDb();
  db.prepare(`
    INSERT INTO reviews (author, rating, comment, image_path, is_published)
    VALUES (?, ?, ?, ?, ?)
  `).run(author, Number(rating) || 5, comment, image_path || null, is_published ? 1 : 0);
}

export function toggleReviewPublish(id, is_published) {
  const db = getDb();
  db.prepare("UPDATE reviews SET is_published = ? WHERE id = ?").run(is_published ? 1 : 0, Number(id));
}

export function deleteReview(id) {
  const db = getDb();
  db.prepare("DELETE FROM reviews WHERE id = ?").run(Number(id));
}

export function updateReview(id, { author, rating, comment, image_path, is_published }) {
  const db = getDb();
  db.prepare(`
    UPDATE reviews SET
      author = COALESCE(?, author),
      rating = COALESCE(?, rating),
      comment = COALESCE(?, comment),
      image_path = COALESCE(?, image_path),
      is_published = COALESCE(?, is_published)
    WHERE id = ?
  `).run(
    author !== undefined ? author : null,
    rating !== undefined ? Number(rating) : null,
    comment !== undefined ? comment : null,
    image_path !== undefined ? image_path : null,
    is_published !== undefined ? (is_published ? 1 : 0) : null,
    Number(id)
  );
}

export function addProject({ title, site_name, site_url, description, category, image_url, is_published }) {
  const db = getDb();
  db.prepare(`
    INSERT INTO projects (title, site_name, site_url, description, category, image_url, is_published)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(title, site_name || "", site_url, description || "", category || "Web Development", image_url || "", is_published ? 1 : 0);
}

export function updateProject(id, { title, site_name, site_url, description, category, image_url, is_published }) {
  const db = getDb();
  db.prepare(`
    UPDATE projects SET
      title = COALESCE(?, title),
      site_name = COALESCE(?, site_name),
      site_url = COALESCE(?, site_url),
      description = COALESCE(?, description),
      category = COALESCE(?, category),
      image_url = COALESCE(?, image_url),
      is_published = COALESCE(?, is_published)
    WHERE id = ?
  `).run(
    title !== undefined ? title : null,
    site_name !== undefined ? site_name : null,
    site_url !== undefined ? site_url : null,
    description !== undefined ? description : null,
    category !== undefined ? category : null,
    image_url !== undefined ? image_url : null,
    is_published !== undefined ? (is_published ? 1 : 0) : null,
    Number(id)
  );
}

export function toggleProjectPublish(id, is_published) {
  const db = getDb();
  db.prepare("UPDATE projects SET is_published = ? WHERE id = ?").run(is_published ? 1 : 0, Number(id));
}

export function deleteProject(id) {
  const db = getDb();
  db.prepare("DELETE FROM projects WHERE id = ?").run(Number(id));
}

export function restoreBackup(data) {
  const db = getDb();
  if (!data || typeof data !== "object") {
    throw new Error("Invalid backup format: root must be a JSON object");
  }

  db.exec("BEGIN TRANSACTION;");
  try {
    if (Array.isArray(data.reviews)) {
      db.prepare("DELETE FROM reviews").run();
      const insert = db.prepare("INSERT INTO reviews (id, author, rating, comment, image_path, is_published, created_at) VALUES (?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))");
      for (const r of data.reviews) {
        insert.run(r.id || null, r.author, Number(r.rating) || 5, r.comment, r.image_path || null, r.is_published ? 1 : 0, r.created_at || null);
      }
    }

    if (Array.isArray(data.projects)) {
      db.prepare("DELETE FROM projects").run();
      const insert = db.prepare("INSERT INTO projects (id, title, site_name, site_url, description, category, image_url, is_published, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))");
      for (const p of data.projects) {
        insert.run(p.id || null, p.title, p.site_name || "", p.site_url, p.description || "", p.category || "Web Development", p.image_url || "", p.is_published ? 1 : 0, p.created_at || null);
      }
    }

    if (Array.isArray(data.backlinks)) {
      db.prepare("DELETE FROM backlinks").run();
      const insert = db.prepare("INSERT INTO backlinks (id, name, url, notes, created_at) VALUES (?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))");
      for (const b of data.backlinks) {
        insert.run(b.id || null, b.name, b.url, b.notes || "", b.created_at || null);
      }
    }

    const posts = Array.isArray(data.blog_posts) ? data.blog_posts : (Array.isArray(data.blogs) ? data.blogs : null);
    if (posts) {
      db.prepare("DELETE FROM blog_posts").run();
      const insert = db.prepare("INSERT INTO blog_posts (id, title, slug, excerpt, content, meta_title, meta_description, status, cover_image, author, category, tags, focus_keyword, views, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP), COALESCE(?, CURRENT_TIMESTAMP))");
      for (const b of posts) {
        insert.run(
          b.id || null, b.title, b.slug, b.excerpt || "", b.content, b.meta_title || b.title, b.meta_description || b.excerpt || "",
          b.status || "draft", b.cover_image || "", b.author || "Codex Dynamics Research", b.category || "Engineering",
          typeof b.tags === "string" ? b.tags : JSON.stringify(b.tags || []), b.focus_keyword || "", Number(b.views) || 0,
          b.created_at || null, b.updated_at || null
        );
      }
    }

    if (Array.isArray(data.leads)) {
      db.prepare("DELETE FROM leads").run();
      const insert = db.prepare("INSERT INTO leads (id, visitor_id, name, email, phone, company, message, source, status, score, notes, ip_address, country, flag, city, postal_code, street, pages_viewed_count, duration_seconds, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP), COALESCE(?, CURRENT_TIMESTAMP))");
      for (const l of data.leads) {
        insert.run(
          l.id || null, l.visitor_id || null, l.name, l.email, l.phone || null, l.company || null, l.message || null,
          l.source || "website_contact", l.status || "new", Number(l.score) || 50, l.notes || null, l.ip_address || null,
          l.country || null, l.flag || null, l.city || null, l.postal_code || null, l.street || null,
          Number(l.pages_viewed_count) || 1, Number(l.duration_seconds) || 0, l.created_at || null, l.updated_at || null
        );
      }
    }

    if (Array.isArray(data.enquiries)) {
      db.prepare("DELETE FROM enquiries").run();
      const insert = db.prepare("INSERT INTO enquiries (id, name, email, phone, company, message, source, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, COALESCE(?, CURRENT_TIMESTAMP))");
      for (const e of data.enquiries) {
        insert.run(e.id || null, e.name, e.email, e.phone || null, e.company || null, e.message, e.source || "website", e.status || "new", e.created_at || null);
      }
    }

    if (data.settings && typeof data.settings === "object") {
      const setStmt = db.prepare("INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value");
      for (const [k, v] of Object.entries(data.settings)) {
        setStmt.run(k, typeof v === "string" ? v : JSON.stringify(v));
      }
    }

    db.exec("COMMIT;");
    return { ok: true, message: "CRM database successfully restored." };
  } catch (err) {
    db.exec("ROLLBACK;");
    throw err;
  }
}

export function getSiteConfig() {
  const db = getDb();
  const row = db.prepare("SELECT value FROM settings WHERE key = ?").get("site_content");
  if (!row || !row.value) {
    return DEFAULT_SITE_CONFIG;
  }
  try {
    const parsed = JSON.parse(row.value);
    return {
      ...DEFAULT_SITE_CONFIG,
      ...parsed,
      colors: { ...DEFAULT_SITE_CONFIG.colors, ...(parsed.colors || {}) },
      hero: { ...DEFAULT_SITE_CONFIG.hero, ...(parsed.hero || {}) },
      highlights: { ...DEFAULT_SITE_CONFIG.highlights, ...(parsed.highlights || {}) },
      services: {
        ...DEFAULT_SITE_CONFIG.services,
        ...(parsed.services || {}),
        items: Array.isArray(parsed.services?.items) && parsed.services.items.length > 0
          ? parsed.services.items.map((item) => {
              const defaultItem = DEFAULT_SITE_CONFIG.services.items.find((d) => d.id === item.id) || {};
              return { ...defaultItem, ...item };
            })
          : DEFAULT_SITE_CONFIG.services.items,
      },
      about: { ...DEFAULT_SITE_CONFIG.about, ...(parsed.about || {}) },
      studio: { ...DEFAULT_SITE_CONFIG.studio, ...(parsed.studio || {}) },
      results: { ...DEFAULT_SITE_CONFIG.results, ...(parsed.results || {}) },
      contact: { ...DEFAULT_SITE_CONFIG.contact, ...(parsed.contact || {}) },
      footer: { ...DEFAULT_SITE_CONFIG.footer, ...(parsed.footer || {}) },
      theme: { ...DEFAULT_SITE_CONFIG.theme, ...(parsed.theme || {}) },
      tidio: { ...DEFAULT_SITE_CONFIG.tidio, ...(parsed.tidio || {}) },
      headerSocials: {
        ...DEFAULT_SITE_CONFIG.headerSocials,
        ...(parsed.headerSocials || {}),
        linkedin: { ...DEFAULT_SITE_CONFIG.headerSocials.linkedin, ...(parsed.headerSocials?.linkedin || {}) },
        x: { ...DEFAULT_SITE_CONFIG.headerSocials.x, ...(parsed.headerSocials?.x || {}) },
        github: { ...DEFAULT_SITE_CONFIG.headerSocials.github, ...(parsed.headerSocials?.github || {}) },
        instagram: { ...DEFAULT_SITE_CONFIG.headerSocials.instagram, ...(parsed.headerSocials?.instagram || {}) },
        facebook: { ...DEFAULT_SITE_CONFIG.headerSocials.facebook, ...(parsed.headerSocials?.facebook || {}) },
      },
      socialContacts:
        Array.isArray(parsed.socialContacts) && parsed.socialContacts.length > 0
          ? parsed.socialContacts
          : DEFAULT_SITE_CONFIG.socialContacts,
      addresses:
        Array.isArray(parsed.addresses) && parsed.addresses.length > 0
          ? parsed.addresses
          : DEFAULT_SITE_CONFIG.addresses,
      branding: { ...DEFAULT_SITE_CONFIG.branding, ...(parsed.branding || {}) },
      banner: { ...DEFAULT_SITE_CONFIG.banner, ...(parsed.banner || {}) },
      whatsapp: { ...DEFAULT_SITE_CONFIG.whatsapp, ...(parsed.whatsapp || {}) },
      contactForm: { ...DEFAULT_SITE_CONFIG.contactForm, ...(parsed.contactForm || {}) },
      seo: { ...DEFAULT_SITE_CONFIG.seo, ...(parsed.seo || {}) },
      emergency: {
        ...DEFAULT_SITE_CONFIG.emergency,
        ...(parsed.emergency || {}),
        subtext: parsed.emergency?.subtext || parsed.emergency?.message || DEFAULT_SITE_CONFIG.emergency.subtext,
        message: parsed.emergency?.message || parsed.emergency?.subtext || DEFAULT_SITE_CONFIG.emergency.message,
        estimatedLaunch: parsed.emergency?.estimatedLaunch || parsed.emergency?.estimatedReturn || DEFAULT_SITE_CONFIG.emergency.estimatedLaunch,
        estimatedReturn: parsed.emergency?.estimatedReturn || parsed.emergency?.estimatedLaunch || DEFAULT_SITE_CONFIG.emergency.estimatedReturn,
      },
      codeInjection: { ...DEFAULT_SITE_CONFIG.codeInjection, ...(parsed.codeInjection || {}) },
      snapshots: Array.isArray(parsed.snapshots) ? parsed.snapshots : (DEFAULT_SITE_CONFIG.snapshots || []),
    };
  } catch {
    return DEFAULT_SITE_CONFIG;
  }
}

export function saveSiteConfig(config) {
  const db = getDb();
  db.prepare(
    "INSERT INTO settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
  ).run("site_content", JSON.stringify(config));
  return getSiteConfig();
}

export function resetSiteConfig() {
  const db = getDb();
  db.prepare("DELETE FROM settings WHERE key = ?").run("site_content");
  return DEFAULT_SITE_CONFIG;
}

export function bulkDeleteVisitors(ids = []) {
  if (!Array.isArray(ids) || ids.length === 0) return;
  const db = getDb();
  const placeholders = ids.map(() => "?").join(",");
  db.prepare(`DELETE FROM visitors WHERE id IN (${placeholders})`).run(...ids);
}

export function bulkDeleteLeads(ids = []) {
  if (!Array.isArray(ids) || ids.length === 0) return;
  const db = getDb();
  const placeholders = ids.map(() => "?").join(",");
  db.prepare(`DELETE FROM leads WHERE id IN (${placeholders})`).run(...ids);
}

export function bulkDeleteEnquiries(ids = []) {
  if (!Array.isArray(ids) || ids.length === 0) return;
  const db = getDb();
  const placeholders = ids.map(() => "?").join(",");
  db.prepare(`DELETE FROM enquiries WHERE id IN (${placeholders})`).run(...ids);
}

export function getChatThreads() {
  const db = getDb();
  try {
    return db.prepare("SELECT * FROM chat_threads ORDER BY updated_at DESC").all();
  } catch {
    return [];
  }
}

export function getChatMessages(threadId) {
  const db = getDb();
  try {
    return db.prepare("SELECT * FROM chat_messages WHERE thread_id = ? ORDER BY created_at ASC").all(threadId);
  } catch {
    return [];
  }
}

export function sendChatMessage({ threadId, sender = "visitor", senderName = "Visitor", message = "", visitorInfo = {} }) {
  const db = getDb();
  const tId = threadId || `thread_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const now = new Date().toISOString();

  let thread = null;
  try {
    thread = db.prepare("SELECT * FROM chat_threads WHERE id = ?").get(tId);
  } catch (_err) {
    // Thread not found or query failed
  }

  if (!thread) {
    db.prepare(`
      INSERT INTO chat_threads (id, visitor_session, visitor_name, visitor_email, visitor_phone, status, unread_count, last_message, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 'active', ?, ?, ?, ?)
    `).run(
      tId,
      visitorInfo?.sessionId || "",
      visitorInfo?.name || senderName || "Visitor",
      visitorInfo?.email || "",
      visitorInfo?.phone || "",
      sender === "visitor" ? 1 : 0,
      message,
      now,
      now
    );
    thread = db.prepare("SELECT * FROM chat_threads WHERE id = ?").get(tId);
  } else {
    const unreadDelta = sender === "visitor" ? (thread.unread_count || 0) + 1 : 0;
    db.prepare(`
      UPDATE chat_threads
      SET last_message = ?, updated_at = ?, unread_count = ?
      WHERE id = ?
    `).run(message, now, unreadDelta, tId);
    thread = db.prepare("SELECT * FROM chat_threads WHERE id = ?").get(tId);
  }

  const stmt = db.prepare(`
    INSERT INTO chat_messages (thread_id, sender, sender_name, message, is_read, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const res = stmt.run(tId, sender, senderName, message, sender === "operator" ? 1 : 0, now);
  const newMessage = {
    id: res.lastInsertRowid,
    thread_id: tId,
    sender,
    sender_name: senderName,
    message,
    is_read: sender === "operator" ? 1 : 0,
    created_at: now
  };

  return { thread, message: newMessage };
}

export function markChatThreadRead(threadId) {
  const db = getDb();
  try {
    db.prepare("UPDATE chat_threads SET unread_count = 0 WHERE id = ?").run(threadId);
    db.prepare("UPDATE chat_messages SET is_read = 1 WHERE thread_id = ?").run(threadId);
  } catch (_err) {
    // Ignore mark read error
  }
}

export function updateChatThreadStatus(threadId, status = "active") {
  const db = getDb();
  try {
    db.prepare("UPDATE chat_threads SET status = ? WHERE id = ?").run(status, threadId);
  } catch (_err) {
    // Ignore status update error
  }
}

export function deleteChatThread(threadId) {
  const db = getDb();
  try {
    db.prepare("DELETE FROM chat_messages WHERE thread_id = ?").run(threadId);
    db.prepare("DELETE FROM chat_threads WHERE id = ?").run(threadId);
  } catch (_err) {
    // Ignore thread deletion error
  }
}


