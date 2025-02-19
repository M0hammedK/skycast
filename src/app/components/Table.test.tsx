import { render, screen, act } from "@testing-library/react";
import Table from "./Table"; // Import your Table component

describe("Table", () => {
  it("renders a table with Listed items", async () => {
    await act(async () => {
      render(<Table Heads={["Head1", "Head2", "Head3"]} />);
    });
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });
});
