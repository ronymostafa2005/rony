import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #14b8a6, #10b981, #22d3ee, #2dd4bf)',
        boxShadow: '0 0 10px rgba(20, 184, 166, 0.5), 0 0 30px rgba(52, 211, 153, 0.3)',
      }}
    />
  );
};

export default ScrollProgress;
