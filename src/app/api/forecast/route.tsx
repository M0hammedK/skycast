// app/api/weather/route.ts
import { GetWeatherCurrent, GetWeatherForecast } from "@/src/server/Get";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city") || "المكلا اليمن";
  const days = searchParams.get("days");
  try {
    const weather = await GetWeatherForecast(city, days!);
    return NextResponse.json(weather);
  } catch (error) {
    return NextResponse.error();
  }
}
