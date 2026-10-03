import styles from "./Header.module.css";

type HeaderProps = {
  temperatureUnit: "celsius" | "fahrenheit";
  onTemperatureUnitChange: (
    unit: "celsius" | "fahrenheit",
  ) => void;
};

export default function Header({
  temperatureUnit,
  onTemperatureUnitChange,
}: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.brand}>
        <h2>Weatherly</h2>
        <p>Weather at a glance</p>
      </div>

      <button
        className={styles.themeButton}
        type="button"
        onClick={() =>
          onTemperatureUnitChange(
            temperatureUnit === "celsius"
              ? "fahrenheit"
              : "celsius",
          )
        }
      >
        {temperatureUnit === "celsius" ? "°C" : "°F"}
      </button>
    </header>
  );
}