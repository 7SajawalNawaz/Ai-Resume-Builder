const express = require("express")
const { enhanceProfessionalSummary, enhanceJobDescription, uploadResume } = require("../controllers/aiController")
const { protect } = require("../middleware/authMiddleware")

const aiRouter = express.Router()

// POST /api/ai/enhance-professional-summary
aiRouter.post("/enhance-professional-summary", protect ,  enhanceProfessionalSummary)

// POST /api/ai/enhance-job-description
aiRouter.post("/enhance-job-description", protect ,  enhanceJobDescription)

// POST /api/ai/upload-resume
aiRouter.post("/upload-resume", protect ,  uploadResume)

module.exports = aiRouter