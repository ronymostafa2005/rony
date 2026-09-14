// ─────────────────────────────────────────────────────────────
// Resume data — single source of truth for the /resume page.
// Update your stats/links here and the resume stays in sync.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: 'Rawan Mostafa',
  title: 'Front-End Developer',
  email: 'rowan.mostafa2005@gmail.com',
  location: 'Cairo, Egypt',
  github: 'https://github.com/ronymostafa2005',
  linkedin: '', // TODO: add your LinkedIn profile URL
  summary:
    'Front-End Developer with 3+ years of experience building modern, performant web applications with React.js, Next.js and TypeScript. Proven track record shipping production platforms — from e-commerce with payment gateways to government-scale coordination tools. Passionate about clean architecture, accessibility and pixel-perfect, responsive interfaces.',
};

export const skillGroups = [
  {
    title: 'Core',
    items: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5', 'CSS3'],
  },
  {
    title: 'Styling & UI',
    items: ['Tailwind CSS', 'Sass', 'Bootstrap', 'Material-UI', 'Framer Motion'],
  },
  {
    title: 'State & Data',
    items: ['Redux', 'REST APIs', 'Chart.js', 'React Query basics'],
  },
  {
    title: 'Backend & Tools',
    items: ['Node.js', '.NET (working knowledge)', 'SQL', 'Git & GitHub', 'Vercel', 'Figma'],
  },
];

export const experience = [
  {
    company: 'MDARJ',
    position: 'Front-End Developer',
    period: '2025 — Present',
    location: 'Cairo, Egypt',
    bullets: [
      'Building React.js / Next.js web applications and dashboards for production use.',
      'Developed a comprehensive Islamic-knowledge platform with an AI chatbot for verifying Hadiths.',
      'Built an interactive coordination web application for the Ministry of Hajj.',
      'Delivered a dynamic internal-management platform used across departments.',
    ],
  },
  {
    company: 'Code Plus / My Code',
    position: 'Front-End Developer',
    period: '2024 — 2025',
    location: 'Cairo, Egypt',
    bullets: [
      'Built and maintained React.js projects with interactive, reusable UI components.',
      'Integrated complex forms, dynamic tables and chart-driven dashboards.',
      'Applied modern UI/UX practices to measurably improve user experience.',
    ],
  },
  {
    company: 'My Code (Remote)',
    position: 'Front-End Developer',
    period: '2023 — 2024',
    location: 'Cairo, Egypt',
    bullets: [
      'Developed responsive web applications with React.js and modern CSS.',
      'Collaborated with a distributed team to integrate APIs and optimize performance.',
      'Shipped multiple analytics and management dashboards.',
    ],
  },
  {
    company: 'Startup / Packing',
    position: 'Front-End Developer',
    period: '2022 — 2023',
    location: 'Cairo, Egypt',
    bullets: [
      'Created a full e-commerce platform for packaging products and sweets.',
      'Implemented secure payment integration and real-time inventory management.',
      'Ensured responsive, cross-device UX from mobile to desktop.',
    ],
  },
];

export const projects = [
  {
    name: 'COZMATICS — Luxury Beauty',
    tech: 'React.js · Next.js · Tailwind CSS · E-Commerce',
    link: 'https://cozmatics-luxury-beauty.vercel.app/',
    note: 'Haute beauté & clean cosmetics brand site with a premium shopping journey.',
  },
  {
    name: 'NOIR KITCHEN',
    tech: 'React.js · Next.js · Tailwind CSS · UI/UX',
    link: 'https://cozmatics-luxury-beauty-h2sc.vercel.app/',
    note: 'Chef-driven delivery brand with signature menu and dark premium food UX.',
  },
  {
    name: 'منصة الإسلام الشاملة — Islamic Knowledge Platform',
    tech: 'Next.js · TypeScript · AI Chatbot · Tailwind CSS',
    link: 'https://seraanabyy.vercel.app/',
    note: 'AI-powered Hadith verification chatbot with extensive database integration.',
  },
  {
    name: 'Startup Packing — E-Commerce',
    tech: 'React.js · Redux · Payment Gateway · REST API',
    link: 'https://newstartup-qlxo.vercel.app/',
    note: 'Secure payments, real-time inventory and an admin dashboard.',
  },
  {
    name: 'Analytics Dashboard',
    tech: 'React.js · PrimeReact · Chart.js · Material-UI',
    link: 'https://dashboard-2-gamma.vercel.app/dashboard',
    note: 'Interactive charts with real-time data updates and customizable widgets.',
  },
];

export const education = [
  {
    institution: 'Black Hours Academy',
    credential: 'Front-End Developer Course',
    period: 'Mar 2022 — Mar 2023',
    highlight: true,
  },
  {
    institution: 'Helwan University',
    credential: 'Bachelor of Social Work',
    period: '2014 — 2019',
    highlight: false,
  },
];

export const languages = [
  { name: 'Arabic', level: 'Native' },
  { name: 'English', level: 'Professional working proficiency' },
];
