import { forwardRef, type ImgHTMLAttributes } from "react";

export interface LazyImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** LCP / above-the-fold: eager + high fetch priority */
  priority?: boolean;
  srcSet?: string;
  sizes?: string;
}

const LazyImage = forwardRef<HTMLImageElement, LazyImageProps>(function LazyImage(
  {
    priority = false,
    loading,
    decoding,
    fetchPriority,
    srcSet,
    sizes,
    width,
    height,
    alt = "",
    ...props
  },
  ref,
) {
  const resolvedFetchPriority = fetchPriority ?? (priority ? "high" : undefined);

  return (
    <img
      ref={ref}
      alt={alt}
      width={width}
      height={height}
      srcSet={srcSet}
      sizes={sizes ?? (srcSet ? "100vw" : undefined)}
      {...props}
      loading={loading ?? (priority ? "eager" : "lazy")}
      decoding={decoding ?? "async"}
      fetchPriority={resolvedFetchPriority}
    />
  );
});

export default LazyImage;
