const express = require("express");
const router = express.Router();
const userSessionController = require("../controllers/userSessionController");

router.get("/user-sessions", userSessionController.getAllUserSessions);
router.get("/user-sessions/:id", userSessionController.getUserSessionById);
router.post("/user-sessions", userSessionController.createUserSession);
router.put("/user-sessions/:id", userSessionController.updateUserSession);
router.delete("/user-sessions/:id", userSessionController.deleteUserSession);

module.exports = router;
