const express=require("express");
const router=express.Router();
const authMiddleware=require('../middleware/authMiddleware.js');
const {getActivityLogs}=require('../controller/activityController.js');
router.get("/project/:projectId",authMiddleware,getActivityLogs);
module.exports=router;