import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, MessageSquare, Sparkles } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const userID = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs
      .send(serviceID, templateID, formData, userID)
      .then(() => {
        toast.success(
          'Message sent successfully! Thank you very much.',
          {
            duration: 4000,
            position: 'bottom-center',
            style: {
              background: '#10b981',
              color: '#fff',
              fontWeight: '600',
            },
          }
        );
        setFormData({ name: '', message: '' });
      })
      .catch(() => {
        toast.error('Failed to send message. Please try again.', {
          duration: 4000,
          position: 'bottom-center',
          style: {
            background: '#ef4444',
            color: '#fff',
            fontWeight: '600',
          },
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <motion.div
      className="max-w-[90vw] lg:w-[400px] mx-auto bg-gray-900/80 backdrop-blur-lg p-6 md:p-8 rounded-3xl shadow-2xl border border-gray-700 hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* Shimmer Effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500" />

      <div className="flex items-center justify-center gap-2 mb-6">
        <Sparkles className="text-cyan-400" size={22} />
        <h3 className="text-c-2xl md:text-c-2xl text-center font-bold bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
          Send me a message
        </h3>
        <Sparkles className="text-cyan-400" size={22} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        aria-label="Contact form"
      >
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block mb-3 text-c-sm font-medium text-gray-300"
          >
            Your Name
          </label>
          <div className="relative group/input">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl opacity-0 group-focus-within/input:opacity-50 transition-opacity duration-300 blur-sm" />
            <div className="relative flex items-center bg-gray-800 hover:bg-gray-700 rounded-xl px-4 py-3 border border-gray-700 focus-within:border-transparent transition-all duration-300">
              <User
                className="text-gray-400 group-focus-within/input:text-purple-400 flex-shrink-0 transition-colors duration-300"
                size={18}
                aria-hidden="true"
              />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full bg-transparent outline-none px-3 text-gray-100 placeholder:text-gray-500 text-c-sm font-medium"
              />
            </div>
          </div>
        </div>

        {/* Message */}
        <div>
          <label
            htmlFor="message"
            className="block mb-3 text-c-sm font-medium text-gray-300"
          >
            Message
          </label>
          <div className="relative group/input">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl opacity-0 group-focus-within/input:opacity-50 transition-opacity duration-300 blur-sm" />
            <div className="relative flex items-start bg-gray-800 hover:bg-gray-700 rounded-xl px-4 py-3 border border-gray-700 focus-within:border-transparent transition-all duration-300">
              <MessageSquare
                className="text-gray-400 group-focus-within/input:text-purple-400 mt-1 flex-shrink-0 transition-colors duration-300"
                size={18}
                aria-hidden="true"
              />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Tell me about your project. Don't forget to include your contact details..."
                className="w-full bg-transparent outline-none px-3 py-1 text-gray-100 resize-none h-24 text-c-sm placeholder:text-gray-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          aria-live="polite"
          disabled={loading}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-800 hover:to-indigo-700 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm relative overflow-hidden group/button"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-600 opacity-0 group-hover/button:opacity-50 transition-opacity duration-300" />
          <Send size={18} className="relative z-10" />
          <span className="relative z-10">
            {loading ? 'Sending...' : 'Send Message'}
          </span>
          {loading && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-600"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default ContactForm;
