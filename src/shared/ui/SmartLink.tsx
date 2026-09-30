import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";

import {
  isAbsoluteHref,
  isHashHref,
  isSpecialProtocolHref,
} from "@/shared/lib/links";

type AnchorProps = ComponentPropsWithoutRef<"a">;

interface SmartLinkProps extends Omit<AnchorProps, "href"> {
  href: string;
  children: ReactNode;
}

export default function SmartLink({
  href,
  children,
  className,
  onClick,
  ...rest
}: SmartLinkProps) {
  if (isAbsoluteHref(href)) {
    return (
      <a
        href={href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
        {...rest}
      >
        {children}
      </a>
    );
  }

  if (isHashHref(href) || isSpecialProtocolHref(href)) {
    return (
      <a href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link
      to={href}
      className={className}
      onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      {...rest}
    >
      {children}
    </Link>
  );
}
