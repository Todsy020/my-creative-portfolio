import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import GeometricBackground from '../background/GeometricBackground';
import SpotlightCard from '../components/SpotlightCard'; // <-- ton composant spotlight

const SecondSection = () => {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const secondSectionRef = useRef(null);

  const { scrollYProgress: rotateScrollYProgress } = useScroll({
    target: secondSectionRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: textScrollYProgress } = useScroll({
    target: secondSectionRef,
    offset: ['start 45%', 'start 5%'],
  });

  const { scrollYProgress: videoScrollY } = useScroll({
    target: secondSectionRef,
    offset: ['start 65%', 'start 15%'],
  });

  const rotateSecondSection = useTransform(
    rotateScrollYProgress,
    [0, 1],
    isDesktop ? [8, -8.8] : [0, 0]
  );

  const { scrollYProgress: globalScrollYProgress } = useScroll();
  const scaleSection = useTransform(
    globalScrollYProgress,
    [0.36, 1.36],
    [1, 0.7]
  );

  const textYProgress = useTransform(
    textScrollYProgress,
    [0, 1],
    ['30vh', 0]
  );
  const textOpacityProgress = useTransform(
    textScrollYProgress,
    [0, 1],
    [0, 1]
  );
  const textScaleProgress = useTransform(
    textScrollYProgress,
    [0, 1],
    [0.8, 1]
  );
  const textSmoothY = useSpring(textYProgress, {
    stiffness: 80,
    damping: 12,
  });

  const video1Y = useSpring(
    useTransform(videoScrollY, [0, 0.3], ['10vh', 0]),
    {
      stiffness: 80,
      damping: 15,
    }
  );
  const video1Opacity = useTransform(videoScrollY, [0, 0.5], [0, 1]);

  const video2Y = useSpring(
    useTransform(videoScrollY, [0.8, 0.98], ['10vh', 0]),
    {
      stiffness: 80,
      damping: 15,
    }
  );
  const video2Opacity = useTransform(
    videoScrollY,
    [0.75, 0.98],
    [0, 1]
  );

  const video3Y = useSpring(
    useTransform(videoScrollY, [0.6, 0.8], ['10vh', 0]),
    {
      stiffness: 80,
      damping: 15,
    }
  );
  const video3Opacity = useTransform(
    videoScrollY,
    [0.55, 0.8],
    [0, 1]
  );

  const image1Y = useSpring(
    useTransform(videoScrollY, [0.3, 0.65], ['20vh', 0]), // 20vh au lieu de 10vh
    {
      stiffness: 80,
      damping: 15,
    }
  );
  const image1Opacity = useTransform(
    videoScrollY,
    [0.3, 0.65],
    [0, 1]
  );

  return (
    <motion.section
      ref={secondSectionRef}
      style={{
        rotateZ: rotateSecondSection,
        scale: scaleSection,
      }}
      className="w-screen min-h-screen h-[110vh] flex flex-col items-center justify-center bg-gray-900 z-30 sticky top-0 mt-[11rem] md:mt-[18rem] lg:mt-[22rem] overflow-hidden px-4 lg:px-8"
    >
      <SpotlightCard className="w-full h-full bg-transparent border-none p-0">
        <GeometricBackground />

        <motion.div
          style={{
            y: textSmoothY,
            opacity: textOpacityProgress,
            scale: textScaleProgress,
          }}
          className="text-zinc-100 max-w-[90vw] md:max-w-[85vw] lg:max-w-4xl mx-auto text-center z-10"
        >
          <h2 className="text-c-4xl md:text-c-5xl lg:text-c-6xl xl:text-c-7xl mb-4 md:mb-8 font-tanker leading-tight">
            <motion.span
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="inline-block"
            >
              Your
            </motion.span>{' '}
            <motion.span
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="inline-block"
            >
              next
            </motion.span>{' '}
            <motion.span
              whileHover={{ scale: 1.2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="inline-block"
            >
              creative
            </motion.span>{' '}
            <br />
            <motion.span
              animate={{ scale: [1, 1.3, 1], rotateZ: [10, 0, -10] }}
              transition={{
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 2,
                ease: 'easeInOut',
              }}
              className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-yellow-500 to-red-500 animate-gradient mt-1 mb-3"
            >
              developer
            </motion.span>
          </h2>
          <p className="font-inter text-c-base md:text-c-lg lg:text-c-lg max-w-full md:max-w-[32vw] lg:max-w-[55vw] xl:max-w-[50vw] mx-auto text-shadow-2xs leading-relaxed px-2 lg:px-0">
            I've spent my recent time collaborating with artists,
            brands, and projects that want to stand out. I'm a
            creative developer — I love bringing bold ideas to life by
            mixing code, design, 3D and motion into striking visual
            experiences.
          </p>
        </motion.div>

        {/* Vidéo top left */}
        <motion.video
          id="hp_whip_pan"
          style={{
            y: video1Y,
            opacity: video1Opacity,
            rotateZ: '-15deg',
          }}
          autoPlay
          loop
          muted
          playsInline
          className="absolute rounded-xl md:w-[25vw] lg:w-[27vw] xl:w-[25vw] 2xl:w-[23vw] max-w-[45vw] -left-[8vw] md:-left-[3vw] lg:-left-[5vw] xl:-left-[7rem] 2xl:-left-[2rem] top-[6vh] md:top-[12vh] lg:top-[2rem] xl:top-[2rem]"
          src="/medias/hp_whip_pan.webm"
        />

        {/* Image right */}
        <motion.img
          style={{
            y: image1Y,
            opacity: image1Opacity,
            rotateZ: '15deg',
          }}
          className="absolute rounded-xl md:w-[30vw] lg:w-[35vw] xl:w-[32vw] 2xl:w-[26vw] max-w-[55vw] -right-[5vw] md:-right-[3vw] lg:-right-[5vw] xl:-right-[5rem] 2xl:right-[0rem] top-[19vh] md:top-[25vh] lg:-top-0 xl:top-15"
          src="/medias/Hyper-splash.png"
        />

        {/* Video bottom left */}
        <motion.video
          id="can_anim"
          style={{
            y: video2Y,
            opacity: video2Opacity,
            rotateZ: '12deg',
          }}
          autoPlay
          loop
          muted
          playsInline
          className="absolute rounded-xl md:w-[25vw] lg:w-[19vw] xl:w-[18vw] 2xl:w-[18vw] max-w-[40vw] -left-[9vw] md:-left-[2vw] lg:-left-[0vw] xl:-left-[2rem] 2xl:left-[2rem] bottom-[8vh] md:bottom-[12vh] lg:bottom-[0rem] xl:bottom-[3rem]"
          src="/medias/can_anim.webm"
        />

        {/* Video bottom right */}
        <motion.video
          id="anim_link"
          style={{
            y: video3Y,
            opacity: video3Opacity,
            rotateZ: '-8deg',
          }}
          autoPlay
          loop
          muted
          playsInline
          className="absolute rounded-xl md:w-[25vw] lg:w-[20vw] xl:w-[19vw] 2xl:w-[17vw] max-w-[42vw] -right-[5vw] md:-right-[3vw] lg:-right-[2vw] xl:-right-[1rem] 2xl:right-[4rem] bottom-[10vh] md:bottom-[10vh] lg:bottom-[2rem] xl:bottom-[2rem] 2xl:bottom-[5rem]"
          src="/medias/anim_link.webm"
        />
      </SpotlightCard>
    </motion.section>
  );
};

export default SecondSection;
