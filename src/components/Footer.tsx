import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Only render socials that point somewhere real.
  // TODO: add your LinkedIn URL and it appears automatically.
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/ronymostafa2005', label: 'GitHub' },
    { icon: FaEnvelope, href: 'mailto:rowan.mostafa2005@gmail.com', label: 'Email' },
  ].filter((s) => s.href);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume', href: '/resume' },
  ];

  const services = [
    'Web Development',
    'UI/UX Design',
    'Frontend Development',
    'Responsive Design',
    'Performance Optimization',
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-900/80 border-t border-slate-800/50">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-teal-300 via-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-4 inline-block"
            >
              RAWAN.DEV
            </motion.h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Building digital experiences that make a difference. Passionate about clean code and beautiful interfaces.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-teal-500/40 hover:bg-teal-500/10 transition-all duration-300"
                >
                  <social.icon size={15} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <motion.a
                    href={item.href}
                    whileHover={{ x: 4 }}
                    className="text-gray-400 hover:text-teal-300 transition-colors duration-300 text-sm flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-600" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Let's Connect</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <p className="flex items-center gap-2">
                <span className="text-teal-300">📍</span>
                Cairo, Egypt
              </p>
              <p className="flex items-center gap-2">
                <span className="text-teal-300">📧</span>
                rowan.mostafa2005@gmail.com
              </p>
              <div className="pt-2">
                <div className="flex items-center gap-2 text-green-400 text-xs">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  Available for new opportunities
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm flex items-center gap-1.5">
            © {currentYear} Rawan Mostafa. Crafted with{' '}
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <FaHeart className="text-red-500 text-xs" />
            </motion.span>{' '}
            and React
          </p>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-500 hover:text-teal-300 transition-colors duration-300 flex items-center gap-2 text-sm"
          >
            Back to top
            <FaArrowUp className="text-xs" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
