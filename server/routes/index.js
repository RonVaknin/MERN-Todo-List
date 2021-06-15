
const express = require("express");
const router = express.Router();
const todoController = require("../controllers/todo");

/* GET home page. */
router.get("/", function (req, res, next) {
  todoController.get(req,res,next);

});

router.post("/", async function (req, res, next) {
  todoController.add(req, res, next);
})
router.post("/check", async function (req, res, next) {
  todoController.check(req, res, next);
})
router.post("/remove", async function (req, res, next) {
  todoController.remove(req, res, next);
})
module.exports = router;
