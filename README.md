# International Payment System

[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/en)
[![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Helmet](https://img.shields.io/badge/Helmet-5A67D8?logo=helmet&logoColor=white)](https://helmetjs.github.io/)
[![bcrypt](https://img.shields.io/badge/bcrypt-FF6F61?logo=auth0&logoColor=white)](https://www.npmjs.com/package/bcrypt)
[![JWT](https://img.shields.io/badge/JWT-FFC300?logo=jsonwebtokens&logoColor=white)](https://www.npmjs.com/package/jsonwebtoken)
[![express-rate-limit](https://img.shields.io/badge/express--rate--limit-00A3E0?logo=express&logoColor=white)](https://github.com/express-rate-limit)
[![HTTPS](https://img.shields.io/badge/HTTPS-0F9D58?logo=letsencrypt&logoColor=white)](https://www.cloudflare.com/learning/ssl/what-is-https/)
[![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![React Router DOM](https://img.shields.io/badge/React_Router_DOM-CA4245?logo=reactrouter&logoColor=white)](https://www.npmjs.com/package/react-router-dom)
[![React Helmet](https://img.shields.io/badge/React_Helmet-8E44AD?logo=react&logoColor=white)](https://www.npmjs.com/package/react-helmet)
[![Create React App](https://img.shields.io/badge/Create_React_App-09D3AC?logo=create-react-app&logoColor=white)](https://create-react-app.dev/docs/getting-started/)


A secure, full-stack international payment application built with React frontend and Node.js backend, featuring comprehensive security measures.

## Features

### Core Functionality
- **User Authentication & Authorization**
  - Secure user registration and login
  - Password recovery system
  - JWT-based authentication
  - Account management

- **International Money Transfers**
  - Multi-currency support
  - SWIFT, SEPA, ACH, and FEDWIRE payment providers
  - Real-time transaction tracking (Coming Soon...)
  - Transaction verification system (Coming Soon...)

- **Security Features**
  - SSL/TLS encryption
  - Helmet.js security headers
  - Rate limiting protection
  - Web Application Firewall (WAF)
  - Password history tracking
  - Input validation and sanitization
  - Content Security Policy (CSP)

### User Interface
- **Dashboard Views**
  - Home page
  - User dashboard
  - Transaction history
  - Money sent/received views

- **Authentication Views**
  - Login/Register
  - Password recovery
  - Account registration confirmation

- **Transaction Views**
  - Send money interface
  - Transaction verification
  - Payment confirmation

## Youtube Video Link

[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)]()

## GitHub Link

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JoseLubota/InternationalPayment.git)


## Technology Stack

### Backend
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)

[![Express.js](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)

[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)

[![Helmet](https://img.shields.io/badge/Helmet-security-5A67D8?style=for-the-badge)](https://helmetjs.github.io/)

[![bcrypt](https://img.shields.io/badge/bcrypt-passwords-FF6F61?style=for-the-badge)](https://www.npmjs.com/package/bcrypt)

[![JWT](https://img.shields.io/badge/JWT-auth-FFC300?style=for-the-badge)](https://www.npmjs.com/package/jsonwebtoken)

[![express-rate-limit](https://img.shields.io/badge/express--rate--limit-rate--limit-00A3E0?style=for-the-badge)](https://github.com/express-rate-limit)

[![HTTPS](https://img.shields.io/badge/HTTPS-secure-0F9D58?style=for-the-badge&logo=ssl)](https://www.cloudflare.com/learning/ssl/what-is-https/)

### Frontend
[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)

[![React Router DOM](https://img.shields.io/badge/React_Router-DOM-7B61FF?style=for-the-badge)](https://www.npmjs.com/package/react-router-dom)

[![React Helmet (CSP)](https://img.shields.io/badge/React_Helmet-CSP-8E44AD?style=for-the-badge)](https://www.npmjs.com/package/helmet-csp)

[![Create React App](https://img.shields.io/badge/Create_React_App-09D3AC?style=for-the-badge)](https://create-react-app.dev/docs/getting-started/)

## 🔒 Security Features

### Backend Security
- **Helmet.js**: Sets various HTTP headers for security
- **Rate Limiting**: Prevents brute force attacks (100 requests per 15 minutes)
- **Web Application Firewall**: Blocks malicious payloads (XSS, SQL injection)
- **Input Validation**: Comprehensive validation for all user inputs
- **Password Security**: bcrypt hashing with salt rounds
- **JWT Authentication**: Secure token-based authentication
- **HTTPS Enforcement**: Automatic redirect to HTTPS in production

### Frontend Security
- **Content Security Policy**: Prevents XSS attacks
- **React Helmet**: Secure meta tags and headers
- **Input Sanitization**: Client-side validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone (https://github.com/JoseLubota/InternationalPayment.git)
cd InternationalPayment
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Environment Configuration

Create a `.env` file in the backend directory:
```env
# Database
ATLAS_URI={Connection-String-Here}

# JWT Secret
JWT_SECRET={Secret-JWT-Key-Here}

# Server Configuration
PORT=4000
NODE_ENV=development
```

## Running the Application

### Development Mode

1. **Start the Backend Server**
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:4000` (or HTTPS if certificates are configured)

2. **Start the Frontend Development Server**
```bash
cd frontend
npm start
```
The frontend will run on `http://localhost:3000`

### Production Build

1. **Build the Frontend**
```bash
cd frontend
npm run build
```

2. **Start Production Server**
```bash
cd backend
npm start
```

## Supported Currencies & Payment Methods

### Currencies
- USD (US Dollar)
- EUR (Euro)
- GBP (British Pound)
- JPY (Japanese Yen)
- CAD (Canadian Dollar)
- AUD (Australian Dollar)
- CHF (Swiss Franc)
- CNY (Chinese Yuan)
- SEK (Swedish Krona)
- NZD (New Zealand Dollar)
- ZAR (South African Rand)
- More Coming Soon...

### Payment Providers
- **SWIFT**: Society for Worldwide Interbank Financial Telecommunication
- **SEPA**: Single Euro Payments Area (Coming Soon...)
- **ACH**: Automated Clearing House (Coming Soon...)
- **FEDWIRE**: Federal Reserve Wire Network (Coming Soon...)

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/recover-password` - Password recovery
- `POST /api/auth/recover-username` - Username recovery

### Payments
- `GET /api/payments/currencies/supported` - Get supported currencies
- `POST /api/payments/send` - Send money
- `GET /api/payments/history/:userId` - Get transaction history
- `POST /api/payments/verify` - Verify transaction


## References

- Barracuda Networks. (2025). Barracuda. [online] Available at: https://www.barracuda.com/support/glossary/session-
hijacking#:~:text=Session%20hijacking%20is%20a%20cyberattack,active%20website%20or%20application%20session. [Accessed 14 Sep. 2025].

- Cloudflare.com. (2025). What is a distributed denial-of-service (DDoS) attack? [online]
Available at: https://www.cloudflare.com/learning/ddos/what-is-a-ddos-attack/
[Accessed 15 Sep. 2025].

- Fortinet. (2015). What Is a Man-in-the Middle (MITM) Attack? Types & Examples | Fortinet. [online] Available at: https://www.fortinet.com/resources/cyberglossary/man-
in-the-middle-attack [Accessed 15 Sep. 2025].

- Fortinet. (2025). What is Clickjacking? Definition, Types and Prevention | Fortinet.
[online] Available at: https://www.fortinet.com/resources/cyberglossary/clickjacking
[Accessed 15 Sep. 2025].

- Portswigger.net. (2021a). What is cross-site scripting (XSS) and how to prevent it? | Web
Security Academy. [online] Available at: https://portswigger.net/web-security/cross-
site-scripting [Accessed 15 Sep. 2025].

- Portswigger.net. (2021b). What is CSRF (Cross-site request forgery)? Tutorial & Examples
| Web Security Academy. [online] Available at: https://portswigger.net/web-
security/csrf [Accessed 15 Sep. 2025].

- Portswigger.net. (2025). What is SQL Injection? Tutorial & Examples | Web Security
Academy. [online] Available at: https://portswigger.net/web-security/sql-injection
[Accessed 15 Sep. 2025].

- Qwiet A. (2024). AppSec 101 – Output Encoding. [online] Available at:
https://qwiet.ai/appsec-101-output-encoding/ [Accessed 15 Sep. 2025].

- Be A Better Dev, 2020. How to install and configure the AWS CLI on Windows 10. [Online]
Available at: https://www.youtube.com/watch?v=jCHOsMPbcV0 [Accessed September
2025].

- Gavali, A., 2023. Audit AWS Cloud Security using ScoutSuite. [Online] Available at:
https://medium.com/globant/audit-aws-cloud-security-using-scoutsuite-4bc9073d2fc4
[Accessed September 2025].

- Cloudflare.com. (2025). What is HTTPS? [online] Available at: https://www.cloudflare.com/learning/ssl/what-is-https/ [Accessed 10 Oct. 2025].

- Create-react-app.dev. (2022). Getting Started | Create React App. [online] Available at: https://create-react-app.dev/docs/getting-started/ [Accessed 10 Oct. 2025].

- Expressjs.com. (2025). Express - Node.js web application framework. [online] Available at: https://expressjs.com/ [Accessed 10 Oct. 2025].

- GitHub. (2025). Express Rate Limit. [online] Available at: https://github.com/express-rate-limit [Accessed 10 Oct. 2025].

- Github.io. (2025). Helmet.js. [online] Available at: https://helmetjs.github.io/ [Accessed 10 Oct. 2025].

- MongoDB. (2025). MongoDB: The World’s Leading Modern Database. [online] Available at: https://www.mongodb.com/ [Accessed 10 Oct. 2025].

- Nodejs.org. (2015). Node.js — Run JavaScript Everywhere. [online] Available at: https://nodejs.org/en [Accessed 10 Oct. 2025].

- npm. (2024). helmet-csp. [online] Available at: https://www.npmjs.com/package/helmet-csp [Accessed 10 Oct. 2025].

- npm. (2025a). bcrypt. [online] Available at: https://www.npmjs.com/package/bcrypt [Accessed 10 Oct. 2025].

- npm. (2025b). react-router-dom. [online] Available at: https://www.npmjs.com/package/react-router-dom [Accessed 10 Oct. 2025].

- React.dev. (2015). React. [online] Available at: https://react.dev/ [Accessed 10 Oct. 2025].
