const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/users", userController.getAllUsers);
router.get("/users/:id", userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

// Authentication endpoint
router.post("/login", userController.authenticateUser);

module.exports = router;
