# Student Internship Platform

Welcome to the Student Internship Platform documentation. This platform is designed to facilitate students in creating profiles, earning coins, and applying for internships. Below is a detailed guide on how to use the platform effectively.

## Overview

The Student Internship Platform utilizes Node.js and Express.js as the backend framework, MongoDB as the non-relational database, and React.js for the frontend. It also incorporates JWT (JSON Web Tokens) for secure authentication and authorization.

## Core Functionalities

### 📝 Authentication and User Management

- Users can register with their email address and receive an OTP for verification.
- Passwords are not required during registration; instead, OTPs are used for secure authentication.
- Token-based authentication is implemented using JWT for secure user login.

### 🛠️ Profile Building and Coin Earning

- Users can create detailed profiles, including personal details, education history, project details, and past experiences.
- Each field filled earns the user a specific number of coins, which are displayed in real-time as they fill in the input fields.

### 🌐 Internship Listings

- The platform fetches internship listings from Internshala API/Web Scraping.
- Internship details are displayed on cards, including role name, company name, company logo, CTC/Stipend, experience required, and an "Apply" button that costs 50 coins.

### 💰 Coin Spending

- Users spend 50 coins for every internship application.
- The system checks if the user has sufficient coins before allowing the application process to proceed.

## Routes

### Authentication Routes (`/auth`)

- **POST /:** Register a new user with email and receive an OTP for verification.
- **POST /:** Authenticate user and generate JWT token for access.

### Profile Routes (`/profile`)

- **GET /profile:** Retrieve user profile information.
- **POST /profile:** Update user profile information.

### Internship Routes (`/internships`)

- **GET /home:** Fetch internship listings.
- **POST /home:** Apply for an internship, spending 50 coins.

## Getting Started

To set up the Student Internship Platform locally, follow these steps:

1. Clone the repository:

```
2. Install dependencies:

```

npm install

```

3. Add .env file with your details in backend

```

PORT = 5000
DATABASE_URL = mongodb+srv:**\***
JWT_SECRET = "**\*\***"
SMTP_HOST = **\*\***
SMTP_PORT = **\*
SMTP_MAIL = \*\*\*\***
SMTP_PASSWORD = **\*\*\*\***

```

4. Add .env file with your details in frontend

```

REACT_APP_BACKEND_BASE_URL = **\*\*\***

```


4. Start the application for backend:

```

    npm run dev || nodemon server.js

````
5. Start the application for frontend:

 ```
 npm run start

````

## Technology Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB
- **ORM Tool:** Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcrypt for password hashing, Helmet for HTTP headers protection

## Contact

For inquiries and support, please reach out to [ankitkumar040722@gmail.com](mailto:ankitkumar040722@gmail.com).
