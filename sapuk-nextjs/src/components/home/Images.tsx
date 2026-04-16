"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { images } from "./ImageData";

export default function Images() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[80vh] overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out
            ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-cover object-center object-position-top select-none pointer-events-none"
            priority={index === 0}
          />
        </div>
      ))}
    </div>
  );
}
