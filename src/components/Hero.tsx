import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload, FaChevronDown } from 'react-icons/fa';
import { useRef, useState, useEffect } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import useMagnetic from '../hooks/useMagnetic';

// Animated counter hook
const useCounter = (end: number, duration: number, start: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let t0: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / duration, 1);
      setCount(Math.floor(p * end));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, duration, start]);
  return count;
};

const StatItem = ({
  value,
  suffix,
  label,
  delay,
  isVisible,
}: {
  value: number;
  suffix: string;
  label: string;
  delay: number;
  isVisible: boolean;
}) => {
  const count = useCounter(value, 2000, isVisible);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="text-center group"
    >
      <div className="relative">
        <motion.span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          {count}
          {suffix}
        </motion.span>
      </div>
      <p className="text-gray-400 text-sm mt-1 group-hover:text-gray-300 transition-colors">{label}</p>
    </motion.div>
  );
};

// ── Dev-themed deploy terminal that types a build loop ──
const DeployTerminal = () => {
  const reduceMotion = useReducedMotion();
  const [lines, setLines] = useState<string[]>([]);
  const fullLog = [
    '$ npm run deploy',
    '✓ compiling modules…',
    '✓ 0 errors · 0 warnings',
    '✓ deployed in 1.2s',
  ];

  useEffect(() => {
    if (reduceMotion) {
      setLines(fullLog);
      return;
    }
    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;
    const type = () => {
      if (line >= fullLog.length) {
        timer = setTimeout(() => {
          setLines([]);
          line = 0;
          char = 0;
          type();
        }, 3500);
        return;
      }
      const target = fullLog[line];
      char += 3; // fast typing
      const current = target.slice(0, char);
      setLines((prev) => {
        const next = [...prev];
        next[line] = current;
        return next;
      });
      if (char >= target.length) {
        line += 1;
        char = 0;
        timer = setTimeout(type, 350);
      } else {
        timer = setTimeout(type, 24);
      }
    };
    type();
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion]);

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      className="bg-slate-800/90 backdrop-blur-xl rounded-xl p-4 border border-slate-700/50 shadow-2xl min-w-[210px]"
    >
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
      </div>
      <pre className="text-xs font-mono leading-5 min-h-[5rem] whitespace-pre-wrap">
        {lines.map((line, i) => (
          <div
            key={i}
            className={
              line.startsWith('$')
                ? 'text-white'
                : line.startsWith('✓ deployed')
                  ? 'text-green-400 font-semibold'
                  : 'text-green-400/80'
            }
          >
            {line || '\u00A0'}
          </div>
        ))}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.9, repeat: Infinity }}
          className="inline-block w-1.5 h-3.5 bg-blue-400 align-middle"
        />
      </pre>
    </motion.div>
  );
};

// ── Magnetic CTA button wrapper ──
const MagneticButton = ({ href, className, children, ...rest }: { href: string; className?: string; children: React.ReactNode; [key: string]: unknown }) => {
  const { ref, x, y } = useMagnetic(0.3, 110);
  return (
    <motion.a
      ref={ref as React.RefObject<HTMLAnchorElement>}
      href={href}
      className={className}
      style={{ x, y }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...rest}
    >
      {children}
    </motion.a>
  );
};

const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const reduceMotion = useReducedMotion();

  // Photo tilt on mouse — subtle 3D parallax
  const photoRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handlePhotoTilt = (e: React.MouseEvent) => {
    if (reduceMotion) return;
    const rect = photoRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -10, y: px * 12 });
  };

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/ronymostafa2005', label: 'GitHub' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' }, // TODO: real LinkedIn URL
    { icon: FaEnvelope, href: 'mailto:rowan.mostafa2005@gmail.com', label: 'Email' },
  ];

  const stats = [
    { value: 3, suffix: '+', label: 'Years Experience' },
    { value: 40, suffix: '+', label: 'Projects Completed' },
    { value: 12, suffix: '+', label: 'Happy Clients' },
    { value: 25, suffix: '+', label: 'Technologies' },
  ];

  const greeting = "Hi, I'm";
  const fullName = 'Rawan Mostafa';

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
      ref={ref}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          }}
          animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 70%)',
          }}
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(236, 72, 153, 0.05) 0%, transparent 70%)',
          }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Side Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-4"
            >
              <span className="text-gray-400 text-lg md:text-xl">{greeting}</span>
            </motion.div>

            {/* Name — staggered letter reveal */}
            <div className="mb-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {fullName.split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                    animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.3 + i * 0.04,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    style={{ minWidth: letter === ' ' ? '0.3em' : 'auto' }}
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </h1>
            </div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="mb-2"
            >
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-400 text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Available for opportunities
              </span>
            </motion.div>

            {/* Typing Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xl md:text-3xl text-gray-300 mb-6 h-12 md:h-16"
            >
              <TypeAnimation
                sequence={[
                  'Front-End Developer',
                  2000,
                  'React.js Specialist',
                  2000,
                  'Next.js Expert',
                  2000,
                  'UI/UX Enthusiast',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="font-medium"
              />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
              className="text-gray-400 max-w-xl mb-8 text-lg leading-relaxed"
            >
              I build exceptional digital experiences that are fast, accessible, visually appealing,
              and responsive. Specializing in React.js & Next.js.
            </motion.p>

            {/* CTA Buttons — magnetic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.4 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start"
            >
              <MagneticButton
                href="#projects"
                className="group relative px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold shadow-lg overflow-hidden"
              >
                <span className="relative z-10 inline-block py-1">View My Work</span>
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '200%' }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                />
              </MagneticButton>
              <MagneticButton
                href="/resume"
                className="group px-8 py-3.5 border-2 border-slate-600 rounded-full text-gray-300 font-semibold hover:border-blue-500/50 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2"
              >
                <FaDownload className="text-sm group-hover:animate-bounce" />
                Download CV
              </MagneticButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.6 }}
              className="flex justify-center lg:justify-start space-x-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.1 }}
                  className="w-11 h-11 rounded-full bg-slate-800/60 border border-slate-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Right Side — Profile + Deploy Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
            className="flex-shrink-0"
          >
            <div className="relative">
              {/* Profile Image with mouse tilt */}
              <motion.div
                animate={{
                  boxShadow: [
                    '0 0 30px rgba(59, 130, 246, 0.3)',
                    '0 0 60px rgba(139, 92, 246, 0.4)',
                    '0 0 30px rgba(59, 130, 246, 0.3)',
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
                ref={photoRef}
                onMouseMove={handlePhotoTilt}
                onMouseLeave={() => setTilt({ x: 0, y: 0 })}
                style={{
                  rotateX: tilt.x,
                  rotateY: tilt.y,
                  transformStyle: 'preserve-3d',
                  transformPerspective: 600,
                }}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 p-1 relative z-10"
              >
                <img
                  src="/WhatsApp Image 2026-02-03 at 2.09.58 AM.jpeg"
                  alt="Rawan Mostafa — Front-End Developer"
                  className="w-full h-full rounded-full object-cover"
                />
              </motion.div>

              {/* Rotating border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-blue-500/20 scale-[1.15]"
              />

              {/* Deploy Terminal Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.5 }}
                className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-16 z-20"
              >
                <DeployTerminal />
              </motion.div>

              {/* Experience Badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 1.7 }}
                className="absolute -top-3 -left-3 md:-top-6 md:-left-14 z-20"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="bg-gradient-to-br from-blue-500/20 to-purple-600/20 backdrop-blur-xl rounded-xl p-3 border border-blue-500/30 text-center"
                >
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent block leading-6">
                    3+
                  </span>
                  <p className="text-gray-400 text-xs">Years Exp.</p>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Stats Counter Row */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="mt-16 md:mt-20"
        >
          <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/30 p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatItem
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  delay={1.9 + index * 0.15}
                  isVisible={isInView as boolean}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Scroll Down Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
          className="flex justify-center mt-12"
        >
          <motion.a
            href="#about"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center text-gray-500 hover:text-gray-300 transition-colors"
          >
            <span className="text-xs tracking-widest uppercase mb-2">Scroll Down</span>
            <FaChevronDown className="text-lg" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
