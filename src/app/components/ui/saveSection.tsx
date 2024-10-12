import Image from "next/image";

const SaveMoneySection = () => {
  return (
    <div className="bg-white py-10 sm:py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <Image
              src="/saveSection.jpg"
              alt="Happy travelers in a car"
              width={510}
              height={250}
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-4 font-montserrat">
              Save money on your fuel!
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-secondary font-light font-roboto mb-6">
              Join thousands of users who are already saving money and reducing
              their carbon footprint. Whether you're commuting to work or
              planning a weekend getaway, <br />
              <span className="text-primary font-bold text-md">WEEGOO</span> has
              got you covered.
            </p>
            <button className="px-4 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-md hover:bg-tertiary focus:outline-none focus:ring-2 focus:ring-primary">
              Post a Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveMoneySection;
