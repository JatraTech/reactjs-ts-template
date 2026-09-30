import { useCallback, useEffect, useRef, useState, type Ref } from "react";

interface UseInViewOptions {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
}

export function useInView<T extends HTMLElement = HTMLElement>({
  rootMargin = "200px",
  threshold = 0,
  once = true,
}: UseInViewOptions = {}) {
  const [node, setNode] = useState<T | null>(null);
  const [inView, setInView] = useState(false);
  const hasTriggeredRef = useRef(false);

  const ref = useCallback((element: T | null) => {
    setNode(element);
  }, []);

  useEffect(() => {
    if (!node || (once && hasTriggeredRef.current)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          hasTriggeredRef.current = true;
          setInView(true);
          if (once) observer.disconnect();
          return;
        }
        if (!once) setInView(false);
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, once, rootMargin, threshold]);

  return { ref: ref as Ref<T>, inView };
}
