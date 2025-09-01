import {
  useScroll,
  useTransform,
  motion,
  useSpring,
} from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import helloAnim from '/medias/avatar_anim_HELLO.webm';

const helloContainerAnim = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07 },
  },
};

const helloLetterAnim = {
  hidden: { y: '85vh', opacity: 1, rotate: 15 },
  visible: {
    y: 0,
    opacity: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 140,
      damping: 15,
      duration: 0.5,
    },
  },
};

const avatarImgContainerAnim = {
  hidden: { y: '30vh', opacity: 0.1 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const text =
  "I'm Théodore, a creative developer based in Paris. I work with brands to craft unique and memorable experiences.";
const words = text.split(' ');

const FirstSection = () => {
  const firstSectionRef = useRef(null);
  const [startAnim, setStartAnim] = useState(false);

  const { scrollYProgress } = useScroll();

  const scaleSection = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.7]
  );
  const offset = window.innerHeight * 0.5;

  const helloRawY = useTransform(
    scrollYProgress,
    [0, 0.2],
    [0, offset]
  );
  const helloSmoothY = useSpring(helloRawY, {
    stiffness: 70,
    damping: 15,
  });

  const helloOpacity = useTransform(
    scrollYProgress,
    [0, 0.16],
    [1, 0]
  );

  useEffect(() => {
    const timeout = setTimeout(() => setStartAnim(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.section
      ref={firstSectionRef}
      style={{ scale: scaleSection }}
      className="relative w-screen h-screen z-10 flex flex-col items-center justify-center bg-zinc-100 sticky top-0 px-4 sm:px-6 lg:px-8"
    >
      <div className="block lg:hidden absolute top-6 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-lg z-50 text-center max-w-[90vw]">
        <p className="text-c-xs font-inter">
          <span className="text-red-500">Note:</span> For the best
          experience, please visit this site on a desktop.
        </p>
      </div>

      <motion.p
        style={{ y: helloSmoothY, opacity: helloOpacity }}
        className="relative top-10 text-zinc-600 text-c-base md:text-c-xl lg:text-c-xl font-inter text-center max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[60vw] w-full text-shadow-2xs lg:mb-10 xl:top-20 2xl:top-40"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1.2 + i * 0.1,
              duration: 0.4,
              type: 'spring',
              stiffness: 150,
              damping: 10,
            }}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ))}
      </motion.p>

      <motion.h1
        variants={helloContainerAnim}
        style={{ y: helloSmoothY, opacity: helloOpacity }}
        initial="hidden"
        animate={startAnim ? 'visible' : 'hidden'}
        id="home"
        className="overflow-hidden h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] xl:h-[90vh] text-[40vw] md:text-[40vw] lg:text-[35vw] xl:text-[35vw] 2xl:text-[30vw] flex items-center justify-center select-none font-tanker text-zinc-950 text-shadow-2xs"
      >
        {'HELLO'.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={helloLetterAnim}
            whileHover={{ y: '-2vw' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 15,
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>

      <motion.div
        variants={avatarImgContainerAnim}
        initial="hidden"
        animate="visible"
        id="avatar-img"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 opacity-100 w-[100vw] md:w-[60vw] lg:w-[55vw] xl:w-[50vw] max-w-[900px]"
      >
        <video
          src={helloAnim}
          preload="auto"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto object-contain pointer-events-none select-none"
          aria-hidden="true"
        />
      </motion.div>
    </motion.section>
  );
};

export default FirstSection;
