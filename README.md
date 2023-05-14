# Task Manager API

## Description

This is a backend API for managing tasks. It makes CRUD operations for users to manage their tasks

## Features 

A User can:

- Signup with name ,email and password.
  - After signing up ,the user 'll get a welcome email notification by NodeMailer.
- Create tasks
- Login with email and password.
- Logout.
- Filter your tasks and mark them as complete ones or just the incomplete ones.
-  Filter your tasks based on specifi order or by ascending or descending order.
-  pagination for the tasks
- Get, Update and Delete a specific task by id.
- Get a Hash encryption of passwords and access management with JWT tokens.
- Get Restricted from accessing to CRUD operations based on JWT tokens.
- Get all account/profile information.
- Update your account.
- Delete your account.
  - The user will get a cancelation email notification.
- Upload/upate a profile picture.
- Delete your profile picture.


Install my-project with npm


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

