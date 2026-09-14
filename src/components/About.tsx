import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { FaCode, FaRocket, FaPalette, FaLightbulb } from 'react-icons/fa';
import TextDecode from './ui/TextDecode';

// Animated counter
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

// Extracted so the counter hook is never called inside a loop
const StatCard = ({
  value,
  suffix,
  label,
  index,
  isInView,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
  isInView: boolean;
}) => {
  const count = useCounter(value, 2000, isInView);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
      whileHover={{ scale: 1.05, y: -3 }}
      className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-slate-700/40 hover:border-blue-500/30 transition-all duration-300 text-center"
    >
      <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        {count}
        {suffix}
      </span>
      <p className="text-gray-400 text-sm mt-1">{label}</p>
    </motion.div>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: FaCode,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code following best practices',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FaRocket,
      title: 'Performance',
      description: 'Optimizing for speed and efficiency',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: FaPalette,
      title: 'Design Focused',
      description: 'Creating beautiful UI/UX experiences',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: FaLightbulb,
      title: 'Problem Solver',
      description: 'Turning challenges into opportunities',
      gradient: 'from-green-500 to-teal-500',
    },
  ];

  const stats = [
    { value: 3, suffix: '+', label: 'Years Experience' },
    { value: 40, suffix: '+', label: 'Projects Completed' },
    { value: 12, suffix: '+', label: 'Happy Clients' },
    { value: 25, suffix: '+', label: 'Technologies' },
  ];

  // Typing effect for code
  const codeLines = [
    { prefix: 'const', keyword: ' developer', op: ' = {', delay: 0 },
    { prefix: '  name:', value: ' "Rawan Mostafa"', comma: ',', delay: 0.5 },
    { prefix: '  role:', value: ' "Front-End Developer"', comma: ',', delay: 1 },
    { prefix: '  experience:', value: ' "3+ years"', comma: ',', delay: 1.5 },
    { prefix: '  skills:', value: ' ["React.js", "Next.js", "TypeScript"]', comma: ',', delay: 2 },
    {
      prefix: '  passion:',
      value: ' "Building amazing digital experiences"',
      comma: '',
      delay: 2.5,
    },
    { prefix: '};', value: '', comma: '', delay: 3 },
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-blue-300 text-sm font-medium tracking-wide uppercase">
              Get to know me
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <TextDecode
              text="About Me"
              className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent"
            />
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '5rem' } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Code Editor + Stats */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Glow background */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/5 to-purple-600/5 rounded-2xl blur-xl" />

              {/* Code Editor */}
              <div className="relative bg-slate-800/60 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900/50 border-b border-slate-700/50">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-gray-500 text-xs font-mono">developer.ts</span>
                  <div className="w-16" />
                </div>

                {/* Code content */}
                <div className="p-6 font-mono text-sm leading-7">
                  {codeLines.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.15 }}
                    >
                      <span className="text-purple-400">{line.prefix}</span>
                      <span className="text-blue-300">{line.keyword || ''}</span>
                      <span className="text-white">{line.op || ''}</span>
                      <span className="text-amber-300">{line.value}</span>
                      <span className="text-gray-500">{line.comma}</span>
                    </motion.div>
                  ))}
                  {/* Blinking cursor */}
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="inline-block w-2 h-5 bg-blue-400 ml-1"
                  />
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="grid grid-cols-2 gap-4"
            >
              {stats.map((stat, index) => (
                <StatCard
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  index={index}
                  isInView={isInView as boolean}
                />
              ))}
            </motion.div>
          </div>

          {/* Right Side - Content + Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="space-y-5">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate <span className="text-blue-400 font-semibold">Front-End Developer</span>{' '}
                with over 3 years of experience building modern web applications. I love turning
                ideas into elegant and performant digital solutions.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                My journey started at{' '}
                <span className="text-purple-400 font-semibold">Black Hours Academy</span>, and since
                then I've worked with various companies delivering solutions that exceed
                expectations. I specialize in{' '}
                <span className="text-blue-400 font-semibold">React.js</span>,{' '}
                <span className="text-blue-400 font-semibold">Next.js</span>, and{' '}
                <span className="text-blue-400 font-semibold">TypeScript</span>.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I believe in writing clean, maintainable code and creating seamless user
                experiences that make a real impact.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-5 border border-slate-700/40 hover:border-blue-500/30 transition-all duration-300 group"
                >
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="text-white text-lg" />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
