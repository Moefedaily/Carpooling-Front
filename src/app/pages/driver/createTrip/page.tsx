import React from "react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import CreateTripForm from "@/app/components/ui/createTripForm";
import Hero from "@/app/components/layout/Hero";

const CreateTripPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero title="Create Trip" image="/hero-image.jpg" />
      <div className="text-3xl font-bold pt-12 text-center font-montserrat text-secondary ">
        <h1>Create a New Trip</h1>
      </div>
      <div className="container mx-auto py-12">
        <div className="max-w-3xl mx-auto bg-white p-16 rounded-lg shadow-lg">
          <CreateTripForm />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CreateTripPage;
