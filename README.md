# 🔐 SecureAuth: Advanced Multi-Role Authentication System

A comprehensive, full-stack security implementation focused on modern authentication standards. This project was developed as part of the **Data Integrity and Authentication** course to demonstrate secure identity management, multi-factor authentication (2FA), and granular access control.

---

## 🌟 Core Features

### 1. Robust User Registration & Login
* **Secure Storage:** User passwords are never stored in plain text. We utilize **BcryptJS** for high-entropy hashing.
* **Role Assignment:** Users can register as one of three predefined roles: `Admin`, `Manager`, or `User`.

### 2. Two-Factor Authentication (2FA)
* **Authenticator Support:** Fully compatible with Google Authenticator, Microsoft Authenticator, and Authy.
* **Dynamic QR Generation:** Automatically generates a unique secret key and QR code for each user upon registration.
* **TOTP Verification:** Implements Time-based One-Time Passwords (6-digit codes) to ensure account ownership.

### 3. Token-Based Authorization (JWT)
* **Session Management:** Uses **JSON Web Tokens (JWT)** to maintain state after successful 2FA.
* **Secure Delivery:** Tokens are sent to the client and stored in `localStorage` for authorized API requests.
* **UI Transparency:** The generated JWT is displayed on the dashboard for educational demonstration and debugging.

### 4. Role-Based Access Control (RBAC)
* **Granular Permissions:** The system restricts access to specific routes based on the user's role.
* **Protected Routes:** * `/admin.html` -> Exclusive to **Admin** role.
    * `/manager.html` -> Accessible by **Managers** and **Admins**.
    * `/dashboard.html` -> Accessible by all authenticated users (acts as Profile).
* **Unauthorized Blocking:** Any attempt to access a restricted route without the proper role results in a `403 Forbidden` response and an "Access Denied" UI alert.

---

## 🏗️ Project Structure

The project follows a **Modular (MVC-like) Architecture** for clean code and scalability:

```text
├── config/             # Database connection settings (MySQL/XAMPP)
├── controllers/        # Business logic (Auth, 2FA, JWT Generation)
├── middleware/         # Security layers (Token verification & Role checking)
├── models/             # Database schemas (User model)
├── public/             # Frontend assets (HTML, CSS, Client-side JS)
├── routes/             # API Endpoint definitions
├── utils/              # Helper functions (QR Code generators)
└── app.js              # Main server entry point

🛠️ Tech Stack
This project is built using a modern and secure technology stack. The backend is powered by Node.js and Express.js to handle server-side logic and API routing.
For the database, MySQL is utilized via XAMPP/phpMyAdmin to store user credentials and 2FA secrets securely. Security is at the core of the application,
employing JSON Web Tokens (JWT) for session handling, BcryptJS for robust password hashing, and Speakeasy for implementing Time-based One-Time Passwords (TOTP).
The frontend is crafted with a clean and responsive design using HTML5, JavaScript (ES6+), and Tailwind CSS for a professional look and feel.

How To Run
1. Clone the Repo
git clone [https://github.com/Xsalma1/Auth_App_Security.git](https://github.com/Xsalma1/Auth_App_Security.git)
cd Auth_App_Security

2. Install Dependencies:
npm install

3. Database Setup:
. Import the SQL structure into your MySQL database via XAMPP.
. Configure your database credentials in the project.

4. Start the Server
node app.js

5. Access the App: 
Open http://localhost:3000 in your browser.

🛡️ Security Workflow Demonstrated
User Registers ➡️ Password hashed ➡️ Secret Key generated.

Setup 2FA ➡️ Scan QR Code in Authenticator App.

Login ➡️ Password verified ➡️ Request 2FA Code.

Final Auth ➡️ Verify TOTP ➡️ Generate JWT Token.

Authorized Access ➡️ Token verified via Middleware ➡️ Access granted based on Role.
