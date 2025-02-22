import Table from "./components/UI/Table";
import Panel from "./components/UI/Panel";
import { GetWeatherForecast } from "../server/Get";
import ForecastSchema from "../models/Forecast";

export default async function Home() {
  return (
    <section className="flex flex-col">
      <div className="mb-10">
        <h1>مرحبا بكم في سكاي كاست للنشرات الجوية</h1>
      </div>
      <Panel />
      <div className="flex flex-col mt-8 w-full bg-white shadow-xl rounded-b-xl">
        <h1 className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-xl p-4 text-center text-white">
          النشرة اليومية
        </h1>
        <Table days="1"/>
      </div>
      <div className="flex flex-col mt-8 w-full bg-white shadow-xl rounded-b-xl">
        <h1 className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-t-xl p-4 text-center text-white">
          النشرة الأسبوعية
        </h1>
        <Table days="7"/>
      </div>
    </section>
  );
}
