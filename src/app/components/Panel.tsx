"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import WeatherSchema from "@/src/models/Weather";
import axios from "axios";
import WeatherUtils from "@/src/utils/Weather";
import { useDebounce } from "use-debounce";

export default function Panel() {
  const [search, setSearch] = useState("al mukalla");
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<WeatherSchema | null>(null);
  const [debouncedSearch] = useDebounce(search, 1000);

  useEffect(() => {
    setError(null);
    const fetchWeather = async () => {
      if (!search) return;

      if (!debouncedSearch) return;
      try {
        await axios(`/api/weather?city=${encodeURIComponent(search)}`)
          .then((res) => {
            if (!res.data) {
              setError("there's no city called " + search);
            }
            const data: WeatherSchema = WeatherUtils.WeatherToModel(res);
            setWeather(data);
            setError(null);
          })
          .catch((err) => {
            throw err;
          });
      } catch (error) {
        setError("there's no city called " + search);
      }
    };

    fetchWeather();
  }, [search, debouncedSearch]);
  return (
    <div className="flex flex-col w-full mt-12">
      <div className="bg-gray-500 w-full rounded-t-xl">
        <input
          placeholder="Enter your city..."
          className="bg-transparent text-black w-full p-2 font-bold text-xl text-center"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {error ? (
        <div className="w-full bg-blue-500 rounded-b-xl p-5">
          <h1>{error}</h1>
        </div>
      ) : weather ? (
        <div className="grid grid-cols-2 w-full bg-blue-500 rounded-b-xl contain-content">
          <div>
            <Image
              src={`http:${weather.conditionicon}`}
              alt="status"
              width={150}
              height={150}
            />
          </div>
          <div className="flex flex-col">
            <h1>{weather.name}</h1>
            <h3 className="mt-1">{weather.country}, {weather.region}</h3>
            <div className="w-[80%] flex justify-between mt-2 font-mono">
              <h3>{weather.conditionText} </h3>
              <h3>{weather.heatIndexC}℃</h3>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 w-full bg-blue-500 rounded-b-xl p-4">
          <h1>Loading Data...</h1>
        </div>
      )}
    </div>
  );
}
