const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware.js")
const authorizeRole=require("../middleware/authorizeRole.js");
const {createProject}=require("../controller/projectController.js");
router.post("/create",authMiddleware,authorizeRole("admin","manager"),createProject);
module.exports=router;
