import { WASA_ASSETS, WASA_ASSET_BASE } from "./wasaAssets";

const responsive = (name: string) => `${WASA_ASSET_BASE}/responsive/${name}-768.webp`;
const image = (name: string) => `${WASA_ASSET_BASE}/images/${name}.webp`;

export const WASA_RESPONSIVE_SOURCES: Record<string, string> = {
  [WASA_ASSETS.hero]: responsive("booth-wide"),
  [WASA_ASSETS.entrance]: responsive("booth-entrance"),
  [WASA_ASSETS.aisle]: responsive("booth-aisle"),
  [WASA_ASSETS.products]: responsive("product-display"),
  [WASA_ASSETS.curation]: responsive("product-curation"),
  [WASA_ASSETS.brandOwnerContext]: responsive("brand-owner-context"),
  [WASA_ASSETS.heroBanner]: responsive("wasa-hero-banner"),
  [WASA_ASSETS.step02Curation]: responsive("step-02-curation"),
  [WASA_ASSETS.step03Experience]: responsive("step-03-experience"),
  [WASA_ASSETS.step04Connection]: responsive("step-04-connection"),
  [WASA_ASSETS.step05Return]: responsive("step-05-return"),
  [WASA_ASSETS.how01Inbound]: responsive("how-01-inbound-arrival"),
  [WASA_ASSETS.what02Experience]: responsive("what-02-close-experience"),
  [WASA_ASSETS.what03FollowUp]: responsive("wasa-follow-up-connection"),
  [WASA_ASSETS.curated03Story]: responsive("curated-03-brand-story"),
  [WASA_ASSETS.forBrandsSignal]: responsive("for-brands-wasa-signal"),
  [image("booth-moments")]: responsive("booth-moments"),
  [image("booth-partner")]: responsive("booth-partner"),
  [image("booth-consultation")]: responsive("booth-consultation"),
};

export function getWasaResponsiveSrcSet(src?: string) {
  const compact = src ? WASA_RESPONSIVE_SOURCES[src] : undefined;
  return compact && src ? `${compact} 768w, ${src} 1440w` : undefined;
}
