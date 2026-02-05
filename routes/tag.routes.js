const express = require("express")
const Tag = require("../models/tag.model")
const { authMiddleware } = require("../middleware/auth.middleware")

const router = express.Router()

router.post("/", authMiddleware, async (req, res) => {
  res.status(201).json(await Tag.create(req.body))
})

router.get("/", authMiddleware, async (req, res) => {
  res.json(await Tag.find())
})

module.exports = router
