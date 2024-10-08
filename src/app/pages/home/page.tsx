import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import HomeHero from "@/app/components/layout/homeHero";
import BenefitsSection from "@/app/components/ui/benefitsSection";
import HowItWorksSection from "@/app/components/ui/hoWorksSection";
import PopularTripsSection from "@/app/components/ui/popularSection";
import SaveMoneySection from "@/app/components/ui/saveSection";
import SearchForm from "@/app/components/ui/searchForm";

const HomePage: React.FC = () => {
  const heroImages = [
    "/hero5.png",
    "/hero2.png",
    "/hero1.png",
    "/hero4.png",
    "/hero3.png",
  ];

  return (
    <div className="bg-bg font-roboto">
      <Header />
      <HomeHero
        titleLine1="Share the ride,"
        titleLine2="Share the savings"
        subtitle="WeeGoo connects you with drivers and riders going your way. Save money, reduce traffic, and make new friends."
        images={heroImages}
      />
      <SearchForm />
      <SaveMoneySection />
      <HowItWorksSection />
      <PopularTripsSection />
      <BenefitsSection />
      <Footer />
    </div>
  );
};
export default HomePage;
