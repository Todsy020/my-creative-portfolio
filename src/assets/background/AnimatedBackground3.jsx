import { motion } from 'framer-motion';
import {
  Code,
  Palette,
  Music,
  Zap,
  Sparkles,
  Globe,
} from 'lucide-react';

const AnimatedBackground3 = () => {
  // Particules flottantes avec différentes icônes représentant tes skills
  const floatingElements = [
    { icon: Code, delay: 0, duration: 20, x: '10%', y: '20%' },
    { icon: Palette, delay: 2, duration: 25, x: '80%', y: '15%' },
    { icon: Music, delay: 4, duration: 18, x: '15%', y: '70%' },
    { icon: Zap, delay: 1, duration: 22, x: '85%', y: '75%' },
    { icon: Sparkles, delay: 3, duration: 19, x: '60%', y: '30%' },
    { icon: Globe, delay: 5, duration: 24, x: '40%', y: '80%' },
  ];

  // Cercles géométriques animés
  const geometricShapes = [
    { size: 'w-32 h-32', x: '5%', y: '10%', delay: 0, duration: 15 },
    { size: 'w-24 h-24', x: '90%', y: '20%', delay: 2, duration: 18 },
    { size: 'w-40 h-40', x: '10%', y: '80%', delay: 1, duration: 20 },
    { size: 'w-28 h-28', x: '85%', y: '85%', delay: 3, duration: 16 },
    { size: 'w-36 h-36', x: '50%', y: '5%', delay: 4, duration: 22 },
  ];

  // Lignes de connexion animées
  const connectionLines = [
    {
      from: { x: '20%', y: '30%' },
      to: { x: '70%', y: '40%' },
      delay: 0,
    },
    {
      from: { x: '30%', y: '70%' },
      to: { x: '80%', y: '20%' },
      delay: 2,
    },
    {
      from: { x: '10%', y: '50%' },
      to: { x: '60%', y: '80%' },
      delay: 4,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-[-1]">
      {/* Gradient de base */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />

      {/* Overlay avec effet de bruit */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 via-transparent to-teal-300/10" />
      </div>

      {/* Particules flottantes avec icônes */}
      {floatingElements.map((element, index) => {
        const IconComponent = element.icon;
        return (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: element.x, top: element.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0.3, 0.8, 0.2],
              scale: [0, 1, 0.8, 1.2, 0.9],
              rotate: [0, 180, 360],
              y: [0, -20, 0, -30, 0],
            }}
            transition={{
              duration: element.duration,
              delay: element.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <IconComponent
              className="w-6 h-6 md:w-8 md:h-8 text-teal-400/40"
              strokeWidth={1.5}
            />
          </motion.div>
        );
      })}

      {/* Formes géométriques */}
      {geometricShapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute ${shape.size} rounded-full border border-teal-400/20`}
          style={{ left: shape.x, top: shape.y }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.3, 0.1, 0.4, 0.2],
            scale: [0.5, 1, 0.8, 1.1, 0.9],
            rotate: [0, 360],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Lignes de connexion animées */}
      {connectionLines.map((line, index) => (
        <motion.svg
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0, 0.2, 0] }}
          transition={{
            duration: 8,
            delay: line.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.line
            x1={line.from.x}
            y1={line.from.y}
            x2={line.to.x}
            y2={line.to.y}
            stroke="rgb(45 212 191 / 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 6,
              delay: line.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.svg>
      ))}

      {/* Effet de lueur centrale */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(45, 212, 191, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Points lumineux dispersés */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 bg-teal-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            delay: Math.random() * 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground3;
