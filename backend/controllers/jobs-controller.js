const {addJobToProjectQuery,
       getAllJobsQuery,
       updateJobByIdQuery,
       selectJobByIdQuery} = require("../queries-utils/jobs-queries");

const pool = require("../config/db-config");

const {checkStatus} = require("../middlewares/validation/validator_utils/job-validation-utils");

const getAllJobs = async (req,res,next) =>{
    try {
        if (req.query.status && !checkStatus(req.query.status)){
            throw new Error("status error")
        }
        if(req.query.order && !['ASC','DESC'].includes(req.query.order.toUpperCase())){
            throw new Error("order can be ASC or DESC");

        }
        const query = getAllJobsQuery(req.query);
        const [result,] = await pool.query(query,[]);
        res.status(200).json(result);
    }catch (e) {
        next({message:e.toString(),code:500});
    }
}

const addJobToProject = async (req,res,next)=>{
    try {
        const {pid} = req.params;
        const {price,status} = req.body;
        let query = addJobToProjectQuery(pid);
        const [result,] = await pool.query(query,[new Date(),parseFloat(price),status,pid]);
        query = selectJobByIdQuery();
        const [addedJob,] = await pool.query(query,[result.insertId]);
        res.status(200).json(addedJob[0]);
    }catch (e) {
        next({message:e.toString(),code:500});
    }
}

const updateJob = async (req,res,next) =>{
    try{
        let query = updateJobByIdQuery();
        const {id} = req.params;
        const {price,status} = req.body;
        await pool.query(query,[price,status,id])
        query = selectJobByIdQuery();
        const [updatedJob,] = await pool.query(query,[id]);
        res.status(200).json(updatedJob[0]);

    }catch (e) {
        next({message:e.toString(),code:500});
    }
}

module.exports ={
    addJobToProject,
    getAllJobs,
    updateJob
}