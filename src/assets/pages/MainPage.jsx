import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FirstSection from '../sections/FirstSection';
import SecondSection from '../sections/SecondSection';
import ThirdSection from '../sections/ThirdSection';
import FourthSection from '../sections/FourthSection';

import helloAnim from '/medias/avatar_anim_HELLO.webm';
import linkAnim from '/medias/anim_link.webm';
import canAnim from '/medias/can_anim.webm';
import hpWhipCan from '/medias/hp_whip_pan.webm';
import idCardAnim from '/medias/id_card_anim.webm';
import textScreen from '/medias/Text_screen.webm';
import phoneAnim from '/medias/phone_anim.webm';

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [offsetExit, setOffsetExit] = useState(false);

  useEffect(() => {
    const videos = [
      idCardAnim,
      textScreen,
      helloAnim,
      phoneAnim,
      linkAnim,
      canAnim,
      hpWhipCan,
    ];
    let loadedCount = 0;

    const checkFinish = () => {
      loadedCount += 1;
      if (loadedCount === videos.length) {
        // Décalage avant disparition
        setOffsetExit(true);
        setTimeout(() => setLoading(false), 500);
      }
    };

    videos.forEach((src) => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      video.onloadeddata = checkFinish;
    });

    // Fallback timeout iOS si certaines vidéos ne déclenchent jamais onloadeddata
    const timeout = setTimeout(() => {
      if (loading) {
        setOffsetExit(true);
        setTimeout(() => setLoading(false), 500);
      }
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="fixed top-0 left-0 w-full h-full bg-slate-900 z-[9999] flex items-center justify-center"
            initial={{ opacity: 1, x: 0, y: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              x: offsetExit ? 30 : 0,
              y: offsetExit ? 30 : 0,
              transition: { duration: 0.6 },
            }}
          >
            <div className="text-white text-2xl md:text-4xl font-tanker animate-pulse">
              Loading...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <>
          <FirstSection />
          <SecondSection />
          <ThirdSection />
          <FourthSection />
        </>
      )}
    </>
  );
};

export default MainPage;
