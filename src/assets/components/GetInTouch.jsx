import { motion } from 'framer-motion';
import SocialLinksFourthSection from '../components/SocialLinksFourthSection';

const GetInTouch = () => {
  return (
    <motion.aside
      className="z-50"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="w-full max-w-[90vw] sm:max-w-[400px] lg:w-[400px] bg-gray-900/80 backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-700 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group">
        {/* Shimmer Effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500" />

        <h3 className="text-c-2xl sm:text-c-xl md:text-2xl font-bold mb-6 text-center bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Get in Touch
        </h3>

        <div className="mb-8 space-y-6">
          <motion.div
            className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800 transition-all duration-300 group/item"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-c-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg group-hover/item:shadow-xl transition-shadow duration-300">
              <span role="img" aria-label="Work">
                💼
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-100 mb-1 text-c-base">
                Work Inquiries
              </h4>
              <p className="text-gray-400 text-c-sm leading-relaxed">
                Available for freelance projects
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800 transition-all duration-300 group/item"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-c-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg group-hover/item:shadow-xl transition-shadow duration-300">
              <span role="img" aria-label="Quick">
                ⚡
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-100 mb-1 text-c-base">
                Quick Response
              </h4>
              <p className="text-gray-400 text-c-sm leading-relaxed">
                Usually respond within 24 hours
              </p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800 transition-all duration-300 group/item"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-c-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-lg group-hover/item:shadow-xl transition-shadow duration-300">
              <span role="img" aria-label="Creative">
                🎨
              </span>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-100 mb-1 text-c-base">
                Creative Solutions
              </h4>
              <p className="text-gray-400 text-c-sm leading-relaxed">
                Bringing ideas to life
              </p>
            </div>
          </motion.div>
        </div>

        <SocialLinksFourthSection />
      </div>
    </motion.aside>
  );
};

export default GetInTouch;
