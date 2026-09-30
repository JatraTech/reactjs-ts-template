import type { ImgHTMLAttributes } from 'react'

export function Img({ loading = 'lazy', decoding = 'async', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return <img loading={loading} decoding={decoding} {...props} />
}
