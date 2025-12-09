const express = require("express");
const { createResume, updateResume, deleteResume, getResumeByIdPublic, getResumeByIdProtected } = require("../controllers/ResumeController");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../config/multer");

const resumeRouter = express.Router();

// controller for creating a new resume
// POST: /api/resumes/create
resumeRouter.post("/create", protect , createResume);
// UPDATE: /api/resumes/update
resumeRouter.put("/update" , upload.single("image") , protect , updateResume )
// DELETE: /api/resumes/delete
resumeRouter.delete("/delete/:resumeId" , protect , deleteResume);
// GET: /api/resumes/get
resumeRouter.get("/get/:resumeId" , protect , getResumeByIdProtected)
// GET: /public/resumes/get/:resumeId
resumeRouter.get("/public/:resumeId" , getResumeByIdPublic)

module.exports = resumeRouter;