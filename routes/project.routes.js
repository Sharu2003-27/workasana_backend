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

module.exports = router
