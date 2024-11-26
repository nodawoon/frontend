import { useState, useEffect } from "react";

function useAnimateCounts(values: number[], isInViewport: boolean): number[] {
  const [counts, setCounts] = useState<number[]>(() => values.map(() => 0));

  useEffect(() => {
    if (!isInViewport) return;

    const duration = 1000;
    const steps = 60;
    const interval = duration / steps;

    const incrementValues = values.map(value => value / steps);
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep += 1;
      setCounts(prevCounts =>
        prevCounts.map((count, index) => {
          const newCount = count + incrementValues[index];
          return newCount >= values[index] ? values[index] : newCount;
        })
      );

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isInViewport, values]);

  return counts.map(count => Math.round(count));
}

export default useAnimateCounts;
