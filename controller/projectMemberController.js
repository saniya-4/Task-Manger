const ProjectMember = require("../model/ProjectMember.js");
const Project = require("../model/Project.js");
const User = require("../model/User.js");
const sendNotification = require("../config/sendNotification.js");
const createActivityLog = require("../config/createActivityLog.js");
const addMember = async (req, res) => {
  try {
    const { projectId, userId, role } = req.body;
    const project = await Project.findByPk(projectId);
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const existingMember = await ProjectMember.findOne({
      where: {
        projectId,
        userId,
      },
    });
    if (existingMember) {
      return res.status(400).json({
        message: "User is already a member of this project",
      });
    }
    const member = await ProjectMember.create({
      projectId,
      userId,
      role,
    });
    await createActivityLog(
      projectId,
      req.user.id,
      "ADD_MEMBER",
      `${req.user.name} added ${user.name} to project ${project.title}`,
    );

    console.log("Project found:", project.title);
    console.log("Sending notification to:", userId);
    await sendNotification(
      userId,
      `You have been added to the project ${project.title}`,
    );
    res.status(201).json({ message: "Member added to project" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
const getProjectMembers = async (req, res) => {
  try {
    const members = await ProjectMember.findAll({
      where: { projectId: req.params.projectId },
      include: [
        {
          model: User,
          attributes: ["id", "name", "role"],
        },
      ],
    });
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
module.exports = { addMember, getProjectMembers };
