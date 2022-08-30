const express = require("express");
const app = express();
const cors = require("cors");

// MIDDLEWARE -----
app.use(express.json());
app.use(cors()); // Allows different-domain app interaction

// ROUTES -----
// Register + Login
app.use("/auth", require("./routes/auth.js"));
// Dashboard
app.use("/dashboard", require("./routes/dashboard.js"));

app.listen(5000, () => console.log("PERN Server Started"));
