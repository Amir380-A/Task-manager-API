const express = require("express");
const ObjectID = require("mongoose").Types.ObjectId;
const auth = require("../middleware/auth");
const router = new express.Router();
const Task = require("../models/task");

router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  try {
    console.log("Create task route on");
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.get("/tasks", auth, async (req, res) => {
  try {
    console.log("get tasks route on");
    let tasks;
    
    const options = {};
    const sort = {};
    if (req.query.limit) options.limit = parseInt(req.query.limit);
    if (req.query.skip) options.skip = parseInt(req.query.skip);
    if (req.query.sortBy) {
      const sortOptions = req.query.sortBy.split(":");
      sort[sortOptions[0]] = sortOptions[1] === "desc" ? -1 : 1;
      options.sort = sort;
    }
 
    if (req.query.completed) {
      tasks = await Task.find(
        {
          owner: req.user._id,
          completed: req.query.completed === "true" ? true : false,
        },
        null,
        options
      );
    } else {
      tasks = await Task.find(
        {
          owner: req.user._id,
        },
        null,
        options
      );
    }
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  if (!ObjectID.isValid(_id))
    return res.status(406).send("Task with that invalid id does not exist!");

  try {
    console.log("Get task by id route on");
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});


router.patch("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  
  const allowedUpdates = ["desc", "completed"];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation) res.status(400).send({ error: "invalid updates!" });
 
  try {
    console.log("update task route on");
    const task = await Task.findOne({ _id, owner: req.user._id });
   
    if (!task) return res.status(404).send();
 
    updates.forEach((update) => {
      task[update] = req.body[update];
    });
    await task.save();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});


router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    console.log("Delete task route on");
    const task = await Task.findOneAndRemove({ _id, owner: req.user._id });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
