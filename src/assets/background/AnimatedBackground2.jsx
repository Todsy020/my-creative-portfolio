import { motion } from 'framer-motion';

const AnimatedBackground2 = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-950 to-black">
      {/* Forme 1 */}
      <motion.div
        className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-indigo-700 to-purple-700 rounded-full opacity-50 blur-xl"
        animate={{
          x: [0, 120, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Forme 2 */}
      <motion.div
        className="absolute bottom-20 right-20 w-56 h-56 bg-gradient-to-r from-fuchsia-600 to-pink-700 rounded-full opacity-40 blur-2xl"
        animate={{
          x: [0, -120, 0],
          y: [0, 80, 0],
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Forme 3 */}
      <motion.div
        className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-cyan-500 to-blue-700 rounded-full opacity-40 blur-xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Particules */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white opacity-30 blur-sm"
          style={{
            width: Math.random() * 8 + 3,
            height: Math.random() * 8 + 3,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground2;
