import Table from "./components/Table";
import { GetWeatherCurrent, GetWeatherForecast } from "../server/Get";
import WeatherSchema from "../models/Weather";
import Image from "next/image";

export default async function Home() {
  const weather: WeatherSchema = await GetWeatherCurrent("aden");
  await GetWeatherForecast()
  return (
    <section className="flex flex-col mt-5">
      <div>
        <h1 className="text-[1.5em]">welcome to our weather page</h1>
      </div>
      <div className="grid grid-cols-2 w-full bg-blue-500 rounded-xl">
        <div>
          <Image
            src={`http:${weather.conditionicon!}`}
            alt="status"
            width={100}
            height={100}
          />
        </div>
        <div>
          <h1>{weather.name}</h1>
        </div>
      </div>
      <div className="mt-8 w-full">
        {/* <Table Heads={['name', 'region', 'country','localtime',
          'lastUpdated','condition_text','condition_icon',
          'wend_mph','cloud','humidity','heatindex_c','heatindex_f',
          'feelslike_c','feelslike_f']} Data={weather}/> */}
      </div>
    </section>
  );
}
