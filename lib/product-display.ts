export const PRODUCT_DISPLAY_NAMES = {
  "lum-b": "Raw Beam Profiler (LUM-B)",
  "lum-b-l": "Large Beam Profiler (LUM-B-L)",
  "lum-f": "Focus Beam Profiler (LUM-F)",
  "lum-z": "3D Beam Profiler (LUM-Z)",
  software: "Lumosity (Software)",
  ifi: "Infinity Flat Top Imaging Optics (IFI)",
  customizing: "Customizing",
} as const;

export function getProductDisplayName(slug: string, fallback: string) {
  return PRODUCT_DISPLAY_NAMES[slug as keyof typeof PRODUCT_DISPLAY_NAMES] ?? fallback;
}
