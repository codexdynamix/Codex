import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Plus,
  Undo2,
  Redo2,
  Info,
  Settings,
  TrendingUp,
  MoreVertical,
  Eye,
  Code,
  Laptop,
  Tablet,
  Smartphone,
  ExternalLink,
  Check,
  ChevronDown,
  ChevronRight,
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Quote,
  List,
  ListOrdered,
  Link as LinkIcon,
  Code2,
  Table as TableIcon,
  Image as ImageIcon,
  Zap,
  CheckCircle2,
  AlertCircle,
  X,
  Search,
  FileText,
} from "lucide-react";
import { toast } from "sonner";
import { calculateReadingTime } from "@/lib/reading-time";
import { analyzePowerWords, POWER_WORDS_DICTIONARY } from "@/lib/power-words";
import { getStoredCategories, addCategory, type BlogCategory } from "@/lib/categories";
import { ImagePickerModal, type ImageSelectionMeta } from "./ImagePickerModal";
import type { BlogPost } from "@/types/crm";

interface BlogEditorPageProps {
  editingId: number | null;
  initialBlog?: Partial<BlogPost> | null;
  onBack: () => void;
  onSave: (data: any, status: "published" | "draft" | "archived") => Promise<boolean>;
}

const PRESET_AUTHORS = [
  "Codex Dynamics Research",
  "Codex Dynamics Engineering",
  "Codex Dynamics Editorial Team",
  "Founder & Principal Architect",
  "DevOps & Infrastructure Team",
];

const POPULAR_TAGS = [
  "Engineering",
  "Architecture",
  "Performance",
  "Design Systems",
  "TypeScript",
  "React 19",
  "Core Web Vitals",
  "Next.js",
  "Micro-Frontends",
  "API Design",
  "Security",
  "Cloud",
];

export function BlogEditorPage({
  editingId,
  initialBlog,
  onBack,
  onSave,
}: BlogEditorPageProps) {
  // 1. Core Post Form States
  const [title, setTitle] = useState(initialBlog?.title || "");
  const [slug, setSlug] = useState(initialBlog?.slug || "");
  const [excerpt, setExcerpt] = useState(initialBlog?.excerpt || "");
  const [content, setContent] = useState(
    initialBlog?.content ||
      `## Executive Overview\n\nModern digital infrastructure demands sub-second latencies and uncompromised architectural resilience. In this technical deep-dive, we deconstruct the core principles required to ship zero-latency enterprise systems.\n\n### 1. Architectural Foundation\n\nBy leveraging edge computing and streaming hydration, application cold-starts can be systematically reduced by over **64%**.\n\n| Architecture Metric | Legacy Monolith | Modern Edge Blueprint |\n| :--- | :--- | :--- |\n| TTFB (Global) | 420ms | 38ms |\n| LCP Score | 2.8s | 0.72s |\n| Hydration Overhead | 450KB | 18KB |\n\n> "Simplicity is prerequisite for reliability." — Edsger W. Dijkstra\n\n### 2. Implementation Playbook\n\nTo implement these benchmarks, begin with modular route isolation and progressive bundle optimization.`
  );
  const [selectedCategory, setSelectedCategory] = useState(
    initialBlog?.category || "Engineering"
  );
  const [tags, setTags] = useState<string[]>(
    initialBlog?.tags
      ? Array.isArray(initialBlog.tags)
        ? initialBlog.tags
        : initialBlog.tags.split(",").map((t) => t.trim())
      : ["Engineering", "Architecture", "Performance"]
  );
  const [tagInput, setTagInput] = useState("");
  const [author, setAuthor] = useState(
    initialBlog?.author || "Codex Dynamics Research"
  );
  const [status, setStatus] = useState<"published" | "draft" | "archived">(
    (initialBlog?.status as any) || "published"
  );
  const [imageUrl, setImageUrl] = useState(
    initialBlog?.cover_image ||
      initialBlog?.image_url ||
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
  );
  const [imageAlt, setImageAlt] = useState(
    initialBlog?.image_alt || "High-performance software architecture"
  );
  const [imageCaption, setImageCaption] = useState(
    initialBlog?.image_caption || "Codex Dynamics systems architecture"
  );
  const [focusKeyword, setFocusKeyword] = useState(
    initialBlog?.focus_keyword || "Enterprise Architecture"
  );
  const [metaTitle, setMetaTitle] = useState(
    initialBlog?.meta_title || initialBlog?.title || ""
  );
  const [metaDescription, setMetaDescription] = useState(
    initialBlog?.meta_description || initialBlog?.excerpt || ""
  );
  const [isSticky, setIsSticky] = useState(false);
  const [allowComments, setAllowComments] = useState(true);
  const [allowPingbacks, setAllowPingbacks] = useState(true);

  // 2. Categories Management (WordPress Categories)
  const [allCategories, setAllCategories] = useState<BlogCategory[]>([]);
  const [categorySearch, setCategorySearch] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryParent, setNewCategoryParent] = useState("");

  // Load stored categories on mount
  useEffect(() => {
    const loaded = getStoredCategories();
    setAllCategories(loaded);
  }, []);

  const handleCreateCategory = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newCategoryName.trim()) {
      toast.error("Please enter a category name");
      return;
    }
    const created = addCategory(newCategoryName, newCategoryParent || undefined);
    setAllCategories(getStoredCategories());
    setSelectedCategory(created.name);
    setNewCategoryName("");
    setNewCategoryParent("");
    setIsAddingCategory(false);
    toast.success(`Category "${created.name}" created and selected!`);
  };

  // Filtered categories
  const filteredCategories = useMemo(() => {
    if (!categorySearch.trim()) return allCategories;
    const q = categorySearch.toLowerCase();
    return allCategories.filter(
      (c) => c.name.toLowerCase().includes(q) || c.slug.includes(q)
    );
  }, [allCategories, categorySearch]);

  // 3. UI and View States (WordPress Gutenberg Layout)
  const [editorView, setEditorView] = useState<"visual" | "code" | "preview">("visual");
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarTab, setSidebarTab] = useState<"post" | "seo">("post");
  const [isZenMode, setIsZenMode] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isDocumentOutlineOpen, setIsDocumentOutlineOpen] = useState(false);
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
  const [isBlockInserterOpen, setIsBlockInserterOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrlInput, setLinkUrlInput] = useState("");
  const [linkTextInput, setLinkTextInput] = useState("");

  // Accordion states in WordPress Sidebar
  const [accordionSummary, setAccordionSummary] = useState(true);
  const [accordionCategories, setAccordionCategories] = useState(true);
  const [accordionTags, setAccordionTags] = useState(true);
  const [accordionFeaturedImage, setAccordionFeaturedImage] = useState(true);
  const [accordionExcerpt, setAccordionExcerpt] = useState(true);
  const [accordionDiscussion, setAccordionDiscussion] = useState(false);

  // Rank Math Meta Box Tab
  const [metaBoxTab, setMetaBoxTab] = useState<"general" | "power-words" | "social" | "advanced">("general");
  const [serpPreviewDevice, setSerpPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [selectedPowerCategory, setSelectedPowerCategory] = useState<string>("all");
  const [powerWordSearch, setPowerWordSearch] = useState("");

  const editorTextareaRef = useRef<HTMLTextAreaElement>(null);

  // Track changes for unsaved indicator
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [
    title,
    slug,
    content,
    excerpt,
    selectedCategory,
    tags,
    author,
    status,
    imageUrl,
    focusKeyword,
    metaTitle,
    metaDescription,
  ]);

  // Auto-generate slug from title if empty
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!slug || slug === title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")) {
      const autoSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(autoSlug);
    }
  };

  // Reading Time and Word Count Analytics
  const readingStats = useMemo(() => calculateReadingTime(content), [content]);

  const documentStats = useMemo(() => {
    const raw = content || "";
    const words = raw.split(/\s+/).filter(Boolean).length;
    const characters = raw.length;
    const paragraphs = raw.split(/\n\s*\n/).filter(Boolean).length;
    const headings = (raw.match(/^#{1,6}\s+.+$/gm) || []).length;
    const blocks = paragraphs + headings;
    const outline = (raw.match(/^(#{1,4})\s+(.+)$/gm) || []).map((line) => {
      const match = line.match(/^(#{1,4})\s+(.+)$/);
      if (!match) return { level: 2, text: line };
      return { level: match[1].length, text: match[2] };
    });
    return { words, characters, paragraphs, headings, blocks, outline };
  }, [content]);

  // Copywriting Power Words Analysis
  const powerWordsAnalysis = useMemo(() => {
    return analyzePowerWords(title, content);
  }, [title, content]);

  // Rank Math SEO Audit Calculation
  const rankMathScore = useMemo(() => {
    let score = 30; // base score
    const kw = focusKeyword.trim().toLowerCase();
    const t = title.toLowerCase();
    const c = content.toLowerCase();
    const s = slug.toLowerCase();
    const m = (metaDescription || excerpt).toLowerCase();

    const hasKwInTitle = kw && t.includes(kw);
    const hasKwInSlug = kw && s.includes(kw.replace(/\s+/g, "-"));
    const hasKwInContent = kw && c.includes(kw);
    const hasKwInMeta = kw && m.includes(kw);
    const hasGoodLength = documentStats.words >= 400;
    const hasPowerWord = powerWordsAnalysis.headlineHasPowerWord;
    const hasNumber = powerWordsAnalysis.headlineHasNumber;
    const hasFeaturedImg = Boolean(imageUrl);

    if (hasKwInTitle) score += 15;
    if (hasKwInSlug) score += 10;
    if (hasKwInContent) score += 10;
    if (hasKwInMeta) score += 10;
    if (hasGoodLength) score += 10;
    if (hasPowerWord) score += 10;
    if (hasNumber) score += 5;
    if (hasFeaturedImg) score += 5;

    return Math.min(100, Math.max(10, score));
  }, [focusKeyword, title, content, slug, metaDescription, excerpt, documentStats.words, powerWordsAnalysis, imageUrl]);

  // 10-Point Rank Math Checklist
  const rankMathChecks = useMemo(() => {
    const kw = focusKeyword.trim().toLowerCase();
    const t = title.toLowerCase();
    const c = content.toLowerCase();
    const s = slug.toLowerCase();
    const m = (metaDescription || excerpt).toLowerCase();

    return [
      {
        id: "kw-title",
        label: "Focus Keyword used in the SEO title",
        passed: Boolean(kw && t.includes(kw)),
        tip: "Add your primary keyword near the beginning of the title.",
      },
      {
        id: "kw-slug",
        label: "Focus Keyword used in the URL slug",
        passed: Boolean(kw && s.includes(kw.replace(/\s+/g, "-"))),
        tip: "Keep URL slug clean and focused on the target keyword.",
      },
      {
        id: "kw-content",
        label: "Focus Keyword found in the content body",
        passed: Boolean(kw && c.includes(kw)),
        tip: "Naturally mention your focus keyword in the introductory paragraphs.",
      },
      {
        id: "kw-meta",
        label: "Focus Keyword used in Meta Description",
        passed: Boolean(kw && m.includes(kw)),
        tip: "Include target keywords to drive organic search click-through rate.",
      },
      {
        id: "length",
        label: "Article length is comprehensive (400+ words)",
        passed: documentStats.words >= 400,
        tip: `Current length is ${documentStats.words} words. Aim for 600+ words for deep authority.`,
      },
      {
        id: "power-word",
        label: "Headline contains a psychological Power Word",
        passed: powerWordsAnalysis.headlineHasPowerWord,
        tip: "Power words (e.g. 'Blueprint', 'Proven', 'Zero-Latency') boost CTR by 38%.",
      },
      {
        id: "headline-num",
        label: "Headline contains a specific metric or number",
        passed: powerWordsAnalysis.headlineHasNumber,
        tip: "Numbers in headlines (e.g. 'Sub-50ms', '42%') increase credibility.",
      },
      {
        id: "featured-img",
        label: "Featured image specified with accessible Alt text",
        passed: Boolean(imageUrl && imageAlt),
        tip: "Featured images improve social cards and reader retention.",
      },
      {
        id: "subheadings",
        label: "Content structured with H2 and H3 subheadings",
        passed: documentStats.headings >= 2,
        tip: "Break up long copy with descriptive section headings.",
      },
      {
        id: "title-length",
        label: "SEO Title length is optimal (35-65 chars)",
        passed: title.length >= 35 && title.length <= 65,
        tip: `Current title length is ${title.length} characters (ideal: 40-60).`,
      },
    ];
  }, [focusKeyword, title, content, slug, metaDescription, excerpt, documentStats, powerWordsAnalysis, imageUrl, imageAlt]);

  // Insert formatting into Markdown editor
  const handleInsertFormatting = (prefix: string, suffix: string = "", placeholder: string = "") => {
    const textarea = editorTextareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end) || placeholder;
    const replacement = `${prefix}${selectedText}${suffix}`;
    const newContent = content.substring(0, start) + replacement + content.substring(end);
    setContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selectedText.length);
    }, 50);
  };

  // Insert Power Word handler
  const handleInsertPowerWord = (word: string, target: "title" | "content") => {
    if (target === "title") {
      const newTitle = title ? `${word.charAt(0).toUpperCase() + word.slice(1)}: ${title}` : word;
      setTitle(newTitle);
      toast.success(`Added "${word}" to Headline!`);
    } else {
      handleInsertFormatting(`**${word}** `, "", "");
      toast.success(`Inserted "${word}" into article!`);
    }
  };

  // Add Tag
  const handleAddTag = (tagText: string) => {
    const trimmed = tagText.trim().replace(/^#/, "");
    if (!trimmed) return;
    if (!tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  // Save handler
  const handleSavePost = async (publishStatus: "published" | "draft" | "archived" = status) => {
    if (!title.trim()) {
      toast.error("Please provide a post title before saving.");
      return;
    }
    setIsSaving(true);
    try {
      const payload: any = {
        id: editingId || undefined,
        title: title.trim(),
        slug:
          slug.trim() ||
          title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, ""),
        content,
        excerpt: excerpt.trim() || content.slice(0, 160).replace(/[#*`_]/g, ""),
        category: selectedCategory,
        tags,
        author,
        status: publishStatus,
        image_url: imageUrl,
        cover_image: imageUrl,
        image_alt: imageAlt,
        image_caption: imageCaption,
        focus_keyword: focusKeyword,
        meta_title: metaTitle || title,
        meta_description: metaDescription || excerpt,
      };

      const ok = await onSave(payload, publishStatus);
      if (ok) {
        setStatus(publishStatus);
        setHasUnsavedChanges(false);
        toast.success(
          publishStatus === "published"
            ? "Article published live to blog!"
            : "Draft saved successfully!"
        );
      }
    } catch {
      toast.error("Failed to save post. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Insert link modal confirm
  const handleConfirmLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkUrlInput) return;
    const label = linkTextInput || linkUrlInput;
    handleInsertFormatting(`[${label}](`, `${linkUrlInput})`, "");
    setIsLinkModalOpen(false);
    setLinkUrlInput("");
    setLinkTextInput("");
  };

  return (
    <div
      className={`w-full bg-[#f0f0f1] text-[#1e1e1e] font-sans selection:bg-[#2271b1]/20 min-h-screen pb-16 ${
        isZenMode ? "bg-white" : ""
      }`}
    >
      {/* ========================================================================= */}
      {/* 1. WORDPRESS TOP ACTION BAR                                               */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 bg-white border border-[#dcdcde] rounded-xl px-3 sm:px-4 py-2.5 flex items-center justify-between shadow-xs select-none mb-6">
        {/* Left: Navigation, Inserter, Undo/Redo, Details */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Back to All Articles */}
          <button
            type="button"
            onClick={() => {
              if (hasUnsavedChanges) {
                if (window.confirm("You have unsaved changes. Return to posts list?")) {
                  onBack();
                }
              } else {
                onBack();
              }
            }}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-[#f0f0f1] text-[#1e1e1e] transition-colors cursor-pointer"
            title="View Posts"
          >
            <ArrowLeft className="size-4" />
            <span className="text-xs font-semibold hidden md:inline">Posts</span>
          </button>

          <div className="h-5 w-px bg-[#dcdcde] mx-1 hidden sm:block" />

          {/* WordPress Block Inserter Button (+) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsBlockInserterOpen(!isBlockInserterOpen)}
              className={`p-1.5 rounded text-white transition-all cursor-pointer ${
                isBlockInserterOpen ? "bg-[#1e1e1e]" : "bg-[#2271b1] hover:bg-[#135e96]"
              }`}
              title="Add Block"
            >
              <Plus className="size-4" />
            </button>

            {/* Block Inserter Dropdown Menu */}
            {isBlockInserterOpen && (
              <div className="absolute left-0 top-10 w-64 bg-white rounded-lg shadow-xl border border-[#dcdcde] p-2 z-50 space-y-1 animate-in fade-in zoom-in-95">
                <div className="text-[11px] font-bold text-neutral-400 px-2 py-1 uppercase tracking-wider">
                  Quick Blocks
                </div>
                <button
                  type="button"
                  onClick={() => {
                    handleInsertFormatting("\n\n### New Section Heading\n\n", "", "");
                    setIsBlockInserterOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-neutral-700 hover:bg-[#f0f0f1] rounded cursor-pointer text-left"
                >
                  <Heading2 className="size-4 text-neutral-500" />
                  <span>Heading 2</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleInsertFormatting("\n\n> Blockquote text here...\n\n", "", "");
                    setIsBlockInserterOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-neutral-700 hover:bg-[#f0f0f1] rounded cursor-pointer text-left"
                >
                  <Quote className="size-4 text-neutral-500" />
                  <span>Quote</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsImagePickerOpen(true);
                    setIsBlockInserterOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-neutral-700 hover:bg-[#f0f0f1] rounded cursor-pointer text-left"
                >
                  <ImageIcon className="size-4 text-neutral-500" />
                  <span>Image / Stock Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleInsertFormatting(
                      "\n\n| Specification | Baseline | Optimized |\n| :--- | :--- | :--- |\n| TTFB | 400ms | 40ms |\n| LCP | 2.4s | 0.8s |\n\n",
                      "",
                      ""
                    );
                    setIsBlockInserterOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-neutral-700 hover:bg-[#f0f0f1] rounded cursor-pointer text-left"
                >
                  <TableIcon className="size-4 text-neutral-500" />
                  <span>Benchmark Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleInsertFormatting("\n\n```typescript\n// Architecture Code\n\n```\n\n", "", "");
                    setIsBlockInserterOpen(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs text-neutral-700 hover:bg-[#f0f0f1] rounded cursor-pointer text-left"
                >
                  <Code2 className="size-4 text-neutral-500" />
                  <span>Code Syntax Block</span>
                </button>
              </div>
            )}
          </div>

          {/* Undo / Redo */}
          <button
            type="button"
            onClick={() => document.execCommand("undo")}
            className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer hidden sm:inline-flex"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => document.execCommand("redo")}
            className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer hidden sm:inline-flex"
            title="Redo (Ctrl+Y)"
          >
            <Redo2 className="size-4" />
          </button>

          {/* Document Details / Outline Popover */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsDocumentOutlineOpen(!isDocumentOutlineOpen)}
              className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer flex items-center gap-1"
              title="Details & Document Outline"
            >
              <Info className="size-4" />
              <span className="text-xs font-mono hidden md:inline text-neutral-500">
                {documentStats.words}w
              </span>
            </button>

            {isDocumentOutlineOpen && (
              <div className="absolute left-0 top-10 w-72 bg-white rounded-lg shadow-xl border border-[#dcdcde] p-4 z-50 animate-in fade-in zoom-in-95 space-y-3">
                <div className="flex items-center justify-between border-b border-[#dcdcde] pb-2">
                  <span className="text-xs font-bold text-[#1e1e1e]">Document Statistics</span>
                  <span className="text-[11px] font-mono text-neutral-500">{readingStats.text}</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-[#f0f0f1] rounded">
                    <div className="text-sm font-bold font-mono text-[#1e1e1e]">{documentStats.words}</div>
                    <div className="text-[10px] text-neutral-500">Words</div>
                  </div>
                  <div className="p-2 bg-[#f0f0f1] rounded">
                    <div className="text-sm font-bold font-mono text-[#1e1e1e]">{documentStats.characters}</div>
                    <div className="text-[10px] text-neutral-500">Characters</div>
                  </div>
                  <div className="p-2 bg-[#f0f0f1] rounded">
                    <div className="text-sm font-bold font-mono text-[#1e1e1e]">{documentStats.headings}</div>
                    <div className="text-[10px] text-neutral-500">Headings</div>
                  </div>
                </div>

                {documentStats.outline.length > 0 && (
                  <div className="space-y-1 pt-1">
                    <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                      Headings Outline
                    </div>
                    <div className="max-h-40 overflow-y-auto space-y-1 pr-1">
                      {documentStats.outline.map((h, i) => (
                        <div
                          key={i}
                          style={{ paddingLeft: `${(h.level - 1) * 12}px` }}
                          className="text-xs text-neutral-700 truncate hover:text-[#2271b1] cursor-pointer"
                        >
                          {h.text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Center: Status & View Switcher (Visual vs Code vs Preview) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
            {hasUnsavedChanges ? (
              <span className="inline-flex items-center gap-1 text-amber-600 font-medium">
                <span className="size-2 rounded-full bg-amber-500 animate-pulse" />
                Draft
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                <Check className="size-3 text-emerald-600" />
                Saved
              </span>
            )}
          </div>

          {/* WordPress Mode Switcher */}
          <div className="inline-flex items-center bg-[#f0f0f1] p-0.5 rounded-md border border-[#dcdcde]">
            <button
              type="button"
              onClick={() => setEditorView("visual")}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-all cursor-pointer flex items-center gap-1 ${
                editorView === "visual"
                  ? "bg-white text-[#1e1e1e] shadow-xs font-semibold"
                  : "text-neutral-600 hover:text-[#1e1e1e]"
              }`}
            >
              <Eye className="size-3.5" />
              <span className="hidden sm:inline">Visual</span>
            </button>
            <button
              type="button"
              onClick={() => setEditorView("code")}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-all cursor-pointer flex items-center gap-1 ${
                editorView === "code"
                  ? "bg-white text-[#1e1e1e] shadow-xs font-semibold"
                  : "text-neutral-600 hover:text-[#1e1e1e]"
              }`}
            >
              <Code className="size-3.5" />
              <span className="hidden sm:inline">Code / MD</span>
            </button>
            <button
              type="button"
              onClick={() => setEditorView("preview")}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-all cursor-pointer flex items-center gap-1 ${
                editorView === "preview"
                  ? "bg-white text-[#1e1e1e] shadow-xs font-semibold"
                  : "text-neutral-600 hover:text-[#1e1e1e]"
              }`}
            >
              <FileText className="size-3.5" />
              <span className="hidden sm:inline">Reader</span>
            </button>
          </div>
        </div>

        {/* Right: Save Draft, Preview Devices, Publish, Settings Gear, Rank Math Score */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Save Draft Button */}
          <button
            type="button"
            onClick={() => handleSavePost("draft")}
            disabled={isSaving}
            className="px-2.5 py-1.5 rounded text-xs font-medium text-[#2271b1] hover:bg-[#f0f0f1] transition-colors cursor-pointer hidden md:inline-flex"
          >
            Save draft
          </button>

          {/* Preview Device Dropdown */}
          <div className="hidden sm:flex items-center bg-[#f0f0f1] p-0.5 rounded border border-[#dcdcde]">
            <button
              type="button"
              onClick={() => setPreviewDevice("desktop")}
              className={`p-1 rounded cursor-pointer ${
                previewDevice === "desktop" ? "bg-white text-[#1e1e1e] shadow-xs" : "text-neutral-500"
              }`}
              title="Desktop View"
            >
              <Laptop className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice("tablet")}
              className={`p-1 rounded cursor-pointer ${
                previewDevice === "tablet" ? "bg-white text-[#1e1e1e] shadow-xs" : "text-neutral-500"
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice("mobile")}
              className={`p-1 rounded cursor-pointer ${
                previewDevice === "mobile" ? "bg-white text-[#1e1e1e] shadow-xs" : "text-neutral-500"
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone className="size-3.5" />
            </button>
          </div>

          {/* WordPress Signature Publish / Update Button */}
          <button
            type="button"
            onClick={() => handleSavePost("published")}
            disabled={isSaving}
            className="px-3 sm:px-4 py-1.5 rounded bg-[#2271b1] hover:bg-[#135e96] active:bg-[#0a4b78] text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
          >
            {isSaving ? (
              <span>Saving...</span>
            ) : status === "published" ? (
              <span>Update</span>
            ) : (
              <span>Publish...</span>
            )}
          </button>

          {/* Rank Math Quick Score Pill */}
          <button
            type="button"
            onClick={() => {
              setIsSidebarOpen(true);
              setSidebarTab("seo");
            }}
            className={`px-2 py-1 rounded text-xs font-bold font-mono flex items-center gap-1 cursor-pointer transition-all border ${
              rankMathScore >= 80
                ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                : rankMathScore >= 60
                ? "bg-amber-50 text-amber-700 border-amber-300"
                : "bg-red-50 text-red-700 border-red-300"
            }`}
            title="Rank Math SEO Score"
          >
            <TrendingUp className="size-3.5" />
            <span>{rankMathScore}/100</span>
          </button>

          {/* WordPress Settings Gear Icon (Toggles Right Inspector Sidebar) */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              isSidebarOpen ? "bg-[#1e1e1e] text-white" : "hover:bg-[#f0f0f1] text-[#2c3338]"
            }`}
            title="Settings (Ctrl+Shift+,)"
          >
            <Settings className="size-4" />
          </button>

          {/* More Options (...) */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer"
              title="Options"
            >
              <MoreVertical className="size-4" />
            </button>

            {isMoreMenuOpen && (
              <div className="absolute right-0 top-10 w-56 bg-white rounded-lg shadow-xl border border-[#dcdcde] p-2 z-50 text-xs space-y-1 animate-in fade-in">
                <button
                  type="button"
                  onClick={() => {
                    setIsZenMode(!isZenMode);
                    setIsMoreMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-2 py-1.5 text-neutral-700 hover:bg-[#f0f0f1] rounded cursor-pointer"
                >
                  <span>Distraction-free mode</span>
                  {isZenMode ? <Check className="size-3.5" /> : null}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(content);
                    toast.success("All markdown content copied to clipboard!");
                    setIsMoreMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-neutral-700 hover:bg-[#f0f0f1] rounded cursor-pointer"
                >
                  <span>Copy all content</span>
                </button>
                <div className="border-t border-[#dcdcde] my-1" />
                <a
                  href={`/blog?slug=${slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-between px-2 py-1.5 text-neutral-700 hover:bg-[#f0f0f1] rounded cursor-pointer"
                >
                  <span>View Public Post</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN LAYOUT: UNIFIED ENTITY (Left: Canvas + SEO | Right: Meta Sidebar) */}
      {/* ========================================================================= */}
      <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
        {/* ======================================================================= */}
        {/* LEFT / CENTER WRITING CANVAS & RANK MATH SEO (Takes flex-1 min-w-0)     */}
        {/* ======================================================================= */}
        <main className="flex-1 min-w-0 w-full space-y-6">
          <div className="w-full bg-white border border-[#dcdcde] rounded-xl p-5 sm:p-7 shadow-xs space-y-4">
            {/* PROMINENT TOP FORMATTING TOOLBAR — DIRECTLY VISIBLE AT THE TOP */}
            {editorView !== "preview" && (
              <div className="sticky top-16 z-20 bg-white/95 backdrop-blur-sm border border-[#dcdcde] rounded-lg shadow-xs p-1.5 flex items-center justify-between flex-wrap gap-1.5">
                <div className="flex items-center gap-1 flex-wrap">
                  <select
                    onChange={(e) => {
                      if (e.target.value === "h2") handleInsertFormatting("\n\n## ", "", "Section Heading");
                      if (e.target.value === "h3") handleInsertFormatting("\n\n### ", "", "Subheading");
                      if (e.target.value === "h4") handleInsertFormatting("\n\n#### ", "", "Minor Heading");
                      if (e.target.value === "p") handleInsertFormatting("\n\n", "", "Paragraph text");
                      e.target.value = "style";
                    }}
                    defaultValue="style"
                    className="px-2 py-1 text-xs border border-[#dcdcde] rounded bg-[#f0f0f1] text-[#2c3338] font-medium outline-none cursor-pointer hover:bg-[#e0e0e1]"
                    title="Select Heading Style"
                  >
                    <option value="style" disabled>Style</option>
                    <option value="p">Paragraph</option>
                    <option value="h2">Heading 2 (H2)</option>
                    <option value="h3">Heading 3 (H3)</option>
                    <option value="h4">Heading 4 (H4)</option>
                  </select>

                  <div className="h-4 w-px bg-[#dcdcde] mx-0.5" />

                  <button
                    type="button"
                    onClick={() => handleInsertFormatting("**", "**", "bold text")}
                    className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer"
                    title="Bold (Ctrl+B)"
                  >
                    <Bold className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertFormatting("*", "*", "italic text")}
                    className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer"
                    title="Italic (Ctrl+I)"
                  >
                    <Italic className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertFormatting("~~", "~~", "strikethrough")}
                    className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer"
                    title="Strikethrough"
                  >
                    <Strikethrough className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertFormatting("`", "`", "inline code")}
                    className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer"
                    title="Inline Code"
                  >
                    <Code className="size-4" />
                  </button>

                  <div className="h-4 w-px bg-[#dcdcde] mx-0.5" />

                  <button
                    type="button"
                    onClick={() => handleInsertFormatting("\n\n- ", "", "List item")}
                    className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer"
                    title="Bullet List"
                  >
                    <List className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertFormatting("\n\n1. ", "", "List item")}
                    className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer"
                    title="Numbered List"
                  >
                    <ListOrdered className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertFormatting("\n\n> ", "", "Quote text")}
                    className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer"
                    title="Blockquote"
                  >
                    <Quote className="size-4" />
                  </button>

                  <div className="h-4 w-px bg-[#dcdcde] mx-0.5" />

                  <button
                    type="button"
                    onClick={() => setIsLinkModalOpen(true)}
                    className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer"
                    title="Insert Link"
                  >
                    <LinkIcon className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsImagePickerOpen(true)}
                    className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2271b1] transition-colors cursor-pointer flex items-center gap-1 text-xs font-semibold"
                    title="Add Media / Photos"
                  >
                    <ImageIcon className="size-4 text-[#2271b1]" />
                    <span className="hidden sm:inline">Add Media</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting(
                        "\n\n| Technical Benchmark | Baseline | Optimized Status |\n| :--- | :--- | :--- |\n| TTFB | 42ms | Verified Zero Latency |\n| Bundle Size | 38KB | Minified & Compressed |\n\n",
                        "",
                        ""
                      )
                    }
                    className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer"
                    title="Insert Benchmark Table"
                  >
                    <TableIcon className="size-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertFormatting("\n\n```typescript\n// Technical implementation\n\n```\n\n", "", "")}
                    className="p-1.5 rounded hover:bg-[#f0f0f1] text-[#2c3338] transition-colors cursor-pointer"
                    title="Insert Code Syntax Block"
                  >
                    <Code2 className="size-4" />
                  </button>

                  <div className="h-4 w-px bg-[#dcdcde] mx-0.5" />

                  <button
                    type="button"
                    onClick={() => {
                      const sampleWords = ["proven", "architect", "blueprint", "zero-latency", "breakthrough", "scalable"];
                      const pick = sampleWords[Math.floor(Math.random() * sampleWords.length)];
                      handleInsertPowerWord(pick, "content");
                    }}
                    className="px-2 py-1 rounded bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Quick Insert Power Word"
                  >
                    <Zap className="size-3 text-purple-600" />
                    <span>+ Power Word</span>
                  </button>
                </div>

                {/* Right: Visual / Text (Code) / Reader tabs */}
                <div className="flex items-center gap-0.5 bg-[#f0f0f1] p-0.5 rounded border border-[#dcdcde]">
                  <button
                    type="button"
                    onClick={() => setEditorView("visual")}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
                      editorView === "visual"
                        ? "bg-white text-[#1e1e1e] font-semibold shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    Visual
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorView("code")}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
                      editorView === "code"
                        ? "bg-white text-[#1e1e1e] font-semibold shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    Text / Markdown
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditorView("preview")}
                    className={`px-2.5 py-1 text-xs font-medium rounded transition-all cursor-pointer ${
                      (editorView as string) === "preview"
                        ? "bg-white text-[#1e1e1e] font-semibold shadow-xs"
                        : "text-neutral-600 hover:text-neutral-900"
                    }`}
                  >
                    Reader View
                  </button>
                </div>
              </div>
            )}

            {/* Title Block (WordPress Enter title here) */}
            <div>
              <textarea
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Enter title here..."
                rows={1}
                className="w-full resize-none border-none outline-none font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-[#1e1e1e] placeholder:text-neutral-300 leading-tight tracking-tight bg-transparent"
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = "auto";
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
            </div>

            {/* Permalink bar (WordPress Classic URL) */}
            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono flex-wrap pb-2 border-b border-[#f0f0f1]">
              <span className="text-neutral-400">Permalink:</span>
              <span className="text-neutral-600">codexdynamics.com/blog?slug=</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="px-2 py-0.5 rounded border border-[#dcdcde] hover:border-[#2271b1] focus:border-[#2271b1] focus:bg-white bg-[#f0f0f1]/60 text-[#1e1e1e] font-mono text-xs transition-colors"
              />
              <a
                href={`/blog?slug=${slug}`}
                target="_blank"
                rel="noreferrer"
                className="text-[#2271b1] hover:underline flex items-center gap-0.5 font-sans text-xs font-semibold ml-1"
              >
                <span>View Public Post</span>
                <ExternalLink className="size-3" />
              </a>
            </div>

            {/* Content Area Rendering: Visual Mode vs Code/Markdown vs Live Reader */}
            {editorView === "code" ? (
              <div className="relative">
                <textarea
                  ref={editorTextareaRef}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Start writing in Markdown, or paste your draft..."
                  rows={20}
                  className="w-full font-mono text-sm leading-relaxed p-4 border border-[#dcdcde] rounded-lg outline-none focus:border-[#2271b1] focus:ring-1 focus:ring-[#2271b1] bg-[#fdfdfd] text-[#1e1e1e] resize-y min-h-[450px]"
                />
              </div>
            ) : editorView === "visual" ? (
              <div className="space-y-4">
                {/* Visual Editor Canvas with Textarea + Live Styled View */}
                <div className="relative border border-[#dcdcde] rounded-lg bg-white overflow-hidden shadow-xs focus-within:border-[#2271b1] focus-within:ring-1 focus-within:ring-[#2271b1]">
                  <textarea
                    ref={editorTextareaRef}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Type '/' to choose a block, or begin typing your article content..."
                    rows={18}
                    className="w-full font-sans text-base leading-relaxed p-6 border-none outline-none resize-y min-h-[420px] text-[#2c3338] placeholder:text-neutral-400"
                  />
                  <div className="bg-[#f8f9fa] border-t border-[#dcdcde] px-4 py-2 flex items-center justify-between text-xs text-neutral-500 font-mono">
                    <span>Markdown Enabled</span>
                    <span>{documentStats.words} words • {readingStats.text}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Live Reader View */
              <div className="border border-[#dcdcde] rounded-xl p-6 sm:p-8 bg-white shadow-sm space-y-6">
                {imageUrl && (
                  <div className="relative rounded-xl overflow-hidden aspect-video max-h-[380px] bg-neutral-100">
                    <img
                      src={imageUrl}
                      alt={imageAlt || title}
                      className="w-full h-full object-cover"
                    />
                    {imageCaption && (
                      <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-xs p-2 text-center">
                        {imageCaption}
                      </div>
                    )}
                  </div>
                )}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-neutral-100 text-neutral-800">
                      {selectedCategory}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">• {readingStats.text}</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
                    {title || "Untitled Article"}
                  </h1>
                  <p className="text-sm text-neutral-500">
                    By <span className="font-semibold text-neutral-800">{author}</span> • Published{" "}
                    {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                {excerpt && (
                  <p className="text-base text-neutral-600 italic border-l-2 border-neutral-300 pl-4">
                    {excerpt}
                  </p>
                )}
                <div className="prose prose-neutral max-w-none text-neutral-800 leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
                  {content}
                </div>
              </div>
            )}
          </div>

          {/* =================================================================== */}
          {/* 3. RANK MATH SEO & POWER WORDS META BOX (Wordpress Bottom Metapanel)*/}
          {/* =================================================================== */}
          <section id="rank-math-meta-box" className="border border-[#dcdcde] rounded-xl bg-white shadow-xs overflow-hidden">
              {/* Meta Box Header (WordPress Rank Math Plugin Style) */}
              <div className="bg-[#f8f9fa] border-b border-[#dcdcde] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="size-6 rounded bg-[#2271b1] text-white flex items-center justify-center font-bold text-xs">
                    RM
                  </div>
                  <span className="font-bold text-sm text-[#1e1e1e]">Rank Math SEO Suite</span>
                </div>

                <div className="flex items-center gap-2">
                  <div
                    className={`px-2.5 py-1 rounded text-xs font-bold font-mono border ${
                      rankMathScore >= 80
                        ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                        : rankMathScore >= 60
                        ? "bg-amber-50 text-amber-700 border-amber-300"
                        : "bg-red-50 text-red-700 border-red-300"
                    }`}
                  >
                    SEO Score: {rankMathScore}/100
                  </div>
                </div>
              </div>

              {/* Meta Box Sub-tabs */}
              <div className="border-b border-[#dcdcde] bg-white px-4 flex items-center gap-4 text-xs font-semibold overflow-x-auto">
                <button
                  type="button"
                  onClick={() => setMetaBoxTab("general")}
                  className={`py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    metaBoxTab === "general"
                      ? "border-[#2271b1] text-[#2271b1]"
                      : "border-transparent text-neutral-600 hover:text-[#1e1e1e]"
                  }`}
                >
                  <Search className="size-3.5" />
                  <span>General (SERP & Focus Keyword)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMetaBoxTab("power-words")}
                  className={`py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    metaBoxTab === "power-words"
                      ? "border-purple-600 text-purple-600 font-bold"
                      : "border-transparent text-neutral-600 hover:text-purple-600"
                  }`}
                >
                  <Zap className="size-3.5" />
                  <span>Power Words & Headline Suite ({powerWordsAnalysis.totalPowerWordsFound} Found)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMetaBoxTab("social")}
                  className={`py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    metaBoxTab === "social"
                      ? "border-[#2271b1] text-[#2271b1]"
                      : "border-transparent text-neutral-600 hover:text-[#1e1e1e]"
                  }`}
                >
                  <ExternalLink className="size-3.5" />
                  <span>Social Share Preview</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMetaBoxTab("advanced")}
                  className={`py-2.5 border-b-2 transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                    metaBoxTab === "advanced"
                      ? "border-[#2271b1] text-[#2271b1]"
                      : "border-transparent text-neutral-600 hover:text-[#1e1e1e]"
                  }`}
                >
                  <Settings className="size-3.5" />
                  <span>Advanced & Schema</span>
                </button>
              </div>

              {/* Meta Box Content Body */}
              <div className="p-4 sm:p-6 space-y-6">
                {/* 3A. GENERAL TAB: FOCUS KEYWORD + SERP SNIPPET + TESTS */}
                {metaBoxTab === "general" && (
                  <div className="space-y-6">
                    {/* Focus Keyword Input */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-700 flex items-center justify-between">
                        <span>Focus Keyword</span>
                        <span className="text-[11px] text-neutral-500 font-normal">Primary search term to optimize for</span>
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={focusKeyword}
                          onChange={(e) => setFocusKeyword(e.target.value)}
                          placeholder="e.g. Enterprise Architecture"
                          className="flex-1 px-3 py-2 text-xs rounded border border-[#dcdcde] focus:border-[#2271b1] outline-none bg-white font-medium"
                        />
                        <button
                          type="button"
                          onClick={() => toast.success(`Focus keyword "${focusKeyword}" verified!`)}
                          className="px-3 py-2 rounded bg-[#f0f0f1] hover:bg-[#e0e0e0] text-xs font-semibold text-neutral-700 cursor-pointer"
                        >
                          Audit Keyword
                        </button>
                      </div>
                    </div>

                    {/* Google SERP Snippet Preview Simulator */}
                    <div className="p-4 rounded-lg bg-[#f8f9fa] border border-[#dcdcde] space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-neutral-700">Google SERP Snippet Preview</span>
                        <div className="inline-flex items-center bg-white p-0.5 rounded border border-[#dcdcde] text-xs">
                          <button
                            type="button"
                            onClick={() => setSerpPreviewDevice("desktop")}
                            className={`px-2 py-0.5 rounded cursor-pointer ${
                              serpPreviewDevice === "desktop" ? "bg-[#2271b1] text-white font-bold" : "text-neutral-600"
                            }`}
                          >
                            Desktop
                          </button>
                          <button
                            type="button"
                            onClick={() => setSerpPreviewDevice("mobile")}
                            className={`px-2 py-0.5 rounded cursor-pointer ${
                              serpPreviewDevice === "mobile" ? "bg-[#2271b1] text-white font-bold" : "text-neutral-600"
                            }`}
                          >
                            Mobile
                          </button>
                        </div>
                      </div>

                      {/* SERP Card */}
                      <div className="p-4 bg-white rounded border border-[#dcdcde] max-w-xl space-y-1 font-sans">
                        <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                          <span className="font-semibold text-neutral-800">Codex Dynamics</span>
                          <span className="text-neutral-400">› blog › {slug || "enterprise-architecture"}</span>
                        </div>
                        <h4 className="text-[#1a0dab] hover:underline text-base sm:text-lg font-medium cursor-pointer leading-snug line-clamp-1">
                          {metaTitle || title || "Untitled Article | Codex Dynamics Blog"}
                        </h4>
                        <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                          {metaDescription ||
                            excerpt ||
                            content.slice(0, 155).replace(/[#*`_]/g, "") ||
                            "Explore in-depth engineering architectures, performance benchmarks, and design systems from the Codex Dynamics technical team."}
                        </p>
                      </div>

                      {/* Edit Snippet Inputs */}
                      <div className="pt-2 space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-xs text-neutral-600 mb-1">
                            <span>SEO Title</span>
                            <span className="font-mono text-[10px]">{metaTitle.length}/60 chars</span>
                          </div>
                          <input
                            type="text"
                            value={metaTitle}
                            onChange={(e) => setMetaTitle(e.target.value)}
                            placeholder={title || "SEO Title..."}
                            className="w-full px-3 py-1.5 text-xs rounded border border-[#dcdcde] focus:border-[#2271b1] outline-none"
                          />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs text-neutral-600 mb-1">
                            <span>Meta Description</span>
                            <span className="font-mono text-[10px]">{metaDescription.length}/160 chars</span>
                          </div>
                          <textarea
                            value={metaDescription}
                            onChange={(e) => setMetaDescription(e.target.value)}
                            placeholder={excerpt || "Meta description for Google search results..."}
                            rows={2}
                            className="w-full px-3 py-1.5 text-xs rounded border border-[#dcdcde] focus:border-[#2271b1] outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* 10-Point Rank Math Audit Checklist */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                        Rank Math SEO Diagnostics Checklist
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {rankMathChecks.map((chk) => (
                          <div
                            key={chk.id}
                            className={`p-2.5 rounded border text-xs flex items-start gap-2.5 ${
                              chk.passed
                                ? "bg-emerald-50/50 border-emerald-200 text-neutral-800"
                                : "bg-amber-50/40 border-amber-200 text-neutral-800"
                            }`}
                          >
                            {chk.passed ? (
                              <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                            ) : (
                              <AlertCircle className="size-4 text-amber-500 shrink-0 mt-0.5" />
                            )}
                            <div>
                              <div className="font-medium">{chk.label}</div>
                              {!chk.passed && (
                                <div className="text-[11px] text-neutral-500 mt-0.5">{chk.tip}</div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3B. POWER WORDS & HEADLINE SUITE TAB (FIXED - NO CRASH) */}
                {metaBoxTab === "power-words" && (
                  <div className="space-y-6">
                    {/* Headline Performance Card */}
                    <div className="p-4 rounded-xl bg-purple-50/60 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="text-xs font-bold text-purple-900 flex items-center gap-1.5">
                          <Zap className="size-4 text-purple-600" />
                          <span>Headline Copywriting Score</span>
                        </div>
                        <p className="text-xs text-purple-700 mt-1">
                          Evaluates psychological curiosity, authority triggers, and character count for maximum CTR.
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-center">
                          <div className="text-2xl font-bold font-mono text-purple-900">
                            {powerWordsAnalysis.headlineScore}/100
                          </div>
                          <div className="text-[10px] text-purple-700 font-semibold uppercase">
                            {powerWordsAnalysis.headlineScore >= 80
                              ? "High Impact"
                              : powerWordsAnalysis.headlineScore >= 60
                              ? "Average"
                              : "Needs Power Word"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Headline Metrics Badges */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div className="p-3 bg-[#f8f9fa] border border-[#dcdcde] rounded text-center">
                        <div className="text-xs font-semibold text-neutral-500">Power Words in Title</div>
                        <div className="text-lg font-bold font-mono text-neutral-900 mt-0.5">
                          {powerWordsAnalysis.headlineMatches.length}
                        </div>
                      </div>
                      <div className="p-3 bg-[#f8f9fa] border border-[#dcdcde] rounded text-center">
                        <div className="text-xs font-semibold text-neutral-500">Power Words in Body</div>
                        <div className="text-lg font-bold font-mono text-neutral-900 mt-0.5">
                          {powerWordsAnalysis.contentMatches.length}
                        </div>
                      </div>
                      <div className="p-3 bg-[#f8f9fa] border border-[#dcdcde] rounded text-center">
                        <div className="text-xs font-semibold text-neutral-500">Contains Number</div>
                        <div className="text-lg font-bold text-neutral-900 mt-0.5">
                          {powerWordsAnalysis.headlineHasNumber ? "Yes" : "No"}
                        </div>
                      </div>
                      <div className="p-3 bg-[#f8f9fa] border border-[#dcdcde] rounded text-center">
                        <div className="text-xs font-semibold text-neutral-500">Headline Length</div>
                        <div className="text-lg font-bold font-mono text-neutral-900 mt-0.5">
                          {title.length} chars
                        </div>
                      </div>
                    </div>

                    {/* Power Words Category Filter & Search */}
                    <div className="space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider flex items-center gap-1.5">
                          <span>Psychological Power Words Lexicon</span>
                          <span className="text-neutral-400 font-normal">
                            (Click to insert into Headline or Body)
                          </span>
                        </h4>

                        <div className="relative w-full sm:w-56">
                          <Search className="size-3.5 absolute left-2.5 top-2.5 text-neutral-400" />
                          <input
                            type="text"
                            value={powerWordSearch}
                            onChange={(e) => setPowerWordSearch(e.target.value)}
                            placeholder="Filter power words..."
                            className="w-full pl-8 pr-3 py-1.5 text-xs rounded border border-[#dcdcde] bg-white outline-none focus:border-purple-600"
                          />
                        </div>
                      </div>

                      {/* Category Pills (Using Object.entries to prevent crash!) */}
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <button
                          type="button"
                          onClick={() => setSelectedPowerCategory("all")}
                          className={`px-2.5 py-1 rounded text-xs cursor-pointer transition-colors ${
                            selectedPowerCategory === "all"
                              ? "bg-purple-600 text-white font-bold"
                              : "bg-[#f0f0f1] text-neutral-700 hover:bg-[#e4e4e6]"
                          }`}
                        >
                          All Categories
                        </button>
                        {Object.entries(POWER_WORDS_DICTIONARY).map(([key, cat]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setSelectedPowerCategory(key)}
                            className={`px-2.5 py-1 rounded text-xs cursor-pointer transition-colors ${
                              selectedPowerCategory === key
                                ? "bg-purple-600 text-white font-bold"
                                : "bg-[#f0f0f1] text-neutral-700 hover:bg-[#e4e4e6]"
                            }`}
                          >
                            {cat.name}
                          </button>
                        ))}
                      </div>

                      {/* Power Word Cards Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1 max-h-72 overflow-y-auto pr-1">
                        {Object.entries(POWER_WORDS_DICTIONARY)
                          .filter(([key]) => selectedPowerCategory === "all" || selectedPowerCategory === key)
                          .flatMap(([_key, cat]) =>
                            cat.words
                              .filter((w) =>
                                powerWordSearch
                                  ? w.toLowerCase().includes(powerWordSearch.toLowerCase())
                                  : true
                              )
                              .map((word) => (
                                <div
                                  key={word}
                                  className="p-2 rounded-lg bg-white border border-[#dcdcde] hover:border-purple-400 hover:shadow-xs flex items-center justify-between gap-1 group transition-all"
                                >
                                  <span className="text-xs font-semibold text-neutral-800 capitalize truncate">
                                    {word}
                                  </span>
                                  <div className="flex items-center gap-1 shrink-0">
                                    <button
                                      type="button"
                                      onClick={() => handleInsertPowerWord(word, "title")}
                                      className="px-1.5 py-0.5 rounded bg-purple-100 hover:bg-purple-200 text-purple-800 text-[10px] font-bold cursor-pointer"
                                      title="Add to Headline Title"
                                    >
                                      +Title
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleInsertPowerWord(word, "content")}
                                      className="px-1.5 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[10px] font-medium cursor-pointer"
                                      title="Insert in Body"
                                    >
                                      +Body
                                    </button>
                                  </div>
                                </div>
                              ))
                          )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3C. SOCIAL PREVIEW TAB */}
                {metaBoxTab === "social" && (
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                        OpenGraph / Facebook & LinkedIn Card Preview
                      </h4>
                      <div className="max-w-md border border-[#dcdcde] rounded-lg overflow-hidden bg-white shadow-xs">
                        <div className="aspect-video bg-neutral-100 overflow-hidden">
                          <img
                            src={imageUrl}
                            alt={imageAlt || title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3 space-y-1 bg-[#f0f2f5]">
                          <div className="text-[10px] font-mono text-neutral-500 uppercase">
                            codexdynamics.com
                          </div>
                          <div className="text-sm font-bold text-neutral-900 line-clamp-1">
                            {metaTitle || title || "Untitled Article"}
                          </div>
                          <div className="text-xs text-neutral-600 line-clamp-2">
                            {metaDescription || excerpt || "Explore engineering insights at Codex Dynamics."}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3D. ADVANCED & SCHEMA TAB */}
                {metaBoxTab === "advanced" && (
                  <div className="space-y-4 max-w-lg">
                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        Robots Meta Tags
                      </label>
                      <div className="space-y-1 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="rounded text-[#2271b1]" />
                          <span>Index (Allow search engines to index this page)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" defaultChecked className="rounded text-[#2271b1]" />
                          <span>Follow (Follow links on this page)</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        Canonical URL
                      </label>
                      <input
                        type="text"
                        placeholder={`https://codexdynamics.com/blog?slug=${slug}`}
                        className="w-full px-3 py-1.5 text-xs rounded border border-[#dcdcde] bg-white"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-neutral-700 block mb-1">
                        Structured Data Schema Type
                      </label>
                      <select className="w-full px-3 py-1.5 text-xs rounded border border-[#dcdcde] bg-white">
                        <option>TechArticle</option>
                        <option>Article</option>
                        <option>BlogPosting</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </section>
        </main>

        {/* ======================================================================= */}
        {/* RIGHT COLUMN: WORDPRESS META SIDEBAR (Unified Entity with Canvas)        */}
        {/* ======================================================================= */}
        {isSidebarOpen && !isZenMode && (
          <aside className="w-full lg:w-[320px] xl:w-[340px] shrink-0 space-y-4 select-none">
            <div className="bg-white border border-[#dcdcde] rounded-xl shadow-xs overflow-hidden">
            {/* Sidebar Top Header with Tabs (Post vs SEO) */}
            <div className="sticky top-0 z-10 bg-white border-b border-[#dcdcde] flex items-center justify-between px-3">
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setSidebarTab("post")}
                  className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
                    sidebarTab === "post"
                      ? "border-[#2271b1] text-[#2271b1]"
                      : "border-transparent text-neutral-600 hover:text-[#1e1e1e]"
                  }`}
                >
                  Post
                </button>
                <button
                  type="button"
                  onClick={() => setSidebarTab("seo")}
                  className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer flex items-center gap-1 ${
                    sidebarTab === "seo"
                      ? "border-[#2271b1] text-[#2271b1]"
                      : "border-transparent text-neutral-600 hover:text-[#1e1e1e]"
                  }`}
                >
                  <span>Rank Math</span>
                  <span className="px-1 rounded bg-[#2271b1]/10 text-[#2271b1] font-mono text-[10px]">
                    {rankMathScore}
                  </span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className="p-1 rounded hover:bg-[#f0f0f1] text-neutral-500 cursor-pointer"
                title="Close settings"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Tab 1: POST SETTINGS (WordPress Standard Accordions) */}
            {sidebarTab === "post" && (
              <div className="divide-y divide-[#dcdcde] text-xs">
                {/* 1. Summary / Status & Visibility Accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => setAccordionSummary(!accordionSummary)}
                    className="w-full px-4 py-3 flex items-center justify-between font-bold text-neutral-800 hover:bg-[#f8f9fa] cursor-pointer"
                  >
                    <span>Summary</span>
                    {accordionSummary ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                  </button>

                  {accordionSummary && (
                    <div className="px-4 pb-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Visibility</span>
                        <span className="text-[#2271b1] font-semibold cursor-pointer">Public</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Publish</span>
                        <span className="text-[#2271b1] font-semibold cursor-pointer">Immediately</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Status</span>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value as any)}
                          className="px-2 py-1 rounded border border-[#dcdcde] bg-white text-neutral-800 font-medium"
                        >
                          <option value="published">Published</option>
                          <option value="draft">Draft</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-neutral-500">Author</span>
                        <select
                          value={author}
                          onChange={(e) => setAuthor(e.target.value)}
                          className="px-2 py-1 rounded border border-[#dcdcde] bg-white text-neutral-800 max-w-[150px] truncate"
                        >
                          {PRESET_AUTHORS.map((a) => (
                            <option key={a} value={a}>
                              {a}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="pt-2 border-t border-[#dcdcde] flex items-center justify-between">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isSticky}
                            onChange={(e) => setIsSticky(e.target.checked)}
                            className="rounded text-[#2271b1]"
                          />
                          <span className="text-neutral-700">Stick to top of blog</span>
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. CATEGORIES ACCORDION (+ ADD NEW CATEGORY) */}
                <div>
                  <button
                    type="button"
                    onClick={() => setAccordionCategories(!accordionCategories)}
                    className="w-full px-4 py-3 flex items-center justify-between font-bold text-neutral-800 hover:bg-[#f8f9fa] cursor-pointer"
                  >
                    <span>Categories</span>
                    {accordionCategories ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                  </button>

                  {accordionCategories && (
                    <div className="px-4 pb-4 space-y-3">
                      {/* Search categories */}
                      <input
                        type="text"
                        value={categorySearch}
                        onChange={(e) => setCategorySearch(e.target.value)}
                        placeholder="Search Categories..."
                        className="w-full px-2.5 py-1 text-xs rounded border border-[#dcdcde] bg-white outline-none focus:border-[#2271b1]"
                      />

                      {/* Categories List */}
                      <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                        {filteredCategories.map((c) => (
                          <label
                            key={c.id}
                            className="flex items-center gap-2 px-1 py-0.5 rounded hover:bg-[#f0f0f1] cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="postCategory"
                              checked={selectedCategory === c.name}
                              onChange={() => setSelectedCategory(c.name)}
                              className="text-[#2271b1]"
                            />
                            <span className={selectedCategory === c.name ? "font-bold text-[#1e1e1e]" : "text-neutral-700"}>
                              {c.name}
                            </span>
                          </label>
                        ))}
                      </div>

                      {/* + Add New Category Trigger & Form */}
                      {!isAddingCategory ? (
                        <button
                          type="button"
                          onClick={() => setIsAddingCategory(true)}
                          className="text-[#2271b1] hover:underline font-semibold flex items-center gap-1 cursor-pointer pt-1"
                        >
                          <Plus className="size-3" />
                          <span>Add New Category</span>
                        </button>
                      ) : (
                        <form onSubmit={handleCreateCategory} className="p-2.5 bg-[#f8f9fa] border border-[#dcdcde] rounded-lg space-y-2 pt-2 animate-in fade-in">
                          <div className="text-[11px] font-bold text-neutral-700">Add New Category</div>
                          <div>
                            <label className="text-[10px] text-neutral-500 block mb-0.5">Category Name *</label>
                            <input
                              type="text"
                              value={newCategoryName}
                              onChange={(e) => setNewCategoryName(e.target.value)}
                              placeholder="e.g. AI & Cloud"
                              autoFocus
                              className="w-full px-2 py-1 text-xs rounded border border-[#dcdcde] bg-white outline-none focus:border-[#2271b1]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] text-neutral-500 block mb-0.5">Parent Category (Optional)</label>
                            <select
                              value={newCategoryParent}
                              onChange={(e) => setNewCategoryParent(e.target.value)}
                              className="w-full px-2 py-1 text-xs rounded border border-[#dcdcde] bg-white"
                            >
                              <option value="">— None —</option>
                              {allCategories.map((c) => (
                                <option key={c.id} value={c.name}>
                                  {c.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex items-center justify-between pt-1">
                            <button
                              type="submit"
                              className="px-2.5 py-1 rounded bg-[#2271b1] hover:bg-[#135e96] text-white font-semibold text-xs cursor-pointer shadow-xs"
                            >
                              Add New Category
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setIsAddingCategory(false);
                                setNewCategoryName("");
                              }}
                              className="text-neutral-500 hover:text-neutral-800 text-xs cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  )}
                </div>

                {/* 3. TAGS ACCORDION */}
                <div>
                  <button
                    type="button"
                    onClick={() => setAccordionTags(!accordionTags)}
                    className="w-full px-4 py-3 flex items-center justify-between font-bold text-neutral-800 hover:bg-[#f8f9fa] cursor-pointer"
                  >
                    <span>Tags</span>
                    {accordionTags ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                  </button>

                  {accordionTags && (
                    <div className="px-4 pb-4 space-y-2">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === ",") {
                              e.preventDefault();
                              handleAddTag(tagInput);
                            }
                          }}
                          placeholder="Add new tag..."
                          className="flex-1 px-2.5 py-1 text-xs rounded border border-[#dcdcde] bg-white outline-none focus:border-[#2271b1]"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddTag(tagInput)}
                          className="px-2 py-1 rounded bg-[#f0f0f1] hover:bg-[#e0e0e0] font-semibold text-neutral-700 cursor-pointer text-xs"
                        >
                          Add
                        </button>
                      </div>

                      {/* Tag Chips */}
                      {tags.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap pt-1">
                          {tags.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded bg-[#f0f0f1] text-neutral-800 text-xs font-medium flex items-center gap-1"
                            >
                              <span>{t}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveTag(t)}
                                className="text-neutral-400 hover:text-red-600 cursor-pointer"
                              >
                                ×
                              </button>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Popular Tags Cloud */}
                      <div className="pt-2">
                        <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider mb-1">
                          Most Used Tags
                        </div>
                        <div className="flex items-center gap-1 flex-wrap">
                          {POPULAR_TAGS.map((pt) => (
                            <button
                              key={pt}
                              type="button"
                              onClick={() => handleAddTag(pt)}
                              disabled={tags.includes(pt)}
                              className={`text-[11px] px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${
                                tags.includes(pt)
                                  ? "bg-neutral-100 text-neutral-400 border-transparent cursor-default"
                                  : "bg-white text-neutral-600 border-[#dcdcde] hover:border-[#2271b1] hover:text-[#2271b1]"
                              }`}
                            >
                              +{pt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. FEATURED IMAGE ACCORDION */}
                <div>
                  <button
                    type="button"
                    onClick={() => setAccordionFeaturedImage(!accordionFeaturedImage)}
                    className="w-full px-4 py-3 flex items-center justify-between font-bold text-neutral-800 hover:bg-[#f8f9fa] cursor-pointer"
                  >
                    <span>Featured Image</span>
                    {accordionFeaturedImage ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                  </button>

                  {accordionFeaturedImage && (
                    <div className="px-4 pb-4 space-y-3">
                      {imageUrl ? (
                        <div className="space-y-2">
                          <div
                            onClick={() => setIsImagePickerOpen(true)}
                            className="relative aspect-video rounded-lg overflow-hidden border border-[#dcdcde] bg-neutral-100 group cursor-pointer"
                          >
                            <img
                              src={imageUrl}
                              alt={imageAlt || title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-semibold text-xs">
                              Click to Replace
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => setIsImagePickerOpen(true)}
                              className="text-[#2271b1] hover:underline font-semibold cursor-pointer"
                            >
                              Replace Image
                            </button>
                            <button
                              type="button"
                              onClick={() => setImageUrl("")}
                              className="text-red-600 hover:underline cursor-pointer"
                            >
                              Remove featured image
                            </button>
                          </div>
                          <div>
                            <label className="text-[10px] text-neutral-500 block mb-0.5">Alt Text (Accessibility)</label>
                            <input
                              type="text"
                              value={imageAlt}
                              onChange={(e) => setImageAlt(e.target.value)}
                              placeholder="Describe image..."
                              className="w-full px-2 py-1 text-xs rounded border border-[#dcdcde] bg-white outline-none"
                            />
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsImagePickerOpen(true)}
                          className="w-full py-8 border-2 border-dashed border-[#dcdcde] hover:border-[#2271b1] rounded-lg text-center cursor-pointer transition-colors bg-[#f8f9fa]"
                        >
                          <ImageIcon className="size-6 mx-auto text-neutral-400 mb-1" />
                          <span className="text-xs font-semibold text-[#2271b1]">
                            Set featured image
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* 5. EXCERPT ACCORDION */}
                <div>
                  <button
                    type="button"
                    onClick={() => setAccordionExcerpt(!accordionExcerpt)}
                    className="w-full px-4 py-3 flex items-center justify-between font-bold text-neutral-800 hover:bg-[#f8f9fa] cursor-pointer"
                  >
                    <span>Excerpt</span>
                    {accordionExcerpt ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                  </button>

                  {accordionExcerpt && (
                    <div className="px-4 pb-4 space-y-2">
                      <textarea
                        value={excerpt}
                        onChange={(e) => setExcerpt(e.target.value)}
                        placeholder="Write an excerpt (optional)..."
                        rows={3}
                        className="w-full px-2.5 py-1.5 text-xs rounded border border-[#dcdcde] bg-white outline-none focus:border-[#2271b1]"
                      />
                      <p className="text-[11px] text-neutral-500">
                        Excerpts are optional hand-crafted summaries of your content that can be used in your theme.
                      </p>
                    </div>
                  )}
                </div>

                {/* 6. DISCUSSION ACCORDION */}
                <div>
                  <button
                    type="button"
                    onClick={() => setAccordionDiscussion(!accordionDiscussion)}
                    className="w-full px-4 py-3 flex items-center justify-between font-bold text-neutral-800 hover:bg-[#f8f9fa] cursor-pointer"
                  >
                    <span>Discussion</span>
                    {accordionDiscussion ? <ChevronDown className="size-4" /> : <ChevronRight className="size-4" />}
                  </button>

                  {accordionDiscussion && (
                    <div className="px-4 pb-4 space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={allowComments}
                          onChange={(e) => setAllowComments(e.target.checked)}
                          className="rounded text-[#2271b1]"
                        />
                        <span className="text-neutral-700">Allow comments</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={allowPingbacks}
                          onChange={(e) => setAllowPingbacks(e.target.checked)}
                          className="rounded text-[#2271b1]"
                        />
                        <span className="text-neutral-700">Allow pingbacks & trackbacks</span>
                      </label>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: RANK MATH SEO SIDEBAR TAB */}
            {sidebarTab === "seo" && (
              <div className="p-4 space-y-4 text-xs">
                {/* Score Capsule */}
                <div className="p-4 rounded-lg bg-[#f8f9fa] border border-[#dcdcde] text-center space-y-1">
                  <div className="text-xs font-semibold text-neutral-500">Rank Math SEO Score</div>
                  <div
                    className={`text-3xl font-bold font-mono ${
                      rankMathScore >= 80 ? "text-emerald-600" : rankMathScore >= 60 ? "text-amber-600" : "text-red-600"
                    }`}
                  >
                    {rankMathScore}/100
                  </div>
                  <div className="text-[11px] text-neutral-600">
                    {rankMathScore >= 80
                      ? "Great! Ready for Search Engines"
                      : "Actionable improvements recommended below"}
                  </div>
                </div>

                {/* Focus Keyword quick input */}
                <div>
                  <label className="font-bold text-neutral-700 block mb-1">Focus Keyword</label>
                  <input
                    type="text"
                    value={focusKeyword}
                    onChange={(e) => setFocusKeyword(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded border border-[#dcdcde] bg-white font-medium"
                  />
                </div>

                {/* Top Recommendations */}
                <div className="space-y-2 pt-2 border-t border-[#dcdcde]">
                  <div className="font-bold text-neutral-800 uppercase tracking-wider text-[11px]">
                    Quick Audit Checklist
                  </div>
                  <div className="space-y-1.5">
                    {rankMathChecks.slice(0, 6).map((chk) => (
                      <div key={chk.id} className="flex items-start gap-1.5">
                        {chk.passed ? (
                          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertCircle className="size-3.5 text-amber-500 shrink-0 mt-0.5" />
                        )}
                        <span className={chk.passed ? "text-neutral-700" : "text-neutral-500"}>
                          {chk.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const el = document.querySelector("section");
                    el?.scrollIntoView({ behavior: "smooth" });
                    setMetaBoxTab("power-words");
                  }}
                  className="w-full py-2 rounded bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                >
                  <Zap className="size-3.5" />
                  <span>Open Power Words Suite</span>
                </button>
              </div>
            )}
            </div>
          </aside>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 4. MODALS & AUXILIARY WORKFLOWS                                           */}
      {/* ========================================================================= */}
      {/* Media / Stock Photo Modal */}
      <ImagePickerModal
        isOpen={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        currentValue={imageUrl}
        onSelect={(url: string, meta?: ImageSelectionMeta) => {
          setImageUrl(url);
          if (meta?.alt) setImageAlt(meta.alt);
          if (meta?.caption) setImageCaption(meta.caption);
          toast.success("Featured photo updated!");
        }}
      />

      {/* Insert Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <form
            onSubmit={handleConfirmLink}
            className="w-full max-w-sm bg-white rounded-lg p-5 shadow-2xl space-y-4 border border-[#dcdcde]"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-neutral-800">Insert Link</h3>
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-neutral-500 block mb-1">Link URL *</label>
                <input
                  type="url"
                  value={linkUrlInput}
                  onChange={(e) => setLinkUrlInput(e.target.value)}
                  placeholder="https://example.com"
                  autoFocus
                  required
                  className="w-full px-3 py-1.5 rounded border border-[#dcdcde] outline-none focus:border-[#2271b1]"
                />
              </div>
              <div>
                <label className="text-neutral-500 block mb-1">Anchor Text (Optional)</label>
                <input
                  type="text"
                  value={linkTextInput}
                  onChange={(e) => setLinkTextInput(e.target.value)}
                  placeholder="e.g. Read Case Study"
                  className="w-full px-3 py-1.5 rounded border border-[#dcdcde] outline-none focus:border-[#2271b1]"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="px-3 py-1.5 text-xs text-neutral-600 hover:bg-[#f0f0f1] rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold bg-[#2271b1] hover:bg-[#135e96] text-white rounded cursor-pointer"
              >
                Insert Link
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
