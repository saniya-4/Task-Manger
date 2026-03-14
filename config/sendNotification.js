const Notification=require('../model/Notification');
const sendNotification=async(userId,message)=>
{
    try{
        await Notification.create(
            {
                userId:userId,
                message:message
            }
        );
    }catch(error)
    {
        console.log("Notification error",error.message);
    }
};
module.exports=sendNotification;