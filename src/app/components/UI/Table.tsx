// app/components/Table.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCity } from "../GlobalStates/CityContext";
import ForecastSchema from "@/src/models/Forecast";
import WeatherUtils from "@/src/utils/Weather";
import { Mousewheel, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import { WindIcon } from "../Icons/WindIcon";

interface Props {
  days: string;
}

export default function Table({ days }: Props) {
  const { city } = useCity(); // no need for setCity if not used
  const [error, setError] = useState<string | null>(null);
  const [forecasts, setForecasts] = useState<ForecastSchema[] | null>(null);
  const [debouncedCity] = useDebounce(city, 1000);

  useEffect(() => {
    if (!debouncedCity) {
      setForecasts(null);
      setError(null);
      return;
    }

    const fetchForecast = async () => {
      try {
        const res = await axios.get(
          `/api/forecast?city=${encodeURIComponent(
            debouncedCity
          )}&days=${encodeURIComponent(days)}`
        );
        if (!res.data) {
          setError(`لا توجد مدينة بأسم  "${debouncedCity}".`);
          setForecasts(null);
          return;
        }
        let data: ForecastSchema[];
        if (days === "1") data = WeatherUtils.ForecastsToModel(res);
        else data = WeatherUtils.ForecastsToModel(res);
        setForecasts(data);
        setError(null);
      } catch (err) {
        setError(`لا توجد مدينة بأسم "${debouncedCity}".`);
        setForecasts(null);
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
          initialSlide={days === '1' ? Number(new Date().toTimeString().slice(0, 8).split(':')[0]) : 0}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          modules={[Navigation, Mousewheel]}
          navigation
          mousewheel
        >
          {forecasts?.map((forecast: ForecastSchema) => {
            if (days === "1") {
              return forecast?.hours?.map((hour) => (
                <SwiperSlide key={hour.hour?.lastUpdated} className={`${hour.hour?.lastUpdated?.split(' ')[1].split(':')[0] === new Date().toTimeString().slice(0, 8).split(':')[0] && "bg-blue-300"}`}>
                  <div className="flex flex-col items-center p-4 border-r border-gray-100">
                    <p className="font-medium text-sm">
                      {hour.hour?.lastUpdated?.split(' ')[1]}
                    </p>
                    <Image
                      src={`http:${hour.hour?.conditionIcon}`}
                      alt={hour.hour?.conditionText || ""}
                      width={64}
                      height={64}
                    />
                    <p className="text-lg font-semibold">
                      {hour.hour?.tempC}°C
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <WindIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {hour.hour?.windMPH ? hour.hour?.windMPH +"ميل \\ساعة" : "غير معلومة"} 
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              ));
            } else {
              return (
                <SwiperSlide key={forecast.dateEpoch} className={`${forecast.date === new Date().toLocaleDateString('en-CA') && "bg-blue-300"}`}>
                  <div className="flex flex-col items-center p-4 border-r border-gray-100">
                    <p className="font-medium text-sm">{forecast.date}</p>
                    <Image
                      src={`http:${forecast.day?.conditionIcon}`}
                      alt={forecast.day?.conditionText || ""}
                      width={64}
                      height={64}
                    />
                    <h3>{forecast.day?.conditionText}</h3>
                    <p className="text-lg font-semibold">
                    °C اقل درجة {forecast.day?.minTempC}
                    </p>
                    <p className="text-lg font-semibold">
                    °C أعلى درجة {forecast.day?.maxTempC}
                    </p>
                    <div className="flex items-center space-x-1 mt-1">
                      <WindIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm">
                        {forecast.day?.maxWind_MPH
                          ? forecast.day?.maxWind_MPH
                          : "لايوجد"}{" "}
                        ميل\ساعة
                      </span>
                    </div>
                  </div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      )}
    </div>
  );
}
