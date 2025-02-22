describe("SkyCast Weather App", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // Adjust the URL if necessary
  });

  it("should display the homepage correctly", () => {
    cy.contains("Welcome to SkyCast page").should("exist");
    cy.contains("24-Hour Forecast").should("exist");
  });

  it("should allow users to search for a city", () => {
    cy.get("input[placeholder='Search city...']").clear().type("Al Mukalla");  
    cy.wait(3000); // Increased wait for debounce effect  

    cy.get("h1").then(($h1) => {
      const text = $h1.text();
      cy.log(`H1 text: ${text}`); // Log the H1 text for debugging
      expect(text).to.contain("Al Mukalla");
    });

    cy.wait(3000); // Increased wait for the API call to complete
    cy.get(".weather-display").should("exist");
  });

  it("should handle an invalid city search", () => {
    cy.get("input[placeholder='Search city...']").clear().type("InvalidCity");  
    cy.wait(3000); // Increased wait for debounce effect  

    cy.get("h1").then(($h1) => {
      const text = $h1.text();
      cy.log(`H1 text: ${text}`); // Log the H1 text for debugging
      expect(text).to.not.contain("InvalidCity");
    });

    cy.wait(3000); // Allow API to return error
    cy.contains("⚠️ There's no city called").should("exist");
  });

  it("should display the 24-hour forecast", () => {
    cy.get(".swiper").should("exist");
  });

  it("should fetch weather data for a valid city", () => {
    cy.get("input[placeholder='Search city...']").clear().type("New York");  
    cy.wait(3000); // Increased wait for debounce effect  

    cy.get(".weather-display").should("exist").then(() => {
      cy.log("Weather data displayed for New York");
    });
    cy.get("h1").should("contain.text", "New York");
  });

  it("should show an error message for an invalid city", () => {
    cy.get("input[placeholder='Search city...']").clear().type("NonExistentCity");  
    cy.wait(3000); // Increased wait for debounce effect  

    cy.get("h1").then(($h1) => {
      const text = $h1.text();
      cy.log(`H1 text: ${text}`); // Log the H1 text for debugging
      expect(text).to.not.contain("NonExistentCity");
    });

    cy.wait(3000); // Allow API to return error
    cy.contains("⚠️ There's no city called").should("exist");
  });
});