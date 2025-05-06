const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');
const {POManager} = require('../pages/POManager');

test.describe.serial('Intellisense Sign In Tests', () => {
  let poManager, signInPage, homePage, dashboardPage;

  test.beforeEach(async ({ page, context }) => {
    poManager = new POManager(page, context);
    signInPage = poManager.signInPage;
    homePage = poManager.homePage;
    dashboardPage = poManager.dashBoardPage;

    await signInPage.userNavigatesToTheApplication();
    await signInPage.userSignInTheApplication();
    await homePage.clickOnDashBoardLink('QA Automation test Project');
  });

  test('should display correct tooltip on power/energy graph hover', async ({ page, context }) => {
    await dashboardPage.mouseOverOnPowerEnergyGraph();
  });

  test('pdf export scenario', async ({ page, context }) => {
    await dashboardPage.downloadGraph();
  });
});
