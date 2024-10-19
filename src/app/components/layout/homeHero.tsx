import React from "react";
import Image from "next/image";

interface HomeHeroProps {
  titleLine1: string;
  titleLine2: string;
  subtitle: string;
  images: string[];
}

const HomeHero: React.FC<HomeHeroProps> = ({
  titleLine1,
  titleLine2,
  subtitle,
  images,
}) => {
  return (
    <div className="relative bg-white pt-16 sm:pt-24 lg:pt-32 pb-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start">
        <div className="w-full mx-auto lg:w-1/2 text-left mt-8 sm:mt-16 lg:mt-32 lg:mb-0 lg:pr-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-primary leading-tight mb-4">
            <span className="block lg:mb-2">{titleLine1}</span>
            <span className="block lg:ml-20">{titleLine2}</span>
          </h1>
          <p className="mt-3 text-lg sm:text-xl lg:text-2xl font-normal text-secondary max-w-md">
            {subtitle}
          </p>
        </div>
        <div className="w-full lg:w-1/2 relative h-[400px] sm:h-[500px] lg:h-[600px] mt-8 lg:mt-0">
          <div className="absolute top-0 left-[10%] w-1/2 h-1/3 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={images[0]}
              alt="people image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="absolute top-[15%] right-[15%] w-1/2 h-1/3 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={images[1]}
              alt="people image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="absolute top-[35%] left-[5%] w-1/2 h-1/3 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={images[2]}
              alt="people image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="absolute bottom-[15%] right-[2%] w-1/2 h-1/3 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={images[3]}
              alt="people image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="absolute bottom-0 left-[15%] w-1/2 h-1/3 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={images[4]}
              alt="people image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
