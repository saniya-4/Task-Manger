const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware.js");
const authorizeRole=require("../middleware/authorizeRole.js");
const{addMember,getProjectMembers}=require("../controller/projectMemberController.js");
router.post("/add-member",authMiddleware,authorizeRole("admin","manager"),addMember);
router.get("/:projectId/members",authMiddleware,getProjectMembers);
module.exports=router;