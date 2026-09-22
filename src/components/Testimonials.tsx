import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView, useReducedMotion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaQuoteLeft } from 'react-icons/fa';
import TextDecode from './ui/TextDecode';

// ─────────────────────────────────────────────────────────────
// TODO: Replace placeholders with real quotes from colleagues,
// managers or clients. LinkedIn recommendations are a great source.
// ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    quote:
      'Rawan delivered our dashboard ahead of schedule — clean components, thoughtful UX details and zero regression bugs across releases.',
    name: 'Team Lead',
    role: 'MDARJ',
    placeholder: true,
  },
  {
    quote:
      'Rare mix of design sensitivity and engineering discipline. The e-commerce platform she built handled launch-week traffic without a hiccup.',
    name: 'Project Manager',
    role: 'Startup Packing',
    placeholder: true,
  },
  {
    quote:
      'She turns vague requirements into pixel-accurate, responsive interfaces faster than anyone we have worked with.',
    name: 'Colleague',
    role: 'My Code',
    placeholder: true,
  },
];

const Testimonials = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const reduceMotion = useReducedMotion();
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const paginate = useCallback((dir: number) => {
    setIndex(([prev]) => [(prev + dir + testimonials.length) % testimonials.length, dir]);
  }, []);

  // Autoplay — pauses on hover/focus or when reduced motion is requested
  useEffect(() => {
    if (paused || reduceMotion) return;
    timer.current = setInterval(() => paginate(1), 6000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [paused, reduceMotion, paginate]);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
      <div className="absolute top-24 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-24 right-1/4 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 text-sm font-medium tracking-wide uppercase">
              What people say
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <TextDecode
              text="Testimonials"
              className="bg-gradient-to-r from-teal-300 to-emerald-500 bg-clip-text text-transparent"
            />
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '5rem' } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-teal-400 to-emerald-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="relative h-[300px] sm:h-[260px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction >= 0 ? 80 : -80, rotateY: 8 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: direction >= 0 ? -80 : 80, rotateY: -8 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-slate-800/40 backdrop-blur-xl rounded-2xl border border-slate-700/40 p-8 md:p-10 flex flex-col justify-between"
              >
                <div>
                  <FaQuoteLeft className="text-3xl text-blue-500/40 mb-4" />
                  <blockquote className="text-gray-200 text-lg md:text-xl leading-relaxed">
                    {current.quote}
                  </blockquote>
                </div>
                <figcaption className="flex items-center gap-4 mt-6">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold">
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{current.name}</p>
                    <p className="text-gray-400 text-xs">{current.role}</p>
                  </div>
                  {current.placeholder && (
                    <span className="ml-auto text-[10px] uppercase tracking-wider text-gray-600 border border-slate-700/60 rounded-full px-2 py-1">
                      placeholder
                    </span>
                  )}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <motion.button
              onClick={() => paginate(-1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Previous testimonial"
              className="w-10 h-10 rounded-full bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-teal-500/40 transition-colors"
            >
              <FaChevronLeft className="text-sm" />
            </motion.button>

            <div className="flex gap-2.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex([i, i > index ? 1 : -1])}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? 'w-8 bg-gradient-to-r from-teal-300 to-emerald-400'
                      : 'w-2 bg-slate-600 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <motion.button
              onClick={() => paginate(1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Next testimonial"
              className="w-10 h-10 rounded-full bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-teal-500/40 transition-colors"
            >
              <FaChevronRight className="text-sm" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
