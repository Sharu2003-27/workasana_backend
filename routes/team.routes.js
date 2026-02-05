const express = require("express")
const Team = require("../models/team.model")
const { authMiddleware } = require("../middleware/auth.middleware")

const router = express.Router()

router.post("/", authMiddleware, async (req, res) => {
  const team = await Team.create(req.body)
  res.status(201).json(team)
})

router.get("/", authMiddleware, async (req, res) => {
  res.json(await Team.find())
})

module.exports = router
