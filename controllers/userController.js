const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const {
      username,
      password,
      email,
      company_id,
      role,
      phone_number,
      status,
    } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      email,
      company_id,
      role,
      phone_number,
      status,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        error: error.errors.map((err) => err.message),
      });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const updateData = { ...rest };

    if (password) {
      updateData.password = bcrypt.hashSync(password, 10);
    }

    const [updated] = await User.update(updateData, {
      where: { user_id: req.params.id },
    });

    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { user_id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.authenticateUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(`Username: ${username}, Password: ${password}`);
    const user = await User.findOne({ where: { username } });
    if (user) {
      console.log(`User found: ${user.username}`);
      const isValidPassword = bcrypt.compareSync(password, user.password);
      console.log(`Entered password valid: ${isValidPassword}`);
      if (isValidPassword) {
        const token = jwt.sign({ id: user.user_id }, jwtSecret, {
          expiresIn: "1h",
        });
        res.json({ message: "Authentication successful", token, user });
      } else {
        console.log("Invalid password");
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      console.log("User not found");
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
