const User=require('../model/User.js');
const getWorkspaceUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: "approved",
        role: "member",   // ✅ IMPORTANT FILTER
      },
      attributes: ["id", "name", "role"],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch workspace members",
      error: error.message,
    });
  }
};

module.exports = { getWorkspaceUsers };