const bcrypt=require("bcrypt");
const User=require("../model/User.js");
const createAdmin=async()=>
{
    try{
        const adminExists=await User.findOne({
            where:{role:"admin"}
        });
        if(!adminExists)
        {
            const hashedPassword=await bcrypt.hash("124",10);
            await User.create({
                name:"Saniya",
                password:hashedPassword,
                role:"admin",
                status:"approved"
            });
            console.log("Default Admin created");
        }
        else{
            console.log("Admin already exists");
        }
    }catch(error)
    {
        console.log("Error creating the admin",error);
    }
}
module.exports=createAdmin;