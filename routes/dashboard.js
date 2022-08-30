const express = require("express");
const router = express.Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Get All Todos (For User)
router.get("/", authorization, async (req, res) => {
  try {
    // Note: LEFT JOIN returns empty todo if no todo found
    const user = await pool.query(
      "SELECT users.user_name, todos.todo_id, todos.description FROM users LEFT JOIN todos ON users.user_id = todos.user_id WHERE users.user_id = $1;",
      [req.user.id]
    );
    res.json(user.rows);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// Create a Todo
router.post("/todos", authorization, async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todos (description, user_id) VALUES ($1, $2) RETURNING *",
      [description, req.user.id] // user_id comes from 'authorization'
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// Update a Todo
router.put("/todos/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todos SET description = ($1) WHERE todo_id = ($2) AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("This Todo Isn't Yours to Update.")
    }

    res.json(true);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// Delete a Todo
router.delete("/todos/:id", authorization, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM todos WHERE todo_id = ($1) AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );
    if (deleteTodo.rows.length === 0) {
      return res.json("This Todo Isn't Yours to Delete.");
    }
    res.json(true);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
