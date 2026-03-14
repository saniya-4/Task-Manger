const User=require("../model/User.js");
const getPendingUsers=async(req,res)=>
{
    try{
        const users=await User.findAll({
            where:{status:"pending"}
        });
        console.log("Users found",users);
        res.json(users);
    }catch(error)
    {
        console.log("error",error);
        res.status(500).json({error:error.message});
    }
}
const assignRole=async(req,res)=>
{
    try{
        const {role}=req.body;
        if(!["manager","member"].includes(role))
        {
            return res.status(400).json({
                message:"Role must be manager or member"
            });
        }
        const user=await User.findByPk(req.params.id);
        if(!user)
        {
            return res.status(400).json({message:"User not found"});
        }
        user.role=role;
        user.status="approved";
        await user.save();
        res.json({
            message:"Role assigned successfully",
            user
        });
    }catch(error)
    {
        res.status(500).json({error:error.message});
    }
}
module.exports={getPendingUsers,assignRole};