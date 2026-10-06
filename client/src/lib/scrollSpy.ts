export type ScrollSpySection = {
  id: string;
  top: number;
};

export function getActiveNavigationSection(
  sections: ScrollSpySection[],
  marker: number,
  distanceToPageEnd: number,
  pageEndThreshold: number,
) {
  if (!sections.length) return undefined;

  const lastSection = sections.at(-1);
  if (lastSection && (lastSection.top <= marker || distanceToPageEnd <= pageEndThreshold)) {
    return lastSection.id;
  }

  return sections.reduce((active, section) => section.top <= marker ? section : active, sections[0]).id;
}
