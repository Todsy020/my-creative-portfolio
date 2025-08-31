import {
  useScroll,
  useTransform,
  motion,
  useSpring,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import GetInTouch from '../components/GetInTouch';
import ContactForm from '../components/ContactForm';
import AnimatedBackground2 from '../background/AnimatedBackground2';
import phoneAnim from '/medias/phone_anim.webm';
const FourthSection = () => {
  const fourthSectionRef = useRef(null);

  const { scrollYProgress: rotateScrollYProgress } = useScroll({
    target: fourthSectionRef,
    offset: ['start end', 'end start'],
  });
  const { scrollYProgress: textScrollYProgress } = useScroll({
    target: fourthSectionRef,
    offset: ['start 45%', 'start 5%'],
  });

  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth > 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const rotateFourthSection = useTransform(
    rotateScrollYProgress,
    [0, 1],
    isDesktop ? [8, -7.2] : [0, 0]
  );

  const textYProgress = useTransform(
    textScrollYProgress,
    [0, 1],
    ['8vh', 0]
  );
  const textOpacityProgress = useTransform(
    textScrollYProgress,
    [0, 1],
    [0, 1]
  );
  const textScaleProgress = useTransform(
    textScrollYProgress,
    [0, 1],
    [0.7, 1]
  );
  const textSmoothY = useSpring(textYProgress, {
    stiffness: 80,
    damping: 12,
  });

  return (
    <motion.section
      ref={fourthSectionRef}
      style={{
        rotateZ: rotateFourthSection,
      }}
      className="w-full min-h-screen h-[145vh] md:h-[200vh] lg:h-[105vh] xl:h-[110vh] flex flex-col items-center justify-center z-30 sticky top-0 mt-[9rem] md:mt-[15rem] lg:mt-[2rem] 2xl:mt-[20vh] overflow-hidden px-4 lg:px-8"
    >
      <AnimatedBackground2 />

      <motion.div
        style={{
          y: textSmoothY,
          opacity: textOpacityProgress,
          scale: textScaleProgress,
        }}
        className="relative mb-4 md:mb-8 max-w-[95vw] md:max-w-4xl mx-auto z-10 lg:top-15 2xl:-top-2"
      >
        <motion.h2 className="text-c-4xl md:text-c-6xl lg:text-c-5xl xl:text-c-7xl font-bold text-center mb-3 md:mb-6 lg:mb-3 xl:mb-2 xl:mt-10 bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent leading-tight font-tanker animate-gradient">
          Let's talk !
        </motion.h2>
        <p className="text-c-sm md:text-c-lg lg:text-c-base text-gray-200/90 max-w-[90vw] md:max-w-xl mx-auto leading-6 text-center px-2 lg:px-0 font-medium xl:mb-5">
          Have a project in mind or just want to say hello? I'd love
          to hear from you. Drop me a message and let's create
          something amazing together!
        </p>
      </motion.div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 w-[85vw] md:w-[65vw] lg:w-[55vw] xl:w-[900px] max-w-[900px]">
        <video
          src={phoneAnim}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-auto"
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-col lg:flex-row z-50 relative bottom-8 md:bottom-4 lg:bottom-5 w-full max-w-[95vw] md:max-w-6xl px-2 lg:justify-center items-center lg:items-start xl:gap-100 md:gap-5">
        <div
          className="w-full scale-75 md:scale-85 lg:scale-80 xl:scale-85 2xl:scale-100 md:flex md:justify-center"
          id="cta-target"
        >
          <GetInTouch />
        </div>
        <div className="w-full scale-75 md:scale-85 lg:scale-80 xl:scale-85 2xl:scale-100 -mt-18 md:-mt-16 lg:mt-0 lg:ml-40">
          <ContactForm />
        </div>
      </div>
    </motion.section>
  );
};

export default FourthSection;
