import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FirstSection from '../sections/FirstSection';
import SecondSection from '../sections/SecondSection';
import ThirdSection from '../sections/ThirdSection';
import FourthSection from '../sections/FourthSection';
import { TIMING } from '../../constants/animations';

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
  const loadedCountRef = useRef(0);
  const hasCompletedRef = useRef(false);

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

    const completeLoading = () => {
      if (hasCompletedRef.current) return;
      hasCompletedRef.current = true;
      setOffsetExit(true);
      setTimeout(() => setLoading(false), TIMING.LOADING_SCREEN_DELAY);
    };

    const checkFinish = () => {
      loadedCountRef.current += 1;
      if (loadedCountRef.current === videos.length) {
        completeLoading();
      }
    };

    videos.forEach((src) => {
      const video = document.createElement('video');
      video.src = src;
      video.preload = 'auto';
      video.muted = true;
      video.playsInline = true;
      video.onloadeddata = checkFinish;
      video.onerror = checkFinish; // Also count errors to prevent hanging
    });

    // Fallback timeout for slow connections or iOS issues
    const timeout = setTimeout(() => {
      completeLoading();
    }, TIMING.LOADING_FALLBACK_TIMEOUT);

    return () => {
      clearTimeout(timeout);
    };
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
        <main role="main">
          <FirstSection />
          <SecondSection />
          <ThirdSection />
          <FourthSection />
        </main>
      )}
    </>
  );
};

export default MainPage;
