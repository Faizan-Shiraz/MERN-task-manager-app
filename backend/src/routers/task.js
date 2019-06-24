const express = require("express");

const auth = require("../middleware/auth");

const Task = require("../models/task");

const router = new express.Router();

router.post("/addTask", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id
  });

  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasksList", auth, async (req, res) => {
  try {
    const match = req.query.completed
      ? {
          completed: req.query.completed === "true"
        }
      : {};
    const sort = {};
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split("_");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }

    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort
        }
      })
      .execPopulate();
    res.status(200).send(req.user.tasks);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/task/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.sendStatus(404);
    }
    res.status(200).send(task);
  } catch (e) {
    res.sendStatus(404);
  }
});

router.patch("/task/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdated = ["description", "completed"];
  const isValidupdate = updates.every(update =>
    allowedUpdated.includes(update)
  );

  if (!isValidupdate) {
    return res.status(400).send({ error: "Invalid field provided" });
  }

  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }
    updates.forEach(update => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/task/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id
    });

    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
