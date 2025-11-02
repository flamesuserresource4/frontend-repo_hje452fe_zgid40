import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ['Creative', 'Innovator', 'Leader', 'Technologist'];

export default function About() {
  const [index, setIndex] = useState(0);
  const cubeRef = useRef(null);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % words.length), 1500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // gentle rotation for cube
    let raf; let angle = 0;
    const animate = () => {
      angle += 0.25;
      if (cubeRef.current) {
        cubeRef.current.style.transform = `rotateX(${angle}deg) rotateY(${angle * 1.2}deg)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-24 text-white">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">About Me</h2>
          <p className="mb-4 text-white/80">
            I'm Mohammad Anas — a cross-disciplinary builder who loves turning ideas into interactive realities.
            I explore the edges where code, design, and intelligent systems meet.
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-white/70">I am</span>
            <div className="relative h-8 min-w-[130px] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute left-0 top-0 text-xl font-semibold text-fuchsia-300"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-3 text-sm text-white/70 sm:grid-cols-6">
            {['AI/ML', 'React', 'Next.js', 'Node', 'Python', 'Docker'].map((s) => (
              <motion.span
                key={s}
                whileHover={{ scale: 1.05 }}
                className="rounded-md border border-white/10 bg-white/5 px-3 py-2 text-center backdrop-blur"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Simple 3D cube with milestones */}
        <div className="flex items-center justify-center">
          <div className="relative h-56 w-56 [transform-style:preserve-3d]" ref={cubeRef}>
            {['Start', 'AI', 'Web', 'Awards', 'Talks', 'Now'].map((label, idx) => (
              <div
                key={idx}
                className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/10 bg-gradient-to-br from-indigo-600/40 to-fuchsia-600/40 p-4 text-center text-white/90 shadow-lg backdrop-blur [backface-visibility:hidden]"
                style={{
                  transform:
                    idx === 0 ? 'translateZ(80px)' :
                    idx === 1 ? 'rotateY(90deg) translateZ(80px)' :
                    idx === 2 ? 'rotateY(180deg) translateZ(80px)' :
                    idx === 3 ? 'rotateY(-90deg) translateZ(80px)' :
                    idx === 4 ? 'rotateX(90deg) translateZ(80px)' :
                                'rotateX(-90deg) translateZ(80px)'
                }}
              >
                <p className="mt-12 text-lg font-semibold">{label}</p>
                <p className="text-xs text-white/70">Milestone</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
