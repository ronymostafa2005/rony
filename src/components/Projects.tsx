import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const projects = [
    {
      title: 'منصة الإسلام الشاملة',
      description: 'منصة شاملة لكل ما يخص المسلم مع روبوت محادثة ذكي للتحقق من صحة الأحاديث. تتضمن التحقق في الوقت الفعلي والتكامل مع قاعدة بيانات واسعة.',
      tags: ['React.js', 'Next.js', 'AI Chatbot', 'TypeScript', 'Tailwind CSS'],
      gradient: 'from-blue-500 to-cyan-500',
      link: 'https://seraanabyy.vercel.app/',
      github: 'https://github.com/ronymostafa2005',
    },
    {
      title: 'Startup Packing',
      description: 'منصة تجارة إلكترونية متكاملة لمنتجات التعبئة والتغليف والحلويات. تتضمن نظام دفع آمن وإدارة المخزون في الوقت الفعلي ولوحة تحكم للإدارة.',
      tags: ['React.js', 'Redux', 'Payment Gateway', 'Bootstrap', 'REST API'],
      gradient: 'from-orange-500 to-red-500',
      link: 'https://newstartup-qlxo.vercel.app/',
      github: 'https://github.com/ronymostafa2005',
    },
    {
      title: 'Analytics Dashboard',
      description: 'لوحة تحكم شاملة لحساب الإحصائيات مع رسوم بيانية تفاعلية وتحديثات البيانات في الوقت الفعلي وعناصر قابلة للتخصيص.',
      tags: ['React.js', 'PrimeReact', 'Chart.js', 'Material-UI'],
      gradient: 'from-indigo-500 to-purple-500',
      link: 'https://dashboard-2-gamma.vercel.app/dashboard',
      github: 'https://github.com/ronymostafa2005',
    },
    {
      title: 'My Code Agency',
      description: 'موقع وكالة تطوير البرمجيات يعرض الخدمات والمشاريع والفريق. تصميم حديث ومتجاوب مع تجربة مستخدم سلسة.',
      tags: ['React.js', 'CSS3', 'Responsive Design', 'API Integration'],
      gradient: 'from-purple-500 to-pink-500',
      link: 'https://my-code-agency.netlify.app/',
      github: 'https://github.com/ronymostafa2005',
    },
    {
      title: 'Ministry of Hajj Coordination',
      description: 'تطبيق ويب تفاعلي لتنسيق عمليات الحج. يتضمن التتبع في الوقت الفعلي والجدولة وميزات الاتصال.',
      tags: ['Next.js', 'React.js', 'Material-UI', 'API Integration'],
      gradient: 'from-green-500 to-teal-500',
      link: '#',
      github: 'https://github.com/ronymostafa2005',
    },
    {
      title: 'Chemical Materials Management',
      description: 'منصة ويب لإدارة مخزون المواد الكيميائية وتتبع الاستخدام وإنشاء التقارير مع تصور البيانات.',
      tags: ['React.js', 'Chart.js', 'Material-UI', 'Node.js'],
      gradient: 'from-pink-500 to-rose-500',
      link: '#',
      github: 'https://github.com/ronymostafa2005',
    },
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 text-lg">Some of my recent work</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                {/* Gradient Overlay */}
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${project.gradient}`} />

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs bg-slate-700/50 text-blue-400 rounded-full border border-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
                    >
                      <FaExternalLinkAlt className="mr-2" />
                      <span>Live Demo</span>
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center text-purple-400 hover:text-purple-300 transition-colors duration-300"
                    >
                      <FaGithub className="mr-2" />
                      <span>Code</span>
                    </motion.a>
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
