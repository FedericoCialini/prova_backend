function errorHandler (err,req,res,next){
    return res.status(err.code || 500).json({message:err.message || "Not Found!"});
}

function notFoundRoute(req,res,next){
    return res.status(404).json({message : "Cannot found this route"});
}

module.exports = {
    notFoundRoute,
    errorHandler
}