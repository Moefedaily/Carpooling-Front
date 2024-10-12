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
    <div className="relative bg-white sm:pt-0 md:pt-0 lg:pt-24 pb-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start">
        <div className="w-full mx-auto lg:w-1/2 text-left mt-32 lg:mb-0 lg:pr-12">
          <h1 className="lg:text-6xl sm:text-4xl md:text-4xl  font-extrabold text-primary leading-tight mb-4">
            <span className="block lg:mb-2">{titleLine1}</span>
            <span className="block lg:ml-20">{titleLine2}</span>
          </h1>
          <p className="mt-3 text-bold  sm:text-lg mb-2 md:text-xl text-secondary max-w-md">
            {subtitle}
          </p>
        </div>
        <div className="w-full lg:w-1/2 relative h-[600px]">
          <div className="absolute top-0 left-[10%] w-1/2 h-1/3 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={images[0]}
              alt="Hero 1"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="absolute top-[15%] right-[15%] w-1/2 h-1/3 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={images[1]}
              alt="Hero 2"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="absolute top-[35%] left-[5%] w-1/2 h-1/3 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={images[2]}
              alt="Hero 3"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="absolute bottom-[15%] right-[2%] w-1/2 h-1/3 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={images[3]}
              alt="Hero 4"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="absolute bottom-0 left-[15%] w-1/2 h-1/3 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={images[4]}
              alt="Hero 5"
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
