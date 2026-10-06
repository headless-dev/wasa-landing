import { describe, expect, it } from "vitest";
import { WASA_IMAGE_PREVIEWS } from "./wasaImagePreviews";

describe("WASA 이미지 저화질 미리보기", () => {
  it("모든 최적화된 콘텐츠 이미지에 WebP 미리보기 경로를 제공합니다", () => {
    expect(Object.keys(WASA_IMAGE_PREVIEWS)).toHaveLength(19);
    expect(Object.keys(WASA_IMAGE_PREVIEWS)).toEqual(expect.arrayContaining([
      "/assets/wasa/images/wasa-hero-banner.webp",
      "/assets/wasa/images/booth-wide.webp",
      "/assets/wasa/images/step-02-curation.webp",
      "/assets/wasa/images/for-brands-wasa-signal.webp",
      "/assets/wasa/images/how-01-inbound-arrival.webp",
      "/assets/wasa/images/wasa-follow-up-connection.webp",
    ]));
    Object.values(WASA_IMAGE_PREVIEWS).forEach(preview => expect(preview).toMatch(/^\/assets\/wasa\/previews\/.+\.webp$/));
  });
});
