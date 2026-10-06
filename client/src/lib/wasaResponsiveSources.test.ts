import { describe, expect, it } from "vitest";
import { WASA_RESPONSIVE_SOURCES, getWasaResponsiveSrcSet } from "./wasaResponsiveSources";

describe("WASA responsive image sources", () => {
  it("모든 연결 자산에 768px WebP 파생본을 제공합니다", () => {
    expect(Object.values(WASA_RESPONSIVE_SOURCES)).toHaveLength(19);
    expect(Object.values(WASA_RESPONSIVE_SOURCES).every(source => source.endsWith(".webp"))).toBe(true);
  });

  it("768px와 고해상도 원본을 포함한 srcset을 만듭니다", () => {
    const source = "/assets/wasa/images/booth-wide.webp";
    expect(getWasaResponsiveSrcSet(source)).toContain("768w");
    expect(getWasaResponsiveSrcSet(source)).toContain("1440w");
  });
});
