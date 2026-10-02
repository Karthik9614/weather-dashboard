import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const city = searchParams.get("city");
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");

  if (!city && (!lat || !lon)) {
    return NextResponse.json(
      { error: "City or coordinates are required" },
      { status: 400 },
    );
  }

  try {
    let latitude: number;
    let longitude: number;
    let location;

    // --------------------------------
    // 1. City search
    // --------------------------------
    if (city) {
      const geocodingUrl = new URL(
        "https://geocoding-api.open-meteo.com/v1/search",
      );

      geocodingUrl.searchParams.set("name", city);
      geocodingUrl.searchParams.set("count", "1");
      geocodingUrl.searchParams.set("language", "en");
      geocodingUrl.searchParams.set("format", "json");

      const geocodingResponse = await fetch(geocodingUrl);

      if (!geocodingResponse.ok) {
        throw new Error("Failed to find city");
      }

      const geocodingData = await geocodingResponse.json();

      if (!geocodingData.results?.length) {
        return NextResponse.json(
          { error: "City not found" },
          { status: 404 },
        );
      }

      location = geocodingData.results[0];

      latitude = location.latitude;
      longitude = location.longitude;
    } else {
      // --------------------------------
      // 2. Coordinates / current location
      // --------------------------------
      latitude = Number(lat);
      longitude = Number(lon);

      if (
        Number.isNaN(latitude) ||
        Number.isNaN(longitude)
      ) {
        return NextResponse.json(
          { error: "Invalid coordinates" },
          { status: 400 },
        );
      }

      location = {
        name: "Current location",
        country: "",
        latitude,
        longitude,
      };
    }

    // --------------------------------
    // 3. Fetch weather
    // --------------------------------
    const weatherUrl = new URL(
      "https://api.open-meteo.com/v1/forecast",
    );

    weatherUrl.searchParams.set("latitude", String(latitude));
    weatherUrl.searchParams.set("longitude", String(longitude));

    weatherUrl.searchParams.set(
      "current",
      "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,is_day",
    );

    weatherUrl.searchParams.set(
      "hourly",
      "temperature_2m,weather_code",
    );

    weatherUrl.searchParams.set(
      "daily",
      "weather_code,temperature_2m_max,temperature_2m_min",
    );

    weatherUrl.searchParams.set("timezone", "auto");
    weatherUrl.searchParams.set("forecast_days", "7");

    const weatherResponse = await fetch(weatherUrl);

    if (!weatherResponse.ok) {
      throw new Error("Failed to fetch weather");
    }

    const weatherData = await weatherResponse.json();

    return NextResponse.json({
      location,
      weather: weatherData,
    });
  } catch (error) {
    console.error("Weather API error:", error);

    return NextResponse.json(
      { error: "Unable to fetch weather data" },
      { status: 500 },
    );
  }
}