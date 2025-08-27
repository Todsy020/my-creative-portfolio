import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';
import PortfolioCard from '../cards/PortfolioCard';
import ProjectsCard from '../cards/ProjectsCard';
import AnimatedBackground from '../background/AnimatedBackground';

const ThirdSection = () => {
  const thirdSectionRef = useRef(null);

  const { scrollYProgress: rotateScrollYProgress } = useScroll({
    target: thirdSectionRef,
    offset: ['start end', 'end start'],
  });

  const { scrollYProgress: textScrollYProgress } = useScroll({
    target: thirdSectionRef,
    offset: ['start 45%', 'start 5%'],
  });

  // Détecte si c'est desktop
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const handleResize = () =>
      setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Rotation section uniquement sur desktop
  const rotateThirdSection = useTransform(
    rotateScrollYProgress,
    [0, 1],
    isDesktop ? [-8, 8.8] : [0, 0]
  );

  // Utiliser le scroll global pour l'effet de scale
  const { scrollYProgress: globalScrollYProgress } = useScroll();
  const scaleSection = useTransform(
    globalScrollYProgress,
    [0.66, 1.66], // Ajustez ces valeurs selon la position de votre section
    [1, 0.7]
  );

  // Texte animation responsive
  const textYProgress = useTransform(
    textScrollYProgress,
    [0, 1],
    [isDesktop ? 290 : 150, isDesktop ? -110 : -40]
  );
  const textOpacityProgress = useTransform(
    textScrollYProgress,
    [0, 1],
    [0, 1]
  );
  const textScaleProgress = useTransform(
    textScrollYProgress,
    [0, 1],
    [0.6, 1]
  );
  const textSmoothY = useSpring(textYProgress, {
    stiffness: 80,
    damping: 14,
  });

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <motion.section
      ref={thirdSectionRef}
      style={{
        rotateZ: rotateThirdSection,
        scale: scaleSection,
        backgroundImage: "url('/third_bg.svg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className="w-full h-[100vh] lg:h-[110vh] flex items-center justify-center bg-slate-900 z-30 sticky top-0 mt-20 md:mt-32 lg:mt-36 overflow-hidden"
      aria-label="About Me and My Work section with interactive cards"
    >
      <AnimatedBackground />
      {isDesktop ? (
        <>
          {/* Left Button Area - Desktop */}
          <motion.div
            layoutId="card"
            className="absolute top-0 left-0 h-full clip-left bg-zinc-100 cursor-pointer flex items-center justify-center z-50"
            onClick={() => setOpen(true)}
            whileHover={{ width: '60%' }}
            initial={{ width: '50%' }}
            animate={{ width: '50%' }}
            transition={{ duration: 0.4 }}
          >
            <video
              className="absolute bottom-[2.5rem] right-[7.5rem] w-full h-full object-cover"
              src="id_card_anim.webm"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Animated character introducing About Me section"
            />
            <motion.h4
              className="text-c-4xl lg:text-c-3xl xl:text-c-5xl text-white font-tanker z-10 flex items-center gap-2 lg:gap-3 relative right-[8rem] lg:right-[8rem] top-[8rem] lg:top-[8rem]"
              style={{ WebkitTextStroke: '1.2px black' }}
            >
              <ArrowBigLeft className="w-8 h-8 lg:w-8 lg:h-8 xl:w-12 xl:h-12" />{' '}
              About Me
            </motion.h4>
          </motion.div>

          {/* Right Button Area - Desktop */}
          <motion.div
            layoutId="card2"
            className="absolute top-0 right-0 h-full clip-right cursor-pointer flex items-center justify-center z-40"
            onClick={() => setOpen2(true)}
            whileHover={{ width: '60%' }}
            initial={{ width: '50%' }}
            animate={{ width: '50%' }}
            transition={{ duration: 0.4 }}
          >
            <video
              className="absolute top-0 left-[1.5rem] w-full h-full object-cover"
              src="Text_screen.webm"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Animated display of portfolio work"
            />
            <motion.h4
              className="text-c-5xl lg:text-c-3xl xl:text-c-5xl text-zinc-100 font-tanker z-10 flex items-center gap-2 lg:gap-3 relative left-[8rem] lg:left-[8rem] top-[8rem] lg:top-[8rem]"
              style={{ WebkitTextStroke: '1.2px black' }}
            >
              My Work{' '}
              <ArrowBigRight className="w-8 h-8 lg:w-8 lg:h-8 xl:w-12 xl:h-12" />
            </motion.h4>
          </motion.div>

          {/* Central content - Desktop */}
          <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 mt-[15vh] scale-60 xl:scale-80 2xl:scale-100">
            <motion.div
              style={{
                y: textSmoothY,
                opacity: textOpacityProgress,
                scale: textScaleProgress,
              }}
              className="bg-slate-900 rounded-2xl p-8 max-w-md w-full mx-auto shadow-2xl border border-slate-700
        lg:bg-transparent lg:shadow-none lg:border-none lg:rounded-none 
        lg:p-0"
            >
              {/* Main Title */}
              <h3 className="text-c-5xl lg:text-c-4xl font-tanker text-white mb-4 leading-tight">
                Hi, I'm{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  Théodore
                </span>
              </h3>

              {/* Subtitle */}
              <p className="text-c-2xl lg:text-c-xl text-slate-300 my-4 font-inter">
                Creative Developer & Digital Artist
              </p>

              {/* Description */}
              <p className="text-c-lg lg:text-c-base text-slate-400 mb-5 font-inter leading-relaxed">
                I craft unique digital experiences by blending code,
                design, and motion.
              </p>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 gap-4 w-full lg:max-w-xs lg:mx-auto my-10">
                <div className="bg-slate-800 rounded-lg p-3 text-center border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="w-10 h-15 lg:w-8 lg:h-12 mx-auto mb-2 flex items-center justify-center">
                    <svg
                      fill="yellow"
                      className="w-full h-full"
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                    >
                      {' '}
                      <path
                        d="M13.71,12.59a1,1,0,0,0-1.39-.26L5.79,16.78a1,1,0,0,0,0,1.65l6.53,4.45a1,1,0,1,0,1.13-1.65L8.13,17.61,13.45,14A1,1,0,0,0,13.71,12.59Z"
                        className="clr-i-outline clr-i-outline-path-1"
                      ></path>{' '}
                      <path
                        d="M30.21,16.78l-6.53-4.45A1,1,0,1,0,22.55,14l5.32,3.63-5.32,3.63a1,1,0,0,0,1.13,1.65l6.53-4.45a1,1,0,0,0,0-1.65Z"
                        className="clr-i-outline clr-i-outline-path-2"
                      ></path>{' '}
                      <path
                        d="M19.94,9.83a.9.9,0,0,0-1.09.66L15.41,24.29a.9.9,0,0,0,.66,1.09l.22,0a.9.9,0,0,0,.87-.68l3.44-13.81A.9.9,0,0,0,19.94,9.83Z"
                        className="clr-i-outline clr-i-outline-path-3"
                      ></path>{' '}
                    </svg>
                  </div>
                  <span className="text-slate-300 font-inter text-c-lg lg:text-c-base">
                    Development
                  </span>
                </div>

                <div className="bg-slate-800 rounded-lg p-3 text-center border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="w-8 h-15 lg:w-6 lg:h-12 mx-auto mb-2 flex items-center justify-center">
                    <svg
                      fill="cyan"
                      className="w-full h-full"
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                    >
                      {' '}
                      <path
                        d="M33.12,12.81a7.44,7.44,0,0,1-1.91.58,14.05,14.05,0,1,1-8.6-8.6,7.43,7.43,0,0,1,.58-1.91,16.06,16.06,0,1,0,9.93,9.93Z"
                        className="clr-i-outline--badged clr-i-outline-path-1--badged"
                      ></path>{' '}
                      <path
                        d="M20.25,5.77a17.83,17.83,0,0,1,3.89,6.59H18.75V5.6c-.25,0-.51,0-.77,0s-.49,0-.73,0v6.77H11.86a17.83,17.83,0,0,1,3.9-6.6,12.28,12.28,0,0,0-2.54.75,19.72,19.72,0,0,0-2.91,5.85H6.94A12.3,12.3,0,0,0,6.26,14H9.89a19.38,19.38,0,0,0-.43,4,19.67,19.67,0,0,0,.5,4.37H6.42A12.34,12.34,0,0,0,7.16,24h3.23a19.32,19.32,0,0,0,2.69,5.36,12.28,12.28,0,0,0,2.61.79A17.91,17.91,0,0,1,12,24h5.26v6.34c.24,0,.49,0,.73,0s.51,0,.77,0V24H24a17.9,17.9,0,0,1-3.7,6.15,12.28,12.28,0,0,0,2.62-.81A19.32,19.32,0,0,0,25.61,24h3.2a12.34,12.34,0,0,0,.74-1.6H26a19.67,19.67,0,0,0,.5-4.37,19.38,19.38,0,0,0-.43-4h3.6c-.06-.17-.12-.33-.19-.49a7.45,7.45,0,0,1-3.47-1.11h-.36c0-.11-.08-.21-.11-.32a7.48,7.48,0,0,1-3.06-5.62A12.41,12.41,0,0,0,20.25,5.77Zm-3,16.59H11.51a17.69,17.69,0,0,1-.09-8.4h5.83ZM25,18a18.12,18.12,0,0,1-.55,4.37H18.75V14h5.83A18.21,18.21,0,0,1,25,18Z"
                        className="clr-i-outline--badged clr-i-outline-path-2--badged"
                      ></path>{' '}
                      <circle cx="30" cy="6" r="5"></circle>{' '}
                    </svg>
                  </div>
                  <span className="text-slate-300 font-inter text-c-lg lg:text-c-base">
                    Web
                  </span>
                </div>

                <div className="bg-slate-800 rounded-lg p-3 text-center border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="w-8 h-15 lg:w-6 lg:h-12 mx-auto mb-2 flex items-center justify-center">
                    <svg
                      fill="#c44fff"
                      className="w-full h-full"
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                    >
                      {' '}
                      <title>wand-line</title>{' '}
                      <path
                        className="clr-i-outline clr-i-outline-path-1"
                        d="M34.1,4,31.71,1.6a1.83,1.83,0,0,0-1.31-.54h0a2.05,2.05,0,0,0-1.45.62L1.76,29.23A2,2,0,0,0,1.68,32l2.4,2.43A1.83,1.83,0,0,0,5.39,35h0a2.05,2.05,0,0,0,1.45-.62L34,6.79A2,2,0,0,0,34.1,4ZM5.42,32.93,3.16,30.65h0L24.11,9.43l2.25,2.28ZM32.61,5.39l-5.12,5.18L25.24,8.29l5.13-5.2,2.25,2.28Z"
                      ></path>{' '}
                      <path
                        className="clr-i-outline clr-i-outline-path-2"
                        d="M32.53,20.47l2.09-2.09a.8.8,0,0,0-1.13-1.13l-2.09,2.09-2.09-2.09a.8.8,0,0,0-1.13,1.13l2.09,2.09-2.09,2.09a.8.8,0,0,0,1.13,1.13l2.09-2.09,2.09,2.09a.8.8,0,0,0,1.13-1.13Z"
                      ></path>{' '}
                      <path
                        className="clr-i-outline clr-i-outline-path-3"
                        d="M14.78,6.51a.8.8,0,0,0,1.13,0L17.4,5l1.49,1.49A.8.8,0,0,0,20,5.38L18.54,3.89,20,2.4a.8.8,0,0,0-1.13-1.13L17.4,2.76,15.91,1.27A.8.8,0,1,0,14.78,2.4l1.49,1.49L14.78,5.38A.8.8,0,0,0,14.78,6.51Z"
                      ></path>{' '}
                      <path
                        className="clr-i-outline clr-i-outline-path-4"
                        d="M8.33,15.26a.8.8,0,0,0,1.13,0l1.16-1.16,1.16,1.16a.8.8,0,1,0,1.13-1.13L11.76,13l1.16-1.16a.8.8,0,1,0-1.13-1.13l-1.16,1.16L9.46,10.68a.8.8,0,1,0-1.13,1.13L9.49,13,8.33,14.13A.8.8,0,0,0,8.33,15.26Z"
                      ></path>{' '}
                    </svg>
                  </div>
                  <span className="text-slate-300 font-inter text-c-lg lg:text-c-base">
                    Design
                  </span>
                </div>

                <div className="bg-slate-800 rounded-lg p-3 text-center border border-slate-700 hover:border-slate-600 transition-all duration-300">
                  <div className="w-8 h-15 lg:w-6 lg:h-12 mx-auto mb-2 flex items-center justify-center">
                    <svg
                      fill="#fab348"
                      className="w-full h-full"
                      viewBox="0 0 36 36"
                      aria-hidden="true"
                    >
                      {' '}
                      <path
                        d="M32.12,10H3.88A1.88,1.88,0,0,0,2,11.88V30.12A1.88,1.88,0,0,0,3.88,32H32.12A1.88,1.88,0,0,0,34,30.12V11.88A1.88,1.88,0,0,0,32.12,10ZM32,30H4V12H32Z"
                        className="clr-i-outline clr-i-outline-path-1"
                      ></path>{' '}
                      <path
                        d="M30.14,3h0a1,1,0,0,0-1-1h-22a1,1,0,0,0-1,1h0V4h24Z"
                        className="clr-i-outline clr-i-outline-path-2"
                      ></path>{' '}
                      <path
                        d="M32.12,7V7a1,1,0,0,0-1-1h-26a1,1,0,0,0-1,1h0V8h28Z"
                        className="clr-i-outline clr-i-outline-path-3"
                      ></path>{' '}
                      <path
                        d="M12.82,26.79a1.74,1.74,0,0,0,.93.28,1.68,1.68,0,0,0,.69-.15l9.77-4.36a1.69,1.69,0,0,0,0-3.1L14.44,15.1a1.7,1.7,0,0,0-2.39,1.55v8.72A1.7,1.7,0,0,0,12.82,26.79Zm.63-10.14a.29.29,0,0,1,.14-.25.3.3,0,0,1,.16,0,.27.27,0,0,1,.12,0l9.77,4.35a.29.29,0,0,1,.18.28.28.28,0,0,1-.18.27l-9.77,4.36a.28.28,0,0,1-.28,0,.31.31,0,0,1-.14-.25Z"
                        className="clr-i-outline clr-i-outline-path-4"
                      ></path>{' '}
                    </svg>
                  </div>
                  <span className="text-slate-300 font-inter text-c-lg lg:text-c-base">
                    Animation
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div
                className="w-full lg:max-w-lg lg:mx-auto my-11"
                aria-label="Key statistics"
              >
                <ul className="grid grid-cols-3 gap-20">
                  <li className="text-center">
                    <span className="block text-c-5xl lg:text-c-4xl font-tanker text-white mb-1">
                      1+
                    </span>
                    <p className="text-c-base lg:text-c-sm text-slate-400 font-inter">
                      Years Experience
                    </p>
                  </li>
                  <li className="text-center">
                    <span className="block text-c-5xl lg:text-c-4xl font-tanker text-white mb-1">
                      50+
                    </span>
                    <p className="text-c-base lg:text-c-sm text-slate-400 font-inter">
                      Projects Completed
                    </p>
                  </li>
                  <li className="text-center">
                    <span className="block text-c-5xl lg:text-c-4xl font-tanker text-white mb-1">
                      100%
                    </span>
                    <p className="text-c-base lg:text-c-sm text-slate-400 font-inter">
                      Client Satisfaction
                    </p>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => {
                  const target =
                    document.getElementById('cta-target');
                  target?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-5 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl w-full lg:w-auto lg:px-6 cursor-pointer text-c-xl lg:text-c-lg mt-5 font-inter"
              >
                Let's Work Together
              </button>
            </motion.div>
          </div>
        </>
      ) : (
        // Version mobile/tablette: section divisée en 3 verticalement
        <div className="absolute top-0 left-0 w-full h-full z-50 flex flex-col">
          {/* Top third - Mobile/Tablet */}
          <div
            className="relative h-1/3 w-full cursor-pointer"
            layoutId="card"
            onClick={() => setOpen(true)}
          >
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="id_card_anim.webm"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Animated character introducing About Me section"
            />
            <motion.h4
              style={{
                y: textSmoothY,
                opacity: textOpacityProgress,
                scale: textScaleProgress,
                WebkitTextStroke: '0.5px black',
              }}
              className="absolute bottom-2 left-2 flex items-center gap-1 text-white font-tanker text-c-3xl md:text-c-4xl"
            >
              <ArrowBigLeft className="w-4 h-4 md:w-6 md:h-6" /> About
              Me
            </motion.h4>
          </div>

          {/* Middle third - Mobile/Tablet */}
          <motion.div
            style={{
              opacity: textOpacityProgress,
              scale: textScaleProgress,
              WebkitTextStroke: '0.5px black',
            }}
            className="h-1/3 flex flex-col justify-center items-center text-center px-4 overflow-hidden md:h-2/4 scale-92 md:scale-100"
          >
            {/* Main Title */}
            <h3 className="text-c-2xl md:text-c-3xl font-tanker text-white leading-tight">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Théodore
              </span>
            </h3>

            {/* Subtitle */}
            <p className="text-c-base md:text-c-xl text-slate-300 mb-4 mt-2 font-inter">
              Creative Developer & Digital Artist
            </p>

            {/* Skills Grid - Compact for mobile */}
            <ul className="grid grid-cols-4 gap-2 md:gap-3 w-full max-w-xs md:max-w-lg mt-2 md:mt-5">
              <li className="bg-slate-800 rounded-md p-1 text-center border border-slate-700">
                <div className="w-4 h-4 md:w-6 md:h-8 mx-auto mb-1 text-blue-400 flex items-center justify-center">
                  <svg
                    className="w-full h-full"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H8zM7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" />
                  </svg>
                </div>
                <p className="text-c-xs text-slate-300 font-medium">
                  Dev
                </p>
              </li>

              <li className="bg-slate-800 rounded-md p-1 text-center border border-slate-700">
                <div className="w-4 h-4 md:w-6 md:h-8 mx-auto mb-1 text-purple-400 flex items-center justify-center">
                  <svg
                    className="w-full h-full"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <p className="text-c-xs text-slate-300 font-medium">
                  Design
                </p>
              </li>

              <li className="bg-slate-800 rounded-md p-1 text-center border border-slate-700">
                <div className="w-4 h-4 md:w-6 md:h-8 mx-auto mb-1 text-yellow-400 flex items-center justify-center">
                  <svg
                    className="w-full h-full"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                  </svg>
                </div>
                <p className="text-c-xs text-slate-300 font-medium">
                  Anim
                </p>
              </li>

              <li className="bg-slate-800 rounded-md p-1 text-center border border-slate-700">
                <div className="w-4 h-4 md:w-6 md:h-8 mx-auto mb-1 text-green-400 flex items-center justify-center">
                  <svg
                    className="w-full h-full"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                </div>
                <p className="text-c-xs text-slate-300 font-medium">
                  Web
                </p>
              </li>
            </ul>

            {/* Stats - Compact */}
            <ul className="grid grid-cols-3 gap-2 w-full max-w-xs md:max-w-lg mt-9 md:mt-8">
              <li className="text-center">
                <p className="text-c-xl md:text-c-2xl font-tanker text-white">
                  3+
                </p>
                <p className="text-c-sm md:text-c-xl text-slate-400 font-inter">
                  Years
                </p>
              </li>
              <li className="text-center">
                <p className="text-c-xl md:text-c-2xl font-tanker text-white">
                  50+
                </p>
                <p className="text-c-sm md:text-c-xl text-slate-400 font-inter">
                  Projects
                </p>
              </li>
              <li className="text-center">
                <p className="text-c-xl md:text-c-2xl font-tanker text-white">
                  100%
                </p>
                <p className="text-c-sm md:text-c-xl text-slate-400 font-inter">
                  Quality
                </p>
              </li>
            </ul>
          </motion.div>

          {/* Bottom third - Mobile/Tablet */}
          <div
            className="relative h-1/3 w-full cursor-pointer"
            layoutId="card"
            onClick={() => setOpen2(true)}
          >
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src="Text_screen.webm"
              autoPlay
              loop
              muted
              playsInline
              aria-label="Animated display of portfolio work"
            />
            <motion.h4
              style={{
                y: textSmoothY,
                opacity: textOpacityProgress,
                scale: textScaleProgress,
                WebkitTextStroke: '0.5px black',
              }}
              className="absolute bottom-2 right-2 flex items-center gap-1 text-white font-tanker text-c-3xl md:text-c-4xl"
            >
              My Work{' '}
              <ArrowBigRight className="w-4 h-4 md:w-6 md:h-6" />
            </motion.h4>
          </div>
        </div>
      )}

      {/* Card Modals */}
      <AnimatePresence>
        {open && <PortfolioCard setOpen={setOpen} />}
        {open2 && <ProjectsCard setOpen2={setOpen2} />}
      </AnimatePresence>
    </motion.section>
  );
};

export default ThirdSection;
