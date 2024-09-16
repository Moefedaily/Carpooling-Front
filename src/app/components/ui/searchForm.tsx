"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SearchData } from "@/Utils/types/trip";

const SearchForm = () => {
  const { register, handleSubmit } = useForm<SearchData>();
  const { push } = useRouter();

  const onSubmit = (data: {
    departureLocation: string;
    arrivalLocation: string;
    departureDate: string;
    numberOfPassengers: string;
  }) => {
    push(`/pages/searchResult?${new URLSearchParams(data).toString()}`);
  };

  return (
    <div className=" container mx-auto py-12 ">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Find your next ride
        </h2>
        <div className=" p-6 rounded  bg-teratery bg-opacity-15 shadow-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap gap-4"
          >
            <input
              {...register("departureLocation")}
              placeholder="Departure"
              className="flex-1 p-2 rounded text-sm font-medium text-button-start"
            />
            <input
              {...register("arrivalLocation")}
              placeholder="Destination"
              className="flex-1 p-2 rounded text-sm font-medium text-button-start"
            />
            <input
              {...register("departureDate")}
              type="date"
              className="flex-1 p-2 rounded text-sm font-medium text-button-start"
            />
            <select
              {...register("numberOfPassengers")}
              className="flex-1 p-2 rounded text-sm font-medium text-button-start"
            >
              <option value="">Passengers</option>
              <option value="1">1 adult</option>
              <option value="2">2 adults</option>
              <option value="3">3 adults</option>
              <option value="4">4 adults</option>
              <option value="5">5 adults</option>
            </select>
            <button
              type="submit"
              className=" px-5 py-2 font-bold text-bg bg-primary rounded-md hover:bg-button-end focus:outline-none focus:ring-2 focus:ring-button-start"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchForm;
