describe("Login test", async () => {

    it("visit login page", async () => {
        cy.visit("http://localhost:3001/login")
        cy.get('input[name="email"]').type("optitech@optitech.com")
        cy.get('input[name="password"]').type("optitech")
        cy.get('button[type="submit"]').click()
    })


})
