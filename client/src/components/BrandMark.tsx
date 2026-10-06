import { WASA_BRAND_LOGO } from "@/lib/wasaAssets";

export function BrandMark({ className = "" }: { className?: string }) {
  return <img src={WASA_BRAND_LOGO} alt="WASA" className={`h-auto object-contain ${className}`} />;
}
