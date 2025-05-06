# Intellisense Test Automation

This project is an automated test suite for the Intellisense web application, built with [Playwright](https://playwright.dev/) and the Page Object Model (POM) design pattern. It features secure credential handling, test data management, and continuous integration with GitHub Actions.

---

## 🚀 Features
- Automated UI tests using Playwright
- Page Object Model for maintainable code
- Secure credential management (no hardcoded secrets)
- Test data stored in JSON files
- GitHub Actions pipeline for CI
- Download and file validation examples
- API mocking/stubbing support

---

## 📁 Project Structure

```
intellisense-test/
├── .github/workflows/         # GitHub Actions CI config
│   └── playwright.yml
├── testData/                 # Test data and credentials (not in git)
│   └── credentialsProd.json
├── pages/                    # Page Object Model classes
│   └── POManager.js
│   └── signInPage.js
│   └── homePage.js
│   └── dashBoardPage.js
├── tests/                    # Test specs
│   └── signin.spec.js
├── utils/                    # Utility functions (e.g., credentials loader)
│   └── credentials.js
├── playwright.config.js      # Playwright configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```

---

## 🔐 Secure Credentials
- Store credentials in `testData/credentialsProd.json` (add this file to `.gitignore`).
- Example `credentialsProd.json`:
  ```json
  {
    "email": "your-email@example.com",
    "password": "your-password"
  }
  ```
- In CI (GitHub Actions), use repository secrets and environment variables.
- The utility `utils/credentials.js` loads credentials from the correct source based on environment.

---

## 🛠️ Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/intellisense-test.git
   cd intellisense-test
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Install Playwright browsers:**
   ```bash
   npx playwright install --with-deps
   ```
4. **Add your credentials:**
   - Copy `testData/credentialsProd.json.example` to `testData/credentialsProd.json` and fill in your values.

---

## 🧪 Running Tests

- Run all tests:
  ```bash
  npx playwright test
  ```
- Run a specific test file:
  ```bash
  npx playwright test tests/signin.spec.js
  ```
- View the HTML report:
  ```bash
  npx playwright show-report
  ```

---

## 🤖 Continuous Integration (GitHub Actions)
- Tests run automatically on every push and pull request to `main`.
- See `.github/workflows/playwright.yml` for details.
- Playwright HTML reports are uploaded as workflow artifacts.

---

## 🧩 Test Data & Mocking
- Test data is stored in JSON files under `testData/`.
- Use Playwright's `page.route()` for API mocking/stubbing in tests.

---

## 🏗️ Page Object Model
- All page interactions are encapsulated in classes under `pages/`.
- The `POManager` class provides access to all page objects.

---

## 👥 Contributing
1. Fork the repo and create your branch.
2. Add or update tests/page objects as needed.
3. Ensure all tests pass locally (`npx playwright test`).
4. Open a pull request.

---

## 📚 References
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Playwright Test Runner](https://playwright.dev/docs/test-intro)
- [GitHub Actions](https://docs.github.com/en/actions)

---

**Happy Testing!**