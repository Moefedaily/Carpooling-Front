import Image from "next/image";
import { IoIosCheckmarkCircle } from "react-icons/io";

const HowItWorksSection = () => {
  return (
    <div className="bg-gray-100 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary font-montserrat mb-12">
          HOW WEEGOO WORKS
        </h2>
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-gray-300 rounded-full w-64 h-64 flex items-center justify-center">
              <Image
                src="/car-image.jpg"
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
                    }   border-2 border-primary font-roboto rounded-full w-8 h-8 flex items-center justify-center`}
                  >
                    <span className="text-button-end font-bold">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-primary font-roboto mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600">{step.description}</p>
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
