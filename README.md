# Final Year Project 2024 SETU SOFTWARE SYSTEMS DEVELOPMENT YEAR 4

## Commercial Title: ReactStock: Dynamic Inventory Management
## Project Title: Web Application-based inventory management system

### Abstract

My project is a web application inventory stock management system. The aim of the application is to provide a cheap, reliable and modular application for inventory tracking and managing. This is achieved with the use of modern technologies such as Node.JS, React.JS and a NoSQL database hosted through MongoDB.

### Demo Video Link

[(https://drive.google.com/file/d/14cgwYcoHe9DOZ3Ajc1eiVwMsssBPQ5gC/view?usp=drive_link)]

### Technology used
Below is a list of the main technologies used for this project.

- React.js (Frontend, styled with Material UI)
- Node.js (Backend)
- MongoDB with NoSQL (Database)

### Current Issues Present

Click the following link to see current issues present: [(https://github.com/maciejmarchel12/ReactStock/issues)]

### Features

### Frontend

- Product Management: Users can add products through a form and view them in the Inventory Page in a card format.
- User Authentication: Secure login system allowing access to various pages based on user roles.
- Permission Hierarchy: Admins & Managers can delete products and users, edit users, along with registering new users.
employees can only edit products and view protected routes apart from sign up.
- User Management: Admins and Managers can edit a user changing their username, password and upgrading permissionLevel along with downgrading. Admins and Managers can create new users as well.
- Barcode Scanning Integration: Allows users to update the amount available field by scanning existing product barcodes.
- Notifications: Toast notifications display when products that have 15 or less amount available units.
- Search and Filter: Search and Filter options are available on the inventory and user pages.
- Activity Logs: Allows for tracking actions such as login, product creation, edit, deletion and user creation, edit and deletion.
- Dashboard: Homepage displays 4 charts from MongoDB using the data for the products and acts as a dashboard for charts that are
bar, line, area and wheel charts.
- Theme Switcher: Ability to switch themes using the settings cogwheel in the app bar.
- Footer: Features project details, social links, student name and supervisor name. 

### Backend

The backend application hosts the necessary routes to connect the frontend with the database via API access. It includes models and routes for users, products and activity logs.

### Security

- Password Security: Passwords are salted 10 times using bcrypt for enhanced security.
- JWT Authentication: JWT tokens are stored locally for logging in and accessing most of the web application features.

### Installation and Setup

### Local Install

To this application locally, follow these steps:

1. Clone the repository from [(https://github.com/maciejmarchel12/ReactStock)]
2. Navigate to the project directory.
3. Install the dependencies for both the frontend and backend using `npm install`.
4. Configure the necessary environment variables as needed. Such as: Database connection, secret, host and port etc.
5. Start the backend server using `npm start` in the backend directory.
6. Start the frontend server using `npm start` in the frontend directory.
7. Access the application through the provided localhost URL.

### Contributors

- Student Name: Maciej Marchel
- Supervisor Name: Abraham Lizy

