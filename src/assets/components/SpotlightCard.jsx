import { useRef, useState } from 'react';

const SpotlightCard = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
}) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left - rect.width * 0.000000001, // ajuste un peu
      y: e.clientY - rect.top - rect.height * 0.000000001,
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={() => {
        setIsFocused(true);
        setOpacity(0.6);
      }}
      onBlur={() => {
        setIsFocused(false);
        setOpacity(0);
      }}
      onMouseEnter={() => setOpacity(0.3)}
      onMouseLeave={() => setOpacity(0)}
      className={` overflow-hidden ${className} flex justify-center items-center`} // 🔥 garde juste le minimum
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at ${position.x}px ${position.y}px,
  rgba(255,0,150,0.5),
  rgba(0,200,255,0.4),
  transparent 30%)`,
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
