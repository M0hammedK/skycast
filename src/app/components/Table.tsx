// app/components/Table.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCity } from "../CityContext";
import ForecastSchema from "@/src/models/Forecast";
import WeatherUtils from "@/src/utils/Weather";
import { Mousewheel, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { WindIcon } from "./WindIcon";

export default function Table() {
  const { city } = useCity(); // no need for setCity if not used
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<ForecastSchema | null>(null);
  const [debouncedCity] = useDebounce(city, 1000);

  useEffect(() => {
    if (!debouncedCity) {
      setForecast(null);
      setError(null);
      return;
    }

    const fetchForecast = async () => {
      try {
        const res = await axios.get(
          `/api/forecast?city=${encodeURIComponent(debouncedCity)}`
        );
        if (!res.data) {
          setError(`No city found called "${debouncedCity}".`);
          setForecast(null);
          return;
        }
        const data: ForecastSchema = WeatherUtils.ForecastToModel(res);
        setForecast(data);
        setError(null);
      } catch (err) {
        setError(`No city found called "${debouncedCity}".`);
        setForecast(null);
      }
    };
    fetchForecast();
  }, [debouncedCity]);

  return (
    <div className="bg-gray-100 w-full max-w-4xl mx-auto mt-8">
      {error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">⚠️ {error}</div>
      ) : (
        <Swiper
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          modules={[Navigation, Mousewheel]}
          navigation
          mousewheel
        >
          {forecast?.hour?.map((hour) => (
            <SwiperSlide key={hour.day?.lastUpdated}>
              <div className="flex flex-col items-center p-4 border-r border-gray-100">
                <p className="font-medium text-sm">
                  {new Date(hour.day?.lastUpdated || "").toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
                <Image
                  src={`http:${hour.day?.conditionicon}`}
                  alt={hour.day?.conditionText || ""}
                  width={64}
                  height={64}
                />
                <p className="text-lg font-semibold">{hour.day?.tempC}°C</p>
                <div className="flex items-center space-x-1 mt-1">
                  <WindIcon className="w-4 h-4 text-gray-500" />
                  <span className="text-sm">{hour.day?.wendMPH} mph</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
