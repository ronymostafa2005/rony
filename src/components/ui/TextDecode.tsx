import { useEffect, useRef, useState, useCallback } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const GLYPHS = '!<>-_\\/[]{}—=+*^?#________$%&';

interface TextDecodeProps {
  text: string;
  className?: string;
  /** ms between scramble frames */
  speed?: number;
  /** ms each character takes to lock in, staggered left→right */
  stagger?: number;
  delay?: number;
}

/**
 * Field-themed heading effect: text "compiles" in — characters cycle
 * through code glyphs then lock in left-to-right, like a terminal decode.
 */
const TextDecode = ({
  text,
  className = '',
  speed = 34,
  stagger = 28,
  delay = 0,
}: TextDecodeProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const reduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(() =>
    text
      .split('')
      .map((c) => (c === ' ' ? ' ' : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
      .join('')
  );

  const runDecode = useCallback(() => {
    const start = performance.now() + delay;
    let raf: number;
    let last = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (now - last < speed) {
        raf = requestAnimationFrame(tick);
        return;
      }
      last = now;

      // Characters lock in sequentially; unrevealed ones keep scrambling
      const revealed = Math.floor(elapsed / stagger);
      setDisplay(
        text
          .split('')
          .map((c, i) => {
            if (c === ' ') return ' ';
            if (i < revealed) return c;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('')
      );

      if (revealed <= text.length) {
        raf = requestAnimationFrame(tick);
      } else {
        setDisplay(text);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, speed, stagger, delay]);

  useEffect(() => {
    if (!isInView) return;
    if (reduceMotion) {
      setDisplay(text);
      return;
    }
    const cleanup = runDecode();
    return cleanup;
  }, [isInView, reduceMotion, runDecode, text]);

  return (
    <span ref={ref} className={className} aria-label={text} role="text">
      <span aria-hidden="true">{display}</span>
    </span>
  );
};

export default TextDecode;
