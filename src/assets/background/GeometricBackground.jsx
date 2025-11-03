import { motion } from 'framer-motion';

const GeometricBackground = () => {
  // Générer des formes géométriques animées
  const shapes = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 20 + Math.random() * 60,
    rotation: Math.random() * 360,
    delay: Math.random() * 3,
    duration: 4 + Math.random() * 4,
    type: ['triangle', 'square', 'circle', 'diamond'][
      Math.floor(Math.random() * 4)
    ],
  }));

  const renderShape = (shape) => {
    const baseClasses = 'absolute border-2 border-cyan-400/30';

    switch (shape.type) {
      case 'triangle':
        return (
          <div
            className={`${baseClasses} w-0 h-0`}
            style={{
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid rgba(34, 211, 238, 0.2)`,
              borderTop: 'none',
            }}
          />
        );
      case 'square':
        return (
          <div
            className={`${baseClasses} bg-purple-500/10`}
            style={{ width: shape.size, height: shape.size }}
          />
        );
      case 'circle':
        return (
          <div
            className={`${baseClasses} bg-blue-500/10 rounded-full`}
            style={{ width: shape.size, height: shape.size }}
          />
        );
      case 'diamond':
        return (
          <div
            className={`${baseClasses} bg-pink-500/10 transform rotate-45`}
            style={{ width: shape.size, height: shape.size }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Fond avec motif hexagonal */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="hexPattern"
              width="100"
              height="87"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="50,0 93.3,25 93.3,62 50,87 6.7,62 6.7,25"
                fill="none"
                stroke="rgba(34, 211, 238, 0.4)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>
      </div>

      {/* Vagues lumineuses */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"
          animate={{
            x: ['-100%', '200%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-l from-transparent via-purple-500/20 to-transparent"
          animate={{
            x: ['200%', '-100%'],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      {/* Formes géométriques animées */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          animate={{
            rotate: [shape.rotation, shape.rotation + 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}

      {/* Rayons lumineux rotatifs */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="w-96 h-96"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-48 bg-gradient-to-t from-transparent via-cyan-400/40 to-transparent"
              style={{
                left: '50%',
                top: '50%',
                transformOrigin: '0 0',
                transform: `rotate(${i * 45}deg)`,
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Orbes flottants */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`orb-${i}`}
          className="absolute w-4 h-4 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + Math.sin(i) * 20}%`,
            filter: 'blur(1px)',
            boxShadow: '0 0 20px rgba(34, 211, 238, 0.6)',
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
            opacity: [0.4, 1, 0.4],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default GeometricBackground;
