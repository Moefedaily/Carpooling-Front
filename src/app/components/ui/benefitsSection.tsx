import React from "react";

const BenefitsSection = () => {
  const benefits = [
    {
      id: "01",
      title: "Flexible working hours",
      description: "You can decide when and how much time you want to drive.",
      imageSrc: "/time-BenefitsSection.png",
    },
    {
      id: "02",
      title: "Earnings",
      description: "By driving with here you can earn more.",
      imageSrc: "/api/placeholder/400/300?text=Earnings",
    },
    {
      id: "03",
      title: "Customer support 24/7",
      description:
        "Tere is a local service provider, and we are proud to support you in your local language. We are proud to be at your service 24/7",
      imageSrc: "/api/placeholder/400/300?text=Customer+Support",
    },
  ];

  return (
    <div className="benefits-section bg-white p-6">
      <h2 className="text-2xl font-bold mb-12 text-center text-primary font-roboto">
        WEEGOO BENEFITS
      </h2>
      <div className="space-y-16">
        {benefits.map((benefit, index) => (
          <div key={benefit.id} className="flex items-center">
            <div
              className={`w-1/2 flex justify-center ${
                index % 2 === 0 ? "order-1" : "order-2"
              }`}
            >
              <div className="max-w-sm text-center">
                <div className="flex flex-col items-center mb-2">
                  <span className="text-4xl font-bold text-primary font-roboto mb-2">
                    {benefit.id}.
                  </span>
                  <h3 className="text-xl font-semibold">{benefit.title}</h3>
                </div>
                <p className="text-gray-700 mt-2">{benefit.description}</p>
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
                className="w-60 h-56 object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;
