import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaCode, FaRocket, FaPalette } from 'react-icons/fa';

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const features = [
    {
      icon: FaCode,
      title: 'Clean Code',
      description: 'Writing maintainable and scalable code following best practices',
    },
    {
      icon: FaRocket,
      title: 'Performance',
      description: 'Optimizing applications for speed and efficiency',
    },
    {
      icon: FaPalette,
      title: 'Design',
      description: 'Creating beautiful and intuitive user interfaces',
    },
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image/Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-xl"
              />
              <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-lg p-8 border border-slate-700">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <pre className="text-blue-400 text-sm">
                    <code>{`const developer = {
  name: "Rawan Moustafa",
  location: "Cairo, Egypt",
  experience: "3+ years",
  education: "Bachelor of Social Work",
  passion: [
    "Front-End Development",
    "UI/UX Design",
    "Problem Solving"
  ],
  currentFocus: "React.js & Next.js"
}`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm a passionate <span className="text-blue-400 font-semibold">Front-End Developer</span> with over 3 years of experience in building modern web applications. I specialize in creating dynamic, responsive, and user-friendly interfaces using the latest technologies.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              My journey started at <span className="text-purple-400 font-semibold">Black Hours Academy</span>, and since then, I've worked with various startups and companies, delivering high-quality solutions that exceed expectations.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed">
              I'm always eager to learn new technologies and stay updated with the latest trends in web development. I believe in writing clean, maintainable code and creating seamless user experiences.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-slate-700 hover:border-blue-500/50 transition-colors duration-300"
                >
                  <feature.icon className="text-blue-400 text-3xl mb-2" />
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
