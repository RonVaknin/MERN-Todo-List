// const express = require("express");
// const router = express.Router();

const Todo = require("../models/todo");

module.exports = controller = {
  get: async (req, res, next) => {
    todos = await Todo.find();
    res.send(todos);
    return;
  },
  remove: async (req, res, next) => {
    let id = req.body._id || req.params._id;
    if (!id) {
      res.status(400).send("No ID provided");
      return;
    }
    let result = await Todo.findByIdAndRemove(id);
    if(result){
      res.sendStatus(200);
      return;
    }
    res.status(400).send("No valid provided");

  },
  findByDate: (req, res, next) => {
    let date = req.body.date || req.params.date;
    if (!date) {
      res.status(400).send("No valid date provided");
    }
  },
  findByStr: async (req, res, next) => {
    let str = req.body.str || req.params.str;
    if (!str) {
      res.status(400).send("No valid string provided");
    }
    let result = await Todo.find({ title: `/${str}` });
    res.send(result);
    return;
  },
  add: async (req, res, next) => {
    let result;
    if (!req.body.title || req.body.title.length === 0) {
      res.status(400).send("invalid input");
      return;
    }
    try {
      let todo = new Todo(req.body);
      result = await todo.save();
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
      return;
    }
    if (result) {
      res.send(result);
      return;
    }
    res.status(500).send("unable to save task");
    return;
  },
  check: async (req, res, next) => {
    let result;
    if (!req.body._id) {
      res.status(400).send("invalid input");
      return;
    }
    try {
      let todo = await Todo.findById(req.body._id);
      todo.check = !todo.check;
      result = await todo.save();
    } catch (e) {
      console.error(e);
      res.sendStatus(500);
      return;
    }
    if (result) {
      res.send(result);
      return;
    }
    res.status(500).send("unable to save task");
    return;
  },
};
