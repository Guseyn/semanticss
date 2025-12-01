// s-style-theme.js

const S_STYLE_THEMES = {
  // Neutral default (matches CSS)
  neutral: {
    "--color-bg": "#f5f5f5",
    "--color-surface": "#ffffff",
    "--color-surface-muted": "#f0f0f0",
    "--color-text": "#222222",
    "--color-text-muted": "#666666",
    "--color-border": "#dddddd",
    "--color-accent": "#3b82f6",
    "--color-accent-soft": "rgba(59, 130, 246, 0.1)",
    "--color-accent-strong": "#1d4ed8",
    "--color-link": "#444444",
    "--color-link-hover": "#3b82f6",
    "--color-header-bg": "#ffffff",
    "--color-header-border": "rgba(15, 23, 42, 0.06)",
    "--color-input-bg": "#ffffff",
    "--color-input-border": "#dddddd",
    "--color-input-text": "#222222",
    "--color-input-placeholder": "#aaaaaa",
    "--color-table-header-bg": "#f3f3f3",
    "--color-table-row-alt": "#fafafa",
    "--color-table-border": "#e3e3e3",
    "--color-details-bg": "#ffffff",
    "--color-details-border": "rgba(15, 23, 42, 0.05)",
    "--color-modal-backdrop": "rgba(15, 23, 42, 0.45)",
    "--color-tooltip-bg": "#111111",
    "--color-tooltip-text": "#f5f5f5"
  },

  // New York – cool dark grays + taxi accent
  "new-york": {
    "--color-bg": "#0f172a",
    "--color-surface": "#111827",
    "--color-surface-muted": "#020617",
    "--color-text": "#e5e7eb",
    "--color-text-muted": "#9ca3af",
    "--color-border": "#1f2937",
    "--color-accent": "#facc15",
    "--color-accent-soft": "rgba(250, 204, 21, 0.12)",
    "--color-accent-strong": "#eab308",
    "--color-link": "#e5e7eb",
    "--color-link-hover": "#facc15",
    "--color-header-bg": "#020617",
    "--color-header-border": "rgba(15, 23, 42, 0.8)",
    "--color-input-bg": "#020617",
    "--color-input-border": "#374151",
    "--color-input-text": "#f9fafb",
    "--color-input-placeholder": "#6b7280",
    "--color-table-header-bg": "#020617",
    "--color-table-row-alt": "#020617",
    "--color-table-border": "#1f2937",
    "--color-details-bg": "#020617",
    "--color-details-border": "rgba(148, 163, 184, 0.3)",
    "--color-modal-backdrop": "rgba(15, 23, 42, 0.85)",
    "--color-tooltip-bg": "#020617",
    "--color-tooltip-text": "#f9fafb"
  },

  // Tokyo – neon-ish accent on very clean dark
  tokyo: {
    "--color-bg": "#050816",
    "--color-surface": "#0b1120",
    "--color-surface-muted": "#020617",
    "--color-text": "#e5e7eb",
    "--color-text-muted": "#9ca3af",
    "--color-border": "#1e293b",
    "--color-accent": "#ec4899",
    "--color-accent-soft": "rgba(236, 72, 153, 0.18)",
    "--color-accent-strong": "#db2777",
    "--color-link": "#e5e7eb",
    "--color-link-hover": "#ec4899",
    "--color-header-bg": "#020617",
    "--color-header-border": "rgba(15, 23, 42, 0.7)",
    "--color-input-bg": "#020617",
    "--color-input-border": "#334155",
    "--color-input-text": "#f9fafb",
    "--color-input-placeholder": "#6b7280",
    "--color-table-header-bg": "#020617",
    "--color-table-row-alt": "#020617",
    "--color-table-border": "#1e293b",
    "--color-details-bg": "#020617",
    "--color-details-border": "rgba(148, 163, 184, 0.35)",
    "--color-modal-backdrop": "rgba(15, 23, 42, 0.85)",
    "--color-tooltip-bg": "#020617",
    "--color-tooltip-text": "#f9fafb"
  },

  // Paris – warm cream + muted wine accent
  paris: {
    "--color-bg": "#f8f3eb",
    "--color-surface": "#ffffff",
    "--color-surface-muted": "#f3e9de",
    "--color-text": "#2b2830",
    "--color-text-muted": "#7a6f64",
    "--color-border": "#e2d5c3",
    "--color-accent": "#b91c1c",
    "--color-accent-soft": "rgba(185, 28, 28, 0.08)",
    "--color-accent-strong": "#7f1d1d",
    "--color-link": "#4b5563",
    "--color-link-hover": "#b91c1c",
    "--color-header-bg": "#fdf7ef",
    "--color-header-border": "rgba(148, 126, 98, 0.3)",
    "--color-input-bg": "#fdf7ef",
    "--color-input-border": "#e2d5c3",
    "--color-input-text": "#2b2830",
    "--color-input-placeholder": "#a08f7c",
    "--color-table-header-bg": "#f3e9de",
    "--color-table-row-alt": "#fbf5ee",
    "--color-table-border": "#e2d5c3",
    "--color-details-bg": "#fdf7ef",
    "--color-details-border": "rgba(148, 126, 98, 0.35)",
    "--color-modal-backdrop": "rgba(107, 83, 67, 0.4)",
    "--color-tooltip-bg": "#2b2830",
    "--color-tooltip-text": "#fdf7ef"
  },

  // London – misty blue grays + deep green
  london: {
    "--color-bg": "#e5edf3",
    "--color-surface": "#ffffff",
    "--color-surface-muted": "#dde7f0",
    "--color-text": "#111827",
    "--color-text-muted": "#4b5563",
    "--color-border": "#cbd5e1",
    "--color-accent": "#166534",
    "--color-accent-soft": "rgba(22, 101, 52, 0.12)",
    "--color-accent-strong": "#14532d",
    "--color-link": "#1f2937",
    "--color-link-hover": "#166534",
    "--color-header-bg": "#f1f5f9",
    "--color-header-border": "rgba(148, 163, 184, 0.5)",
    "--color-input-bg": "#ffffff",
    "--color-input-border": "#cbd5e1",
    "--color-input-text": "#111827",
    "--color-input-placeholder": "#6b7280",
    "--color-table-header-bg": "#dde7f0",
    "--color-table-row-alt": "#edf2f7",
    "--color-table-border": "#cbd5e1",
    "--color-details-bg": "#f1f5f9",
    "--color-details-border": "rgba(148, 163, 184, 0.6)",
    "--color-modal-backdrop": "rgba(15, 23, 42, 0.55)",
    "--color-tooltip-bg": "#0f172a",
    "--color-tooltip-text": "#e5edf3"
  },

  // Tbilisi – warm stone + amber accent
  tbilisi: {
    "--color-bg": "#f4ede4",
    "--color-surface": "#ffffff",
    "--color-surface-muted": "#efe1d2",
    "--color-text": "#2b2119",
    "--color-text-muted": "#7a6753",
    "--color-border": "#dec6aa",
    "--color-accent": "#c47c2b",
    "--color-accent-soft": "rgba(196, 124, 43, 0.12)",
    "--color-accent-strong": "#8a4f1a",
    "--color-link": "#3b2f24",
    "--color-link-hover": "#c47c2b",
    "--color-header-bg": "#f8efe4",
    "--color-header-border": "rgba(157, 117, 78, 0.35)",
    "--color-input-bg": "#fdf6ee",
    "--color-input-border": "#dec6aa",
    "--color-input-text": "#2b2119",
    "--color-input-placeholder": "#a2876c",
    "--color-table-header-bg": "#efe1d2",
    "--color-table-row-alt": "#f8efe4",
    "--color-table-border": "#dec6aa",
    "--color-details-bg": "#fdf6ee",
    "--color-details-border": "rgba(157, 117, 78, 0.4)",
    "--color-modal-backdrop": "rgba(58, 36, 23, 0.55)",
    "--color-tooltip-bg": "#2b2119",
    "--color-tooltip-text": "#fdf6ee"
  },

  // Berlin – cool concrete + red accent
  berlin: {
    "--color-bg": "#e5e7eb",
    "--color-surface": "#f9fafb",
    "--color-surface-muted": "#d1d5db",
    "--color-text": "#111827",
    "--color-text-muted": "#4b5563",
    "--color-border": "#9ca3af",
    "--color-accent": "#b91c1c",
    "--color-accent-soft": "rgba(185, 28, 28, 0.12)",
    "--color-accent-strong": "#7f1d1d",
    "--color-link": "#1f2937",
    "--color-link-hover": "#b91c1c",
    "--color-header-bg": "#f3f4f6",
    "--color-header-border": "rgba(107, 114, 128, 0.4)",
    "--color-input-bg": "#ffffff",
    "--color-input-border": "#9ca3af",
    "--color-input-text": "#111827",
    "--color-input-placeholder": "#6b7280",
    "--color-table-header-bg": "#e5e7eb",
    "--color-table-row-alt": "#f3f4f6",
    "--color-table-border": "#d1d5db",
    "--color-details-bg": "#f3f4f6",
    "--color-details-border": "rgba(107, 114, 128, 0.45)",
    "--color-modal-backdrop": "rgba(17, 24, 39, 0.55)",
    "--color-tooltip-bg": "#111827",
    "--color-tooltip-text": "#f9fafb"
  },

  // Seoul – soft white + pastel teal
  seoul: {
    "--color-bg": "#f3f7fb",
    "--color-surface": "#ffffff",
    "--color-surface-muted": "#e2ecf6",
    "--color-text": "#111827",
    "--color-text-muted": "#6b7280",
    "--color-border": "#cbd5e1",
    "--color-accent": "#0ea5e9",
    "--color-accent-soft": "rgba(14, 165, 233, 0.16)",
    "--color-accent-strong": "#0284c7",
    "--color-link": "#0f172a",
    "--color-link-hover": "#0ea5e9",
    "--color-header-bg": "#e5f0fb",
    "--color-header-border": "rgba(148, 163, 184, 0.5)",
    "--color-input-bg": "#ffffff",
    "--color-input-border": "#cbd5e1",
    "--color-input-text": "#0f172a",
    "--color-input-placeholder": "#6b7280",
    "--color-table-header-bg": "#e2ecf6",
    "--color-table-row-alt": "#edf2fb",
    "--color-table-border": "#cbd5e1",
    "--color-details-bg": "#f1f5fb",
    "--color-details-border": "rgba(148, 163, 184, 0.55)",
    "--color-modal-backdrop": "rgba(15, 23, 42, 0.5)",
    "--color-tooltip-bg": "#0f172a",
    "--color-tooltip-text": "#f3f7fb"
  },

  // San Francisco – foggy + orange accent
  "san-francisco": {
    "--color-bg": "#e5e7eb",
    "--color-surface": "#ffffff",
    "--color-surface-muted": "#e2e8f0",
    "--color-text": "#111827",
    "--color-text-muted": "#4b5563",
    "--color-border": "#cbd5e1",
    "--color-accent": "#ea580c",
    "--color-accent-soft": "rgba(234, 88, 12, 0.1)",
    "--color-accent-strong": "#c2410c",
    "--color-link": "#1f2937",
    "--color-link-hover": "#ea580c",
    "--color-header-bg": "#f1f5f9",
    "--color-header-border": "rgba(148, 163, 184, 0.5)",
    "--color-input-bg": "#ffffff",
    "--color-input-border": "#cbd5e1",
    "--color-input-text": "#111827",
    "--color-input-placeholder": "#6b7280",
    "--color-table-header-bg": "#e2e8f0",
    "--color-table-row-alt": "#f1f5f9",
    "--color-table-border": "#cbd5e1",
    "--color-details-bg": "#f1f5f9",
    "--color-details-border": "rgba(148, 163, 184, 0.55)",
    "--color-modal-backdrop": "rgba(15, 23, 42, 0.5)",
    "--color-tooltip-bg": "#111827",
    "--color-tooltip-text": "#f9fafb"
  },

  // Rome – warm terracotta + olive
  rome: {
    "--color-bg": "#f6efe5",
    "--color-surface": "#ffffff",
    "--color-surface-muted": "#efe0cf",
    "--color-text": "#2b2118",
    "--color-text-muted": "#7a6956",
    "--color-border": "#ddc2a1",
    "--color-accent": "#b45309",
    "--color-accent-soft": "rgba(180, 83, 9, 0.14)",
    "--color-accent-strong": "#92400e",
    "--color-link": "#3f2f22",
    "--color-link-hover": "#b45309",
    "--color-header-bg": "#fdf5ea",
    "--color-header-border": "rgba(166, 120, 73, 0.45)",
    "--color-input-bg": "#fdf5ea",
    "--color-input-border": "#ddc2a1",
    "--color-input-text": "#2b2118",
    "--color-input-placeholder": "#a07950",
    "--color-table-header-bg": "#efe0cf",
    "--color-table-row-alt": "#f8eee1",
    "--color-table-border": "#ddc2a1",
    "--color-details-bg": "#fdf5ea",
    "--color-details-border": "rgba(166, 120, 73, 0.55)",
    "--color-modal-backdrop": "rgba(55, 36, 21, 0.55)",
    "--color-tooltip-bg": "#2b2118",
    "--color-tooltip-text": "#fdf5ea"
  },

  // Dubai – desert light + gold accent
  dubai: {
    "--color-bg": "#f9f3e8",
    "--color-surface": "#ffffff",
    "--color-surface-muted": "#f1e1c9",
    "--color-text": "#1f2933",
    "--color-text-muted": "#6b7280",
    "--color-border": "#e0c9a6",
    "--color-accent": "#d97706",
    "--color-accent-soft": "rgba(217, 119, 6, 0.14)",
    "--color-accent-strong": "#b45309",
    "--color-link": "#374151",
    "--color-link-hover": "#d97706",
    "--color-header-bg": "#fbf4e7",
    "--color-header-border": "rgba(215, 156, 64, 0.4)",
    "--color-input-bg": "#fffdf8",
    "--color-input-border": "#e0c9a6",
    "--color-input-text": "#1f2933",
    "--color-input-placeholder": "#a26c3a",
    "--color-table-header-bg": "#f1e1c9",
    "--color-table-row-alt": "#fbf2df",
    "--color-table-border": "#e0c9a6",
    "--color-details-bg": "#fbf4e7",
    "--color-details-border": "rgba(215, 156, 64, 0.5)",
    "--color-modal-backdrop": "rgba(88, 64, 35, 0.55)",
    "--color-tooltip-bg": "#1f2933",
    "--color-tooltip-text": "#fbf4e7"
  },

  // Sydney – bright coastal blue
  sydney: {
    "--color-bg": "#e0f2fe",
    "--color-surface": "#ffffff",
    "--color-surface-muted": "#dbeafe",
    "--color-text": "#0f172a",
    "--color-text-muted": "#475569",
    "--color-border": "#bfdbfe",
    "--color-accent": "#0284c7",
    "--color-accent-soft": "rgba(2, 132, 199, 0.16)",
    "--color-accent-strong": "#0369a1",
    "--color-link": "#0f172a",
    "--color-link-hover": "#0284c7",
    "--color-header-bg": "#eff6ff",
    "--color-header-border": "rgba(129, 140, 248, 0.5)",
    "--color-input-bg": "#ffffff",
    "--color-input-border": "#bfdbfe",
    "--color-input-text": "#0f172a",
    "--color-input-placeholder": "#64748b",
    "--color-table-header-bg": "#dbeafe",
    "--color-table-row-alt": "#eff6ff",
    "--color-table-border": "#bfdbfe",
    "--color-details-bg": "#eff6ff",
    "--color-details-border": "rgba(129, 140, 248, 0.6)",
    "--color-modal-backdrop": "rgba(15, 23, 42, 0.5)",
    "--color-tooltip-bg": "#0f172a",
    "--color-tooltip-text": "#e0f2fe"
  },

  // Buenos Aires – dusk purple + coral
  "buenos-aires": {
    "--color-bg": "#f3e8ff",
    "--color-surface": "#ffffff",
    "--color-surface-muted": "#e9d5ff",
    "--color-text": "#1f2937",
    "--color-text-muted": "#6b7280",
    "--color-border": "#d8b4fe",
    "--color-accent": "#f97316",
    "--color-accent-soft": "rgba(249, 115, 22, 0.16)",
    "--color-accent-strong": "#ea580c",
    "--color-link": "#1f2937",
    "--color-link-hover": "#f97316",
    "--color-header-bg": "#faf5ff",
    "--color-header-border": "rgba(192, 132, 252, 0.5)",
    "--color-input-bg": "#ffffff",
    "--color-input-border": "#d8b4fe",
    "--color-input-text": "#1f2937",
    "--color-input-placeholder": "#7c3aed",
    "--color-table-header-bg": "#e9d5ff",
    "--color-table-row-alt": "#faf5ff",
    "--color-table-border": "#d8b4fe",
    "--color-details-bg": "#faf5ff",
    "--color-details-border": "rgba(192, 132, 252, 0.6)",
    "--color-modal-backdrop": "rgba(76, 29, 149, 0.55)",
    "--color-tooltip-bg": "#1f2937",
    "--color-tooltip-text": "#faf5ff"
  },

  // Reykjavik – icy blue + navy
  reykjavik: {
    "--color-bg": "#e0f2f5",
    "--color-surface": "#ffffff",
    "--color-surface-muted": "#d1e9f2",
    "--color-text": "#0f172a",
    "--color-text-muted": "#4b5563",
    "--color-border": "#9ca3af",
    "--color-accent": "#0f766e",
    "--color-accent-soft": "rgba(15, 118, 110, 0.16)",
    "--color-accent-strong": "#115e59",
    "--color-link": "#0f172a",
    "--color-link-hover": "#0f766e",
    "--color-header-bg": "#e5f3f7",
    "--color-header-border": "rgba(75, 85, 99, 0.45)",
    "--color-input-bg": "#ffffff",
    "--color-input-border": "#9ca3af",
    "--color-input-text": "#0f172a",
    "--color-input-placeholder": "#64748b",
    "--color-table-header-bg": "#d1e9f2",
    "--color-table-row-alt": "#e5f3f7",
    "--color-table-border": "#9ca3af",
    "--color-details-bg": "#e5f3f7",
    "--color-details-border": "rgba(75, 85, 99, 0.55)",
    "--color-modal-backdrop": "rgba(15, 23, 42, 0.55)",
    "--color-tooltip-bg": "#0f172a",
    "--color-tooltip-text": "#e0f2f5"
  },

  // Amsterdam – canal blues + brick red
  amsterdam: {
    "--color-bg": "#e5eff5",
    "--color-surface": "#ffffff",
    "--color-surface-muted": "#dbe3ea",
    "--color-text": "#111827",
    "--color-text-muted": "#4b5563",
    "--color-border": "#cbd2da",
    "--color-accent": "#dc2626",
    "--color-accent-soft": "rgba(220, 38, 38, 0.12)",
    "--color-accent-strong": "#b91c1c",
    "--color-link": "#1f2937",
    "--color-link-hover": "#dc2626",
    "--color-header-bg": "#f1f5f9",
    "--color-header-border": "rgba(148, 163, 184, 0.5)",
    "--color-input-bg": "#ffffff",
    "--color-input-border": "#cbd2da",
    "--color-input-text": "#111827",
    "--color-input-placeholder": "#6b7280",
    "--color-table-header-bg": "#dbe3ea",
    "--color-table-row-alt": "#eef2f6",
    "--color-table-border": "#cbd2da",
    "--color-details-bg": "#f1f5f9",
    "--color-details-border": "rgba(148, 163, 184, 0.6)",
    "--color-modal-backdrop": "rgba(15, 23, 42, 0.5)",
    "--color-tooltip-bg": "#111827",
    "--color-tooltip-text": "#e5eff5"
  }
}

/**
 * Apply a theme by name.
 * Missing variables fall back to those defined in the CSS (:root).
 */
function applyTheme(themeName) {
  const theme = S_STYLE_THEMES[themeName];
  if (!theme) {
    console.warn(
      `[s-style] Theme "${themeName}" not found. Available:`,
      Object.keys(S_STYLE_THEMES)
    );
    return;
  }

  const root = document.documentElement;
  for (const [name, value] of Object.entries(theme)) {
    if (value == null) continue;
    root.style.setProperty(name, value);
  }
}

/**
 * Register or override a theme.
 * Example:
 *   registerTheme('my-theme', { '--color-accent': '#ff00ff' });
 */
function registerTheme(name, vars) {
  if (!name || typeof name !== "string") {
    // throw new Error('[s-style] Theme name must be a non-empty string.')
  }
  if (!vars || typeof vars !== "object") {
    // throw new Error('[s-style] Theme vars must be an object of { '--var-name': value }.')
  }
  S_STYLE_THEMES[name] = { ...(S_STYLE_THEMES[name] || {}), ...vars };
}

/**
 * Directly apply a theme object (without registering a name).
 */
function applyThemeObject(vars) {
  const root = document.documentElement;
  for (const [name, value] of Object.entries(vars || {})) {
    if (value == null) continue;
    root.style.setProperty(name, value);
  }
}

/* Attach to window for non-module usage */
if (typeof window !== 'undefined') {
  window.sStyle = window.sStyle || {};
  window.sStyle.themes = S_STYLE_THEMES;
  window.sStyle.applyTheme = applyTheme;
  window.sStyle.registerTheme = registerTheme;
  window.sStyle.applyThemeObject = applyThemeObject;
}

/* Export for ESM usage */
export { S_STYLE_THEMES, applyTheme, registerTheme, applyThemeObject }
