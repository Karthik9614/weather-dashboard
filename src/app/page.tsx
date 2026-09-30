import CurrentWeather from "@/components/CurrentWeather";
import Header from "@/components/Header";

export default function Home() {
  const weather = {
    city: "Coimbatore",
    country: "India",
    temperature: 29,
    condition: "Sunny",
    feelsLike: 31,
    humidity: 68,
    windSpeed: 12,
  };

  return (
    <main className="dashboard">
      <Header />

      <section className="hero">
        <p className="eyebrow">WEATHER DASHBOARD</p>

        <h1>Know your weather.</h1>

        <p className="subtitle">
          Plan your day with accurate weather information at a glance.
        </p>
      </section>

      <CurrentWeather weather={weather} />
    </main>
  );
}
