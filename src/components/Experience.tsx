import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const experiences = [
    {
      company: 'MDARJ',
      position: 'Front-End Developer',
      period: '2025-2026',
      location: 'Cairo, Egypt',
      description: [
        'Worked on multiple React.js and Next.js projects for web applications and dashboards',
        'Developed a comprehensive platform with a chatbot for correcting Hadiths',
        'Built an interactive web application for the Ministry of Hajj coordination',
        'Developed a dynamic web platform for internal management',
        'Built a web platform to manage chemical materials and inventory',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      company: 'Code Plus / My Code',
      position: 'Front-End Developer',
      period: '2024-2025',
      location: 'Cairo, Egypt',
      description: [
        'Built and maintained React.js projects with interactive UI elements',
        'Integrated forms, dynamic tables, and charts for user-friendly dashboards',
        'Enhanced user experience by following modern UI/UX best practices',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      company: 'My Code',
      position: 'Front-End Developer (Remote)',
      period: '2023-2024',
      location: 'Cairo, Egypt',
      description: [
        'Developed responsive web applications using React.js and CSS',
        'Collaborated with team members to integrate APIs and optimize performance',
        'Worked on multiple dashboard projects for analytics and management',
      ],
      color: 'from-green-500 to-teal-500',
    },
    {
      company: 'Startup / Packing',
      position: 'Front-End Developer',
      period: '2022-2023',
      location: 'Cairo, Egypt',
      description: [
        'Created an e-commerce platform for packaging products and sweets',
        'Implemented secure payment systems and real-time inventory management',
        'Ensured responsive design and seamless user experience across devices',
        'Optimized performance for faster loading times',
      ],
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 opacity-20" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:text-right'
              }`}
            >
              <div className={`md:w-1/2 ${index % 2 === 0 ? '' : 'md:ml-auto'}`}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 relative"
                >
                  {/* Timeline Dot */}
                  <div className={`hidden md:block absolute top-8 ${
                    index % 2 === 0 ? '-right-8' : '-left-8'
                  }`}>
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          '0 0 0 0 rgba(59, 130, 246, 0.7)',
                          '0 0 0 10px rgba(59, 130, 246, 0)',
                          '0 0 0 0 rgba(59, 130, 246, 0)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.color}`}
                    />
                  </div>

                  {/* Company & Position */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={index % 2 === 0 ? '' : 'text-right'}>
                      <h3 className="text-2xl font-bold text-white mb-1">{exp.company}</h3>
                      <p className={`text-lg bg-gradient-to-r ${exp.color} bg-clip-text text-transparent font-semibold`}>
                        {exp.position}
                      </p>
                    </div>
                  </div>

                  {/* Period & Location */}
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-400">
                      <FaCalendarAlt className="mr-2 text-blue-400" />
                      <span>{exp.period}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <FaMapMarkerAlt className="mr-2 text-purple-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <ul className={`space-y-2 ${index % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                    {exp.description.map((item, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: index * 0.2 + i * 0.1 }}
                        className="text-gray-300 flex items-start"
                      >
                        <span className={`${index % 2 === 0 ? 'mr-2' : 'ml-2 order-2'} text-blue-400`}>•</span>
                        <span className="flex-1">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-8">
            <span className="bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent">
              Education & Training
            </span>
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-green-500/50 transition-all duration-300"
            >
              <FaBriefcase className="text-green-400 text-3xl mb-3" />
              <h4 className="text-xl font-bold text-white mb-2">Helwan University</h4>
              <p className="text-green-400 font-semibold mb-2">Bachelor of Social Work</p>
              <p className="text-gray-400">2014 - 2019 | Cairo, Egypt</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <FaBriefcase className="text-blue-400 text-3xl mb-3" />
              <h4 className="text-xl font-bold text-white mb-2">Black Hours Academy</h4>
              <p className="text-blue-400 font-semibold mb-2">Front-End Developer Course</p>
              <p className="text-gray-400">Mar 2022 - Mar 2023 | Cairo, Egypt</p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
