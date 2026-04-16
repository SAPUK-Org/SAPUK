import { useState, useEffect } from "react";

export const useScroll = (threshold: number = 40) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("isScrolled");
    if (saved) {
      setIsScrolled(JSON.parse(saved));
    }

    const handleScroll = () => {
      const scrolled = window.scrollY > threshold;
      setIsScrolled(scrolled);
      localStorage.setItem("isScrolled", JSON.stringify(scrolled));
    };
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  return isScrolled;
};
