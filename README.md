This is the test case report for Manual and Automation e2e validation.

Manual testing Scenarios and Issues are provided in `test-case-and-issues.txt` file. Which also provide some feature enchancement suggestions.

Automation testing end-to-end is covered in `e2e/automation.ts` file.

To run tests, ensure that the development server is running in background. Replace `e2e/example.spec.ts` by `e2e/automation.spec.ts` into `timezone-app/e2e` folder. Then, run `npm run e2e` or `yarn e2e` to execute tests.

To excute the Automation
`npm run e2e` or `npx playwright test e2e`

To execute the Automation in headed mode
`npx playwright test e2e --headed`

To execute the Automation in debug mode
`npx playwright test e2e --debug`

To execute the Automation in different browser, add project configuration in playwright.config.js
`npx playwright test e2e --project=firefox`

