import { useEffect, useState } from 'react';

/**
 * Custom hook for animating numbers counting up
 * @param {number} end - Final number to count to
 * @param {number} duration - Duration in milliseconds (default: 2000)
 * @param {boolean} shouldCount - Whether animation should run (default: true)
 */
const useCounterAnimation = (end = 100, duration = 2000, shouldCount = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldCount) return;

    let startTime = null;
    let animationFrameId;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuad = 1 - Math.pow(1 - progress, 2);
      setCount(Math.floor(easeOutQuad * end));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [end, duration, shouldCount]);

  return count;
};

export default useCounterAnimation;
