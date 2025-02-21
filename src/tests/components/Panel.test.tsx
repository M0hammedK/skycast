import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Panel from "../../app/components/UI/Panel";
import CityProvider from "../../app/components/GlobalStates/CityContext";
import axios from "axios";
import "@testing-library/jest-dom";

// Mock axios to avoid actual API calls
jest.mock("axios");
// Instead of mocking axios.get, we now treat axios as a function.
const mockedAxios = axios as jest.MockedFunction<typeof axios>;

describe("Panel Component", () => {
  it("renders correctly", () => {
    render(
      <CityProvider>
        <Panel />
      </CityProvider>
    );

    // Check if the input field exists
    expect(screen.getByPlaceholderText("Search city...")).toBeInTheDocument();

    // Check if the default city "Al Mukalla" is in the input field
    expect(screen.getByDisplayValue("Al Mukalla")).toBeInTheDocument();
  });

  it("updates the city when typing", () => {
    render(
      <CityProvider>
        <Panel />
      </CityProvider>
    );

    const input = screen.getByPlaceholderText("Search city...");
    fireEvent.change(input, { target: { value: "London" } });
    expect(input).toHaveValue("London");
  });

  it("displays weather data when API call succeeds", async () => {
    const mockWeatherData = {
      data: {
        location: { name: "London", country: "UK", localtime: "2025-02-21 15:30" },
        current: {
          temp_c: 18,
          condition: { text: "Sunny", icon: "//cdn.weatherapi.com/sunny.png" },
          feelslike_c: 20,
          humidity: 60,
          wind_mph: 10,
          cloud: 30,
        },
      },
    };

    // Since Panel.tsx uses axios() shorthand, we mock axios directly:
    mockedAxios.mockResolvedValueOnce(mockWeatherData);

    render(
      <CityProvider>
        <Panel />
      </CityProvider>
    );

    const input = screen.getByPlaceholderText("Search city...");
    fireEvent.change(input, { target: { value: "London" } });

    await waitFor(() => {
      expect(screen.getByText("London, UK")).toBeInTheDocument();
      expect(screen.getByText("18°C")).toBeInTheDocument();
      expect(screen.getByText("Sunny")).toBeInTheDocument();
    }, { timeout: 10000 });
  });

  it("shows an error message when city is not found", async () => {
    mockedAxios.mockRejectedValueOnce(new Error("City not found"));

    render(
      <CityProvider>
        <Panel />
      </CityProvider>
    );

    const input = screen.getByPlaceholderText("Search city...");
    fireEvent.change(input, { target: { value: "InvalidCity" } });

    const errorMessage = await screen.findByText(/there's no city called/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
