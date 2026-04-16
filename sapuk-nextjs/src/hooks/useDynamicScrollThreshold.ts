import { useState, useEffect } from "react";

/**
 * Hook that tracks document height and calculates a dynamic scroll threshold
 * based on a percentage of the page height. Updates automatically when page
 * height changes (e.g., when collapsible components open/close).
 *
 * @param percentage - Percentage of page height to use as threshold (0-100)
 * @returns The calculated threshold in pixels
 */
export const useDynamicScrollThreshold = (percentage: number = 30): number => {
  const [threshold, setThreshold] = useState<number>(0);

  useEffect(() => {
    const calculateThreshold = () => {
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      const calculatedThreshold = (documentHeight * percentage) / 100;
      setThreshold(calculatedThreshold);
    };

    // Calculate initial threshold
    calculateThreshold();

    // Use ResizeObserver to detect when document height changes
    const resizeObserver = new ResizeObserver(() => {
      calculateThreshold();
    });

    // Observe the document body for size changes
    resizeObserver.observe(document.body);

    // Also listen to window resize events as a fallback
    window.addEventListener("resize", calculateThreshold);

    // Use MutationObserver to catch DOM changes (like collapsibles opening/closing)
    const mutationObserver = new MutationObserver(() => {
      // Debounce to avoid excessive calculations
      setTimeout(calculateThreshold, 100);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateThreshold);
      mutationObserver.disconnect();
    };
  }, [percentage]);

  return threshold;
};
