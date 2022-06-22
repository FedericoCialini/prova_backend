const pool = require("../config/db-config");
const {
    addProjectQuery,
    getProjectWithJobsQuery,
    getProjectsIdsArrQuery
} = require("../queries-utils/projects-queries");

const {addJobToProjectQuery} = require("../queries-utils/jobs-queries");



const getProjectWithJobs =async (pid) =>{
    try {
        const query = getProjectWithJobsQuery();
        const [result,] = await pool.query(query,[parseInt(pid)])
        const {title} = result[0];
        return {title, pid, jobs : result.reduce((jobs_arr,job)=>{
                return jobs_arr.concat({status:job.status,
                    price : job.price,
                    creationDate : job.creationDate,
                    project_id : job.project_id})},[])
        }
    }catch (e) {
        throw new Error(e.toString())
    }
}

const getProjects = async (req,res,next)=>{
    try {
        const query = getProjectsIdsArrQuery();
        const [projects_id_arr,] = await pool.query(query,[]);
        const projects_arr = [];
        await Promise.all(projects_id_arr.map(async project_id =>{
            projects_arr.push(await getProjectWithJobs(project_id.id))
        }));
        res.status(200).json(projects_arr);
    }catch (e) {
        next({message:e.toString(),code:404});
    }
}

const getProjectById = async (req,res,next) =>{
    try {
        const {pid} = req.params;
        const project_with_jobs_arr = await getProjectWithJobs(pid)
        res.status(200).json(project_with_jobs_arr);
    }catch (e) {
        next({message:"project not found",code:404});
    }
}

const addProject = async (req,res,next) =>{
    try {const {title,jobs} = req.body;
        let query = addProjectQuery();
        const [project_result, ] = await pool.query(query,[title])
        query = addJobToProjectQuery();
        await Promise.all(jobs.map(async job=>{
            await pool.query(query,[new Date(),parseFloat(job.price),job.status,project_result.insertId]);
        }));
        const added_project = await getProjectWithJobs(project_result.insertId);
        res.status(200).json(added_project);
    }catch (e) {
        next({message:e.toString(),code:500});

    }
}


module.exports = {
    addProject,
    getProjectById,
    getProjects,
}