import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { FaCode, FaPalette, FaCogs, FaServer } from 'react-icons/fa';
import TextDecode from './ui/TextDecode';

// ───────────────────────────────────────────────────────────
// Mastery tier system — more meaningful than raw percentages
// ───────────────────────────────────────────────────────────
const getMasteryTier = (level: number) => {
  if (level >= 90)
    return {
      label: 'Expert',
      bg: 'bg-gradient-to-r from-amber-500/20 to-yellow-500/20',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
    };
  if (level >= 80)
    return {
      label: 'Advanced',
      bg: 'bg-gradient-to-r from-violet-500/20 to-purple-500/20',
      text: 'text-violet-400',
      border: 'border-violet-500/30',
    };
  if (level >= 70)
    return {
      label: 'Proficient',
      bg: 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
    };
  return {
    label: 'Skilled',
    bg: 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20',
    text: 'text-emerald-400',
    border: 'border-emerald-500/30',
  };
};

// ───────────────────────────────────────────────────────────
// Counter hook — animates numbers from 0 to target
// ───────────────────────────────────────────────────────────
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

// ───────────────────────────────────────────────────────────
// Mastery Cubes — 5 glowing gem-like blocks replacing rings
// ───────────────────────────────────────────────────────────
const MasteryCubes = ({
  level,
  color,
  isVisible,
}: {
  level: number;
  color: string;
  isVisible: boolean;
}) => {
  const filled = Math.ceil(level / 20);

  return (
    <div className="flex gap-1.5 items-center">
      {Array.from({ length: 5 }).map((_, i) => {
        const active = i < filled;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.35,
              delay: 0.4 + i * 0.07,
              type: 'spring',
              stiffness: 350,
            }}
            className="w-4 h-4 rounded-md"
            style={{
              background: active
                ? `linear-gradient(135deg, ${color}ee, ${color}88)`
                : 'linear-gradient(135deg, rgba(30,41,59,0.6), rgba(15,23,42,0.8))',
              boxShadow: active
                ? `0 2px 10px ${color}35, inset 0 1px 1px rgba(255,255,255,0.2)`
                : 'inset 0 1px 2px rgba(0,0,0,0.3)',
              border: `1px solid ${active ? `${color}40` : 'rgba(51,65,85,0.3)'}`,
            }}
          />
        );
      })}
    </div>
  );
};

// ───────────────────────────────────────────────────────────
// Language Gauge (Semi-circular) — matches reference design
// ───────────────────────────────────────────────────────────
const LanguageGauge = ({
  level,
  label,
  proficiency,
  gradientId,
  colors,
  isVisible,
}: {
  level: number;
  label: string;
  proficiency: string;
  gradientId: string;
  colors: [string, string];
  isVisible: boolean;
}) => {
  const radius = 60;
  const circumference = Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;
  const count = useCounter(level, 1800, isVisible);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.04, y: -5 }}
      className="bg-slate-800/40 backdrop-blur-md rounded-2xl p-6 border border-slate-700/50 hover:border-indigo-500/40 transition-all duration-500 flex flex-col items-center"
    >
      <div className="relative w-36 h-20 mb-3">
        <svg viewBox="0 0 140 80" className="w-full h-full">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={colors[0]} />
              <stop offset="100%" stopColor={colors[1]} />
            </linearGradient>
          </defs>
          <path d="M 10 70 A 60 60 0 0 1 130 70" className="gauge-track" />
          <path
            d="M 10 70 A 60 60 0 0 1 130 70"
            className="gauge-fill"
            stroke={`url(#${gradientId})`}
            strokeDasharray={circumference}
            strokeDashoffset={isVisible ? offset : circumference}
            style={{ filter: `drop-shadow(0 0 8px ${colors[0]}50)` }}
          />
        </svg>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <span className="text-2xl font-bold text-white">{count}%</span>
        </div>
      </div>
      <h4 className="text-lg font-bold text-white mt-1">{label}</h4>
      <p className="text-sm text-gray-400">{proficiency}</p>
    </motion.div>
  );
};

// ───────────────────────────────────────────────────────────
// Orbital Ring — technologies orbiting a center icon
// ───────────────────────────────────────────────────────────
interface OrbitSkill {
  name: string;
  iconUrl: string;
  invertIcon?: boolean;
}

const OrbitalView = ({
  skills,
  isVisible,
}: {
  skills: OrbitSkill[];
  isVisible: boolean;
}) => {
  const centerSkill = skills[0];
  const orbitSkills = skills.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="relative w-full max-w-[420px] mx-auto aspect-square mb-12"
    >
      {/* Wave background effect */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[1, 2, 3, 4].map((ring) => (
          <motion.div
            key={ring}
            className="absolute rounded-full border"
            style={{
              width: `${ring * 22 + 20}%`,
              height: `${ring * 22 + 20}%`,
              borderColor: `rgba(99, 102, 241, ${0.12 - ring * 0.02})`,
            }}
            animate={{
              scale: [1, 1.02, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 3 + ring * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: ring * 0.3,
            }}
          />
        ))}
      </div>

      {/* Aurora / Wave glow effect */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        animate={{
          rotate: [0, 360],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        <div
          className="w-3/4 h-3/4 rounded-full"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(99, 102, 241, 0.08) 25%, transparent 50%, rgba(168, 85, 247, 0.08) 75%, transparent 100%)',
            filter: 'blur(30px)',
          }}
        />
      </motion.div>

      {/* Center Icon */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <motion.div
          animate={{
            boxShadow: [
              '0 0 30px rgba(99, 102, 241, 0.2)',
              '0 0 60px rgba(99, 102, 241, 0.4)',
              '0 0 30px rgba(99, 102, 241, 0.2)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-slate-800/80 backdrop-blur-xl border border-indigo-500/30 flex items-center justify-center"
        >
          <img
            src={centerSkill.iconUrl}
            alt={centerSkill.name}
            className="w-12 h-12 md:w-14 md:h-14 object-contain"
            style={centerSkill.invertIcon ? { filter: 'brightness(0) invert(1)' } : {}}
          />
        </motion.div>
        <p className="text-center text-white text-sm font-semibold mt-2">{centerSkill.name}</p>
      </div>

      {/* Orbiting Icons */}
      {orbitSkills.map((skill, index) => {
        const angle = (360 / orbitSkills.length) * index - 90;
        const radius = 38; // percentage from center
        const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
        const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

        return (
          <motion.div
            key={skill.name}
            className="absolute z-10"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: 'translate(-50%, -50%)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: 0.5 + index * 0.12,
              type: 'spring',
              stiffness: 200,
            }}
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2.5 + index * 0.3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
              className="flex flex-col items-center"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-slate-800/70 backdrop-blur-md border border-slate-700/50 flex items-center justify-center hover:border-indigo-500/40 hover:scale-110 transition-all duration-300 group">
                <img
                  src={skill.iconUrl}
                  alt={skill.name}
                  className="w-7 h-7 md:w-8 md:h-8 object-contain"
                  style={skill.invertIcon ? { filter: 'brightness(0) invert(1)' } : {}}
                />
              </div>
              <span className="text-gray-300 text-xs font-medium mt-1.5 whitespace-nowrap">{skill.name}</span>
            </motion.div>
          </motion.div>
        );
      })}

      {/* Connecting lines from center to orbiting nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 100 100">
        {orbitSkills.map((skill, index) => {
          const angle = (360 / orbitSkills.length) * index - 90;
          const radius = 38;
          const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
          const y = 50 + radius * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.line
              key={skill.name}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="rgba(99, 102, 241, 0.1)"
              strokeWidth="0.3"
              strokeDasharray="2 2"
              initial={{ pathLength: 0 }}
              animate={isVisible ? { pathLength: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
};

// ───────────────────────────────────────────────────────────
// Main Skills Component
// ───────────────────────────────────────────────────────────
const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeTab, setActiveTab] = useState(0);

  // ── Skill data with devicon CDN URLs ──
  const skillCategories = [
    {
      title: 'Frontend',
      icon: FaCode,
      gradient: 'from-blue-500 to-cyan-400',
      bgGlow: 'rgba(59, 130, 246, 0.15)',
      skills: [
        {
          name: 'React.js',
          level: 92,
          color: '#61DAFB',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        },
        {
          name: 'Next.js',
          level: 85,
          color: '#a8b2c1',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg',
          invertIcon: true,
        },
        {
          name: 'TypeScript',
          level: 88,
          color: '#3178C6',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
        },
        {
          name: 'JavaScript',
          level: 95,
          color: '#F7DF1E',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
        },
        {
          name: 'HTML5',
          level: 98,
          color: '#E34F26',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
        },
        {
          name: 'CSS3',
          level: 95,
          color: '#1572B6',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
        },
        {
          name: 'Tailwind CSS',
          level: 90,
          color: '#06B6D4',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
        },
      ],
    },
    {
      title: 'Backend',
      icon: FaServer,
      gradient: 'from-green-500 to-emerald-400',
      bgGlow: 'rgba(16, 185, 129, 0.15)',
      skills: [
        {
          name: 'Node.js',
          level: 78,
          color: '#339933',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
        },
        {
          name: '.NET',
          level: 72,
          color: '#512BD4',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg',
        },
        {
          name: 'SQL',
          level: 75,
          color: '#4479A1',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
        },
        {
          name: 'REST API',
          level: 85,
          color: '#61DAFB',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain-wordmark.svg',
        },
      ],
    },
    {
      title: 'Tools',
      icon: FaCogs,
      gradient: 'from-purple-500 to-pink-500',
      bgGlow: 'rgba(168, 85, 247, 0.15)',
      skills: [
        {
          name: 'Redux',
          level: 85,
          color: '#764ABC',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg',
        },
        {
          name: 'Material-UI',
          level: 85,
          color: '#007FFF',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg',
        },
        {
          name: 'Bootstrap',
          level: 88,
          color: '#7952B3',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg',
        },
        {
          name: 'Sass',
          level: 82,
          color: '#CC6699',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sass/sass-original.svg',
        },
        {
          name: 'GitHub',
          level: 90,
          color: '#E6EDF3',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg',
          invertIcon: true,
        },
      ],
    },
    {
      title: 'Others',
      icon: FaPalette,
      gradient: 'from-amber-500 to-orange-500',
      bgGlow: 'rgba(245, 158, 11, 0.15)',
      skills: [
        {
          name: 'React Native',
          level: 80,
          color: '#61DAFB',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
        },
        {
          name: 'Figma',
          level: 75,
          color: '#F24E1E',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
        },
        {
          name: 'VS Code',
          level: 95,
          color: '#007ACC',
          iconUrl:
            'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg',
        },
      ],
    },
  ];

  const softSkills = [
    { name: 'Teamwork & Collaboration', emoji: '🤝', gradient: 'from-blue-500 to-indigo-600' },
    { name: 'Excellent Communication', emoji: '💬', gradient: 'from-purple-500 to-pink-500' },
    { name: 'Problem Solving', emoji: '🧩', gradient: 'from-amber-500 to-orange-500' },
    { name: 'Web Design', emoji: '🎨', gradient: 'from-cyan-500 to-blue-500' },
    { name: 'Calm Under Pressure', emoji: '🧘', gradient: 'from-emerald-500 to-teal-500' },
    { name: 'Technology Integration', emoji: '⚡', gradient: 'from-violet-500 to-purple-500' },
    { name: 'Adaptability', emoji: '🔄', gradient: 'from-rose-500 to-red-500' },
    { name: 'Time Management', emoji: '⏱️', gradient: 'from-teal-500 to-cyan-500' },
  ];

  const handleTabChange = useCallback((index: number) => {
    setActiveTab(index);
  }, []);

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 skills-bg-pattern opacity-50" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/[0.03] rounded-full blur-3xl" />

      {/* Aurora wave effect at top */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: ['-20%', '20%', '-20%'],
            y: ['-10%', '10%', '-10%'],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/4 w-[600px] h-[300px] opacity-30"
          style={{
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(139, 92, 246, 0.1), rgba(236, 72, 153, 0.08))',
            borderRadius: '50%',
            filter: 'blur(60px)',
          }}
        />
        <motion.div
          animate={{
            x: ['20%', '-20%', '20%'],
            y: ['10%', '-10%', '10%'],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 right-1/4 w-[500px] h-[250px] opacity-20"
          style={{
            background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(59, 130, 246, 0.1))',
            borderRadius: '50%',
            filter: 'blur(50px)',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* ────── Section Header ────── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
            className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-indigo-300 text-sm font-medium tracking-wide uppercase">
              Technologies I work with
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-bold mb-5">
            <span className="text-white">Skills &amp; </span>
            <TextDecode
              text="Expertise"
              className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent"
            />
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '5rem' } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 mx-auto rounded-full mt-4"
          />
        </motion.div>

        {/* ────── Category Tabs ────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {skillCategories.map((cat, i) => (
            <motion.button
              key={cat.title}
              onClick={() => handleTabChange(i)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center gap-2.5 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === i
                  ? `bg-gradient-to-r ${cat.gradient} text-white shadow-lg`
                  : 'bg-slate-800/60 text-gray-400 hover:text-white hover:bg-slate-700/60 border border-slate-700/50'
                }`}
              style={
                activeTab === i ? { boxShadow: `0 8px 30px ${cat.bgGlow}` } : {}
              }
            >
              <cat.icon className="text-lg" />
              {cat.title}
            </motion.button>
          ))}
        </motion.div>

        {/* ────── Orbital View ────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`orbital-${activeTab}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <OrbitalView
              skills={skillCategories[activeTab].skills.map((s) => ({
                name: s.name,
                iconUrl: s.iconUrl,
                invertIcon: (s as { invertIcon?: boolean }).invertIcon,
              }))}
              isVisible={isInView as boolean}
            />
          </motion.div>
        </AnimatePresence>

        {/* ────── Proficiency Level (Wave Progress Bars) ────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-20"
        >
          <h3 className="text-xl font-bold text-white mb-8 text-center">Proficiency Level</h3>

          <AnimatePresence mode="wait">
            <motion.div
              key={`bars-${activeTab}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto"
            >
              {skillCategories[activeTab].skills.map((skill, index) => {
                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.08 }}
                    className="group"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <img
                        src={skill.iconUrl}
                        alt={skill.name}
                        className="w-5 h-5 object-contain"
                        style={
                          (skill as { invertIcon?: boolean }).invertIcon
                            ? { filter: 'brightness(0) invert(1)' }
                            : {}
                        }
                      />
                      <span className="text-white font-medium text-sm">{skill.name}</span>
                    </div>
                    {/* Wave-style progress bar */}
                    <div className="relative h-3 bg-slate-800/60 rounded-full overflow-hidden border border-slate-700/30">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        initial={{ width: '0%' }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.5, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                          background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
                          boxShadow: `0 0 12px ${skill.color}40`,
                        }}
                      >
                        {/* Wave shimmer effect */}
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{
                            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)',
                          }}
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* ────── 3D Skill Cards Grid ────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20"
          >
            {skillCategories[activeTab].skills.map((skill, index) => {
              const tier = getMasteryTier(skill.level);
              return (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="skill-3d-card bg-slate-800/40 backdrop-blur-md rounded-2xl p-5 border border-slate-700/40 cursor-default group"
                  style={{ '--glow-color': skill.color } as React.CSSProperties}
                >
                  <div className="flex items-center gap-5">
                    {/* ── 3D Icon with floating platform ── */}
                    <div className="icon-3d-container relative flex-shrink-0">
                      <div
                        className="icon-3d-base w-[4.5rem] h-[4.5rem] rounded-2xl flex items-center justify-center"
                        style={
                          {
                            '--icon-color': skill.color,
                          } as React.CSSProperties
                        }
                      >
                        <img
                          src={skill.iconUrl}
                          alt={skill.name}
                          className="w-10 h-10 object-contain icon-3d-float select-none"
                          loading="lazy"
                          draggable={false}
                          style={
                            (skill as { invertIcon?: boolean }).invertIcon
                              ? { filter: 'brightness(0) invert(1)' }
                              : {}
                          }
                        />
                      </div>
                      {/* Reflection shadow beneath icon */}
                      <div
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-10 h-2 rounded-full blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-500"
                        style={{ background: skill.color }}
                      />
                    </div>

                    {/* ── Skill Info ── */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2.5">
                        <h4 className="text-white font-semibold text-[0.95rem] truncate pr-2">
                          {skill.name}
                        </h4>
                        <div
                          className={`flex-shrink-0 px-2.5 py-0.5 rounded-full text-[0.65rem] font-bold uppercase tracking-wider ${tier.bg} ${tier.text} border ${tier.border}`}
                        >
                          {tier.label}
                        </div>
                      </div>

                      {/* Mastery cubes */}
                      <div className="flex items-center justify-between">
                        <MasteryCubes
                          level={skill.level}
                          color={skill.color}
                          isVisible={isInView as boolean}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ────── Soft Skills (Floating Tags) ────── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-lg">✨</span>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Soft Skills
            </h3>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.7 + index * 0.08,
                  type: 'spring',
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.12,
                  rotate: Math.random() > 0.5 ? 2 : -2,
                }}
                className="floating-tag group"
                style={{ animationDelay: `${index * 0.5}s` }}
              >
                <div
                  className="flex items-center gap-2.5 rounded-full pl-4 pr-5 py-2.5 border backdrop-blur-sm cursor-default"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(30,41,59,0.6))',
                    borderColor: 'rgba(255,255,255,0.08)',
                  }}
                >
                  <span className="text-xl">{skill.emoji}</span>
                  <span className="text-gray-200 font-medium text-sm whitespace-nowrap">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ────── Languages (Semi-circular Gauge) ────── */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
              <span className="text-lg">🌍</span>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Languages
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <LanguageGauge
              level={100}
              label="Arabic"
              proficiency="Native Speaker"
              gradientId="gauge-arabic"
              colors={['#10b981', '#06b6d4']}
              isVisible={isInView as boolean}
            />
            <LanguageGauge
              level={85}
              label="English"
              proficiency="Upper Intermediate"
              gradientId="gauge-english"
              colors={['#6366f1', '#a855f7']}
              isVisible={isInView as boolean}
            />
            <LanguageGauge
              level={60}
              label="German"
              proficiency="Intermediate"
              gradientId="gauge-german"
              colors={['#f59e0b', '#ef4444']}
              isVisible={isInView as boolean}
            />
          </div>
        </motion.div>

        {/* ────── Bottom Stats Banner ────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-16 bg-gradient-to-r from-slate-800/60 via-indigo-900/20 to-slate-800/60 backdrop-blur-md rounded-2xl p-8 border border-slate-700/30"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '18+', label: 'Technologies', icon: '🛠️' },
              { value: '3+', label: 'Years Learning', icon: '📚' },
              { value: '8', label: 'Soft Skills', icon: '🌟' },
              { value: '3', label: 'Languages', icon: '🗣️' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="group"
              >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1 group-hover:text-indigo-400 transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
