require("dotenv").config(); 

const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path"); // Work with directory paths

// MIDDLEWARE -----
app.use(express.json());
app.use(cors()); // Allows different-domain app interaction

// Serve static build files
app.use(express.static(path.join(__dirname, "client/build")));

// ROUTES -----
// Register + Login
app.use("/auth", require("./routes/auth.js"));
// Dashboard
app.use("/dashboard", require("./routes/dashboard.js"));

app.get("/*", (req, res) => {
    console.log("Caught by Catchall!");
    res.sendFile(path.join(__dirname, "client/build/index.html"));
})

app.listen(PORT, () => console.log(`PERN Server Started on ${PORT}`));
