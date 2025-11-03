import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

const letters = Array.from('Mohammad Anas');

export default function Hero({ onScrollToProjects }) {
  const containerRef = useRef(null);
  const [magnet, setMagnet] = useState({ x: 0, y: 0, active: false });
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 900);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMagnet({ x, y, active: true });
  };
  const handleMouseLeave = () => setMagnet({ x: 0, y: 0, active: false });

  return (
    <section ref={containerRef} className="relative h-[100svh] w-full overflow-hidden bg-[#0a0a0f] text-white">
      {/* 3D Scene */}
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/iO74mq3KeYTXVmpB/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      {/* Gradient overlays for depth - don't block pointer */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(88,28,135,0.35),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(37,99,235,0.25),transparent_60%)]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-6 text-center">
        <AnimatePresence>
          {showLoader && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-6 left-1/2 -translate-x-1/2"
            >
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
                <div className="h-2 w-2 animate-ping rounded-full bg-emerald-400" />
                <p className="text-xs text-white/80">Loading firefly scene…</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.06, delay: 0.1 }}
          className="mb-4 flex flex-wrap items-center justify-center gap-x-1 text-5xl font-extrabold leading-tight sm:text-6xl md:text-7xl"
        >
          {letters.map((char, i) => (
            <motion.span key={i} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className={`${char === ' ' ? 'w-4 sm:w-6' : ''} inline-block`}>
              {char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mx-auto max-w-2xl text-lg text-white/80 sm:text-xl"
        >
          Blending Imagination with Intelligence — Creative Technologist, AI/ML Enthusiast, and Web Developer.
        </motion.p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <motion.button
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onScrollToProjects}
            whileTap={{ scale: 0.98 }}
            style={{ transform: magnet.active ? `translate(${magnet.x * 0.03}px, ${magnet.y * 0.03}px)` : 'translate(0,0)' }}
            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-fuchsia-500 to-indigo-600 px-6 py-3 font-semibold shadow-lg shadow-fuchsia-500/30 transition-colors hover:from-fuchsia-400 hover:to-indigo-500"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              View Projects
            </span>
            <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.35),transparent_60%)] opacity-0 transition-opacity group-hover:opacity-100" />
          </motion.button>

          <a
            href="#contact"
            className="rounded-xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white/90 backdrop-blur transition hover:bg-white/10"
          >
            Contact Me
          </a>
        </div>

        <p className="mt-6 text-sm text-white/60">Tip: type "hello anas" for a surprise.</p>
      </div>
    </section>
  );
}
