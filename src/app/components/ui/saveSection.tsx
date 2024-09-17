import Image from "next/image";

const SaveMoneySection = () => {
  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <Image
              src="/saveSection.jpg"
              alt="Happy travelers in a car"
              width={510}
              height={250}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-primary mb-4 font-montserrat">
              Save money on your fuel!
            </h2>
            <p className="text-secondary text-base font-light font-roboto mb-6">
              Join thousands of users who are already saving money and reducing
              their carbon footprint. Whether you're commuting to work or
              planning a weekend getaway, <br />
              <span className="text-primary font-bold text-md">
                {" "}
                WEEGOO{" "}
              </span>{" "}
              has got you covered.
            </p>
            <button className="px-4 py-2 font-bold text-bg bg-gradient-to-r from-primary to-secondary rounded-md hover:bg-teratery focus:outline-none focus:ring-2 focus:ring-primary">
              Post a Ride
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveMoneySection;
