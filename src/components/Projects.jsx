import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Neon Vision',
    tags: ['Computer Vision', 'React', 'Python'],
    description:
      'A real-time object tracking playground with WebAssembly acceleration and a neon UI. Built for creative prototyping and live demos.',
  },
  {
    id: 2,
    title: 'Conversational Canvas',
    tags: ['LLM', 'Chat UX', 'Next.js'],
    description:
      'An experimental chat interface that paints your ideas on a canvas as you speak to it. Built with streaming responses and smooth gestures.',
  },
  {
    id: 3,
    title: 'Hologrid',
    tags: ['3D', 'WebGL', 'Performance'],
    description:
      'A mesmerizing 3D grid with physics-based interactions and buttery framer motion choreography.',
  },
];

function useTilt() {
  const [style, setStyle] = useState({});
  const onMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const tiltX = (py - 0.5) * -10;
    const tiltY = (px - 0.5) * 10;
    setStyle({ transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(0)` });
  };
  const onLeave = () => setStyle({ transform: 'rotateX(0deg) rotateY(0deg)' });
  return { style, onMove, onLeave };
}

export default function Projects() {
  const [active, setActive] = useState(null);

  const gradient = useMemo(
    () =>
      'bg-[radial-gradient(1200px_600px_at_0%_0%,rgba(147,51,234,0.15),transparent_60%),radial-gradient(1200px_600px_at_100%_100%,rgba(59,130,246,0.15),transparent_60%)]',
    []
  );

  const speak = (text) => {
    try {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1.05; utter.pitch = 1.0; utter.lang = 'en-US';
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    } catch {}
  };

  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-10 text-center text-3xl font-bold text-white sm:text-4xl">Featured Projects</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => {
          const { style, onMove, onLeave } = useTilt();
          return (
            <motion.div
              key={p.id}
              whileHover={{ y: -4 }}
              onMouseMove={onMove}
              onMouseLeave={onLeave}
              onClick={() => setActive(p)}
              className={`group relative h-64 cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-5 text-white shadow-lg backdrop-blur ${gradient}`}
              style={style}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{p.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/70">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md border border-white/10 bg-black/20 px-2 py-1">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-white/75">{p.description.slice(0, 90)}…</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-6"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 140, damping: 18 }}
              className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-900/60 to-fuchsia-900/60 p-6 text-white shadow-2xl backdrop-blur"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActive(null)}
                className="absolute right-3 top-3 rounded-full border border-white/10 bg-white/10 p-2 text-white/90 hover:bg-white/20"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="mb-2 text-2xl font-bold">{active.title}</h3>
              <p className="mb-4 text-white/80">{active.description}</p>

              <div className="mb-4 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="h-28 rounded-lg bg-gradient-to-br from-white/10 to-white/5" />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2 text-xs text-white/70">
                  {active.tags.map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-black/20 px-2 py-1">
                      {t}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => speak(`Let me explain ${active.title}. ${active.description}`)}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
                >
                  <Volume2 className="h-4 w-4" /> Hear explanation
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
