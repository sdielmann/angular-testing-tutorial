import { Before } from 'cypress-cucumber-preprocessor/steps';

Before(async () => {
  /* Reset the database state to a default. See e2e/plugins/index.ts for task definition. */
  cy.task('resetDB');
});
