import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaPaperPlane,
  FaCheck,
  FaClock,
  FaExclamationTriangle,
} from 'react-icons/fa';
import TextDecode from './ui/TextDecode';

// ─────────────────────────────────────────────────────────────
// Formspree integration
// 1. Create a free form at https://formspree.io → you get an ID
// 2. Add it here or to a .env file:  VITE_FORMSPREE_ID=xxxxxxx
// 3. Until configured, the form gracefully falls back to a
//    pre-filled mailto: link so nothing ever appears broken.
// ─────────────────────────────────────────────────────────────
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined;
const FORMSPREE_ENDPOINT = FORMSPREE_ID
  ? `https://formspree.io/f/${FORMSPREE_ID}`
  : null;

type Status = 'idle' | 'sending' | 'success' | 'error';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    // Honeypot — real users never see or fill this field
    _gotcha: '',
  });
  const [status, setStatus] = useState<Status>('idle');

  const contactInfo = [
    {
      icon: FaEnvelope,
      title: 'Email',
      value: 'rowan.mostafa2005@gmail.com',
      link: 'mailto:rowan.mostafa2005@gmail.com',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FaMapMarkerAlt,
      title: 'Location',
      value: 'Cairo, Egypt — open to remote',
      link: '#',
      gradient: 'from-green-500 to-teal-500',
    },
  ];

  const quickInfo = [
    {
      icon: FaClock,
      label: 'Response Time',
      value: 'Within 24 Hours',
    },
  ];

  // Only render socials that actually point somewhere —
  // add your real URLs and they appear automatically.
  const socialLinks = [
    { icon: FaGithub, href: 'https://github.com/ronymostafa2005', label: 'GitHub' },
    { icon: FaLinkedin, href: '', label: 'LinkedIn' }, // TODO: add real LinkedIn URL
    { icon: FaEnvelope, href: 'mailto:rowan.mostafa2005@gmail.com', label: 'Email' },
  ].filter((s) => s.href);

  const buildMailto = () => {
    const body = `${formData.message}\n\n— ${formData.name} (${formData.email})`;
    return `mailto:rowan.mostafa2005@gmail.com?subject=${encodeURIComponent(
      formData.subject || 'Portfolio contact'
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._gotcha) return; // bot caught by honeypot

    // Fallback: no Formspree configured → open the user's mail client
    if (!FORMSPREE_ENDPOINT) {
      window.location.href = buildMailto();
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
      });
      if (!res.ok) throw new Error(`Formspree error: ${res.status}`);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '', _gotcha: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputClass =
    'w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all duration-300 text-sm';

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-teal-500/20 to-transparent" />
      <div className="absolute top-20 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

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
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 text-sm font-medium tracking-wide uppercase">
              Have a project in mind? I'd love to hear about it.
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <TextDecode
              text="Let's Work Together"
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

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left Side — Contact Info (2 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-5 border border-slate-700/40"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                </span>
                <span className="text-green-400 font-semibold text-sm">
                  Available for opportunities
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Currently open to freelance and full-time opportunities. Let's discuss your project!
              </p>
            </motion.div>

            {/* Contact Cards */}
            <div className="space-y-3">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.link}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 5, scale: 1.02 }}
                  className="flex items-center p-4 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-slate-700/40 hover:border-teal-500/30 transition-all duration-300 group"
                >
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-r ${info.gradient} mr-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <info.icon className="text-white text-lg" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wider">{info.title}</p>
                    <p className="text-white font-medium text-sm">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Quick Info */}
            {quickInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-slate-800/40 backdrop-blur-xl rounded-xl border border-slate-700/40"
              >
                <div className="p-2 rounded-lg bg-teal-500/10">
                  <info.icon className="text-amber-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-xs">{info.label}</p>
                  <p className="text-white font-medium text-sm">{info.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              <h4 className="text-gray-400 text-sm uppercase tracking-wider mb-4">
                Connect with me
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.15, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                    className="w-11 h-11 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-gray-400 hover:text-white hover:border-teal-500/40 hover:bg-teal-500/10 transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side — Contact Form (3 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-slate-700/40">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mb-6"
                  >
                    <FaCheck className="text-white text-3xl" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-gray-400 text-center">
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                  {/* Honeypot — hidden from humans */}
                  <input
                    type="text"
                    name="_gotcha"
                    value={formData._gotcha}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-2 text-sm font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2 text-sm font-medium">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={inputClass}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-300 mb-2 text-sm font-medium">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={inputClass}
                      placeholder="Project Discussion"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-300 mb-2 text-sm font-medium">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {status === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-sm text-red-300"
                      role="alert"
                    >
                      <FaExclamationTriangle className="mt-0.5 shrink-0" />
                      <div>
                        <p className="font-semibold">Something went wrong.</p>
                        <p className="mt-0.5 text-red-300/80">
                          Please try again, or email me directly at{' '}
                          <a
                            href="mailto:rowan.mostafa2005@gmail.com"
                            className="underline hover:text-red-200"
                          >
                            rowan.mostafa2005@gmail.com
                          </a>
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {!FORMSPREE_ENDPOINT && (
                    <p className="text-xs text-gray-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500/60" />
                      Demo mode: submitting opens your email client. (Set{' '}
                      <code className="text-gray-400 font-mono">VITE_FORMSPREE_ID</code> to send
                      directly.)
                    </p>
                  )}

                  <motion.button
                    type="submit"
                    disabled={status === 'sending'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-teal-400 to-emerald-500 rounded-xl text-white font-semibold shadow-lg relative overflow-hidden flex items-center justify-center gap-2 disabled:opacity-70"
                    style={{ boxShadow: '0 4px 25px rgba(20, 184, 166, 0.3)' }}
                  >
                    {status === 'sending' ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <FaPaperPlane className="text-sm" />
                      </>
                    )}
                    {/* Shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                    />
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
