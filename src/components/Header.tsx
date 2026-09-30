export default function Header() {
  return (
    <header className="header">
      <div className="brand">
        <h2>Weatherly</h2>
        <p>Weather at a glance</p>
      </div>

      <button className="theme-button" type="button">
        Theme
      </button>
    </header>
  );
}