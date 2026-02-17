require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require ("./config/db");


const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./router/authRouters"));
app.use("/api/tasks", require("./router/taskRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log (`Server running on http://localhost ${PORT}`));