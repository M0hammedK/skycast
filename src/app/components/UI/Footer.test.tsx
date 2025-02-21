import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders a heading", () => {
    render(<Footer />);

    const year = new Date().getFullYear();
    const heading = screen.getByText(`© ${year} SkyCast. Created by Mohammed Alkaf & Hasan Al-Haddad`);
    

    expect(heading).toBeInTheDocument();
  });
});
