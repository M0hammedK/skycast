import { render, screen, act, waitFor } from '@testing-library/react';
import Home from './page';

describe("Home Page", () => {
  it("renders the welcome heading", async () => {
    await act(async () => {
      render(<Home />);
    });
    const heading = screen.getByText(/welcome to our weather page/i);
    expect(heading).toBeInTheDocument();
  });

  it("displays loading state for weather data", async () => {
    await act(async () => {
      render(<Home />);
    });
    const loadingWeather = screen.getByText(/loading weather data/i);
    expect(loadingWeather).toBeInTheDocument();
  });

  it("displays loading state for forecast data", async () => {
    await act(async () => {
      render(<Home />);
    });
    const loadingForecast = screen.getByText(/loading forecast data/i);
    expect(loadingForecast).toBeInTheDocument();
  });

  it("renders weather and forecast data when available", async () => {
    await act(async () => {
      render(<Home />);
    });

    // Mock weather and forecast data
    await waitFor(() => {
      expect(screen.getByText("al mukalla")).toBeInTheDocument();
    });

    // Check weather data
    expect(screen.getByText(/clear/i)).toBeInTheDocument();
  });
});
