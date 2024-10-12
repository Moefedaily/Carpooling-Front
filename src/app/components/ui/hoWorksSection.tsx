import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";

const HowItWorksSection = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-secondary font-montserrat mb-12">
          HOW <span className="text-primary">WEEGOO</span> WORKS
        </h2>

        <div className="sm:flex sm:flex-col sm:items-center md:flex md:flex-col md:items-center lg:hidden">
          <div className="bg-gray-300 rounded-full mx-auto w-64 h-64 flex items-center justify-center mb-8">
            <Image
              src="/hoWorksSection.png"
              alt="Car image"
              width={200}
              height={200}
              className="rounded-full"
            />
          </div>
          <div className="space-y-12">
            {[
              {
                number: 1,
                title: "REQUEST A RIDE",
                description:
                  "Have to reach office or going for shopping? Just put your current location and destination and search a ride that suits you",
              },
              {
                number: 2,
                title: "POST A RIDE",
                description:
                  "Going somewhere but hate to travel alone? Just post your ride details and publish it",
              },
              {
                number: 3,
                title: "INSTANT NOTIFICATIONS",
                description:
                  "Get instant notifications for your rides and be in contact with fellow riders all the time",
              },
              {
                number: 4,
                title: "CASHLESS PAYMENT",
                description:
                  "Payment made easy by using your own Wallet - no more cash to carry",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-primary to-secondary font-roboto rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                  <span className="font-bold text-3xl text-teratery text-center font-roboto">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-secondary font-roboto my-2">
                  {step.title}
                </h3>
                <p className="text-base text-secondary font-roboto font-light">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gray-300 rounded-full w-64 h-64 flex items-center justify-center">
              <Image
                src="/hoWorksSection.png"
                alt="Car image"
                width={200}
                height={200}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-y-24 gap-x-10 max-w-5xl mx-auto">
            {[
              {
                number: 1,
                title: "REQUEST A RIDE",
                description:
                  "Have to reach office or going for shopping ? Just put your current location and destination and search a ride that suits you",
              },
              {
                number: 2,
                title: "POST A RIDE",
                description:
                  "Going somewhere but hate to travel alone ? Just post your ride details and publish it",
              },
              {
                number: 3,
                title: "INSTANT NOTIFICATIONS",
                description:
                  "Get instant notifications for your rides and be in contact with fellow riders all the time",
              },
              {
                number: 4,
                title: "CASHLESS PAYMENT",
                description:
                  "Payment made easy by using your own Wallet - no more cash to carry",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`flex items-start ${
                  index % 2 === 0
                    ? "justify-end text-right"
                    : "justify-start text-left"
                }`}
              >
                <div
                  className={`w-64 ${
                    index % 2 === 0 ? "mr-48" : "ml-48"
                  } relative pt-12`}
                >
                  <div
                    className={`absolute top-0 ${
                      index % 2 === 0 ? "right-0" : "left-0"
                    } bg-gradient-to-r from-primary to-secondary font-roboto rounded-full w-12 h-12 flex items-center justify-center mb-4`}
                  >
                    <span className="font-bold text-3xl text-teratery text-center font-roboto">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-secondary font-roboto my-2">
                    {step.title}
                  </h3>
                  <p className="text-base text-secondary font-roboto font-light">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
