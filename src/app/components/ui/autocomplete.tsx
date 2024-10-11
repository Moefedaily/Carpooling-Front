"use client";
import { TripService } from "@/app/services/trip";
import { useState } from "react";

interface LocationSuggestion {
  label: string;
  postcode: string;
  citycode: string;
}

interface AutocompleteProps {
  name: string;
  placeholder: string;
  onSelect: (name: string, value: string, label: string) => void;
  register: any;
}

const Autocomplete = ({
  register,
  name,
  placeholder,
  onSelect,
}: AutocompleteProps) => {
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 2) {
      const fetchedSuggestions = await TripService.getLocationSuggestions(
        value
      );
      setSuggestions(fetchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="relative flex-1">
      <input
        {...register(name)}
        placeholder={placeholder}
        onChange={handleInputChange}
        className="w-full p-2 rounded text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-primary placeholder-primary"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded mt-1 ">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                onSelect(
                  name,
                  suggestion.label,
                  `${suggestion.label} (${suggestion.postcode})`
                );
                setSuggestions([]);
              }}
              className="p-2 hover:bg-gray-100 cursor-pointer font-roboto text-primary"
            >
              {`${suggestion.label} (${suggestion.postcode})`}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Autocomplete;
