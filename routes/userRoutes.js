const express=require("express");
const router=express.Router();
const authMiddleware=require('../middleware/authMiddleware');
const authorizeRole=require('../middleware/authorizeRole');
const {getWorkspaceUsers} =require('../controller/userController');
router.get(
  "/workspace-users",
  authMiddleware,
  authorizeRole("admin", "manager"),
  getWorkspaceUsers
);
module.exports = router;