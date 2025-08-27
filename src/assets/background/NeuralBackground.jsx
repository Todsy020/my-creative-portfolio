import { motion } from 'framer-motion';

const NeuralBackground = () => {
  // Générer des nœuds pour le réseau neural
  const nodes = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 4 + Math.random() * 8,
    connections: Math.floor(Math.random() * 4) + 2,
    pulseDelay: Math.random() * 3,
    glowIntensity: 0.3 + Math.random() * 0.7,
  }));

  // Générer des connexions entre nœuds
  const connections = [];
  nodes.forEach((node, i) => {
    for (
      let j = 0;
      j < node.connections && j < nodes.length - i - 1;
      j++
    ) {
      const targetIndex = i + j + 1;
      if (targetIndex < nodes.length) {
        const target = nodes[targetIndex];
        const distance = Math.sqrt(
          Math.pow(node.x - target.x, 2) +
            Math.pow(node.y - target.y, 2)
        );
        if (distance < 40) {
          connections.push({
            id: `${i}-${targetIndex}`,
            from: node,
            to: target,
            distance,
            delay: Math.random() * 2,
          });
        }
      }
    }
  });

  // Particules de données
  const dataParticles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    startX: Math.random() * 100,
    startY: Math.random() * 100,
    endX: Math.random() * 100,
    endY: Math.random() * 100,
    size: 1 + Math.random() * 2,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Fond avec motif de circuit */}
      <div className="absolute inset-0 opacity-15">
        <svg
          className="w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="circuitPattern"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
              <rect width="120" height="120" fill="none" />
              <path
                d="M20,20 L100,20 L100,40 L80,40 L80,60 L100,60 L100,100 L20,100 L20,80 L40,80 L40,60 L20,60 Z"
                fill="none"
                stroke="rgba(34, 197, 94, 0.3)"
                strokeWidth="1"
              />
              <circle
                cx="20"
                cy="20"
                r="3"
                fill="rgba(34, 197, 94, 0.5)"
              />
              <circle
                cx="100"
                cy="100"
                r="3"
                fill="rgba(34, 197, 94, 0.5)"
              />
              <rect
                x="35"
                y="35"
                width="10"
                height="10"
                fill="rgba(34, 197, 94, 0.3)"
              />
              <rect
                x="75"
                y="75"
                width="10"
                height="10"
                fill="rgba(34, 197, 94, 0.3)"
              />
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="url(#circuitPattern)"
          />
        </svg>
      </div>

      {/* Grille énergétique */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 30%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 70%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%), radial-gradient(circle at 20% 30%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      {/* Connexions entre nœuds */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient
            id="connectionGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="rgba(34, 197, 94, 0)" />
            <stop offset="50%" stopColor="rgba(34, 197, 94, 0.8)" />
            <stop offset="100%" stopColor="rgba(34, 197, 94, 0)" />
          </linearGradient>
        </defs>

        {connections.map((connection) => (
          <motion.line
            key={connection.id}
            x1={`${connection.from.x}%`}
            y1={`${connection.from.y}%`}
            x2={`${connection.to.x}%`}
            y2={`${connection.to.y}%`}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            animate={{
              opacity: [0.2, 0.8, 0.2],
              strokeWidth: [1, 2, 1],
            }}
            transition={{
              duration: 2 + connection.distance * 0.1,
              delay: connection.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Impulsions le long des connexions */}
        {connections.slice(0, 8).map((connection, i) => (
          <motion.circle
            key={`pulse-${connection.id}`}
            r="2"
            fill="rgba(34, 197, 94, 0.9)"
            animate={{
              cx: [`${connection.from.x}%`, `${connection.to.x}%`],
              cy: [`${connection.from.y}%`, `${connection.to.y}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      {/* Nœuds du réseau */}
      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full bg-green-400"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: `${node.size}px`,
            height: `${node.size}px`,
            boxShadow: `0 0 ${node.size * 2}px rgba(34, 197, 94, ${
              node.glowIntensity
            })`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
            boxShadow: [
              `0 0 ${node.size * 2}px rgba(34, 197, 94, ${
                node.glowIntensity
              })`,
              `0 0 ${node.size * 4}px rgba(34, 197, 94, ${
                node.glowIntensity * 1.5
              })`,
              `0 0 ${node.size * 2}px rgba(34, 197, 94, ${
                node.glowIntensity
              })`,
            ],
          }}
          transition={{
            duration: 3,
            delay: node.pulseDelay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Particules de données en mouvement */}
      {dataParticles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-blue-400"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            boxShadow: '0 0 8px rgba(59, 130, 246, 0.8)',
          }}
          animate={{
            x: [`${particle.startX}%`, `${particle.endX}%`],
            y: [`${particle.startY}%`, `${particle.endY}%`],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Scanlines horizontales */}
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={`scanline-${i}`}
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"
          style={{ top: `${20 + i * 15}%` }}
          animate={{
            x: [-200, window.innerWidth + 200],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 4,
            delay: i * 0.8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* Hologrammes rotatifs */}
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 2 }).map((_, i) => (
          <motion.div
            key={`hologram-${i}`}
            className="absolute"
            animate={{ rotateY: 360 }}
            transition={{
              duration: 20 + i * 10,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div
              className="w-32 h-32 border border-green-400/30 rounded-lg"
              style={{
                transform: `scale(${1.5 + i * 0.8}) rotateX(60deg)`,
                transformStyle: 'preserve-3d',
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Effet de matrice de données */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`matrix-${i}`}
          className="absolute text-green-400 font-mono text-xs opacity-30"
          style={{
            left: `${i * 10}%`,
            top: '10%',
          }}
          animate={{
            y: [0, window.innerHeight],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            delay: Math.random() * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j}>{Math.random() > 0.5 ? '1' : '0'}</div>
          ))}
        </motion.div>
      ))}
    </div>
  );
};

export default NeuralBackground;
