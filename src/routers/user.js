const express = require("express");
const ObjectID = require("mongoose").Types.ObjectId;
const auth = require("../middleware/auth");
const router = new express.Router();
const User = require("../models/user");
const Task = require("../models/task");
const multer = require("multer");
const sharp = require("sharp");
const { sendWelcomeEmail, sendCancelationEmail } = require("../emails/account");

router.post("/users/login", async (req, res) => {
  try {
    console.log("Login route on");
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send();
  }
});

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    console.log("Signup route on");
    const token = await user.generateAuthToken();
    sendWelcomeEmail(user.name, user.email);
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});


router.post("/users/logout", auth, async (req, res) => {
  try {
    console.log("Logout route on");
    const user = req.user;
    user.tokens = user.tokens.filter((token) => token.token !== req.token);
    await user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    console.log("LogoutAll route on");
    const user = req.user;
    user.tokens = [];
    await user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  console.log("me route on");
  res.send(req.user);
});

router.patch("/users/me", auth, async (req, res) => {
  
  const allowedUpdates = ["name", "age", "email", "password"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: "invalid updates!" });
  
  try {
    console.log("update route on");
    const user = req.user;
    updates.forEach((update) => {
      user[update] = req.body[update];
    });
    await user.save();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    console.log("Delete route on");
    await req.user.remove();
    sendCancelationEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (error) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("The uploaded file should be an image"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    console.log("avatar route on");
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  console.log("Delete avatar route on");
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});


router.get("/users/:id/avatar", async (req, res) => {
  try {
    console.log("get avatar by id route on");
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user || !user.avatar) {
      throw Error();
    }
    res.set("content-type", "image/png");
    res.send(user.avatar);
  } catch (error) {
    res.status(404).send();
  }
});

module.exports = router;
