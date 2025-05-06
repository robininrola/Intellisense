const { expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

class DashBoardPage{

    constructor(page,context) {
        this.page = page;
        this.context = context;
        this.downloadArrowButton = page.getByTestId('ActionToggleButton');
        this.saveToFileLink = page.getByTestId('AsyncActionDialog-okButton');
        this.downloadLink = page.getByTestId('AsyncActionDialog-okButton');
        this.downloadArrow = page.locator('a[href$=".pdf"]:has-text("Download")');
    }

    async mouseOverOnPowerEnergyGraph() {

        await expect(this.page).toHaveTitle(/brains.app/);
        await this.page.waitForLoadState('load');
        await this.page.waitForLoadState('networkidle');

        const frame = await this.page.frames()[2];  
        await console.log(`Frame name: ${frame.name()}, URL: ${frame.url()}`);

        if (frame === null) {
            throw new Error('Unable to get frame');
        }

        const graph = await frame.waitForSelector('.u-over', { state: 'attached' });
        const box = await graph.boundingBox();
        if (!box) throw new Error('Could not get graph dimensions');
        if (box) {
          const centerX = box.x + box.width / 2;
          const centerY = box.y + box.height / 2;
          await this.page.mouse.click(centerX, centerY); 
        }
    
    const tooltip = await frame.locator('div[aria-live="polite"]:first-child > div > div:first-child >> div[class*="css-xfc"]');
    await tooltip.waitFor({ state: 'visible' }); 

    const tooltipText = await tooltip.textContent();
    
    console.log(`Tooltip Text: ${tooltipText}`);
    
    expect(tooltipText).toMatch(/\d{4}-\d{2}-\d{2}|\d{2}:\d{2}:\d{2}/);

    }

    async downloadGraph() {
        await expect(this.page).toHaveTitle(/brains.app/);
        await this.downloadArrowButton.nth(1).click();
        await this.saveToFileLink.click();
        const downloadButton = await this.downloadLink;
        await expect(downloadButton).toBeDisabled();
        await expect(downloadButton).toBeEnabled({timeout : 200000});
      
        const [newPage] = await Promise.all([
          this.context.waitForEvent('page'),
          this.downloadArrow.click()
        ]);
      
        await newPage.waitForLoadState('commit');
        expect(newPage.url()).toContain('.pdf');
        const pdfUrl = newPage.url();
      
        const cookies = await this.context.cookies();
        const cookieHeader = cookies.map(c => `${c.name}=${c.value}`).join('; ');
    
        const response = await fetch(pdfUrl, {
            headers: { cookie: cookieHeader }
        });
        const buffer = await response.arrayBuffer();
        fs.writeFileSync(process.env.downloadedPDFLocation, Buffer.from(buffer));
       
        expect(fs.existsSync(process.env.downloadedPDFLocation)).toBeTruthy();

       
        const stats = fs.statSync(process.env.downloadedPDFLocation);
        expect(stats.size).toBeGreaterThan(0);
    }
    
}
module.exports = {DashBoardPage}