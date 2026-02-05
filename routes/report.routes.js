const express = require("express")
const Task = require("../models/task.model")
const { authMiddleware } = require("../middleware/auth.middleware")

const router = express.Router()

// Last week completed tasks
router.get("/last-week", authMiddleware, async (req, res) => {
  const lastWeek = new Date()
  lastWeek.setDate(lastWeek.getDate() - 7)

  const tasks = await Task.find({
    status: "Completed",
    updatedAt: { $gte: lastWeek }
  })

  res.json(tasks)
})

// Pending work
router.get("/pending", authMiddleware, async (req, res) => {
  const tasks = await Task.find({ status: { $ne: "Completed" } })

  const totalDays = tasks.reduce(
    (sum, t) => sum + (t.timeToComplete || 0),
    0
  )

  res.json({ pendingDays: totalDays })
})

module.exports = router
