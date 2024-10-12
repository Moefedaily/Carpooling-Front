"use client";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import SearchResults from "@/app/components/ui/searchResults";
import { Suspense } from "react";

const SearchResultsPage: React.FC = () => {
  return (
    <div>
      <Header />
<<<<<<< HEAD
      <Hero title="Search Results" image="/hero-image.jpg" />
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults />
      </Suspense>
=======
      <SearchResults />
>>>>>>> ed8981dd863ade234fbfcb4e351cebc4fc49b0e8
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
