import type { ImgHTMLAttributes } from "react";

import LazyImage, { type LazyImageProps } from "@/shared/ui/LazyImage";

export function Img(props: ImgHTMLAttributes<HTMLImageElement> & Pick<LazyImageProps, "priority" | "srcSet" | "sizes">) {
  return <LazyImage {...props} />;
}
