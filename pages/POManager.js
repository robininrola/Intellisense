const { HomePage } = require('./HomePage');
const { SignInPage } = require('./SignInPage');
const { DashBoardPage } = require('./DashBoardPage');

class POManager {

    constructor(page,context) {
        this.page = page;
        this.context = context
        this.signInPage = new SignInPage(this.page);
        this.homePage = new HomePage(this.page);
        this.dashBoardPage = new DashBoardPage(this.page,this.context);
    }

}
module.exports = {POManager}