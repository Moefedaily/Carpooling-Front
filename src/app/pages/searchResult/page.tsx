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
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
