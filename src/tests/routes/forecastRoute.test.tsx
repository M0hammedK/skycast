/**
 * @jest-environment node
 */
import { GET } from "../../app/api/weather/route";
import { GetWeatherForecast } from "../../server/Get";

jest.mock("../../server/Get", () => ({
  GetWeatherForecast: jest.fn(),
}));

jest.mock("next/server", () => ({
  NextResponse: {
    json: (data: any) => new Response(JSON.stringify(data), { status: 200 }),
    error: () => new Response(null, { status: 500 }),
  },
}));

const mockGetWeatherForecast = GetWeatherForecast as jest.MockedFunction<
  typeof GetWeatherForecast
>;

describe("GET /api/weather", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const createMockRequest = (city?: string) => {
    const url = new URL("http://localhost:3001/api/forecast");
    if (city) {
      url.searchParams.set("city", city);
    }
    return new Request(url.toString());
  };

  it("should return weather forecast for the specified city", async () => {
    const mockWeatherData = { temp: 25, condition: "Sunny" };
    mockGetWeatherForecast.mockResolvedValue(mockWeatherData);

    const request = createMockRequest("London");
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockWeatherData);
    expect(mockGetWeatherForecast).toHaveBeenCalledWith("London");
  });

  it("should use default city when no parameter is provided", async () => {
    const mockWeatherData = { temp: 30, condition: "Clear" };
    mockGetWeatherForecast.mockResolvedValue(mockWeatherData);

    const request = createMockRequest();
    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(mockWeatherData);
    expect(mockGetWeatherForecast).toHaveBeenCalledWith("al mukalla");
  });

  it("should return 500 status when there's an error", async () => {
    mockGetWeatherForecast.mockRejectedValue(new Error("API Error"));

    const request = createMockRequest("London");
    const response = await GET(request);

    expect(response.status).toBe(500);
  });
});