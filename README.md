# Task Manager API

## Description

This is a backend API for managing tasks. It makes CRUD operations for users to manage their tasks

## Features 

A User can:

- Signup with (name ,email and password).
  - After signing up ,the user 'll get a welcome email notification.
- Login with (email and password).
- Logout.
  - Logout from one or all sessions.
- get a Hash encryption of passwords and access management with JWT tokens.
- get Restricted from accessing to CRUD operations based on JWT tokens.
- Get all account/profile information.
- Update your account/profile.
- Delete your account/profile.
  - After deleting ,the user 'll get a cancelation email notification.
- Upload/upate a profile picture.
- Delete your profile picture.
- Create tasks.
- Filtering your tasks like this :
  - You can get all of them or just the complete ones or just the incomplete ones.
  - You can get them in a specific(asc/desc) order(by when the task was last created, or last updated)
  - You can paginating tasks.
- Get/Update/Delete a specific task by id.



## Installation 

Install my-project with npm

```bash
 git clone https://github.com/Amir380-A/Task-manager-api
 cd Task-manager-api/
 npm install
```

## How to use

```bash
 npm run start
 ````
Or
```
 npm run dev
```

To run this project, you will need to add the following environment variables to your .env file:

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

