import { useEffect, useState } from 'react';

const BreakPointIndic = () => {
  const [bp, setBp] = useState('');

  const updateBreakpoint = () => {
    const width = window.innerWidth;
    const activeBp =
      width >= 1536
        ? '2xl'
        : width >= 1280
        ? 'xl'
        : width >= 1024
        ? 'lg'
        : width >= 768
        ? 'md'
        : width >= 640
        ? 'sm'
        : 'base';
    setBp(`${activeBp} (${width}px)`);
  };

  useEffect(() => {
    window.addEventListener('resize', updateBreakpoint);
    updateBreakpoint(); // initial call
    return () =>
      window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return (
    <div className="fixed top-2 right-2 bg-black text-white px-2 py-1 z-50 text-sm rounded">
      {bp}
    </div>
  );
};

export default BreakPointIndic;
