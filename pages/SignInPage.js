const { expect } = require("@playwright/test");
const { getCredentials } = require('../utils/credentials');
const { email, password } = getCredentials();

class SignInPage{

    constructor(page) {
        this.page = page;
        this.emailAddressTextBox = this.page.getByRole('textbox', { name: 'Email address' });
        this.passwordTextBox = this.page.getByRole('textbox', { name: 'Password' });
        this.signInButton = this.page.getByTestId('SignInLocal-signInButton');
    }

    async userNavigatesToTheApplication()
    {
        await this.page.goto('/next/signin'); 
        await expect(this.page).toHaveTitle('Brains.App');
    }

    async userSignInTheApplication() 
    {   
        await this.emailAddressTextBox.type(email);
        await this.passwordTextBox.type(password);
        await this.signInButton.click();
    }

}
module.exports = {SignInPage}
