const express = require("express");
const Team = require("../models/team.model");
const { authMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const team = await Team.create(req.body);
  res.status(201).json(team);
});

router.get("/", authMiddleware, async (req, res) => {
  res.json(await Team.find());
});

router.get("/:id", authMiddleware, async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) return res.status(404).json({ message: "Team not found" });
  res.json(team);
});

router.post("/:id/add-member", authMiddleware, async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Name required" });
  }

  const team = await Team.findById(req.params.id);
  if (!team) {
    return res.status(404).json({ message: "Team not found" });
  }

  const newMember = { name };
  team.members.push(newMember);
  await team.save();

  res.status(201).json(newMember);
});


module.exports = router;
