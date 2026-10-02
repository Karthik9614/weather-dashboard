"use client";
import { useState } from "react";
import Header from "@/components/Header/Header";
import WeatherDashboard from "@/components/WeatherDashboard/WeatherDashboard";
import styles from "./WeatherPage.module.css";

export default function WeatherPage() {
  const [weatherTheme, setWeatherTheme] = useState("clear-day");

  return (
    <main className={`${styles.dashboard} ${styles[weatherTheme]}`}>
      <Header />

      <section className={styles.hero}>
        <p className={styles.eyebrow}>WEATHER DASHBOARD</p>

        <h1>Know your weather.</h1>

        <p className={styles.subtitle}>
          Plan your day with accurate weather information at a glance.
        </p>
      </section>

      <WeatherDashboard onThemeChange={setWeatherTheme} />
    </main>
  );
}