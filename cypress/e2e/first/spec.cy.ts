import {BASE_URL, REPO_OWNER, REPO_NAME, VALID_REPO_URL, INVALID_REPO_URL} from "../../constants";

describe("Issue Tracker App", () => {
    beforeEach(() => {
        cy.visit(BASE_URL);
        cy.intercept("GET", "**/issues**").as("fetchIssues");
    });

    it("should load the page", () => {
        cy.get(".container").should("exist");
    });

    it("should show an error message for an invalid GitHub URL", () => {
        cy.get("input").type(INVALID_REPO_URL);
        cy.get("button").click();
        cy.contains("Enter a valid GitHub repository URL.");
    });

    it("should load issues from a valid GitHub repository URL", () => {
        cy.get("input").clear().type(VALID_REPO_URL);
        cy.get("button").click();

        // Check if repo information is displayed
        cy.contains(`${REPO_OWNER} > ${REPO_NAME}`).should("exist");
        cy.get(".star-info").should("exist");

        // Check if issue columns are displayed
        cy.contains("To do").should("exist");
        cy.contains("In Progress").should("exist");
        cy.contains("Done").should("exist");
    });

    it("should display an error message for invalid input", () => {
        cy.get("input").clear().type(INVALID_REPO_URL);
        cy.get(".ant-form-item-explain").should("contain", "Enter a valid GitHub repository URL.");
    });

    it("should hide the error message when a valid input is entered after invalid input", () => {
        cy.get("input").clear().type(INVALID_REPO_URL);
        cy.get(".ant-form-item-explain").should("contain", "Enter a valid GitHub repository URL.");

        cy.get("input").clear().type(VALID_REPO_URL);
        cy.get(".ant-form-item-explain").should("not.contain", "Enter a valid GitHub repository URL.");
    });

    it("should allow dragging and dropping of issues between columns", () => {
        cy.get("input").clear().type(`https://github.com/${REPO_OWNER}/${REPO_NAME}`);
        cy.get("button").click();
        cy.get("[data-cy='issue-item']").should("have.length.greaterThan", 0);

        cy.get("[data-cy='repo-info']").find("a").first().should("contain", REPO_OWNER);
        cy.get("[data-cy='repo-info']").find("a").eq(1).should("contain", REPO_NAME);

        cy.get(".column")
            .contains("To do")
            .parent()
            .find("[data-cy='issue-item']")
            .should("have.length.greaterThan", 0);
    });
});
