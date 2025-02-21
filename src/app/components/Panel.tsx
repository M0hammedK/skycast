// app/components/Panel.tsx
"use client";
import Image from "next/image";
import { useCity } from "../CityContext";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import WeatherSchema from "@/src/models/Weather";
import axios from "axios";
import WeatherUtils from "@/src/utils/Weather";
import { CloudIcon } from "./CloudIcon";
import { WindIcon } from "./WindIcon";
import { HumidityIcon } from "./HumidityIcon";
import { ThermometerIcon } from "./ThermometerIcon";
import { SearchIcon } from "./SearchIcon";

export default function Panel() {
  const { city, setCity } = useCity();
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherSchema | null>(null);
  const [debouncedSearch] = useDebounce(city, 1000);

  useEffect(() => {
    setError(null);
    const fetchWeather = async () => {
      if (!debouncedSearch) return;
      try {
        await axios(`/api/weather?city=${encodeURIComponent(city)}`)
          .then((res) => {
            if (!res.data) {
              setError("there's no city called " + city);
            }
            const data: WeatherSchema = WeatherUtils.WeatherToModel(res);
            setWeather(data);
            setError(null);
          })
          .catch((err) => {
            throw err;
          });
      } catch (error) {
        setError("there's no city called " + city);
      }
    };

    fetchWeather();
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
      <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-xl p-4">
        <div className="flex items-center space-x-2">
          <SearchIcon className="w-6 h-6 text-white" />
          <input
            placeholder="Search city..."
            className="flex-1 bg-transparent text-white placeholder-gray-200 font-semibold focus:outline-none"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>

      {error ? (
        <div className="p-6 bg-red-50 text-red-700 rounded-b-xl">
          ⚠️ {error}
        </div>
      ) : weather ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="flex flex-col items-center">
            <Image
              src={`http:${weather.day?.conditionicon}`}
              alt={weather.day?.conditionText || "Weather condition"}
              width={120}
              height={120}
              className="drop-shadow"
            />
            <p className="text-4xl font-bold mt-2">
              {weather.day?.tempC}°C
            </p>
            <p className="text-gray-600">{weather.day?.conditionText}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <WeatherDetail
              icon={<ThermometerIcon />}
              label="Feels like"
              value={`${weather.day?.feelsLikeC}°C`}
            />
            <WeatherDetail
              icon={<HumidityIcon />}
              label="Humidity"
              value={`${weather.day?.humidity}%`}
            />
            <WeatherDetail
              icon={<WindIcon />}
              label="Wind"
              value={`${weather.day?.wendMPH} mph`}
            />
            <WeatherDetail
              icon={<CloudIcon />}
              label="Cloud"
              value={`${weather.day?.cloud}%`}
            />
          </div>
        </div>
      ) : (
        <div className="p-6 bg-yellow-50 text-yellow-700 rounded-b-xl">
          🔍 Searching for weather data...
        </div>
      )}
    </div>
  );
}

function WeatherDetail({ icon, label, value }: { 
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}