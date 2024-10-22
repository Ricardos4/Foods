const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db"); // Conexión a MySQL
const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res
      .status(400)
      .json({ message: "Por favor, complete todos los campos" });
  }

  try {
    // Verificar si el usuario ya existe
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE username = ?",
      [username]
    );
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya está en uso" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar nuevo usuario
    await db.query(
      "INSERT INTO users (username, password, role) VALUES (?, ?, ?)",
      [username, hashedPassword, role]
    );

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar el usuario" });
  }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [user] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (user.length === 0) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    const isValidPassword = await bcrypt.compare(password, user[0].password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: user[0].id, role: user[0].role },
      "SECRET_KEY",
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user[0].id, username: user[0].username, role: user[0].role },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el inicio de sesión" });
  }
});

module.exports = router;
