import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/ronymostafa2005', label: 'GitHub' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaEnvelope, href: 'mailto:rowan.mostafa2005@gmail.com', label: 'Email' },
  ];

  return (
    <footer className="relative overflow-hidden bg-slate-900/50 border-t border-slate-800">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-blue-500/5"
            style={{
              width: Math.random() * 50 + 20,
              height: Math.random() * 50 + 20,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <motion.h3
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-4"
            >
              RAWAN.DEV
            </motion.h3>
            <p className="text-gray-400">
              Front-End Developer specializing in building exceptional digital experiences with modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Home', 'About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                <li key={item}>
                  <motion.a
                    href={`#${item.toLowerCase()}`}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-2 text-gray-400">
              <p>Maadi, Cairo, Egypt</p>
              <p>rowan.mostafa2005@gmail.com</p>
              <p>+20 1552409013</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center text-gray-400 hover:text-blue-400 hover:border-blue-500/50 transition-all duration-300"
            >
              <social.icon size={18} />
            </motion.a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center border-t border-slate-800 pt-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-400 flex items-center justify-center gap-2"
          >
            © {currentYear} Rawan Moustafa. Made with{' '}
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              <FaHeart className="text-red-500" />
            </motion.span>{' '}
            and React
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
