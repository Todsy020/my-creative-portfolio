import { useEffect, useState } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false); // scroll down → cache navbar
      } else {
        setIsVisible(true); // scroll up → montre navbar
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`w-full h-[64px] fixed z-100 py-5 pl-15 text-[15px] flex top-0 transition-transform duration-800 bg-black/15 rounded-b backdrop-blur-xs shadow-md shadow-black/15 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <ul className="flex gap-6 items-center font-inter">
        <img className="h-10" src="/OVB_NEXUS_logo.png" alt="" />
        <li>
          <a href="#home">Home</a>
        </li>
        <li>
          <a href="#portfolios">Portfolio's</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
