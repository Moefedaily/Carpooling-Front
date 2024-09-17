import React from "react";

const BenefitsSection = () => {
  const benefits = [
    {
      number: "01",
      title: "Flexible working hours",
      description: "You can decid when and how much time you want to drive.",
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
        "Tere is a local service provider, and we are proud to support you in your local language. We are proud to be at your service 24/7",
      imageSrc: "/chat-BenefitsSection.png",
    },
  ];

  return (
    <div className=" bg-white p-6">
      <h2 className="text-3xl font-bold my-12 text-center text-secondary font-montserrat">
        <span className=" text-primary"> WEEGOO </span> BENEFITS
      </h2>
      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <div key={benefit.number} className="flex items-center">
            <div
              className={`w-1/2 flex justify-center ${
                index % 2 === 0 ? "order-1" : "order-2"
              }`}
            >
              <div className="max-w-sm text-center">
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
            <div
              className={`w-1/2 flex items-center justify-center ${
                index % 2 === 0 ? "order-2" : "order-1"
              }`}
            >
              <img
                src={benefit.imageSrc}
                alt={`${benefit.title} illustration`}
                className="w-6/12 h-3/5 object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
