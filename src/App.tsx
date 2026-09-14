import { useEffect, useState } from 'react';
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import ParticleField from './components/ParticleField';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumePage from './pages/ResumePage';
//------------------------------------------------------------
// Intercept same-origin /resume link clicks so navigation stays inside
// the SPA (no full reload). Must be registered before the compone bnnt's
// effects reference it.
const handleLinkClick = (e: MouseEvent) => {
  const anchor = (e.target as HTMLElement).closest('a');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  if (href === '/resume') {
    e.preventDefault();
    history.pushState({}, '', '/resume');
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
};
document.addEventListener('click', handleLinkClick);

function App() {
  const [showContent, setShowContent] = useState(false);
  const [route, setRoute] = useState(() => window.location.pathname);

  // Lightweight pathname routing — /resume renders the CV page.
  // Works with vercel.json rewrites (all paths → index.html). No router lib.
  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    const timer = setTimeout(() => setShowContent(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (route === '/resume') {
    return <ResumePage />;
  }

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />

      <div
        className={`min-h-screen relative transition-opacity duration-700 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <ParticleField />
        <Navbar />

        <main className="relative z-10">
          <Hero />

          <About />

          <Experience />

          <Projects />

          <Skills />

          <Testimonials />

          <Contact />
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </>
  );
}

export default App;
