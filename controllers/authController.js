const { client } = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

// Регистрация нового пользователя
const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }

  try {
    const db = await client.db("courses");
    const existingUser = await db.collection("users").findOne({ username });

    if (existingUser) {
      return res.status(400).send({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection("users").insertOne({
      username,
      password: hashedPassword,
      role: "user",
    });

    res.status(201).send({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).send({ message: "Error registering user", error: err });
  }
};

// Авторизация пользователя
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .send({ message: "Username and password are required" });
  }

  try {
    const db = await client.db("courses");
    const user = await db.collection("users").findOne({ email });
    console.log(user);

    if (!user) {
      return res.status(400).send({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    // const isPasswordValid = password === user.password;
    console.log(isPasswordValid);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.send({
      successful: true,
      result: token,
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).send({ message: "Error logging in", error: err });
  }
};

module.exports = {
  register,
  login,
};
