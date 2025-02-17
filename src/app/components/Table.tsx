"use client";

import ForecastSchema from "@/src/models/Forecast";
import ForecastHourSchema from "@/src/models/ForecastHour";
import WeatherSchema from "@/src/models/Weather";
import WeatherDaySchema from "@/src/models/WeatherDay";
import WeatherUtils from "@/src/utils/Weather";
import axios from "axios";
import { useEffect, useState } from "react";

interface Props {
  Heads: string[];
}

export default function Table({ Heads }: Props) {
  const [city, setCity] = useState<string>("al mukalla");
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<ForecastSchema | null>(null);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        await axios(`/api/forecast?city=${encodeURIComponent(city)}`)
          .then((res) => {
            if (!res.data) {
              setError("there's no city called " + city);
            }
            const data: ForecastSchema = WeatherUtils.ForecastToModel(res);
            setForecast(data)
            setError(null);
          })
          .catch((err) => {
            throw err;
          });
      } catch (error) {
        setError("there's no city called " + city);
      }
    };
    fetchForecast();
  }, [city]);

  return (
    <div>
      {error ? (
        <div className="w-full bg-blue-500 rounded-xl p-5">
          <h1>{error}</h1>
        </div>
      ) : forecast ? (
        <table className="w-full border border-gray-300 text-left">
          <tbody>
            {forecast?.hour?.map((forecast: ForecastHourSchema) => (
              <tr key={0} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{forecast.day?.tempC}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="w-full bg-blue-500 rounded-b-xl p-5">
          <h1>Loading Forecast Data...</h1>
        </div>
      )}
    </div>
  );
}
