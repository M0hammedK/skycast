import Table from "./components/Table";
import Panel from "./components/Panel";
import { GetWeatherForecast } from "../server/Get";
import ForecastSchema from "../models/Forecast";

export default async function Home() {
  return (
    <section className="flex flex-col">
      <div>
        <h1>welcome to SkyCast page</h1>
      </div>
      <Panel />
      <div className="flex flex-col mt-8 w-full">
        <h2 className="text-2xl bg-gray-500 w-full text-center rounded-t-xl p-2">The Day's Forecast</h2>
        <Table Heads={['name', 'region', 'country','localtime',
          'lastUpdated','condition_text','condition_icon',
          'wend_mph','cloud','humidity','heatindex_c','heatindex_f',
          'feelslike_c','feelslike_f']}  />
      </div>
    </section>
  );
}
