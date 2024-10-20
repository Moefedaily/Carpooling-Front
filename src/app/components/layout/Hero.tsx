import { HeroProps } from "@/Utils/types/hero";
import React from "react";

const Hero = ({ title, image, fullHeight = false }: HeroProps) => {
  const heroHeight = fullHeight ? "h-screen" : "h-[400px]";

  return (
    <div className={`relative ${heroHeight}`}>
      <img src={image} alt="Hero" className="w-[90%] h-full object-cover" />
      <div className="absolute bg-bgHero "></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center text-secondary text-center">
        <div className="my-auto mx-auto">
          <h1 className="text-5xl font-bold mt-20 text-secondary font-merriweather ">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
