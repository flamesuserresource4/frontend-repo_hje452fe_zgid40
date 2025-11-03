import { useEffect, useMemo, useRef, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  // Interactive background (always on)
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });
  const [typed, setTyped] = useState('');
  const canvasRef = useRef(null);

  // Cursor-reactive glow background
  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setBgPos({ x, y });
    };
    window.addEventListener('pointermove', onMove);
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  // Easter egg: type "hello anas" for confetti
  useEffect(() => {
    const handler = (e) => {
      const nxt = (typed + e.key).toLowerCase().replace(/\s+/g, '');
      setTyped(nxt.slice(-10));
      if (nxt.includes('helloanas')) triggerConfetti();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [typed]);

  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const { innerWidth: w, innerHeight: h } = window;
    canvas.width = w * dpr; canvas.height = h * dpr; canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    const particles = Array.from({ length: 160 }).map(() => ({
      x: w / 2,
      y: h / 2,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -8 - 4,
      g: 0.22 + Math.random() * 0.1,
      life: 120 + Math.random() * 40,
      color: `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`,
      size: 2 + Math.random() * 3,
    }));

    let frame = 0;
    const loop = () => {
      frame++;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.life -= 1;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
      });
      if (frame < 200) requestAnimationFrame(loop); else ctx.clearRect(0, 0, w, h);
    };
    loop();
  };

  const gradient = useMemo(
    () => ({
      background:
        `radial-gradient(600px 400px at ${bgPos.x}% ${bgPos.y}%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(800px 500px at 80% 20%, rgba(236,72,153,0.25), transparent 60%), #070711`,
    }),
    [bgPos]
  );

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden text-white" style={gradient}>
      {/* Confetti canvas */}
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-30" />

      {/* Top bar */}
      <div className="fixed left-0 right-0 top-0 z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/80 backdrop-blur">
          <span className="font-semibold">Anas</span> — Creative Technologist
        </div>
        <a href="#contact" className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 backdrop-blur hover:bg-white/10">Contact</a>
      </div>

      <Hero onScrollToProjects={scrollToProjects} />
      <About />
      <Projects />
      <Contact />

      <footer className="border-t border-white/10 px-6 py-10 text-center text-sm text-white/60">
        © {new Date().getFullYear()} Mohammad Anas — Crafted with React and a dash of neon.
      </footer>
    </div>
  );
}

export default App;
