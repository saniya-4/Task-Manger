const ActivityLog=require('../model/ActivityLog.js');
const getActivityLogs=async(req,res)=>
{
    try{
        const {projectId}=req.params;
        const logs=await ActivityLog.findAll({
            where:{projectId},
            orders:[["createdAt","DESC"]]
        });
        res.json(logs);
    }catch(error)
    {
        res.status(500).json({error:error.message});
    }
};
module.exports={getActivityLogs};