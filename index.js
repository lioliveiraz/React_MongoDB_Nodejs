const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());

connectDB();

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API running"));

app.use("/api/users", require("./routes/api/users/users"));
app.use("/api/techs", require("./routes/api/technologies/technologies"));
app.use("/api/login", require("./routes/api/users/login"));
app.use("/api/profile", require("./routes/api/profile/profile"));
app.use("/api/wall", require("./routes/api/wall/wall"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
