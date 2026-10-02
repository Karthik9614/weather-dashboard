"use client";
import { useState } from "react";
import type { FormEvent } from "react";

type CitySearchProps = {
  onSearch: (city: string) => void;
};

export default function CitySearch({ onSearch }: CitySearchProps) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedCity = city.trim();

    if (!trimmedCity) return;

    onSearch(trimmedCity);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search for a city"
      />
      <button type="submit">Search</button>
    </form>
  );
}
