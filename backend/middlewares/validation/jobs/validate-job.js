const {checkStatus,checkPrice} = require("../validator_utils/job-validation-utils");


const validateJobAdded = (req, res, next) =>{
    try {
        const {price,status} = req.body;
        if (!checkPrice(price)){
            next({message:"Price error",code:400});
        }
        if(!checkStatus(status)){
            next({message:"Status error",code:400})}
        next();
    } catch (e) {
        next({message:"Jobs not valid : " + e.toString(),code:500})
    }
}

module.exports ={
    validateJobAdded
}