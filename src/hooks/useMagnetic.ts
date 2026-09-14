import { useRef, useCallback, useEffect } from 'react';
import { useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Magnetic element: while the cursor is near, the element is gently
 * attracted toward it (spring physics). Resets on leave.
 *
 * Usage:  const { ref, x, y } = useMagnetic(0.3);
 *         <motion.a ref={ref} style={{ x, y }} ...>
 */
const useMagnetic = (strength = 0.35, maxDistance = 120) => {
  const ref = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 180, damping: 14, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 180, damping: 14, mass: 0.4 });

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = ref.current;
      if (!el || reduceMotion) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < maxDistance + Math.max(rect.width, rect.height) / 2) {
        rawX.set(dx * strength);
        rawY.set(dy * strength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    },
    [rawX, rawY, strength, maxDistance, reduceMotion]
  );

  const handleMouseLeaveWindow = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  useEffect(() => {
    if (reduceMotion) return;
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeaveWindow);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, [handleMouseMove, handleMouseLeaveWindow, reduceMotion]);

  return { ref, x, y };
};

export default useMagnetic;
