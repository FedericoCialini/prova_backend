const selectJobByIdQuery = () =>{
    return "SELECT * FROM jobs WHERE id=?";
}


const addJobToProjectQuery = () =>{
    return "INSERT INTO jobs (creationDate,price,status,project_id) VALUES(?,?,?,?)";
}

const getAllJobsQuery = (params) =>{
    const {status,order} = params;
    let query = "SELECT * FROM jobs";
    status && (query = query.concat(` WHERE status = \'${status}\' `));
    order &&  (query = query.concat(` ORDER BY creationDate ${order}`));
    return query
}

const updateJobByIdQuery = () =>{
    return "UPDATE jobs SET price = ?, status = ? WHERE id = ?";
}

module.exports = {
    selectJobByIdQuery,
    addJobToProjectQuery,
    getAllJobsQuery,
    updateJobByIdQuery
}