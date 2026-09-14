import { motion } from 'framer-motion';
import {
  FaArrowLeft,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaDownload,
} from 'react-icons/fa';
import {
  profile,
  skillGroups,
  experience,
  projects,
  education,
  languages,
} from '../data/resume';

const ResumePage = () => {
  const handlePrint = () => window.print();

  return (
    <div className="resume-page min-h-screen bg-slate-950 text-slate-200">
      {/* ── Toolbar (hidden when printing) ── */}
      <div className="resume-toolbar no-print fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between gap-3">
          <a
            href="/"
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <FaArrowLeft className="text-xs" />
            Back to Portfolio
          </a>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-xs text-gray-500">
              Tip: “Save as PDF” opens your browser's print dialog — choose <b>Save as PDF</b>.
            </span>
            <motion.button
              onClick={handlePrint}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-semibold shadow-lg"
              style={{ boxShadow: '0 2px 15px rgba(99, 102, 241, 0.35)' }}
            >
              <FaDownload className="text-xs" />
              Save as PDF
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── A4 sheet ── */}
      <div className="pt-20 pb-12 px-4 print:p-0 print:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="resume-sheet max-w-4xl mx-auto bg-white text-slate-800 rounded-xl shadow-2xl print:shadow-none print:rounded-none"
        >
          {/* Header */}
          <header className="resume-header px-10 pt-10 pb-6 print:px-8 print:pt-8 border-b-2 border-blue-600/80">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight print:text-2xl">
                  {profile.name}
                </h1>
                <p className="mt-1 text-lg font-semibold text-blue-700 print:text-base">
                  {profile.title}
                </p>
              </div>
              <ul className="text-sm text-slate-600 space-y-1.5 print:text-xs">
                <li className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-600 shrink-0" />
                  <a href={`mailto:${profile.email}`} className="hover:text-blue-700 print:no-underline">
                    {profile.email}
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <FaGithub className="text-blue-600 shrink-0" />
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-700"
                  >
                    github.com/ronymostafa2005
                  </a>
                </li>
                {profile.linkedin && (
                  <li className="flex items-center gap-2">
                    <FaLinkedin className="text-blue-600 shrink-0" />
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-700"
                    >
                      LinkedIn Profile
                    </a>
                  </li>
                )}
                <li className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-600 shrink-0" />
                  {profile.location}
                </li>
              </ul>
            </div>
          </header>

          <main className="px-10 py-8 print:px-8 print:py-6 space-y-7">
            {/* Summary */}
            <section>
              <h2 className="resume-section-title">Summary</h2>
              <p className="text-sm leading-relaxed text-slate-700 print:text-xs">
                {profile.summary}
              </p>
            </section>

            {/* Skills */}
            <section>
              <h2 className="resume-section-title">Technical Skills</h2>
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {skillGroups.map((group) => (
                  <div key={group.title} className="text-sm print:text-xs">
                    <span className="font-bold text-slate-900">{group.title}: </span>
                    <span className="text-slate-700">{group.items.join(' · ')}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Experience */}
            <section>
              <h2 className="resume-section-title">Experience</h2>
              <div className="space-y-5">
                {experience.map((job) => (
                  <article key={`${job.company}-${job.period}`}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="text-base font-bold text-slate-900 print:text-sm">
                        {job.position}{' '}
                        <span className="font-semibold text-blue-700">· {job.company}</span>
                      </h3>
                      <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                        {job.period} | {job.location}
                      </span>
                    </div>
                    <ul className="mt-1.5 space-y-1">
                      {job.bullets.map((bullet, i) => (
                        <li
                          key={i}
                          className="text-sm text-slate-700 leading-relaxed flex gap-2 print:text-xs"
                        >
                          <span className="text-blue-600 mt-0.5 shrink-0">▸</span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="resume-section-title">Selected Projects</h2>
              <div className="space-y-3">
                {projects.map((project) => (
                  <article key={project.name} className="text-sm print:text-xs">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                      <h3 className="font-bold text-slate-900">
                        {project.name}
                        {project.link !== '#' && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-xs font-medium text-blue-700 hover:underline print:no-underline"
                          >
                            ({project.link.replace(/^https?:\/\/(www\.)?/, '')})
                          </a>
                        )}
                      </h3>
                    </div>
                    <p className="text-slate-600 mt-0.5">
                      <span className="font-medium text-slate-700">{project.tech}</span> —{' '}
                      {project.note}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            {/* Education + Languages */}
            <section className="grid sm:grid-cols-2 gap-8">
              <div>
                <h2 className="resume-section-title">Education</h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.institution} className="text-sm print:text-xs">
                      <p className="font-bold text-slate-900">{edu.institution}</p>
                      <p className={edu.highlight ? 'text-blue-700 font-semibold' : 'text-slate-600'}>
                        {edu.credential}
                      </p>
                      <p className="text-xs text-slate-500">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="resume-section-title">Languages</h2>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <div key={lang.name} className="text-sm print:text-xs">
                      <span className="font-bold text-slate-900">{lang.name}</span>
                      <span className="text-slate-600"> — {lang.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </main>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumePage;
