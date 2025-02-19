describe('Weather Page E2E Test', () => {
    it('loads the weather homepage and displays weather data', () => {
      // Visit the homepage
      cy.visit('http://localhost:3000');  // Adjust the URL to your app's local dev environment
  
      cy.contains('welcome to our weather page').should('be.visible');
  
      cy.contains('Loading Weather Data').should('be.visible');
      cy.contains('Loading Forecast Data').should('be.visible');
  
      cy.wait(5000); // mock api - will be changed later
      cy.contains('al mukalla').should('be.visible');
      cy.contains('Clear').should('be.visible');
    });
  });
  