import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

const SocialLinksFourthSection = () => {
  const socialLinks = [
    {
      name: 'Mail',
      url: 'mailto:theodore.deconinck@gmail.com',
      icon: Mail,
      gradient: 'from-red-500 to-orange-500',
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/ovbnexus/',
      icon: Instagram,
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      name: 'Twitter',
      url: 'https://x.com/ovbnexus',
      icon: Twitter,
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/th%C3%A9odore-deconinck-2a8641355/',
      icon: Linkedin,
      gradient: 'from-blue-600 to-blue-800',
    },
  ];

  return (
    <div className="relative">
      <motion.nav className="flex gap-6 items-center justify-center">
        {socialLinks.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Follow on ${social.name}`}
              className="relative p-3 rounded-xl bg-gray-900/70 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Overlay gradient glow */}
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${social.gradient} opacity-40 blur-sm pointer-events-none`}
              />
              <Icon
                size={24}
                className="relative z-10 text-white drop-shadow-lg"
              />
            </motion.a>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default SocialLinksFourthSection;
