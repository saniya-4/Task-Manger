const Notification=require('../model/Notification');
const getNotifications=async(req,res)=>
{
    try{
       const notifications=await Notification.findAll({
        where:{userId:req.user.id},
        order:[["createdAt","DESC"]]
       });
       res.json(notifications);
    }catch(error)
    {
        res.status(500).json({error:error.message});
    }
}
const markAsRead=async(req,res)=>
{
    try{
        const {id}=req.params;
        const notification=await Notification.findByPk(id);
        if(!notification)
        {
            return res.status(404).json({
                message:"Notification not found"
            });
        }
        notification.isRead=true;
        await notification.save();
        res.json({message:"Notification marked as read"});
    }catch(error)
    {
        res.status(500).json({error:error.message});
    }
}
module.exports={getNotifications,markAsRead};