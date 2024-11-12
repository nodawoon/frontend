// hooks/useScrollAnimation.tsx
"use client";

import { useEffect, useState, RefObject } from "react";

const useScrollAnimation = (ref: RefObject<HTMLElement>) => {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInViewport(true);
        } else {
          setIsInViewport(false);
        }
      });
    };

    const options = { root: null, rootMargin: "0px", threshold: 0.1 };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return { isInViewport };
};

export default useScrollAnimation;
