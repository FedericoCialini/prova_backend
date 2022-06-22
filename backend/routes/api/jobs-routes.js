const express = require("express");
const {addJobToProject,getAllJobs,updateJob} = require("../../controllers/jobs-controller");
const {validateJobAdded} = require("../../middlewares/validation/jobs/validate-job");
const router = express();

router.get("/",getAllJobs);

router.post("/:pid([0-9]+)",validateJobAdded,addJobToProject);

router.patch("/:id([0-9]+)",validateJobAdded,updateJob);

module.exports = router;