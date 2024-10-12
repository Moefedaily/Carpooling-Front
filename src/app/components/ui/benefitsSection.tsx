import React from "react";

const BenefitsSection = () => {
  const benefits = [
    {
      number: "01",
      title: "Flexible working hours",
      description: "You can decide when and how much time you want to drive.",
      imageSrc: "/time-BenefitsSection.png",
    },
    {
      number: "02",
      title: "Earnings",
      description: "By driving with here you can earn more.",
      imageSrc: "/money-BenefitsSection.png",
    },
    {
      number: "03",
      title: "Customer support 24/7",
      description:
        "There is a local service provider, and we are proud to support you in your local language. We are proud to be at your service 24/7",
      imageSrc: "/chat-BenefitsSection.png",
    },
  ];

  return (
    <div className="bg-white p-6">
      <h2 className="text-3xl font-bold my-12 text-center text-secondary font-montserrat">
        <span className="text-primary">WEEGOO</span> BENEFITS
      </h2>
      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <div
            key={benefit.number}
            className={`flex flex-col md:flex-row items-center ${
              index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            }`}
          >
            <div className="flex justify-center mb-4 md:mb-0 w-full md:w-1/2">
              <img
                src={benefit.imageSrc}
                alt={`${benefit.title} illustration`}
                className="w-8/12 h-auto object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col items-center md:items-start">
              <div className="max-w-sm text-center md:text-left">
                <div className="flex flex-col items-center mb-2">
                  <span className="text-4xl font-bold text-primary font-roboto mb-2">
                    {benefit.number}.
                  </span>
                  <h3 className="text-xl font-semibold text-secondary font-montserrat">
                    {benefit.title}
                  </h3>
                </div>
                <p className="text-secondary font-light font-roboto mt-2">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
