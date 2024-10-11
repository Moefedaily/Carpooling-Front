import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import DriverDashboard from "@/app/components/ui/DriverDashboard";
import Hero from "@/app/components/layout/Hero";

const DriverDashboardPage: React.FC = () => {
  return (
    <>
      <Header />
      <Hero title="Driver Dashboard" image="/hero-image.jpg" />
      <DriverDashboard />
      <Footer />
    </>
  );
};

export default DriverDashboardPage;
