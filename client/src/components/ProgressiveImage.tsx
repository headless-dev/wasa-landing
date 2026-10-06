import { useState, type ImgHTMLAttributes } from "react";
import { getWasaResponsiveSrcSet } from "@/lib/wasaResponsiveSources";

type ProgressiveImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  previewSrc?: string;
};

export function ProgressiveImage({ previewSrc, className = "", onLoad, onError, style, src, srcSet, sizes, ...props }: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const responsiveSrcSet = srcSet ?? getWasaResponsiveSrcSet(typeof src === "string" ? src : undefined);

  return (
    <img
      {...props}
      src={src}
      srcSet={responsiveSrcSet}
      sizes={sizes ?? "(max-width: 767px) 100vw, (max-width: 1279px) 80vw, 1440px"}
      className={`progressive-image ${loaded ? "is-loaded" : ""} ${className}`}
      style={previewSrc ? { ...style, backgroundImage: `url(${previewSrc})` } : style}
      onLoad={event => {
        setLoaded(true);
        onLoad?.(event);
      }}
      onError={event => {
        setLoaded(true);
        onError?.(event);
      }}
    />
  );
}
