const Project = require("../models/Project");
const User = require("../models/User");

exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, admin: req.user.id, members: [req.user.id] });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ members: req.user.id }).populate("members", "name email");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addMember = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    if (project.admin.toString() !== req.user.id) return res.status(403).json({ message: "Not authorized" });
    if (project.members.includes(user._id)) return res.status(400).json({ message: "Already a member" });

    project.members.push(user._id);
    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};