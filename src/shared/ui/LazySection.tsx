import { useEffect, useRef, useState, type ReactNode } from "react";

interface LazySectionProps {
  children: ReactNode;
  minHeight?: number | string;
  rootMargin?: string;
  className?: string;
}

/** Mount children when the section nears the viewport (maps, video, charts). */
export default function LazySection({
  children,
  minHeight = 240,
  rootMargin = "200px",
  className,
}: LazySectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || ready) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setReady(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ready, rootMargin]);

  return (
    <div ref={ref} className={className} style={ready ? undefined : { minHeight }}>
      {ready ? children : null}
    </div>
  );
}
