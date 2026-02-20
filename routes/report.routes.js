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

// Closed tasks by team, owner, or project
router.get("/closed-tasks", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ status: "Completed" })
      .populate("team", "name")
      .populate("project", "name")
      .populate("owners", "name")

    const { groupBy } = req.query // "team", "owner", or "project"

    if (!["team", "owner", "project"].includes(groupBy)) {
      return res.status(400).json({ error: "Invalid or missing groupBy parameter. Use 'team', 'owner', or 'project'." })
    }

    const aggregated = {}

    tasks.forEach(task => {
      if (groupBy === "team") {
        const key = task.team?.name || "Unknown Team"
        aggregated[key] = (aggregated[key] || 0) + 1
      } else if (groupBy === "project") {
        const key = task.project?.name || "Unknown Project"
        aggregated[key] = (aggregated[key] || 0) + 1
      } else if (groupBy === "owner") {
        task.owners.forEach(owner => {
          const key = owner.name || "Unknown Owner"
          aggregated[key] = (aggregated[key] || 0) + 1
        })
      }
    })

    res.json(aggregated)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch closed tasks" })
  }
})

module.exports = router
