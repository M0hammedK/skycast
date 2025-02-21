/**
 * @jest-environment node
 */

import { GET } from "../../app/api/weather/route";  // Adjust path accordingly
import { GetWeatherForecast } from "../../server/Get"; // Adjust path accordingly

// Mock the GetWeatherForecast function
jest.mock("../../server/Get", () => ({
  GetWeatherForecast: jest.fn(),
}));

describe("Weather API Route", () => {
  it("should return weather data", async () => {
    // Mock weather data
    const mockWeatherData = { temperature: 25, city: "al mukalla" };

    // Mock the GetWeatherForecast to return mock data
    GetWeatherForecast.mockResolvedValue(mockWeatherData);

    // Create a mock request (could be simplified if necessary)
    const mockRequest = {
      url: "http://localhost:3001/api/weather?city=al mukalla",
      method: "GET",
      headers: new Headers(),
    };

    // Mock the json response
    const mockJson = jest.fn().mockResolvedValue(mockWeatherData);

    // Mock NextResponse object
    const mockNextResponse = {
      json: mockJson,
      error: jest.fn(),
    };

    // Simulate the GET API call
    const response = await GET(mockRequest);

    // Ensure that response.json() returns the expected data
    const responseData = await response.json();
    expect(responseData).toEqual(mockWeatherData);

    // Ensure mockJson was called (meaning the response was processed correctly)
    expect(mockJson).toHaveBeenCalledTimes(1);
  });

  it("should handle errors gracefully", async () => {
    // Mock an error response
    const mockError = new Error("Failed to fetch weather");
    GetWeatherForecast.mockRejectedValue(mockError);

    // Create a mock request
    const mockRequest = {
      url: "http://localhost:3001/api/weather?city=al mukalla",
      method: "GET",
      headers: new Headers(),
    };

    // Mock error handling: Create mock error response to track NextResponse.error()
    const mockErrorResponse = {
      json: jest.fn().mockResolvedValue({ message: "Error" }),
      error: jest.fn().mockResolvedValue({ message: "Error" }),
    };

    // Simulate the GET API call with error
    const response = await GET(mockRequest);

    // Ensure the error handler was triggered
    expect(mockErrorResponse.error).toHaveBeenCalledTimes(1);

    // Verify that the error response contains the expected message
    expect(await response.json()).toEqual({ message: "Error" });
  });
});
