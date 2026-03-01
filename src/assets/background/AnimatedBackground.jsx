import { useMemo } from 'react';
import { motion } from 'motion/react';
import { useIsDesktop } from '../../hooks/useMediaQuery';

const AnimatedBackground = () => {
  const isDesktop = useIsDesktop();

  const { lightFlashes, particles } = useMemo(() => {
    const _lightFlashes = Array.from({ length: isDesktop ? 8 : 3 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 3 + Math.random() * 2,
      moveX: Math.random() * 100 - 50,
      moveY: Math.random() * 100 - 50,
    }));

    const _particles = Array.from({ length: isDesktop ? 20 : 8 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 4 + Math.random() * 4,
      delay: Math.random() * 2,
    }));

    return { lightFlashes: _lightFlashes, particles: _particles };
  }, [isDesktop]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Pattern de quadrillage en SVG */}
      <div className="absolute inset-0 opacity-30">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="1"
              />
            </pattern>
            <pattern
              id="smallGrid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
        </svg>
      </div>

      {/* Gradient radial au centre */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-blue-900/20 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl" />
      </div>

      {/* Flashs lumineux animés */}
      {lightFlashes.map((flash) => (
        <motion.div
          key={flash.id}
          className="absolute w-2 h-2 bg-blue-400 rounded-full shadow-lg"
          style={{
            left: `${flash.x}%`,
            top: `${flash.y}%`,
            boxShadow:
              '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4)',
          }}
          animate={{
            opacity: [0, 1, 0.8, 1, 0],
            scale: [0.5, 1.2, 0.8, 1.5, 0.3],
            x: [0, flash.moveX],
            y: [0, flash.moveY],
          }}
          transition={{
            duration: flash.duration,
            delay: flash.delay,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Lignes lumineuses traversantes */}
      <motion.div
        className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-40"
        animate={{
          x: ['-100%', '200%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      <motion.div
        className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-40"
        animate={{
          x: ['100%', '-200%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
          delay: 2,
        }}
      />

      {/* Particules flottantes */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-60"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, -100, -20],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
