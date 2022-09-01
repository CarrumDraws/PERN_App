const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path"); // Work with directory paths

// MIDDLEWARE -----
app.use(express.json());
app.use(cors()); // Allows different-domain app interaction

app.use(express.static(path.join(__dirname, "client/build")));

if (process.env.NODE_ENV === "production") {
    // Serve static content here

    // _dirname = C:\Users\Carrum\ReactStuff\perntodoauth_heroku
    // path.join(__dirname, "client/build") =             
        // C:\Users\Carrum\ReactStuff\perntodoauth_heroku\client\build
    app.use(express.static(path.join(__dirname, "client/build")));
}

console.log(__dirname);
console.log(path.join(__dirname, "client/build"));

// ROUTES -----
// Register + Login
app.use("/auth", require("./routes/auth.js"));
// Dashboard
app.use("/dashboard", require("./routes/dashboard.js"));

app.listen(PORT, () => console.log(`PERN Server Started on ${PORT}`));
