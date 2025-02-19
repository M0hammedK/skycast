"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import useEmblaCarousel from "embla-carousel-react";
import { useDebounce } from "use-debounce";

import { useCity } from "../CityContext";
import ForecastSchema from "@/src/models/Forecast";
import ForecastHourSchema from "@/src/models/ForecastHour";
import WeatherUtils from "@/src/utils/Weather";

interface Props {
  Heads: string[];
}

export default function Table({ Heads }: Props) {
  const { city } = useCity();             // no need for setCity if not used
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<ForecastSchema | null>(null);
  // Debounce city to avoid multiple rapid requests
  const [debouncedCity] = useDebounce(city, 1000);

  // Embla Carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    startIndex: 0,
    skipSnaps: false,
  });

  useEffect(() => {
    // If city is empty, reset forecast and error
    if (!debouncedCity) {
      setForecast(null);
      setError(null);
      return;
    }

    // Fetch forecast data
    const fetchForecast = async () => {
      try {
        const res = await axios.get(`/api/forecast?city=${encodeURIComponent(debouncedCity)}`);
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

  // Render Embla Carousel if forecast data is available
  const renderCarousel = () => {
    if (!forecast?.hour?.length) {
      // Loading state
      return (
        <div className="w-full bg-blue-500 rounded-b-xl p-5">
          <h1>Loading Forecast Data...</h1>
        </div>
      );
    }

    return (
      <section className="h-[300px]">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {forecast.hour.map((data: ForecastHourSchema) => (
              <div key={data.day?.lastUpdated} className="embla__slide">
                <h1>{data.day?.lastUpdated}</h1>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div>
      {error ? (
        <div className="w-full bg-red-500 text-white rounded-xl p-5">
          <h1>{error}</h1>
        </div>
      ) : (
        renderCarousel()
      )}
    </div>
  );
}
