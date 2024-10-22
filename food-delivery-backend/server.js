const bodyParser = require("body-parser");
const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "food_delivery",
});
db.connect((err) => {
  if (err) throw err;
  console.log("Conectado a la base de datos MySQL");
});

// Registro de usuarios
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(query, [username, hashedPassword], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: "Usuario registrado" });
  });
});

// Inicio de sesión
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err) return res.status(500).send(err);
    if (
      !results.length ||
      !(await bcrypt.compare(password, results[0].password))
    ) {
      return res.status(401).send({ message: "error" });
    }
    const token = jwt.sign(
      { id: results[0].id, role: results[0].role },
      process.env.JWT_SECRET || "defaultSecretKey", // Cambiar a una clave secreta más segura
      {
        expiresIn: "1h",
      }
    );
    res.status(200).send({ token });
  });
});

// Obtener todos los usuarios
app.get("/users", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
});

// Obtener usuario por ID
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM users WHERE id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).send(err);
    if (!results.length)
      return res.status(404).send({ message: "Usuario no encontrado" });
    res.status(200).send(results[0]);
  });
});

// Editar perfil usando el token
app.put("/profile", async (req, res) => {
  const { username, password } = req.body;
  const token = req.headers["authorization"]?.split(" ")[1]; // Obtener el token del encabezado
  if (!token) {
    return res.status(401).send({ message: "Token no proporcionado" });
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultSecretKey"
    );
    const userId = decoded.id;
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 8);
    }
    const query = "UPDATE users SET username = ?, password = ? WHERE id = ?";
    const params = [username || null, hashedPassword || null, userId];
    db.query(query, params, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({ message: "Perfil actualizado" });
    });
  } catch (error) {
    return res.status(401).send({ message: "Token inválido" });
  }
});

// Actualizar usuario por ID
app.put("/users/:id", async (req, res) => {
  const userId = req.params.id;
  const { username, password } = req.body;
  let hashedPassword;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 8);
  }
  const query = "UPDATE users SET username = ?, password = ? WHERE id = ?";
  const params = [username || null, hashedPassword || null, userId];
  db.query(query, params, (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.status(200).send({ message: "Usuario actualizado" });
  });
});

// Eliminar usuario por ID
app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = "DELETE FROM users WHERE id = ?";
  db.query(query, [userId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) {
      return res.status(404).send({ message: "Usuario no encontrado" });
    }
    res.status(200).send({ message: "Usuario eliminado" });
  });
});

// Obtener productos
app.get("/products", (req, res) => {
  const query = "SELECT * FROM stock ";

  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
});

// Obtener Categorias
app.get("/categoria", (req, res) => {
  const query = "SELECT * FROM products ";

  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
});

// Ruta '/stock' para obtener datos
app.get("/stock", (req, res) => {
  const query = "SELECT * FROM stock ";
  db.query(query, (err, results) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(results);
  });
});

// Crear pedido
app.post("/orders", (req, res) => {
  const { user_id, total_price } = req.body;
  const query = "INSERT INTO orders (user_id, total_price) VALUES (?, ?)";
  db.query(query, [user_id, total_price], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ message: "Pedido creado" });
  });
});

app.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000");
});
