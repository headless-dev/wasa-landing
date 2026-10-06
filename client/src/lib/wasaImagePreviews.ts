import { WASA_ASSETS, WASA_ASSET_BASE } from "./wasaAssets";

const preview = (name: string) => `${WASA_ASSET_BASE}/previews/${name}.webp`;
const image = (name: string) => `${WASA_ASSET_BASE}/images/${name}.webp`;

export const WASA_IMAGE_PREVIEWS: Record<string, string> = {
  [WASA_ASSETS.hero]: preview("booth-wide"),
  [WASA_ASSETS.entrance]: preview("booth-entrance"),
  [WASA_ASSETS.aisle]: preview("booth-aisle"),
  [WASA_ASSETS.products]: preview("product-display"),
  [WASA_ASSETS.curation]: preview("product-curation"),
  [WASA_ASSETS.brandOwnerContext]: preview("brand-owner-context"),
  [WASA_ASSETS.heroBanner]: preview("wasa-hero-banner"),
  [WASA_ASSETS.step02Curation]: preview("step-02-curation"),
  [WASA_ASSETS.step03Experience]: preview("step-03-experience"),
  [WASA_ASSETS.step04Connection]: preview("step-04-connection"),
  [WASA_ASSETS.step05Return]: preview("step-05-return"),
  [WASA_ASSETS.how01Inbound]: preview("how-01-inbound-arrival"),
  [WASA_ASSETS.what02Experience]: preview("what-02-close-experience"),
  [WASA_ASSETS.what03FollowUp]: preview("wasa-follow-up-connection"),
  [WASA_ASSETS.curated03Story]: preview("curated-03-brand-story"),
  [WASA_ASSETS.forBrandsSignal]: preview("for-brands-wasa-signal"),
  [image("booth-moments")]: preview("booth-moments"),
  [image("booth-partner")]: preview("booth-partner"),
  [image("booth-consultation")]: preview("booth-consultation"),
};
