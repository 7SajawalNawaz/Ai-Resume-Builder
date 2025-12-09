const Resume = require("../models/ResumeModel");
const imageKit = require("../config/imagekit");
const fs = require("fs");

// controller for creating a new resume
// POST: /api/resumes/create
const createResume = async (req, res) => {
  try {
    // userId from protected route
    const userId = req.userId;
    const { title } = req.body;

    // create new resume
    const newResume = await Resume.create({
      userId,
      title,
    });
    // return new resume
    return res
      .status(201)
      .json({
        success: true,
        message: "Resume created successfully",
        resume: newResume,
      });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// controller for deleting a resume
// DELETE: /api/resumes/delete/:id
const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findByIdAndDelete({ userId, _id: resumeId });

    // return success message
    return res.status(200).json({ success: true, message: "Resume deleted" });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// get all resumes for a user
// GET: /api/resumes/getall
const getResumeByIdProtected = async (req, res) => {
  try {
    // userId from protected route
    const userId = req.userId;
    const { resumeId } = req.params;

    const resumes = await Resume.findOne({ userId, _id: resumeId });

    if (!resumes) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    }

    // return resumes
    resumes.__v = undefined;
    resumes.createdAt = undefined;
    resumes.updatedAt = undefined;
    return res.status(200).json({ success: true, resumes });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// get resume by id public
// GET: /api/resumes/public
const getResumeByIdPublic = async (req, res) => {
  try {
    const { resumeId } = req.params;

    const resumes = await Resume.findOne({ public: true, _id: resumeId });

    if (!resumes) {
      return res
        .status(404)
        .json({ success: false, message: "Resume not found" });
    }

    // return resumes
    return res.status(200).json({ success: true, resumes });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// controller for updating a resume
// PUT: /api/resumes/update/:id
const updateResume = async (req, res) => {
  try {
    // userId from protected route
    const userId = req.userId;
    // const {resumeId} = req.params;
    const {resumeId , resumeData, removeBg } = req.body;
    const image = req.file;

    let resumeDataCopy;
    if(typeof resumeData === 'string'){
      resumeDataCopy = await JSON.parse(resumeData);
    } else {
      resumeDataCopy = resumeData;
    }

    // update image if removeBg is true
    if (image) {

        const imageBufferData = fs.readFileSync(image.path);
        const response = await imageKit.upload({
        file: imageBufferData,
        fileName: "resume-image.png",
        transformation:{
            pre: "w-300,h-300,fo-face,z-0.4" + (removeBg ? ",e-bgremove" : "")
        }
      });
        resumeDataCopy.personal_info.image = response.url;
    }

    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },
      resumeDataCopy,
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Resume updated", resume });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};


module.exports = {
    createResume,
    deleteResume,
    getResumeByIdProtected,
    getResumeByIdPublic,
    updateResume,
}
