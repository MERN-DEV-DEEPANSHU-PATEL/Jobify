# Project README

## Description

This repository contains the initial commit of a project that includes both a client-side and server-side component. The project is a MERN web application with the following features and files:

### Client-side

- Environment Variables:
  - `VITE_SERVER_URL`
- Various configuration files:

  - `.eslintrc.cjs`
  - `.gitignore`
  - `package-lock.json`
  - `package.json`
  - `vite.config.js`

- HTML files:

  - `index.html`

- JavaScript and JSX files:

  - `src` directory containing React components and related files, including:

    - `App.jsx`
    - `components` directory with various components:

      - `Alert.jsx`
      - `AreaChart.jsx`
      - `BarChart.jsx`
      - `BigSidebar.jsx`
      - `ChartsContainer.jsx`
      - `FormRow.jsx`
      - `FormRowSelect.jsx`
      - `Job.jsx`
      - `JobInfo.jsx`
      - `JobsContainer.jsx`
      - `Loading.jsx`
      - `Logo.jsx`
      - `Navbar.jsx`
      - `Navlinks.jsx`
      - `PageBtnContainer.jsx`
      - `SearchContainer.jsx`
      - `SmallSidebar.jsx`
      - `StatItem.jsx`
      - `StatsContainer.jsx`
      - `index.js`

    - `assets` directory with CSS and images:

      - `css` directory with `index.css`
      - `images` directory with various images:
        - `logo.svg`
        - `main-alternative.svg`
        - `main.svg`
        - `not-found.svg`

    - `wrappers` directory with various React components:
      - `BigSidebar.jsx`
      - `ChartsContainer.jsx`
      - `DashboardFormPage.jsx`
      - `ErrorPage.jsx`
      - `Job.jsx`
      - `JobInfo.jsx`
      - `JobsContainer.jsx`
      - `LandingPage.jsx`
      - `Navbar.jsx`
      - `PageBtnContainer.jsx`
      - `RegisterPage.jsx`
      - `SearchContainer.jsx`
      - `SharedLayout.jsx`
      - `SmallSidebar.jsx`
      - `StatItem.jsx`
      - `StatsContainer.jsx`
      - `Testing.jsx`

- Pages:

  - `src/pages` directory containing various pages:
    - `Error.jsx`
    - `Landing.jsx`
    - `ProtectedRoute.jsx`
    - `Register.jsx`
    - `dashboard` directory with related pages:
      - `AddJob.jsx`
      - `AllJobs.jsx`
      - `Profile.jsx`
      - `DeleteAccount`
      - `SharedLayout.jsx`
      - `Status.jsx`
      - `index.js`

- State management:

  - Redux store files:
    - `store.js`
    - `userSlice.js`

- Utility functions:
  - `addUserToLocalstorage.js`
  - `authFetch.js`
  - `removeUserFromLocalStorage.js`

### Server-side

- Environment Variables:
  - `PORT`
  - `MONGO_URL`
  - `JWT_SECRET`
  - `JWT_LIFETIME`
  - `NODE_ENV`
  - `CLIENT_URL`
- Various configuration files:

  - `.gitignore`
  - `package-lock.json`
  - `package.json`

- Controllers:

  - `controller` directory with controller files:
    - `authController.js`
    - `jobController.js`

- Database connection:

  - `db` directory with `connect.js`

- Middleware:

  - `middleware` directory with middleware files:
    - `auth.js`
    - `custom-api-errors.js`
    - `error-handler.js`
    - `not-found.js`

- Models:

  - `models` directory with model files:
    - `Job.js`
    - `User.js`

- Routes:

  - `routes` directory with route files:
    - `authRoutes.js`
    - `jobRoutes.js`

- Main server file:

  - `server.js`

- Utility functions:
  - `checkPermissions.js`

## Getting Started

To get started with this project, you should have Node.js and npm (Node Package Manager) installed on your machine. You can follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the `client` directory and run `npm install` to install client-side dependencies.
3. Navigate to the `server` directory and run `npm install` to install server-side dependencies.
4. Start the server by running `npm start` in the `server` directory.
5. Start the client by running `npm start` in the `client` directory.
6. Make sure for environment variables to be created.

## Contributing

If you'd like to contribute to this project, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with a descriptive commit message.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository with a clear explanation of your changes.
