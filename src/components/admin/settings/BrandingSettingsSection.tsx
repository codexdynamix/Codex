import { Palette, Check, Image as ImageIcon, Type, Square } from "lucide-react";
import type { SiteConfig } from "@/types/site-editor";

interface BrandingSettingsSectionProps {
  config: SiteConfig;
  onChange: (updated: SiteConfig) => void;
}

const COLOR_PRESETS = [
  { id: "blue", name: "Codex Blue", primary: "#0071e3", accent: "#0071e3", bg: "#f5f5f7", card: "#ffffff" },
  { id: "teal", name: "Pacific Cyan", primary: "#0ea5e9", accent: "#0ea5e9", bg: "#f0f9ff", card: "#ffffff" },
  { id: "violet", name: "Royal Purple", primary: "#8b5cf6", accent: "#8b5cf6", bg: "#faf5ff", card: "#ffffff" },
  { id: "emerald", name: "Emerald Peak", primary: "#10b981", accent: "#10b981", bg: "#f0fdf4", card: "#ffffff" },
  { id: "amber", name: "Obsidian Gold", primary: "#d97706", accent: "#d97706", bg: "#fffbeb", card: "#ffffff" },
  { id: "dark", name: "Pure Midnight", primary: "#3b82f6", accent: "#60a5fa", bg: "#0f172a", card: "#1e293b" },
];

const RADIUS_OPTIONS = [
  { id: "sharp", label: "Sharp (0px)", desc: "Geometric architectural finish" },
  { id: "clean", label: "Clean (8px)", desc: "Apple HIG precision standard" },
  { id: "modern", label: "Modern (16px)", desc: "Soft fluid modern feel" },
  { id: "pill", label: "Pill (24px)", desc: "Ultra-rounded pill curves" },
] as const;

const FONT_OPTIONS = [
  { id: "system", name: "Apple System (SF Pro)", sample: "Precision engineering" },
  { id: "inter", name: "Inter Sans", sample: "Ultra-legible neo-grotesque" },
  { id: "playfair", name: "Playfair Display", sample: "Editorial luxury typography" },
  { id: "syne", name: "Syne Geometric", sample: "Avant-garde design agency" },
] as const;

export function BrandingSettingsSection({ config, onChange }: BrandingSettingsSectionProps) {
  const currentColors = config.colors || {
    primary: "#0071e3",
    background: "#f5f5f7",
    cardBg: "#ffffff",
    textMain: "#1d1d1f",
    textMuted: "#6e6e73",
    accent: "#0071e3",
  };

  const currentTheme = config.theme || {
    activeTheme: "codex-pro",
    fontFamily: "system",
    containerWidth: "1280px",
    borderRadius: "modern",
    headerStyle: "floating",
  };

  const branding = config.branding || {
    accentPreset: "blue",
    logoDark: "",
    logoLight: "",
    favicon: "/favicon.svg",
  };

  const applyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    onChange({
      ...config,
      colors: {
        ...currentColors,
        primary: preset.primary,
        accent: preset.accent,
      },
      branding: {
        ...branding,
        accentPreset: preset.id,
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* 1. Palette Presets */}
      <div className="rounded-2xl border border-hairline bg-surface-card p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-blue/10 text-blue">
            <Palette className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-label">Primary Brand Palette & Accents</h3>
            <p className="text-xs text-subtle">
              Instant chromatic colorways applied across buttons, badges, glows, and hover micro-interactions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
          {COLOR_PRESETS.map((preset) => {
            const isSelected =
              branding.accentPreset === preset.id ||
              currentColors.primary.toLowerCase() === preset.primary.toLowerCase();

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset)}
                className={`relative flex flex-col items-center p-3.5 rounded-xl border text-center transition cursor-pointer ${
                  isSelected
                    ? "border-blue bg-blue/5 shadow-xs"
                    : "border-black/8 hover:border-black/20 hover:bg-black/2"
                }`}
              >
                <div
                  className="size-8 rounded-full mb-2 shadow-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: preset.primary }}
                >
                  {isSelected && <Check className="size-4" />}
                </div>
                <span className="text-xs font-semibold text-label">{preset.name}</span>
                <span className="text-[10px] text-subtle font-mono mt-0.5">{preset.primary}</span>
              </button>
            );
          })}
        </div>

        {/* Custom hex colors */}
        <div className="mt-6 pt-5 border-t border-hairline grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-label mb-1.5">Primary Accent HEX</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentColors.primary || "#0071e3"}
                onChange={(e) =>
                  onChange({
                    ...config,
                    colors: { ...currentColors, primary: e.target.value, accent: e.target.value },
                  })
                }
                className="size-9 rounded-lg border border-black/10 cursor-pointer p-0.5 bg-white"
              />
              <input
                type="text"
                value={currentColors.primary || "#0071e3"}
                onChange={(e) =>
                  onChange({
                    ...config,
                    colors: { ...currentColors, primary: e.target.value, accent: e.target.value },
                  })
                }
                className="flex-1 text-xs font-mono px-3 py-2 rounded-lg border border-black/10 bg-white text-label"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-label mb-1.5">Text Dark (Main)</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentColors.textMain || "#1d1d1f"}
                onChange={(e) =>
                  onChange({
                    ...config,
                    colors: { ...currentColors, textMain: e.target.value },
                  })
                }
                className="size-9 rounded-lg border border-black/10 cursor-pointer p-0.5 bg-white"
              />
              <input
                type="text"
                value={currentColors.textMain || "#1d1d1f"}
                onChange={(e) =>
                  onChange({
                    ...config,
                    colors: { ...currentColors, textMain: e.target.value },
                  })
                }
                className="flex-1 text-xs font-mono px-3 py-2 rounded-lg border border-black/10 bg-white text-label"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-label mb-1.5">Muted Text / Captions</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentColors.textMuted || "#6e6e73"}
                onChange={(e) =>
                  onChange({
                    ...config,
                    colors: { ...currentColors, textMuted: e.target.value },
                  })
                }
                className="size-9 rounded-lg border border-black/10 cursor-pointer p-0.5 bg-white"
              />
              <input
                type="text"
                value={currentColors.textMuted || "#6e6e73"}
                onChange={(e) =>
                  onChange({
                    ...config,
                    colors: { ...currentColors, textMuted: e.target.value },
                  })
                }
                className="flex-1 text-xs font-mono px-3 py-2 rounded-lg border border-black/10 bg-white text-label"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Corner Radius & Surface Styling */}
      <div className="rounded-2xl border border-hairline bg-surface-card p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
            <Square className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-label">Corner Radius & Architectural Geometry</h3>
            <p className="text-xs text-subtle">
              Controls border radius curves across bento grids, buttons, modals, and preview cards.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          {RADIUS_OPTIONS.map((opt) => {
            const isSelected = (currentTheme.borderRadius || "modern") === opt.id;
            const radiusStyle =
              opt.id === "sharp"
                ? "rounded-none"
                : opt.id === "clean"
                ? "rounded-md"
                : opt.id === "modern"
                ? "rounded-xl"
                : "rounded-full";

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...config,
                    theme: { ...currentTheme, borderRadius: opt.id },
                  })
                }
                className={`p-4 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? "border-blue bg-blue/5 shadow-xs"
                    : "border-black/8 hover:border-black/20 hover:bg-black/2"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-label">{opt.label}</span>
                    {isSelected && <Check className="size-4 text-blue" />}
                  </div>
                  <p className="text-[11px] text-subtle">{opt.desc}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-black/5 flex items-center gap-2">
                  <div className={`h-6 w-12 bg-label/20 ${radiusStyle}`} />
                  <div className={`h-6 w-6 bg-blue/30 ${radiusStyle}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Typography & Font Pairing */}
      <div className="rounded-2xl border border-hairline bg-surface-card p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
            <Type className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-label">Typography Pairing & Hierarchy</h3>
            <p className="text-xs text-subtle">
              Curated font families engineered for readability, rhythmic contrast, and aesthetic poise.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
          {FONT_OPTIONS.map((f) => {
            const isSelected = (currentTheme.fontFamily || "system") === f.id;

            return (
              <button
                key={f.id}
                type="button"
                onClick={() =>
                  onChange({
                    ...config,
                    theme: { ...currentTheme, fontFamily: f.id },
                  })
                }
                className={`p-4 rounded-xl border text-left transition cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? "border-blue bg-blue/5 shadow-xs"
                    : "border-black/8 hover:border-black/20 hover:bg-black/2"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-label">{f.name}</span>
                    {isSelected && <Check className="size-3.5 text-blue" />}
                  </div>
                  <p className="text-sm text-subtle mt-1 italic">{f.sample}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 pt-5 border-t border-hairline flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="block text-xs font-semibold text-label">Container Max Width</span>
            <span className="text-xs text-subtle">Constraint for wide displays</span>
          </div>
          <select
            value={currentTheme.containerWidth || "1280px"}
            onChange={(e) =>
              onChange({
                ...config,
                theme: { ...currentTheme, containerWidth: e.target.value as any },
              })
            }
            className="text-xs px-3 py-2 rounded-lg border border-black/10 bg-white text-label cursor-pointer"
          >
            <option value="1200px">1200px (Compact & Dense)</option>
            <option value="1280px">1280px (Optimal Standard)</option>
            <option value="1440px">1440px (Spacious Wide Canvas)</option>
            <option value="full">Full Fluid Width (100%)</option>
          </select>
        </div>
      </div>

      {/* 4. Logo & Asset Manager */}
      <div className="rounded-2xl border border-hairline bg-surface-card p-6 shadow-xs">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
            <ImageIcon className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-label">Brand Logos & Favicon Assets</h3>
            <p className="text-xs text-subtle">
              Provide custom image URLs or paths for the header navigation mark and browser tab favicon.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-5">
          {/* Logo Light */}
          <div className="p-4 rounded-xl border border-black/8 bg-white/60">
            <label className="block text-xs font-semibold text-label mb-1">Header Logo (Light)</label>
            <p className="text-[11px] text-subtle mb-3">Shown on light backgrounds.</p>
            <input
              type="text"
              value={branding.logoLight || ""}
              onChange={(e) =>
                onChange({
                  ...config,
                  branding: { ...branding, logoLight: e.target.value },
                })
              }
              placeholder="/hero/logo.png or https://..."
              className="w-full text-xs px-3 py-2 rounded-lg border border-black/10 bg-white text-label mb-3"
            />
            <div className="h-14 rounded-lg bg-[#f5f5f7] border border-black/5 flex items-center justify-center p-2">
              {branding.logoLight ? (
                <img src={branding.logoLight} alt="Light logo preview" className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-[11px] text-subtle italic">No image (using default 'C' badge)</span>
              )}
            </div>
          </div>

          {/* Logo Dark */}
          <div className="p-4 rounded-xl border border-black/8 bg-white/60">
            <label className="block text-xs font-semibold text-label mb-1">Header Logo (Dark / Contrast)</label>
            <p className="text-[11px] text-subtle mb-3">Used on dark headers or hero overlays.</p>
            <input
              type="text"
              value={branding.logoDark || ""}
              onChange={(e) =>
                onChange({
                  ...config,
                  branding: { ...branding, logoDark: e.target.value },
                })
              }
              placeholder="/hero/logo-dark.png or https://..."
              className="w-full text-xs px-3 py-2 rounded-lg border border-black/10 bg-white text-label mb-3"
            />
            <div className="h-14 rounded-lg bg-[#1d1d1f] border border-black/5 flex items-center justify-center p-2 text-white">
              {branding.logoDark ? (
                <img src={branding.logoDark} alt="Dark logo preview" className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-[11px] text-white/50 italic">No image (using default 'C' badge)</span>
              )}
            </div>
          </div>

          {/* Favicon */}
          <div className="p-4 rounded-xl border border-black/8 bg-white/60">
            <label className="block text-xs font-semibold text-label mb-1">Browser Tab Favicon</label>
            <p className="text-[11px] text-subtle mb-3">SVG or PNG icon shown on browser tab.</p>
            <input
              type="text"
              value={branding.favicon || ""}
              onChange={(e) =>
                onChange({
                  ...config,
                  branding: { ...branding, favicon: e.target.value },
                })
              }
              placeholder="/favicon.svg"
              className="w-full text-xs px-3 py-2 rounded-lg border border-black/10 bg-white text-label mb-3"
            />
            <div className="h-14 rounded-lg bg-white border border-black/5 flex items-center justify-center gap-2 p-2">
              {branding.favicon ? (
                <>
                  <img src={branding.favicon} alt="Favicon preview" className="size-6 object-contain" />
                  <span className="text-xs font-medium text-label">Favicon Preview</span>
                </>
              ) : (
                <span className="text-[11px] text-subtle italic">Using /favicon.svg</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
