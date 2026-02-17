const express = require ("express");
const router = express.Router();

const { createTask, getMyTasks, getAllTasks} = require("../controllers/taskControllers");
const { protect, authorize } = require ("../middleware/auth");

router.post ("/", protect, createTask);
router.get("/me", protect, getMyTasks);
router.get("/all", protect, authorize(["admin"]), getAllTasks);

module.exports = router;