import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaGraduationCap } from 'react-icons/fa';
import TextDecode from './ui/TextDecode';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const experiences = [
    {
company: 'GoStack Solution',
position: 'Front-End Developer',
period: '2026 · 6 Months',
location: 'Cairo, Egypt',
description: [
'Developed and maintained multi-tenant web applications using modern front-end technologies',
'Built cross-platform mobile applications using React Native',
'Developed an LMS (Learning Management System) application for educational platforms',
'Contributed to Nota, a legal services mobile application for lawyers',
],
tags: ['React.js', 'React Native', 'Next.js', 'TypeScript', 'Multi-Tenant'],
color: 'from-cyan-500 to-blue-500',
dotColor: '#06b6d4',
},

    {
      company: 'MDARJ',
      position: 'Front-End Developer',
      period: '2025 - Present',
      location: 'Cairo, Egypt',
      description: [
        'Working on multiple React.js and Next.js projects for web applications and dashboards',
        'Developed a comprehensive platform with a chatbot for correcting Hadiths',
        'Built an interactive web application for the Ministry of Hajj coordination',
        'Developed a dynamic web platform for internal management',
      ],
      tags: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS'],
      color: 'from-blue-500 to-cyan-500',
      dotColor: '#3b82f6',
    },
    {
      company: 'Code Plus / My Code',
      position: 'Front-End Developer',
      period: '2024 - 2025',
      location: 'Cairo, Egypt',
      description: [
        'Built and maintained React.js projects with interactive UI elements',
        'Integrated forms, dynamic tables, and charts for dashboards',
        'Enhanced user experience by following modern UI/UX best practices',
      ],
      tags: ['React.js', 'Material-UI', 'Chart.js', 'REST API'],
      color: 'from-purple-500 to-pink-500',
      dotColor: '#a855f7',
    },
    {
      company: 'My Code (Remote)',
      position: 'Front-End Developer',
      period: '2023 - 2024',
      location: 'Cairo, Egypt',
      description: [
        'Developed responsive web applications using React.js and CSS',
        'Collaborated with team members to integrate APIs and optimize performance',
        'Worked on multiple dashboard projects for analytics and management',
      ],
      tags: ['React.js', 'CSS3', 'API Integration', 'Responsive'],
      color: 'from-green-500 to-teal-500',
      dotColor: '#10b981',
    },
    {
      company: 'Startup / Packing',
      position: 'Front-End Developer',
      period: '2022 - 2023',
      location: 'Cairo, Egypt',
      description: [
        'Created an e-commerce platform for packaging products and sweets',
        'Implemented secure payment systems and real-time inventory management',
        'Ensured responsive design and seamless user experience across devices',
      ],
      tags: ['React.js', 'Redux', 'Payment Gateway', 'Bootstrap'],
      color: 'from-orange-500 to-red-500',
      dotColor: '#f97316',
    },
  ];

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-slate-900/30">
      {/* Background */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      <div className="absolute top-20 right-0 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

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
            className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-5 py-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-purple-300 text-sm font-medium tracking-wide uppercase">
              My professional journey
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <TextDecode
              text="Experience"
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

        {/* Timeline */}
        <div className="relative" ref={timelineRef}>
          {/* Animated Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full">
            <div className="w-full h-full bg-slate-700/30" />
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
              style={{ height: lineHeight }}
            />
          </div>

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-[50%]' : 'md:pl-[50%]'
              }`}
            >
              <div className={`${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                  className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 md:p-7 border border-slate-700/40 hover:border-blue-500/30 transition-all duration-500 relative group"
                  style={{
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  {/* Top gradient line */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${exp.color} rounded-t-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300`} />

                  {/* Timeline Dot */}
                  <div
                    className={`hidden md:flex absolute top-8 ${
                      index % 2 === 0 ? '-right-[2.1rem]' : '-left-[2.1rem]'
                    } w-4 h-4 rounded-full items-center justify-center z-10`}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.3, 1],
                        boxShadow: [
                          `0 0 0 0 ${exp.dotColor}80`,
                          `0 0 0 8px ${exp.dotColor}00`,
                          `0 0 0 0 ${exp.dotColor}00`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.color}`}
                    />
                  </div>

                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors duration-300">
                      {exp.company}
                    </h3>
                    <p className={`text-lg bg-gradient-to-r ${exp.color} bg-clip-text text-transparent font-semibold`}>
                      {exp.position}
                    </p>
                  </div>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-400 text-sm">
                      <FaCalendarAlt className="mr-2 text-blue-400 text-xs" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center text-gray-400 text-sm">
                      <FaMapMarkerAlt className="mr-2 text-purple-400 text-xs" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-2 mb-5">
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -15 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.5 + index * 0.2 + i * 0.08 }}
                        className="text-gray-300 text-sm flex items-start gap-2"
                      >
                        <span className="text-blue-400 mt-1.5 text-[6px]">●</span>
                        <span className="flex-1">{item}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-slate-700/40 text-blue-300 rounded-full border border-slate-600/40 hover:border-blue-500/40 transition-colors duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover glow */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${exp.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500 pointer-events-none`} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-20"
        >
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center">
              <FaGraduationCap className="text-white" />
            </div>
            <h3 className="text-2xl font-bold">
              <TextDecode
                text="Education & Training"
                className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent"
              />
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/40 hover:border-green-500/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaBriefcase className="text-green-400 text-xl" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Helwan University</h4>
              <p className="text-green-400 font-semibold mb-2">Bachelor of Social Work</p>
              <p className="text-gray-400 text-sm">2014 - 2019 | Cairo, Egypt</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-slate-800/40 backdrop-blur-xl rounded-2xl p-6 border border-slate-700/40 hover:border-blue-500/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <FaBriefcase className="text-blue-400 text-xl" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Black Hours Academy</h4>
              <p className="text-blue-400 font-semibold mb-2">Front-End Developer Course</p>
              <p className="text-gray-400 text-sm">Mar 2022 - Mar 2023 | Cairo, Egypt</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Resume Download */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="/resume"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full text-white font-semibold shadow-lg relative overflow-hidden"
            style={{ boxShadow: '0 4px 25px rgba(99, 102, 241, 0.3)' }}
          >
            <span className="relative z-10">Download Full Resume</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
