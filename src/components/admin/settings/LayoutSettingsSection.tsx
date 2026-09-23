import { ArrowUp, ArrowDown, Eye, EyeOff, RotateCcw, Layout, Compass, ShieldCheck } from "lucide-react";
import type { SiteConfig, ThemeSettings } from "@/types/site-editor";
import { DEFAULT_HOME_SEQUENCE, resolveSectionsOrder, resolveSectionVisibility } from "@/lib/theme-engine";

interface LayoutSettingsSectionProps {
  config: SiteConfig;
  onChange: (updated: SiteConfig) => void;
}

const SECTION_METADATA: Record<string, { label: string; desc: string; category: string }> = {
  hero: { label: "Hero Showcase & Reel", desc: "Interactive display, primary headline & dynamic badge", category: "Opening" },
  highlights: { label: "Bento Highlights", desc: "Precision capability matrix, live metrics & client badges", category: "Proof" },
  portfolio: { label: "Portfolio Works Showcase", desc: "Interactive project gallery with live case studies & preview modal", category: "Case Studies" },
  results: { label: "Results & Growth Metrics", desc: "Verifiable KPIs, lighthouse 100/100 scores & conversion stats", category: "Proof" },
  reviews: { label: "Client Testimonials Slider", desc: "Verified corporate client reviews and executive endorsements", category: "Social Proof" },
  about: { label: "About Agency & DNA", desc: "Philosophy, architectural principles and agency manifesto", category: "Story" },
  services: { label: "Services & Capabilities", desc: "Full spectrum of web engineering, UI/UX, and marketing offerings", category: "Offerings" },
  studio: { label: "Kyiv Office & Culture", desc: "Physical space, hardware lab & engineering culture", category: "Story" },
  blog: { label: "Insights & Technical Blog", desc: "Thought leadership, engineering breakdowns, and search engine articles", category: "Content" },
  contact: { label: "Contact & Project Inquiry", desc: "Direct inquiry form, phone, email, WhatsApp & Kyiv office map", category: "Conversion" },
};

const HERO_LAYOUT_OPTIONS = [
  { id: "streamer", label: "Streamer Showcase", desc: "Video background reel with bold typography & floating badges" },
  { id: "split", label: "Split Media (50/50)", desc: "High-contrast split editorial layout with side-by-side showcase" },
  { id: "centered", label: "Centered Minimal Focus", desc: "Pure high-impact typography with centered CTA stack" },
  { id: "bento", label: "Bento Interactive Grid", desc: "Multi-panel bento cards integrated directly into the hero zone" },
] as const;

const HEADER_OPTIONS = [
  { id: "floating", label: "Floating Island Bar", desc: "Detached pill navigation with blur backdrop" },
  { id: "minimal", label: "Clean Edge-to-Edge", desc: "Minimal borderless top navigation bar" },
  { id: "sticky", label: "Sticky Top Header", desc: "Header pinned to top on scroll with subtle border" },
] as const;

export function LayoutSettingsSection({ config, onChange }: LayoutSettingsSectionProps) {
  const currentTheme: ThemeSettings = config.theme || {
    activeTheme: "codex-pro",
    fontFamily: "system",
    containerWidth: "1280px",
    borderRadius: "modern",
    heroLayout: "streamer",
    headerStyle: "floating",
  };

  const sectionsOrder = resolveSectionsOrder(currentTheme);
  const sectionVisibility = resolveSectionVisibility(currentTheme);

  const handleToggleSection = (id: string) => {
    const nextVis = {
      ...sectionVisibility,
      [id]: sectionVisibility[id] === false ? true : false,
    };

    onChange({
      ...config,
      theme: {
        ...currentTheme,
        layout: {
          ...currentTheme.layout,
          sectionVisibility: nextVis,
          sectionsOrder,
        },
      },
    });
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sectionsOrder.length) return;

    const newOrder = [...sectionsOrder];
    const [moved] = newOrder.splice(index, 1);
    newOrder.splice(targetIndex, 0, moved);

    onChange({
      ...config,
      theme: {
        ...currentTheme,
        sectionsOrder: newOrder,
        layout: {
          ...currentTheme.layout,
          sectionsOrder: newOrder,
          sectionVisibility,
        },
      },
    });
  };

  const handleResetOrder = () => {
    const defaultOrder = [...DEFAULT_HOME_SEQUENCE];
    const defaultVis = Object.fromEntries(DEFAULT_HOME_SEQUENCE.map((id) => [id, true]));

    onChange({
      ...config,
      theme: {
        ...currentTheme,
        sectionsOrder: defaultOrder,
        layout: {
          ...currentTheme.layout,
          sectionsOrder: defaultOrder,
          sectionVisibility: defaultVis,
        },
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Header & Hero Layout Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-hairline bg-surface-card p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-blue/10 text-blue">
              <Layout className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-label">Hero Layout Variant</h3>
              <p className="text-xs text-subtle">Visual presentation of the homepage header section.</p>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {HERO_LAYOUT_OPTIONS.map((opt) => {
              const isSelected = (currentTheme.heroLayout || "streamer") === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...config,
                      theme: { ...currentTheme, heroLayout: opt.id },
                    })
                  }
                  className={`w-full p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "border-blue bg-blue/5 shadow-xs"
                      : "border-black/8 hover:border-black/20 hover:bg-black/2"
                  }`}
                >
                  <div>
                    <span className="text-xs font-semibold text-label">{opt.label}</span>
                    <p className="text-[11px] text-subtle mt-0.5">{opt.desc}</p>
                  </div>
                  {isSelected && <span className="text-xs font-bold text-blue">Active</span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-hairline bg-surface-card p-6 shadow-xs">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
              <Compass className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-label">Navigation Bar Style</h3>
              <p className="text-xs text-subtle">Floating island vs attached header chrome.</p>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            {HEADER_OPTIONS.map((opt) => {
              const isSelected = (currentTheme.headerStyle || "floating") === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() =>
                    onChange({
                      ...config,
                      theme: { ...currentTheme, headerStyle: opt.id },
                    })
                  }
                  className={`w-full p-3 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "border-blue bg-blue/5 shadow-xs"
                      : "border-black/8 hover:border-black/20 hover:bg-black/2"
                  }`}
                >
                  <div>
                    <span className="text-xs font-semibold text-label">{opt.label}</span>
                    <p className="text-[11px] text-subtle mt-0.5">{opt.desc}</p>
                  </div>
                  {isSelected && <span className="text-xs font-bold text-blue">Active</span>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Section Visibility & Sequence Reordering */}
      <div className="rounded-2xl border border-hairline bg-surface-card p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
              <ShieldCheck className="size-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-label">Homepage Section Sequence & Visibility</h3>
              <p className="text-xs text-subtle">
                Drag or use arrows to re-order sections. Toggle eyeball icon to show or hide sections without losing data.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleResetOrder}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-black/10 bg-white hover:bg-black/5 text-xs font-medium text-label transition cursor-pointer shadow-2xs self-start sm:self-auto"
          >
            <RotateCcw className="size-3.5 text-subtle" />
            Reset to Default Order
          </button>
        </div>

        <div className="divide-y divide-hairline border border-hairline rounded-xl overflow-hidden bg-white/70">
          {sectionsOrder.map((sectionId, idx) => {
            const meta = SECTION_METADATA[sectionId] || {
              label: sectionId.charAt(0).toUpperCase() + sectionId.slice(1),
              desc: "Custom content section",
              category: "General",
            };
            const isVisible = sectionVisibility[sectionId] !== false;

            return (
              <div
                key={sectionId}
                className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition ${
                  isVisible ? "bg-white" : "bg-black/[0.02] opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="size-7 rounded-lg bg-black/5 text-subtle flex items-center justify-center text-xs font-mono font-bold">
                    #{idx + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-label">{meta.label}</h4>
                      <span className="text-[10px] px-2 py-0.5 rounded-md bg-black/5 text-subtle uppercase tracking-wider font-medium">
                        {meta.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-subtle mt-0.5">{meta.desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {/* Visibility button */}
                  <button
                    type="button"
                    onClick={() => handleToggleSection(sectionId)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer border ${
                      isVisible
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                        : "border-black/10 bg-black/5 text-subtle"
                    }`}
                  >
                    {isVisible ? (
                      <>
                        <Eye className="size-3.5" />
                        Visible
                      </>
                    ) : (
                      <>
                        <EyeOff className="size-3.5" />
                        Hidden
                      </>
                    )}
                  </button>

                  {/* Reorder Buttons */}
                  <div className="flex items-center border border-black/10 rounded-lg overflow-hidden bg-white">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMove(idx, "up")}
                      className="p-1.5 hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed text-label cursor-pointer"
                      title="Move Section Up"
                    >
                      <ArrowUp className="size-4" />
                    </button>
                    <div className="w-[1px] h-4 bg-hairline" />
                    <button
                      type="button"
                      disabled={idx === sectionsOrder.length - 1}
                      onClick={() => handleMove(idx, "down")}
                      className="p-1.5 hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed text-label cursor-pointer"
                      title="Move Section Down"
                    >
                      <ArrowDown className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
