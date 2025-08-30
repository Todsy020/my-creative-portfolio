import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import HeroSection from '../components/HeroSection';
const PortfolioCard = ({ setOpen }) => {
  return (
    <motion.div
      layoutId="card"
      className="fixed top-0 left-0 w-full bg-slate-900 z-50"
    >
      {/* Bouton de fermeture responsive */}
      <motion.button
        onClick={() => setOpen(false)}
        aria-label="Close portfolio card"
        whileHover={{ scale: 1.1, color: 'red' }}
        whileTap={{ scale: 0.95 }}
        className="group absolute top-2 right-2 md:top-6 md:right-6 p-1 rounded-full bg-slate-900 hover:bg-slate-700 shadow-lg m-2 md:m-5 cursor-pointer z-50"
      >
        <X className="text-red-600 group-hover:text-red-400 w-10 h-10 md:w-10 md:h-10 lg:w-12 lg:h-12" />
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-slate-300 h-screen overflow-hidden"
      >
        <div className="px-4 lg:px-6">
          <main className="lg:pt-1">
            <HeroSection />
          </main>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PortfolioCard;
