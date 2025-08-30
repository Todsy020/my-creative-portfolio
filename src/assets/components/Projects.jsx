import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Portfolio',
      description:
        'My portfolio serves to introduce myself and showcase my work through an original visual navigation that blends 3D animation, motion design, and customized 2D elements. The goal is to offer a glimpse of my creative vision by combining various styles and software.',
      image: '/medias/portfolio.png',
      technologies: [
        'React',
        'Blender',
        'After Effects',
        'Illustrator',
        'Framer Motion',
        'Premiere pro',
      ],
      external: '#',
    },
    {
      title: 'Hypersplash',
      description:
        'Hypersplash is an immersive and creative website showcasing a collection of fictional cans, each featuring a unique, handmade design. Blending graphic design, animation, and interactivity, it delivers a striking and memorable user experience.',
      image: '/medias/Hyper-splash.png',
      technologies: [
        'React',
        'Node.js',
        'Express.js',
        'Framer motion',
        'Adobe Illustrator',
        'Adobe Photoshop',
      ],
      external: 'https://hypersplash.onrender.com/',
    },
    {
      title: 'PureF#Madness',
      description:
        'Pure F# Madness is a raw and impactful showcase website that introduces the work of an independent, underground French artist. It showcases his work with bold art direction, with every visual element handcrafted by the artist himself. The site immerses visitors in a unique universe where creativity meets raw intensity.',
      image: '/medias/PFM.png',
      technologies: ['React', 'React Router', 'Framer motion'],
      external: 'https://purefuckingmadness.netlify.app/',
    },
    {
      title: 'Dev qui Dev',
      description:
        "Dev qui Dev is a bold showcase website designed to demonstrate the full range of a developer's skills. From API integrations to dynamic UI/UX, the project highlights versatility and technical mastery across multiple stacks. It's a creative playground that proves the ability to handle both the artistic and technical sides of modern web development.",
      image: '/medias/coming-soon.png',
      technologies: [
        'React',
        'Next.js',
        'Node.js',
        'Express.js',
        'Framer Motion',
        'Tailwind CSS',
        'REST API',
      ],
      external: '#',
    },
  ];

  // Carousel configuration
  const DRAG_BUFFER = 50;
  const VELOCITY_THRESHOLD = 500;
  const GAP = 24;
  const SPRING_OPTIONS = {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  };

  // États pour le carrousel
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(1);
  const [itemWidth, setItemWidth] = useState(400);
  const x = useMotionValue(0);
  const containerRef = useRef(null);

  // Détection de la taille d'écran
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsDesktop(width >= 1024); // lg breakpoint

      // Définir le nombre d'éléments à afficher selon la taille
      if (width >= 1536) {
        // 2xl
        setItemsToShow(3);
        setItemWidth(320);
      } else if (width >= 1280) {
        // xl
        setItemsToShow(2);
        setItemWidth(350);
      } else if (width >= 1024) {
        // lg
        setItemsToShow(2);
        setItemWidth(350);
      } else {
        setItemsToShow(1);
        setItemWidth(400);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculs pour le carousel
  const trackItemOffset = itemWidth + GAP;
  const maxIndex = Math.max(0, projects.length - itemsToShow);

  // Navigation du carrousel
  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  // Gestion du drag
  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      goToNext();
    } else if (
      offset > DRAG_BUFFER ||
      velocity > VELOCITY_THRESHOLD
    ) {
      goToPrev();
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  if (!isDesktop) {
    // Affichage original pour mobile et tablette
    return (
      <div className="flex flex-wrap gap-3 justify-center font-inter px-2 z-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-slate-800/70 rounded-lg p-3 w-full lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1rem)] min-w-[280px] max-w-[400px] flex flex-col"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={project.external}
              target="_blank"
              rel="noreferrer"
              className="block z-10"
            >
              <img
                src={project.image}
                alt={project.title}
                className="rounded-t-full w-full h-32 md:h-48 lg:h-44 xl:h-48 mb-3 cursor-pointer object-cover hover:shadow-2xl"
              />
            </motion.a>

            <div className="flex-1 flex flex-col">
              <h3 className="text-zinc-100 font-semibold text-3xl mb-3 drop-shadow-md text-center tracking-widest border rounded-b-full hover:text-teal-400 hover:shadow-2xl transition-colors duration-200">
                {project.title}
              </h3>

              <p className="text-gray-200 text-sm md:text-base mb-3 flex-1 leading-relaxed drop-shadow-sm text-center">
                {project.description}
              </p>

              <ul className="flex flex-wrap gap-1 text-xs md:text-sm text-gray-200 mb-3 justify-center">
                {project.technologies.map((techno, i) => (
                  <li
                    key={i}
                    className="hover:text-green-400 transition-colors duration-200 bg-slate-900 px-2 py-1 rounded-md list-none"
                  >
                    {techno}
                  </li>
                ))}
              </ul>

              {project.external && (
                <a
                  href={project.external}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-green-300 hover:text-green-400 hover:underline text-lg transition-colors duration-200 justify-center z-10 hover:shadow-2xl"
                >
                  <ExternalLink className="w-4 h-4 mr-1" />
                  Visit Project
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  // Nouveau carousel avec drag pour desktop
  return (
    <div className="relative w-full font-inter px-4 z-10">
      {/* Container du carrousel avec overflow hidden */}
      <div
        ref={containerRef}
        className="relative overflow-hidden"
        style={{
          width: `${
            itemsToShow * itemWidth + (itemsToShow - 1) * GAP
          }px`,
          margin: '0 auto',
          maxWidth: '100%',
        }}
      >
        {/* Track du carousel avec drag */}
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{
            left: -trackItemOffset * maxIndex,
            right: 0,
          }}
          style={{
            gap: `${GAP}px`,
            x,
          }}
          onDragEnd={handleDragEnd}
          animate={{ x: -(currentIndex * trackItemOffset) }}
          transition={SPRING_OPTIONS}
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/80 rounded-lg p-3 flex flex-col shadow-2xl border border-slate-700 hover:border-teal-400/50 transition-all duration-300 shrink-0"
              style={{
                width: `${itemWidth}px`,
                minHeight: '500px',
              }}
              whileHover={{
                y: -1,
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={project.external}
                target="_blank"
                rel="noreferrer"
                className="block z-10"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="rounded-t-[130px] w-full h-32 md:h-48 lg:h-44 xl:h-48 mb-3 cursor-pointer object-cover hover:shadow-2xl"
                />
              </motion.a>

              <div className="flex-1 flex flex-col">
                <h3 className="text-zinc-100 font-semibold text-3xl mb-3 drop-shadow-md text-center tracking-widest border rounded-b-full hover:text-teal-400 hover:shadow-2xl transition-colors duration-200 font-tanker">
                  {project.title}
                </h3>

                <p className="text-gray-200 text-sm md:text-base mb-3 flex-1 leading-relaxed drop-shadow-sm text-center">
                  {project.description}
                </p>

                <ul className="flex flex-wrap gap-1 text-xs md:text-sm text-gray-200 mb-3 justify-center">
                  {project.technologies.map((techno, i) => (
                    <li
                      key={i}
                      className="hover:text-green-400 transition-colors duration-200 bg-slate-900 px-2 py-1 rounded-md list-none"
                    >
                      {techno}
                    </li>
                  ))}
                </ul>

                {project.external && (
                  <a
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-green-300 hover:text-green-400 hover:underline text-lg transition-colors duration-200 justify-center z-10 hover:shadow-2xl"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Visit Project
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Boutons de navigation */}
      {currentIndex > 0 && (
        <motion.button
          onClick={goToPrev}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute lg:left-5 xl:left-50 2xl:left-80 top-1/2 -translate-y-1/2 z-20 p-3 lg:p-4 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-600 hover:border-teal-400 transition-all duration-300 shadow-lg cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 text-white hover:text-teal-400 transition-colors" />
        </motion.button>
      )}

      {currentIndex < maxIndex && (
        <motion.button
          onClick={goToNext}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="absolute lg:right-5 xl:right-50 2xl:right-80 top-1/2 -translate-y-1/2 z-20 p-3 lg:p-4 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-600 hover:border-teal-400 transition-all duration-300 shadow-lg cursor-pointer"
        >
          <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 text-white hover:text-teal-400 transition-colors" />
        </motion.button>
      )}

      {/* Indicateurs de pagination */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-teal-400 scale-125'
                : 'bg-slate-600 hover:bg-slate-500'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
