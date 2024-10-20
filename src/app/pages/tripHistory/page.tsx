"use client";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import Hero from "@/app/components/layout/Hero";
import SearchResults from "@/app/components/ui/searchResults";
import TripHistory from "@/app/components/ui/tripHistory";
import { Suspense } from "react";
import { Oval } from "react-loader-spinner";

const SearchResultsPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            <Oval
              height={40}
              width={40}
              color="#4E2B63"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
              ariaLabel="oval-loading"
              secondaryColor="#595959"
              strokeWidth={2}
              strokeWidthSecondary={2}
            />
          </div>
        }
      >
        <TripHistory />
      </Suspense>
      <Footer />
    </div>
  );
};

export default SearchResultsPage;
