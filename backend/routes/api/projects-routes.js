const express = require("express");
const router = express();
const {addProject,getProjectById,getProjects} = require("../../controllers/projects-controller");
const {validateAddedProject} = require("../../middlewares/validation/projects/validate-project");


router.get("/:pid([0-9]+)",getProjectById);
router.get("/",getProjects);
router.post("/",validateAddedProject,addProject);


module.exports = router;