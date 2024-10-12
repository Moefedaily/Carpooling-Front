"use client";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import SearchResults from "@/app/components/ui/searchResults";

const SearchResultsPage: React.FC = () => {
  return (
    <div>
      <Header />
      <SearchResults />
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
