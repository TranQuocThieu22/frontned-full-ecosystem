import {useCallback, useEffect, useState} from "react";

interface UseCustomScrollSpyProps {
  root: HTMLElement | null;
  selector: string;
  offset?: number;
  threshold?: number;
}

export function useCustomScrollSpy({ root }: UseCustomScrollSpyProps) {
  const [activeId, setActiveId] = useState<string | null>("section-1");

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    let maxRatio = 0;
    let currentActive: string | null = activeId;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const ratio = entry.intersectionRatio;
        const boundingTop = entry.boundingClientRect.top - entry.rootBounds!.top;

        const isBetter =
          ratio > maxRatio ||
          (ratio >= 0.1 && boundingTop < 100 && ratio >= maxRatio - 0.05); // thêm điều kiện ổn định

        if (isBetter) {
          maxRatio = ratio;
          currentActive = entry.target.id;
        }
      }
    });

    if (currentActive !== activeId) {
      setActiveId(currentActive);
    }
  }, [activeId]);

  useEffect(() => {
    if (!root) return;

    const sections = [
      "section-1",
      "section-2",
      "section-3",
      "section-4",
      "section-5",
    ];

    const observer = new IntersectionObserver(handleIntersection, {
      root,
      rootMargin: "-50px 0px -50px 0px",
      threshold: [0.1, 0.3, 0.5, 0.7, 1.0],
    });

    sections.forEach((id) => {
      const element = root.querySelector(`#${id}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [root, handleIntersection]);

  return { activeId };
}
