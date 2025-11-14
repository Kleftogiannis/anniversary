import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
}

export const CursorTrail = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [nextId, setNextId] = useState(0);

  useEffect(() => {
    let lastTime = Date.now();
    const minInterval = 50; // Minimum time between particles (ms)
    let localNextId = nextId;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime < minInterval) return;
      lastTime = now;

      const newParticle: Particle = {
        id: localNextId,
        x: e.clientX,
        y: e.clientY,
      };

      localNextId++;
      setNextId(localNextId);
      setParticles((prev) => [...prev, newParticle]);

      // Remove particle after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x - 12,
              y: particle.y - 12,
              opacity: 1,
              scale: 0,
            }}
            animate={{
              opacity: 0,
              scale: 1,
              y: particle.y - 50,
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
            className="absolute text-2xl"
            style={{
              textShadow: '0 0 10px rgba(255, 182, 193, 0.5)',
            }}
          >
            🌸
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
