const {checkStatus,checkPrice} = require("../validator_utils/job-validation-utils");

const validateAddedProject = (req, res, next) =>{
        const {title,jobs} = req.body
        if (!title || title===""){
             next({message: "Title is empty",code:400});
        }
        if (!jobs || jobs.length===0){
            next({message: "No jobs founded",code:400});
        }
        const check_all_status = jobs.every(job=>{
            return checkStatus(job.status) && checkPrice(job.price);
        })
        if (!check_all_status){
            next({message: "An invalid Job was sent",code:400});
        }
        next();
}

module.exports = {
    validateAddedProject
}