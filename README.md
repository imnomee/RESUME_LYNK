# RESUME_LYNK

## Overview

RESUME_LYNK is a full-stack web application that allows users to create, manage, and export their resumes. It provides a user-friendly interface with multiple templates and customizable sections to build professional resumes.

## Features

*   **Resume Creation:** Create resumes from scratch using a step-by-step form.
*   **Multiple Templates:** Choose from a variety of resume templates.
*   **Customizable Sections:** Add and edit sections such as work experience, education, skills, projects, and more.
*   **Real-time Preview:** Preview the resume as it's being built.
*   **PDF Export:** Export the resume as a PDF file.
*   **User Authentication:** Secure user accounts with registration and login functionality.
*   **Dashboard:** Manage created resumes in a user dashboard.

## Technologies Used

*   **Frontend:**
    *   React
    *   React Router DOM
    *   Tailwind CSS
    *   Axios
    *   html2canvas
    *   html2pdf.js
    *   react-to-print
*   **Backend:**
    *   Node.js
    *   Express.js
    *   Mongoose (MongoDB)
    *   bcryptjs
    *   jsonwebtoken
    *   cors
    *   dotenv
    *   express-rate-limit
    *   helmet
    *   morgan
    *   multer

## Installation

### Frontend

1.  Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```
2.  Install dependencies:

    ```bash
    npm install
    ```
3.  Start the development server:

    ```bash
    npm run dev
    ```

### Backend

1.  Navigate to the `backend` directory:

    ```bash
    cd backend
    ```
2.  Install dependencies:

    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory and add the following environment variables:

    ```
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

4.  Start the server:

    ```bash
    npm run dev
    ```

## Usage

1.  Open the application in your browser.
2.  Create an account or log in.
3.  Navigate to the dashboard to create a new resume or manage existing ones.
4.  Fill out the resume sections and customize the template.
5.  Preview and export the resume as a PDF file.

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for any bugs or feature requests.

## License

[License]
