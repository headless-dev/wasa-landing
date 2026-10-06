import { describe, expect, it } from "vitest";
import { getActiveNavigationSection } from "./scrollSpy";

const sections = [
  { id: "story", top: -180 },
  { id: "journey", top: 260 },
  { id: "gallery", top: 980 },
  { id: "inquiry", top: 1740 },
];

describe("getActiveNavigationSection", () => {
  it("마커를 통과한 가장 마지막 섹션을 활성화한다", () => {
    expect(getActiveNavigationSection(sections, 420, 1500, 320)).toBe("journey");
  });

  it("페이지 하단에서는 입점 안내가 아직 마커에 닿지 않았어도 활성화된다", () => {
    expect(getActiveNavigationSection(sections, 420, 180, 320)).toBe("inquiry");
  });
});
