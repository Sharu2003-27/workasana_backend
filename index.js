const { intializeDatabase } = require("./db/connect.db")
const express = require("express")
const cors = require("cors")
require("dotenv").config()

intializeDatabase()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth", require("./routes/auth.routes"))
app.use("/tasks", require("./routes/task.routes"))
app.use("/teams", require("./routes/team.routes"))
app.use("/projects", require("./routes/project.routes"))
app.use("/tags", require("./routes/tag.routes"))
app.use("/report", require("./routes/report.routes"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})

module.exports = app
