const ActivityLog=require('../model/ActivityLog.js');
const createActivityLog=async(projectId,userId,action,details)=>{
    try{
        await ActivityLog.create({
            projectId,
            userId,
            action,
            details
        });

    }catch(error)
    {
        console.log("Activity log error",error.message);
    }
}
module.exports=createActivityLog;