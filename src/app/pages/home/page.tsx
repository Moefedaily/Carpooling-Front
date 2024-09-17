import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import BenefitsSection from "@/app/components/ui/benefitsSection";
import HowItWorksSection from "@/app/components/ui/hoWorksSection";
import PopularTripsSection from "@/app/components/ui/popularSection";
import SaveMoneySection from "@/app/components/ui/saveSection";
import SearchForm from "@/app/components/ui/searchForm";

const HomePage: React.FC = () => {
  return (
    <div className="bg-bg font-roboto">
      <Header />
      <Hero title="Home Page" image="/hero-image.jpg" fullHeight />
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
