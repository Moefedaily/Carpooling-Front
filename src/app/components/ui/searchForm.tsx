"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SearchData } from "@/Utils/types/trip";
import { FaLocationPin } from "react-icons/fa6";

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
    <div className=" bg-teratery mx-auto py-20 ">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-center text-secondary font-montserrat">
          Find your next ride
        </h2>
        <h3 className="font-light mb-6 text-center text-subTitle font-roboto">
          Please enter your route in the search bar below
        </h3>
        <div className=" p-6 rounded  bg-teratery bg-opacity-15 shadow-lg">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-wrap gap-4"
          >
            <input
              {...register("departureLocation")}
              placeholder="Departure"
              className="flex-1 p-2 rounded text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-primary placeholder-primary"
            />
            <input
              {...register("arrivalLocation")}
              placeholder="Destination"
              className="flex-1 p-2 rounded text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-primary placeholder-primary"
            />
            <input
              {...register("departureDate")}
              type="date"
              className="flex-1 p-2 rounded text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-primary placeholder-primary"
            />
            <select
              {...register("numberOfPassengers")}
              className="flex-1 p-2 rounded text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-primary placeholder-primary"
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
              className=" px-5 py-2 font-bold text-white bg-gradient-to-r from-primary to-secondary rounded-md hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-primary"
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
