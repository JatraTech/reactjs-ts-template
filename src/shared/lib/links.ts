export function isAbsoluteHref(href: string): boolean {
  return /^(?:https?:|\/\/)/i.test(href);
}

export function isHashHref(href: string): boolean {
  return href.startsWith("#");
}

export function isSpecialProtocolHref(href: string): boolean {
  return /^(?:mailto:|tel:)/i.test(href);
}
