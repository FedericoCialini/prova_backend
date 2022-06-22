const getProjectsIdsArrQuery = () =>{
    return "SELECT id FROM projects";
}

const addProjectQuery = () =>{
    return "INSERT INTO projects (title) VALUE (?)"
}


const getProjectWithJobsQuery = () =>{
    return "SELECT * FROM projects p LEFT JOIN jobs j ON p.id = j.project_id WHERE p.id=?"
}

module.exports={
    addProjectQuery,
    getProjectWithJobsQuery,
    getProjectsIdsArrQuery
}