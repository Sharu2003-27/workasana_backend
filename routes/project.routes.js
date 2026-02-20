const express = require("express")
const Project = require("../models/project.model")
const { authMiddleware } = require("../middleware/auth.middleware")

const router = express.Router()

router.post("/", authMiddleware, async (req, res) => {
  res.status(201).json(await Project.create(req.body))
})

router.get("/", authMiddleware, async (req, res) => {
  res.json(await Project.find())
})

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ message: "Project not found" })
    res.json(project)
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch project" })
  }
})

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!project) return res.status(404).json({ message: "Project not found" })
    res.json(project)
  } catch (err) {
    res.status(500).json({ error: "Failed to update project" })
  }
})

module.exports = router
