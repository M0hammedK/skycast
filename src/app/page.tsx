import Table from "./components/Table";
import WeatherSchema from "../models/Weather";
import Panel from "./components/Panel";
import { GetWeatherForecast } from "../server/Get";

export default async function Home() {
  const res = await GetWeatherForecast()
  return (
    <section className="flex flex-col mt-5">
      <div>
        <h1 className="text-[1.5em]">welcome to our weather page</h1>
      </div>
      <Panel />
      <div className="mt-8 w-full">
        <Table Heads={['name', 'region', 'country','localtime',
          'lastUpdated','condition_text','condition_icon',
          'wend_mph','cloud','humidity','heatindex_c','heatindex_f',
          'feelslike_c','feelslike_f']} />
      </div>
    </section>
  );
}
