const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware.js");
const authorizeRole=require("../middleware/authorizeRole.js");
const {getPendingUsers,assignRole}=require("../controller/adminController.js");
router.get("/pending-users",authMiddleware,authorizeRole("admin"),getPendingUsers);
router.patch("/assign-role/:id",authMiddleware,authorizeRole("admin"),assignRole);
module.exports=router;
