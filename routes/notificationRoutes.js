const express=require("express");
const router=express.Router();
const authMiddleware=require('../middleware/authMiddleware.js');
const{getNotifications,markAsRead}=require('../controller/NotificationController.js');
router.get("/",authMiddleware,getNotifications);
router.patch("/:id/read",authMiddleware,markAsRead);
module.exports=router;