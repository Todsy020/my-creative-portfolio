import { useEffect } from 'react';
import Lenis from 'lenis';

import MainPage from './assets/pages/MainPage.jsx';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smooth: true,
      smoothTouch: false,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <MainPage />;
}

export default App;
