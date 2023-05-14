# Task Manager API

## Description

This is a backend API for managing tasks. It provides CRUD operations for users to manage their tasks

## Features 

A User should be able to:

- Signup with name ,email and password.
  - The user should get a welcome email notification by NodeMailer.
- Login with email and password.
- Create tasks.
- Logout.
- Filter your tasks and mark them as complete ones or incomplete ones.
-  Filter your tasks based on specific order or by ascending or descending order.
-  pagination for the tasks
- Get, Update and Delete a specific task by id.
- Get a Hash encryption of passwords with JWT tokens.
- Get bearer tokens and authntication with JWT tokens.
- Get all account information.
- Update your account.
- Delete your account.
  - The user should get a cancellation email notification.



## How to use

```bash
 git clone https://github.com/Amir380-A/Task-manager-api
 cd Task-manager-api/
 npm install
```

```bash
 npm run start
 ````

To run this project, add the following environment variables to your .env file:

`MONGODB_URL`

`JWT_SECRET`

`EMAIL_PASSWORD`

`EMAIL_USER`



## Technologies used 
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [NodeMailer](https://nodemailer.com/about/)

