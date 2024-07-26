const { UserSession } = require("../models");

exports.getAllUserSessions = async (req, res) => {
  try {
    const sessions = await UserSession.findAll();
    res.json(sessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserSessionById = async (req, res) => {
  try {
    const session = await UserSession.findByPk(req.params.id);
    if (session) {
      res.json(session);
    } else {
      res.status(404).json({ message: "User session not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUserSession = async (req, res) => {
  try {
    const session = await UserSession.create(req.body);
    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserSession = async (req, res) => {
  try {
    const [updated] = await UserSession.update(req.body, {
      where: { session_id: req.params.id },
    });
    if (updated) {
      const updatedSession = await UserSession.findByPk(req.params.id);
      res.json(updatedSession);
    } else {
      res.status(404).json({ message: "User session not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUserSession = async (req, res) => {
  try {
    const deleted = await UserSession.destroy({
      where: { session_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User session not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
