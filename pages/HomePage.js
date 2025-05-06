const { expect } = require("@playwright/test");

class HomePage{

    constructor(page) {
        this.page = page;
    }

    async clickOnDashBoardLink(dashBoardName)
    {
        await expect(this.page).toHaveTitle('Home | brains.app');
        await this.page.getByRole('link', { name: dashBoardName }).click();
    }

}
module.exports = {HomePage}
