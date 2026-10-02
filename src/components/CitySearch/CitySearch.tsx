"use client";
import { useState } from "react";
import type { FormEvent } from "react";
import styles from "./CitySearch.module.css";

type CitySearchProps = {
  onSearch: (city: string) => void;
  onLocationRequest: () => void;
};

export default function CitySearch({
  onSearch,
  onLocationRequest,
}: CitySearchProps) {
  const [city, setCity] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedCity = city.trim();

    if (!trimmedCity) return;

    onSearch(trimmedCity);
    setCity("");
  };

  return (
    <div className={styles.searchContainer}>
      <form className={styles.searchForm} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for a city"
        />

        <button className={styles.button} type="submit">
          Search
        </button>
      </form>

      <button
        className={styles.locationButton}
        type="button"
        onClick={onLocationRequest}
      >
        📍 Use my location
      </button>
    </div>
  );
}
