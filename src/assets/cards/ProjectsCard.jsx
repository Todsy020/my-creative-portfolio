import { motion } from 'framer-motion';
import Projects from '../components/Projects';
import { X } from 'lucide-react';
import NeuralBackground from '../background/NeuralBackground';

const ProjectsCard = ({ setOpen2 }) => {
  return (
    <motion.div
      layoutId="card2"
      className="fixed top-0 left-0 w-full h-screen-ios z-50 bg-slate-900 overflow-y-auto"
    >
      <NeuralBackground />
      {/* Bouton de fermeture responsive */}
      <motion.button
        onClick={() => setOpen2(false)}
        aria-label="Close Project card"
        whileHover={{ scale: 1.1, color: 'red' }}
        whileTap={{ scale: 0.95 }}
        className="group absolute top-2 right-2 md:top-6 md:right-6 p-1 rounded-full bg-slate-800 hover:bg-slate-700 shadow-lg m-2 md:m-5 cursor-pointer z-50"
      >
        <X className="text-red-600 group-hover:text-red-400 w-10 h-10 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      </motion.button>

      <div className="p-3 md:p-6 lg:p-7 rounded-md flex flex-col min-h-screen-ios">
        <motion.h3
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white flex w-full justify-center items-center relative 
                       before:absolute before:left-0 before:w-[20%] lg:before:w-[25%] xl:before:w-[30%] before:h-px before:bg-slate-300
                       after:absolute after:right-0 after:w-[20%] lg:after:w-[25%] xl:after:w-[30%] after:h-px after:bg-slate-300
                       mb-6 md:mb-10 text-c-2xl md:text-c-3xl lg:text-c-3xl xl:text-c-4xl 2xl:text-c-5xl font-tanker text-center px-4"
        >
          My Latest&nbsp;<span className="text-teal-400">WEB</span>
          &nbsp;Builds
        </motion.h3>

        <div className="flex-1 flex flex-col justify-between lg:max-xlscale-95">
          <Projects />
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectsCard;
