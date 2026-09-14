import { motion, AnimatePresence } from 'framer-motion';
import { useInView, useReducedMotion } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';
import { FaExternalLinkAlt, FaGithub, FaLock } from 'react-icons/fa';
import TextDecode from './ui/TextDecode';

// ─────────────────────────────────────────────────────────────
// Lazy iframe: only mounts when the card is near the viewport.
// Uses load/timeout detection — if the site refuses embedding
// (X-Frame-Options), it falls back to a graceful overlay.
// ─────────────────────────────────────────────────────────────
const LivePreview = ({ url, color }: { url: string; color: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [nearViewport, setNearViewport] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Some sites render a blank frame instead of failing to load —
  // after a timeout without load, assume blocked and show the overlay.
  useEffect(() => {
    if (!nearViewport || loaded || url === '#') return;
    const timeout = setTimeout(() => {
      if (!loaded) setBlocked(true);
    }, 6000);
    return () => clearTimeout(timeout);
  }, [nearViewport, loaded, url]);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Gradient base — always visible while loading / as fallback */}
      <div className="absolute inset-0" style={{ background: color, opacity: 0.15 }} />

      {nearViewport && url !== '#' && (
        <iframe
          src={url}
          title="Live project preview"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin"
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-700 ${
            loaded && !blocked ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ pointerEvents: 'none', transform: 'scale(1)' }}
        />
      )}

      {/* Private project (no public URL) */}
      {url === '#' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-slate-900/60 backdrop-blur-sm">
          <FaLock className="text-2xl text-gray-500" />
          <span className="text-xs text-gray-400">Private deployment — available on request</span>
        </div>
      )}

      {/* Blocked / loading overlay */}
      <AnimatePresence>
        {url !== '#' && (!loaded || blocked) && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-900/60 backdrop-blur-sm"
          >
            {!blocked ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                  className="w-8 h-8 rounded-full border-2 border-white/20 border-t-blue-400"
                />
                <span className="text-xs text-gray-400 font-mono">loading preview…</span>
              </>
            ) : (
              <>
                <FaLock className="text-2xl text-gray-500" />
                <span className="text-xs text-gray-400 text-center px-4">
                  This site blocks embedded previews
                </span>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1.5"
                >
                  Visit live site <FaExternalLinkAlt size={9} />
                </a>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ── Project card with 3D tilt + cursor spotlight ──
const ProjectCard = ({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) => {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [spot, setSpot] = useState<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduceMotion) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (py - 0.5) * -6, ry: (px - 0.5) * 8 });
    setSpot({ x: px * 100, y: py * 100 });
  };

  const handleLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setSpot(null);
  };

  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group [perspective:1200px]"
    >
      <motion.div
        ref={cardRef}
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        className="relative bg-slate-800/40 backdrop-blur-xl rounded-2xl overflow-hidden border border-slate-700/40 hover:border-blue-500/30 transition-colors duration-500 h-full flex flex-col"
        style={{
          rotateX: tilt.rx,
          rotateY: tilt.ry,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Browser chrome window */}
        <div className="relative h-48 bg-slate-900/80 border-b border-slate-700/50 overflow-hidden">
          {/* Chrome bar */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-800/90 border-b border-slate-700/50 relative z-10">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 mx-2 px-2.5 py-0.5 rounded-md bg-slate-900/80 border border-slate-700/50 text-[10px] text-gray-400 font-mono truncate flex items-center gap-1.5">
              <span className="text-green-500">●</span>
              {project.link !== '#' ? project.link.replace(/^https?:\/\//, '') : 'private deployment'}
            </div>
          </div>

          {/* Live site preview (lazy) */}
          <div className="absolute inset-x-0 top-[34px] bottom-0">
            <LivePreview url={project.link} color={project.color} />
          </div>

          {/* Category badge */}
          <div className="absolute top-11 right-3 z-20">
            <span className="px-2.5 py-0.5 text-[10px] bg-black/50 backdrop-blur-sm text-white rounded-full border border-white/10">
              {project.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>

          <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">{project.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 4).map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs bg-slate-700/40 text-blue-300 rounded-lg border border-slate-600/30"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-2.5 py-1 text-xs text-gray-500">+{project.tags.length - 4}</span>
            )}
          </div>

          {/* Links */}
          <div className="flex gap-4 pt-2 border-t border-slate-700/30">
            {project.link !== '#' && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.title} live demo`}
                className="flex items-center text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 gap-1.5"
              >
                <FaExternalLinkAlt size={11} />
                <span>Live Demo</span>
              </a>
            )}
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} source code`}
              className="flex items-center text-sm text-purple-400 hover:text-purple-300 transition-colors duration-300 gap-1.5"
            >
              <FaGithub size={13} />
              <span>Code</span>
            </a>
          </div>
        </div>

        {/* Cursor spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: spot
              ? `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, ${project.color}14 0%, transparent 65%)`
              : 'none',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

interface Project {
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  category: string;
  link: string;
  github: string;
  color: string;
}

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Web Apps', 'Dashboards', 'E-Commerce', 'Platforms'];

  const projects: Project[] = [
    {
      title: 'COZMATICS — Luxury Beauty',
      description:
        'Haute beauté & clean cosmetics brand site. Luxury e-commerce experience with refined typography, product storytelling, and a premium shopping journey.',
      tags: ['React.js', 'Next.js', 'Tailwind CSS', 'E-Commerce', 'Responsive'],
      gradient: 'from-rose-500 to-pink-500',
      category: 'E-Commerce',
      link: 'https://cozmatics-luxury-beauty.vercel.app/',
      github: 'https://github.com/ronymostafa2005',
      color: '#f43f5e',
    },
    {
      title: 'NOIR KITCHEN',
      description:
        'Chef-driven delivery brand — crafted behind the scenes, served with obsession. Signature menu, ordering flow, and a dark premium food experience.',
      tags: ['React.js', 'Next.js', 'Tailwind CSS', 'UI/UX', 'Responsive'],
      gradient: 'from-amber-500 to-orange-600',
      category: 'E-Commerce',
      link: 'https://cozmatics-luxury-beauty-h2sc.vercel.app/',
      github: 'https://github.com/ronymostafa2005',
      color: '#f59e0b',
    },
    {
      title: 'منصة الإسلام الشاملة',
      description:
        'A comprehensive platform for Islamic knowledge with an AI chatbot for verifying Hadiths. Features real-time verification and extensive database integration.',
      tags: ['React.js', 'Next.js', 'AI Chatbot', 'TypeScript', 'Tailwind CSS'],
      gradient: 'from-blue-500 to-cyan-500',
      category: 'Platforms',
      link: 'https://seraanabyy.vercel.app/',
      github: 'https://github.com/ronymostafa2005',
      color: '#3b82f6',
    },
    {
      title: 'Startup Packing',
      description:
        'Full-featured e-commerce platform for packaging and sweets. Includes secure payment gateway, real-time inventory management, and admin dashboard.',
      tags: ['React.js', 'Redux', 'Payment Gateway', 'Bootstrap', 'REST API'],
      gradient: 'from-orange-500 to-red-500',
      category: 'E-Commerce',
      link: 'https://newstartup-qlxo.vercel.app/',
      github: 'https://github.com/ronymostafa2005',
      color: '#f97316',
    },
    {
      title: 'Analytics Dashboard',
      description:
        'Comprehensive analytics dashboard with interactive charts, real-time data updates, and customizable widgets for data visualization.',
      tags: ['React.js', 'PrimeReact', 'Chart.js', 'Material-UI'],
      gradient: 'from-indigo-500 to-purple-500',
      category: 'Dashboards',
      link: 'https://dashboard-2-gamma.vercel.app/dashboard',
      github: 'https://github.com/ronymostafa2005',
      color: '#6366f1',
    },
    {
      title: 'My Code Agency',
      description:
        'Modern agency website showcasing services, projects, and team. Responsive design with smooth animations and intuitive navigation.',
      tags: ['React.js', 'CSS3', 'Responsive Design', 'API Integration'],
      gradient: 'from-purple-500 to-pink-500',
      category: 'Web Apps',
      link: 'https://my-code-agency.netlify.app/',
      github: 'https://github.com/ronymostafa2005',
      color: '#a855f7',
    },
    {
      title: 'Ministry of Hajj Coordination',
      description:
        'Interactive web application for Hajj coordination operations. Features real-time tracking, scheduling, and communication tools.',
      tags: ['Next.js', 'React.js', 'Material-UI', 'API Integration'],
      gradient: 'from-green-500 to-teal-500',
      category: 'Platforms',
      link: '#',
      github: 'https://github.com/ronymostafa2005',
      color: '#10b981',
    },
    {
      title: 'Chemical Materials Management',
      description:
        'Web platform for chemical inventory management, usage tracking, and report generation with data visualization.',
      tags: ['React.js', 'Chart.js', 'Material-UI', 'Node.js'],
      gradient: 'from-pink-500 to-rose-500',
      category: 'Dashboards',
      link: '#',
      github: 'https://github.com/ronymostafa2005',
      color: '#ec4899',
    },
  ];

  const filteredProjects =
    activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

  const handleFilterChange = useCallback((filter: string) => {
    setActiveFilter(filter);
  }, []);

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      <div className="absolute top-40 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
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
            className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-cyan-300 text-sm font-medium tracking-wide uppercase">
              Some of my recent work
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <TextDecode
              text="Featured Projects"
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

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((filter) => (
            <motion.button
              key={filter}
              onClick={() => handleFilterChange(filter)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'bg-slate-800/50 text-gray-400 hover:text-white border border-slate-700/50 hover:border-blue-500/30'
              }`}
              style={
                activeFilter === filter ? { boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)' } : {}
              }
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                isInView={true}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="https://github.com/ronymostafa2005"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-slate-600 rounded-full text-gray-300 font-semibold hover:border-blue-500/50 hover:text-white transition-all duration-300"
          >
            <FaGithub />
            View All Projects
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
