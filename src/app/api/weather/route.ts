import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get("city");

  if (!city) {
    return NextResponse.json(
      { error: "City is required" },
      { status: 400 }
    );
  }

  try {
    const geocodingUrl = new URL(
      "https://geocoding-api.open-meteo.com/v1/search"
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
        { status: 404 }
      );
    }

    const location = geocodingData.results[0];

    const weatherUrl = new URL(
      "https://api.open-meteo.com/v1/forecast"
    );

    weatherUrl.searchParams.set("latitude", location.latitude);
    weatherUrl.searchParams.set("longitude", location.longitude);
    weatherUrl.searchParams.set(
      "current",
      "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code"
    );
    weatherUrl.searchParams.set(
      "hourly",
      "temperature_2m,weather_code"
    );
    weatherUrl.searchParams.set(
      "daily",
      "weather_code,temperature_2m_max,temperature_2m_min"
    );
    weatherUrl.searchParams.set("timezone", "auto");
    weatherUrl.searchParams.set("forecast_days", "5");

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
      { status: 500 }
    );
  }
}