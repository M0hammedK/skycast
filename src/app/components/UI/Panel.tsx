// app/components/Panel.tsx
"use client";
import Image from "next/image";
import { useCity } from "../GlobalStates/CityContext";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import WeatherSchema from "@/src/models/Weather";
import axios from "axios";
import WeatherUtils from "@/src/utils/Weather";
import { CloudIcon } from "../Icons/CloudIcon";
import { WindIcon } from "../Icons/WindIcon";
import { HumidityIcon } from "../Icons/HumidityIcon";
import { ThermometerIcon } from "../Icons/ThermometerIcon";
import { SearchIcon } from "../Icons/SearchIcon";
import { stringify } from "querystring";

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
              setError("لاتوجد مدينة بأسم " + city);
            }
            const data: WeatherSchema = WeatherUtils.WeatherToModel(res);
            setWeather(data);
            setError(null);
          })
          .catch((err) => {
            throw err;
          });
      } catch (error) {
        setError("لاتوجد مدينة بأسم " + city);
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
            <h1>{weather.localtime?.split(" ")[1]}</h1>
            <Image
              src={`http:${weather.state?.conditionIcon}`}
              alt={weather.state?.conditionText || "Weather condition"}
              width={120}
              height={120}
              className="drop-shadow"
            />
            <h1 className="text-4xl font-bold mt-2">
              {weather.state?.tempC}°C
            </h1>
            <h3 className="text-gray-600">{weather.state?.conditionText}</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <h1 className="col-span-2 text-center">
              {weather.name}, {weather.country}
            </h1>
            <WeatherDetail
              icon={<ThermometerIcon />}
              label="كأنه"
              value={`${weather.state?.feelsLikeC}°C`}
            />
            <WeatherDetail
              icon={<HumidityIcon />}
              label="الرطوبة"
              value={`${weather.state?.humidity}%`}
            />
            <WeatherDetail
              icon={<WindIcon />}
              label="الرياح"
              value={`${weather.state?.windMPH} ميل\\ساعة`}
            />
            <WeatherDetail
              icon={<CloudIcon />}
              label="السحب"
              value={`${weather.state?.cloud}%`}
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

function WeatherDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="font-bold text-lg">
          &nbsp; {value.split(" ")[0] !== "undefined" ? value : "لايوجد"}
        </p>
      </div>
    </div>
  );
}
