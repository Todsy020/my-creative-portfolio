import { ReactLenis } from 'lenis/react';

import MainPage from './assets/pages/MainPage.jsx';

function App() {
  return (
    <ReactLenis root options={{ duration: 1.2, smoothTouch: false }}>
      <MainPage />
    </ReactLenis>
  );
}

export default App;
