'use client'
//This is a simple weather application that search's a city's weather. You enter in a city and it will show the weather card below with that city's weather details. 
// Simply playing around with tailwind in next, I will be testing shadcn-ui next
import React, { useState } from "react";
import CityWeatherComponent from "./components/cityWeather";

export default function Home() {
  const [city, setCity] = useState<string | null>(null);

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formdata = new FormData(event.currentTarget);
    setCity(formdata.get("city") as string);
  }

  return (
    <div className="py-2 h-screen bg-blue-100">
      <form
        className="flex items-center justify-center"
        onSubmit={formSubmit}
      >
        <label htmlFor="weatherSearchInput">Weather Search:</label>{" "}
        <input
          id="weatherSearchInput"
          placeholder="type a city to search"
          className="ml-2 border rounded-l-lg p-3"
          type="text"
          name="city"
        />
        <button
          className="text-md font-extrabold bg-sky-600 rounded-r-lg p-3 text-white border"
          type="submit"
        >
          Submit
        </button>
      </form>

      {city && (
        <div className="mt-4 w-full">
          <CityWeatherComponent city={city} />
        </div>
      )}
    </div>
  );
}


