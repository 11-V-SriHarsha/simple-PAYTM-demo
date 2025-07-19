const express = require("express");

const cors = require('cors')

const mainRouter = require('./routes/index');

const app = express();

app.use(cors())

app.use(express.json())


app.use("/api/v1", mainRouter);

app.get("/", (req, res) => {
    res.send("✅ Server is running");
});

app.listen(3000, () => {
    console.log("🚀 Backend server is running on http://localhost:3000")
})


