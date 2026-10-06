export const WASA_ASSET_BASE = `${import.meta.env.BASE_URL}assets/wasa`;
export const WASA_BRAND_LOGO = `${WASA_ASSET_BASE}/brand/wasa-logo.png`;
const image = (name: string) => `${WASA_ASSET_BASE}/images/${name}.webp`;

export const WASA_ASSETS = {
  hero: image("booth-wide"),
  entrance: image("booth-entrance"),
  aisle: image("booth-aisle"),
  products: image("product-display"),
  curation: image("product-curation"),
  brandOwnerContext: image("brand-owner-context"),
  heroBanner: image("wasa-hero-banner"),
  step02Curation: image("step-02-curation"),
  step03Experience: image("step-03-experience"),
  step04Connection: image("step-04-connection"),
  step05Return: image("step-05-return"),
  how01Inbound: image("how-01-inbound-arrival"),
  what02Experience: image("what-02-close-experience"),
  what03FollowUp: image("wasa-follow-up-connection"),
  curated03Story: image("curated-03-brand-story"),
  forBrandsSignal: image("for-brands-wasa-signal"),
} as const;

export const WASA_GALLERY_ITEMS = [
  {
    id: "curated-floor",
    category: "운영 현장",
    title: "브랜드와 고객이 마주하는 WASA의 공간",
    description: "제품을 둘러보고 이야기를 나누며 새로운 브랜드를 발견하는 현장을 만듭니다.",
    image: image("booth-moments"),
    alt: "WASA 공동 부스의 넓은 행사 전경",
  },
  {
    id: "brand-experience",
    category: "고객 경험",
    title: "제품의 가치를 직접 전하는 순간",
    description: "진열된 제품을 넘어, 브랜드의 감각과 이야기가 현장에서 경험으로 이어집니다.",
    image: image("booth-partner"),
    alt: "WASA 현장에서 고객이 제품을 직접 살펴보는 모습",
  },
  {
    id: "brand-conversation",
    category: "브랜드 연결",
    title: "좋은 제품을 더 가까이 소개합니다",
    description: "WASA는 여러 로컬 브랜드가 하나의 공간에서 고객과 자연스럽게 만나는 접점을 만듭니다.",
    image: image("booth-consultation"),
    alt: "WASA 부스에서 제품을 소개하는 모습",
  },
] as const;
