const Resume = require("../models/resumeModel");
const ai = require("../config/openai");

// controller for enhancing a resume professional summary using OpenAI API
// POST /api/ai/enhance-professional-summary

const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Professional summary is required",
      });
    }

    // Enhance the professional summary using OpenAI API
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            `You are an AI assistant that rewrites professional summaries 
            in exactly 2–3 short lines ATS friendly. 
            Keep it concise, professional, and impactful. 
            Do NOT add new skills or details not provided by the user. 
            Final output must be under 60 words. 
            No long paragraphs. No bullet points.`
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    // Extract the enhanced professional summary from the response
    const enhancedSummary = response.choices[0].message.content;
    // Return the enhanced professional summary
    res.status(200).json({
      message: "Professional Summary Enhanced",
      enhancedSummary,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

// controller for generating a resume job description using OpenAI API
// POST /api/ai/enhance-job-description

const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;

    if (!userContent) {
      return res.status(400).json({
        message: "Description is required",
      });
    }

    // Enhance the professional summary using OpenAI API
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content:
            `
            You are an AI assistant that rewrites professional summaries 
            in exactly 2–3 short lines. 
            Keep it concise, professional, and impactful. 
            Do NOT add new skills or details not provided by the user. 
            Final output must be under 60 words. 
            No long paragraphs. No bullet points.
          `
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    // Extract the enhanced professional summary from the response
    const enhancedDescription = response.choices[0].message.content;
    // Return the enhanced professional summary
    res.status(200).json({
      message: "Description Enhanced",
      enhancedDescription,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

// controller for uploading exsisting a resume to database
const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;
    if (!resumeText) {
      return res.status(400).json({
        message: "Resume text is required",
      });
    }

    const systemPrompt =
      "You are a helpful ai assistant that extract data from resume.";
    const userPrompt = `Extract data from resume: ${resumeText}
     
     Provide data in JSON format with no additional text before or after:
     {
     professional_summary:{type:String, default:""},
    skills:[{type:String}],
    personal_info:{
        image:{type:String, default:""},
        full_name:{type:String, default:""},
        profession:{type:String, default:""},
        phone:{type:String, default:""},
        location:{type:String, default:""},
        email:{type:String, default:""},
        linkedin:{type:String, default:""},
        website:{type:String, default:""},
    },
    experience:[{
        company:{type:String},
        position:{type:String},
        start_date:{type:Date},
        end_date:{type:Date},
        description:{type:String},
        is_current:{type:Boolean, default:false}
    }],
    projects:[{
        name:{type:String},
        type:{type:String},
        description:{type:String},
    }],
    education:[{
        institution:{type:String},
        degree:{type:String},
        field:{type:String},
        graduation_date:{type:String},
        gpa:{type:String},
    }]
     }`;

    // Enhance the professional summary using OpenAI API
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    // Extract the enhanced professional summary from the response
    const extractedData = response.choices[0].message.content;
    const parsedData = JSON.parse(extractedData);
    const newResume = await Resume.create({
      userId,
      title,
      ...parsedData,
    });
    res.json({ resumeId: newResume._id });
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = {
    uploadResume,
    enhanceJobDescription,
    enhanceProfessionalSummary,
}