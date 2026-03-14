const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware.js");
const {addComment,getTaskComments}=require('../controller/commentController.js');
const { get } = require("./taskRoutes");
router.post("/tasks/:taskId/comment",authMiddleware,addComment);
router.get("/tasks/:taskId/comments",authMiddleware,getTaskComments);
module.exports=router;