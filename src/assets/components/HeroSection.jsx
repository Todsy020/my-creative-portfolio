import { motion } from 'framer-motion';
import AnimatedBackground3 from '../background/AnimatedBackground3';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.4 } },
};

const childVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center pt-6 xl:pt-8 text-center px-4 md:px-10">
      <AnimatedBackground3 />
      {/* Intro */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-5 xl:mb-12"
      >
        <motion.p
          variants={childVariants}
          className="text-teal-300 font-inter mb-1 text-c-lg md:text-c-xl lg:text-c-xl xl:text-c-2xl lg:-mt-1"
        >
          Hi, my name is
        </motion.p>
        <motion.h1
          variants={childVariants}
          className="text-c-3xl md:text-c-5xl lg:text-c-4xl xl:text-c-5xl font-tanker text-slate-100 mb-1 lg:-my-4"
        >
          Théodore Deconinck.
        </motion.h1>
        <motion.h2
          variants={childVariants}
          className="text-c-xl md:text-c-3xl lg:text-c-2xl xl:text-c-3xl font-tanker text-slate-400"
        >
          I turn ideas into websites
        </motion.h2>
      </motion.div>

      {/* Columns */}
      <div className="flex flex-col lg:flex-row w-full gap-4 xl:gap-6 justify-center items-stretch lg:-mt-3">
        {/* About Me */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="bg-slate-800 p-3 rounded-lg shadow-2xl border-2 border-slate-700 flex flex-col w-full xl:w-1/3 h-full"
        >
          <h3 className="flex justify-center items-center relative before:absolute before:left-0 before:w-1/3 before:h-px before:bg-slate-400 after:absolute after:right-0 after:w-1/3 after:h-px after:bg-slate-400 mb-4 text-c-2xl md:text-c-4xl lg:text-c-2xl 2xl:text-c-3xl font-tanker">
            About me
          </h3>

          {/* Mobile */}
          <p className="block lg:hidden text-c-sm md:text-c-base leading-relaxed font-inter text-center">
            Hello, my name is{' '}
            <span className="text-teal-400 font-semibold">
              Théodore.
            </span>{' '}
            I combine creativity and web development to bring ideas to
            life.
          </p>

          {/* Desktop */}
          <div className="hidden lg:flex justify-center">
            <p className="text-c-base lg:text-c-sm 2xl:text-c-lg leading-relaxed font-inter text-center">
              Hello, my name is{' '}
              <span className="text-teal-400 font-semibold ">
                Théodore
              </span>{' '}
              and I have been passionate about{' '}
              <span className="text-teal-400 font-semibold">
                creation
              </span>{' '}
              in all its forms since childhood. This passion was
              passed down to me by my mother, a{' '}
              <span className="text-teal-300 italic">
                writer, poet, and painter
              </span>{' '}
              in her spare time. I have always seen her create, and
              naturally, I followed in her footsteps.
              <br />
              <br />
              My journey into{' '}
              <span className="text-teal-400 font-semibold">
                web development
              </span>{' '}
              began in 2023. I have always been a child of the
              Internet, fascinated by the digital world and the
              infinite possibilities it offers. After a trip full of
              experiences in{' '}
              <span className="text-teal-400 font-semibold">
                Montreal
              </span>
              , I realized I had to turn to what truly makes me
              thrive:{' '}
              <span className="text-teal-400 font-semibold">IT</span>{' '}
              and{' '}
              <span className="text-teal-400 font-semibold">
                creativity
              </span>
              .
              <br />
              <br />
              By combining the two, I embarked on learning many
              software tools to now deliver rich and unique
              experiences.
            </p>
          </div>
        </motion.div>

        {/* Right Column */}
        <div className="flex flex-col w-full xl:w-1/3 gap-3">
          {/* Tools & Skills */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="bg-slate-800 p-4 rounded-lg shadow-2xl border-2 border-slate-700 flex flex-col text-center h-full"
          >
            <h3 className="flex justify-center items-center relative before:absolute before:left-0 before:w-1/4 before:h-px before:bg-slate-400 after:absolute after:right-0 after:w-1/4 after:h-px after:bg-slate-400 mb-2 text-c-2xl md:text-c-4xl lg:text-c-2xl 2xl:text-c-3xl font-tanker">
              Tools & Skills
            </h3>
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="list-none text-left space-y-2 md:space-y-3 font-inter text-c-sm md:text-c-base lg:text-c-sm 2xl:text-c-lg"
            >
              <motion.li
                variants={childVariants}
                className="relative pl-5 before:absolute before:left-0 before:text-teal-400 before:content-['▹']"
              >
                <span className="text-teal-400 font-semibold">
                  Development:
                </span>{' '}
                JavaScript (ES6+), Next.js, React, Node.js,
                Express.js, MongoDB, HTML5, CSS3, TailwindCSS
              </motion.li>
              <motion.li
                variants={childVariants}
                className="relative pl-5 before:absolute before:left-0 before:text-teal-400 before:content-['▹']"
              >
                <span className="text-teal-400 font-semibold">
                  3D:
                </span>{' '}
                Blender, Spline
              </motion.li>
              <motion.li
                variants={childVariants}
                className="relative pl-5 before:absolute before:left-0 before:text-teal-400 before:content-['▹']"
              >
                <span className="text-teal-400 font-semibold">
                  Creative Suite:
                </span>{' '}
                Illustrator, Photoshop, After Effects, Premiere Pro...
              </motion.li>
              <motion.li
                variants={childVariants}
                className="relative pl-5 before:absolute before:left-0 before:text-teal-400 before:content-['▹']"
              >
                <span className="text-teal-400 font-semibold">
                  Audio & Music:
                </span>{' '}
                FL Studio
              </motion.li>
            </motion.ul>
          </motion.div>

          {/* OVB */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="bg-slate-800 p-5 rounded-lg shadow-2xl border-2 border-slate-700 flex flex-col justify-start h-full"
          >
            <h3 className="flex justify-center items-center relative before:absolute before:left-0 before:w-1/3 before:h-px before:bg-slate-400 after:absolute after:right-0 after:w-1/3 after:h-px after:bg-slate-400 mb-1 text-c-2xl md:text-c-4xl lg:text-c-2xl 2xl:text-c-3xl font-tanker">
              OVB
            </h3>
            <p className="text-c-sm md:text-c-base lg:text-c-sm 2xl:text-c-lg leading-relaxed font-inter text-center">
              <span className="text-teal-400 font-semibold">OVB</span>{' '}
              is my web creation agency, but also a{' '}
              <span className="text-teal-400 font-semibold">
                creative
              </span>{' '}
              organization composed of me, my friends, and artists I
              meet during my journey.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
