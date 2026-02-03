import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaSass,
  FaBootstrap,
  FaGithub,
  FaDatabase,
  FaMobile,
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiMui,
  SiRedux,
} from 'react-icons/si';

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const skillCategories = [
    {
      title: 'Frontend Technologies',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React.js', icon: FaReact, level: 95, color: '#61DAFB' },
        { name: 'Next.js', icon: SiNextdotjs, level: 90, color: '#000000' },
        { name: 'TypeScript', icon: SiTypescript, level: 85, color: '#3178C6' },
        { name: 'JavaScript', icon: FaJs, level: 95, color: '#F7DF1E' },
        { name: 'HTML5', icon: FaHtml5, level: 98, color: '#E34F26' },
        { name: 'CSS3', icon: FaCss3Alt, level: 95, color: '#1572B6' },
      ],
    },
    {
      title: 'Styling & UI',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Tailwind CSS', icon: SiTailwindcss, level: 95, color: '#06B6D4' },
        { name: 'Material-UI', icon: SiMui, level: 90, color: '#007FFF' },
        { name: 'Bootstrap', icon: FaBootstrap, level: 90, color: '#7952B3' },
        { name: 'Sass', icon: FaSass, level: 88, color: '#CC6699' },
      ],
    },
    {
      title: 'State & Mobile',
      color: 'from-green-500 to-teal-500',
      skills: [
        { name: 'Redux', icon: SiRedux, level: 85, color: '#764ABC' },
        { name: 'React Native', icon: FaMobile, level: 80, color: '#61DAFB' },
        { name: 'GitHub', icon: FaGithub, level: 90, color: '#181717' },
        { name: 'SQL', icon: FaDatabase, level: 75, color: '#4479A1' },
      ],
    },
  ];

  const softSkills = [
    'Teamwork & Collaboration',
    'Excellent Communication',
    'Problem Solving',
    'Web Design',
    'Calm Under Pressure',
    'Technology Integration',
    'Adaptability',
    'Time Management',
  ];

  return (
    <section id="skills" className="py-20 relative overflow-hidden bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Skills & Expertise
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        {/* Technical Skills */}
        <div className="space-y-12 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.2 }}
            >
              <h3 className={`text-2xl font-bold mb-6 bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}>
                {category.title}
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: categoryIndex * 0.2 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <skill.icon
                          className="text-3xl mr-3"
                          style={{ color: skill.color }}
                        />
                        <span className="text-white font-semibold">{skill.name}</span>
                      </div>
                      <span className="text-blue-400 font-bold">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.2 + index * 0.1 + 0.5 }}
                        className={`h-full bg-gradient-to-r ${category.color} rounded-full`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            Soft Skills
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {softSkills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700 hover:border-orange-500/50 transition-all duration-300 text-center"
              >
                <span className="text-gray-300">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 1 }}
          className="mt-12"
        >
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
            Languages
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-green-500/50 transition-all duration-300"
            >
              <h4 className="text-xl font-bold text-white mb-3">Arabic</h4>
              <p className="text-gray-400 mb-2">Native Speaker</p>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ duration: 1, delay: 1.2 }}
                  className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                />
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <h4 className="text-xl font-bold text-white mb-3">English</h4>
              <p className="text-gray-400 mb-2">Upper Intermediate</p>
              <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '85%' } : {}}
                  transition={{ duration: 1, delay: 1.3 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
