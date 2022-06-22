const express = require("express");
const project_routes = require("./routes/api/projects-routes");
const jobs_routes = require("./routes/api/jobs-routes");
const {notFoundRoute,errorHandler} = require("./middlewares/error-handler");
const app = express();

app.use(express.json());

app.use("/api/projects",project_routes)
app.use("/api/jobs",jobs_routes)


app.use(notFoundRoute);
app.use(errorHandler);


app.listen(5000,()=>{
    console.log("listening on port 5000");
})

module.exports = app;
