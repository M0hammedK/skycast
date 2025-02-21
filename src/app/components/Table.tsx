"use client";

import { lazy, useEffect, useState } from "react";
import axios from "axios";
// import useEmblaCarousel from "embla-carousel-react";
import { useDebounce } from "use-debounce";
import { Swiper, SwiperSlide } from "swiper/react";
import { useCity } from "../CityContext";
import ForecastSchema from "@/src/models/Forecast";
import ForecastHourSchema from "@/src/models/ForecastHour";
import WeatherUtils from "@/src/utils/Weather";
import { FreeMode, Keyboard, Mousewheel, Navigation } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";

interface Props {
  Heads: string[];
}

export default function Table({ Heads }: Props) {
  const { city } = useCity(); // no need for setCity if not used
  const [error, setError] = useState<string | null>(null);
  const [forecast, setForecast] = useState<ForecastSchema | null>(null);
  // Debounce city to avoid multiple rapid requests
  const [debouncedCity] = useDebounce(city, 1000);

  // Embla Carousel
  // const [emblaRef, emblaApi] = useEmblaCarousel({
  //   loop: true,
  //   align: "start",
  //   startIndex: 0,
  //   skipSnaps: false,
  // });

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

  // Render Embla Carousel if forecast data is available
  const renderCarousel = () => {
    if (!forecast?.hour?.length) {
      // Loading state
      return (
        <div className="w-full bg-yellow-200 rounded-b-xl p-5">
          <h1 className="w-full text-center">Loading Forecast Data...</h1>
        </div>
      );
    }

    return (
      <div>
        <section className="flex flex-col section light-background">
          <div className="container">
            <Swiper
              slidesPerView={1}
              loop={false}
              centeredSlides={true}
              initialSlide={0}
              breakpoints={{
                420: { slidesPerView: 1 },
                850: { slidesPerView: 1.5 },
                1200: { slidesPerView: 2 },
                1450: { slidesPerView: 3 },
              }}
              modules={[Mousewheel, Keyboard, FreeMode, Navigation]}
              mousewheel={true}
              navigation={true}
              freeMode={true}
              keyboard={true}
              className="shadow-xl bg-blue-50"
            >
              {forecast.hour.map((data: ForecastHourSchema) => (
                <SwiperSlide
                  key={data.day?.lastUpdated}
                  className="justify-items-center p-4"
                >
                  <div className="bg shadow-lg p-2 backdrop-blur-lg rounded-lg">
                    <div className="flex flex-col">
                      <Image
                        src={`http://${data.day?.conditionicon!}`}
                        alt="dojo"
                        width={100}
                        height={100}
                        className="justify-self-end"
                      ></Image>
                      <h4>{data.day?.lastUpdated?.split(" ")[1]}</h4>
                    </div>
                    <div className="flex flex-col">
                      <h1>{data.day?.conditionText}</h1>
                      <h3>درجة الحرارة ℃{data.day?.tempC}</h3>
                      <h3>تشعر كأنها ℃{data.day?.feelsLikeC}</h3>
                      <h3>السحاب {data.day?.cloud}</h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="w-full">
      {error ? (
        <div className="w-full bg-red-500 text-white rounded-b-xl p-5">
          <h1>{error}</h1>
        </div>
      ) : (
        renderCarousel()
      )}
    </div>
  );
}
