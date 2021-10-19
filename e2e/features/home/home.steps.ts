import { Then } from "cypress-cucumber-preprocessor/steps";
import {HomePO} from "./home.po";

Then(/^I should see a list of users$/, function () {
  HomePO.getUserListEntries()
    .should('be.visible')
    .should('have.length.greaterThan', 0);
});
