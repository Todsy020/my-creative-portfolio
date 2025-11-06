import {
  useScroll,
  useTransform,
  motion,
  useSpring,
} from 'framer-motion';
import { useEffect, useState, useRef, useMemo } from 'react';
import { FileDown } from 'lucide-react';
import { VARIANTS, SPRING_CONFIGS, TIMING } from '../../constants/animations';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import LazyVideo from '../../components/LazyVideo';
import helloAnim from '/medias/avatar_anim_HELLO.webm';

const helloContainerAnim = VARIANTS.helloContainer;
const helloLetterAnim = VARIANTS.helloLetter;
const avatarImgContainerAnim = VARIANTS.avatarImgContainer;

const text =
  "I'm Théodore, a creative developer based in Paris. I work with brands to craft unique and memorable experiences.";
const words = text.split(' ');

const FirstSection = () => {
  const firstSectionRef = useRef(null);
  const [startAnim, setStartAnim] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const scaleSection = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.7]
  );

  const offset = useMemo(() => {
    if (typeof window !== 'undefined') {
      return window.innerHeight * 0.5;
    }
    return 300; // Fallback value
  }, []);

  const helloRawY = useTransform(
    scrollYProgress,
    [0, 0.2],
    [0, offset]
  );
  const helloSmoothY = useSpring(helloRawY, SPRING_CONFIGS.smoothY);

  const helloOpacity = useTransform(
    scrollYProgress,
    [0, 0.16],
    [1, 0]
  );

  useEffect(() => {
    const timeout = setTimeout(() => setStartAnim(true), TIMING.ANIMATION_START_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.section
      ref={firstSectionRef}
      style={{ scale: scaleSection }}
      className="relative w-screen h-screen-ios z-10 flex flex-col items-center justify-center bg-zinc-100 sticky top-0 px-4 sm:px-6 lg:px-8"
      role="region"
      aria-label="Hero section"
    >
      <motion.p
        style={{ y: prefersReducedMotion ? 0 : helloSmoothY, opacity: helloOpacity }}
        className="relative top-10 text-zinc-600 text-c-base md:text-c-xl lg:text-c-xl font-inter text-center max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[60vw] w-full text-shadow-2xs lg:mb-10 xl:top-20 2xl:top-40"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : {
                    delay: 1.2 + i * 0.1,
                    duration: 0.4,
                    type: 'spring',
                    stiffness: 150,
                    damping: 10,
                  }
            }
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ))}
      </motion.p>

      <motion.h1
        variants={helloContainerAnim}
        style={{ y: prefersReducedMotion ? 0 : helloSmoothY, opacity: helloOpacity }}
        initial="hidden"
        animate={startAnim ? 'visible' : 'hidden'}
        id="home"
        className="overflow-hidden h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] xl:h-[90vh] text-[40vw] md:text-[40vw] lg:text-[35vw] xl:text-[35vw] 2xl:text-[30vw] flex items-center justify-center select-none font-tanker text-zinc-950 text-shadow-2xs"
      >
        {'HELLO'.split('').map((char, i) => (
          <motion.span
            key={i}
            variants={helloLetterAnim}
            whileHover={prefersReducedMotion ? {} : { y: '-2vw' }}
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
        <LazyVideo
          src={helloAnim}
          priority={true}
          className="w-full h-auto object-contain pointer-events-none select-none"
          aria-hidden="true"
        />
      </motion.div>

      {/* CV Download Button */}
      <motion.a
        href="/medias/CV_Théodore_Deconinck.pdf"
        download="CV_Theodore_Deconinck.pdf"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50
                   flex items-center gap-2 px-4 py-3 md:px-6 md:py-4
                   bg-gradient-to-r from-indigo-600 to-purple-600
                   hover:from-indigo-700 hover:to-purple-700
                   text-white font-semibold rounded-xl
                   shadow-lg hover:shadow-xl
                   transition-all duration-300
                   group cursor-pointer"
      >
        <FileDown className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-bounce" />
        <span className="hidden sm:inline font-inter text-sm md:text-base">
          In a rush? Get my CV
        </span>
        <span className="sm:hidden font-inter text-sm">CV</span>
      </motion.a>
    </motion.section>
  );
};

export default FirstSection;
