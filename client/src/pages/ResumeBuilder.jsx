import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { dummyResumeData } from "../assets/assets";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  EyeOff,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import PersonalInfoForm from "../components/FormResume/PersonalInfoForm";
import ResumePreview from "../components/FormResume/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPicker from "../components/ColorPicker";
import ProfessionalSummary from "../components/ProfessionalSummary";
import ExperienceForm from "../components/ExperienceForm";
import EducationForm from "../components/EducationForm";
import ProjectForm from "../components/ProjectForm";
import Skillsform from "../components/Skillsform";
import { useSelector } from "react-redux";
import api from "../config/api";
import {toast} from 'react-hot-toast'


const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const {token} = useSelector((state) => state.auth);

  const [resumeData, setResumedata] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    education: [],
    project: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const loadExsisitingResume = async () => {
    try{
      const {data}= await api.get(`/api/resumes/get/${resumeId}` ,{
        headers: {
          Authorization: token
      }})
      if(data.resumes){
        setResumedata(data.resumes)
        document.title = data.resumes.title;
      }
    }catch(err){
      console.error(err.response.data.message)
    }
  };

  const [activeSection, setActiveSection] = useState(0);
  const [removeBg, setRemoveBg] = useState(false);

  const sections = [
    { id: "personal", name: "Personal Information", icon: User },
    {
      id: "professional_summary",
      name: "Professional Summary",
      icon: FileText,
    },
    { id: "experience", name: "Work Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "project", name: "Projects", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSectionData = sections[activeSection];

  useEffect(() => {
    loadExsisitingResume();
  },[]);

  const changeResumeVisibility =  async () =>{
    try{
      const formData = new FormData();
      formData.append('resumeId', resumeId);
      formData.append('resumeData', JSON.stringify({public: !resumeData.public}));

      const {data}= await api.put('/api/resumes/update/' , formData,{
        headers: {
          Authorization: token
      }})

      setResumedata({...resumeData, public: !resumeData.public})
      toast.success(data.message)

    }catch(err){
      toast.error(err.response.data.message)
    }
  }

  const handleShareResume = () =>{
    const frontendUrl = window.location.href.split('/app')[0];
    const resumeUrl = frontendUrl + '/view/' + resumeId;

    if(navigator.share){
      navigator.share({url: resumeUrl , text: 'Check out my resume'})

    }else{
      alert('Share not supported')
    }
  }

  const handleDownloadResume = () => {
    window.print();
  }

  const saveResume = async () =>{
    try{
      let updatedResumeData = structuredClone(resumeData)
      // remove image from updateresumeDatta
      if(typeof resumeData.personal_info.image === 'object'){
        delete updatedResumeData.personal_info.image
      }

      const formData = new FormData()
      formData.append("resumeId" , resumeId)
      formData.append("resumeData" , JSON.stringify(updatedResumeData))
      removeBg && formData.append("removeBg" , 'yes')
      typeof resumeData.personal_info.image === 'object' && formData.append("image" ,
        resumeData.personal_info.image
      )

      const {data}= await api.put('/api/resumes/update' , formData,{
        headers: {
          Authorization: token
      }})
      setResumedata(data.resume)
      toast.success(data.message)
      
    }catch(err){
      toast.error(err.response.data.message)
    }
  }

  return (
    <div>
      {/* Back to dashboard*/}
      <div className="max-w-7xl mx-auto px-4 py-6 ">
        <Link
          className="inline-flex gap-2 items-center text-slate-500 hover:text-custompurple 
        transition-all"
          to="/app"
        >
          <ArrowLeftIcon className="size-4" />
          Back to Dashboard
        </Link>
      </div>
      {/* Resume Builder */}'
      <div className="max-w-7xl mx-auto px-4 pb-8 ">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Pannel - Form */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div
              className="bg-white rounded-lg shadow-sm border border-gray-200
            p-6 pt-1"
            >
              {/* Progress bar using active section */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />
              <hr
                className="absolute top-0 left-0 h-1 bg-linear-to-r
              from-custompurple to-purple-700 border-none transition-all
              duration-2000 "
                style={{
                  width: `${((activeSection + 1) * 100) / sections.length}%`,
                }}
              />

              {/* section navigation */}
              <div
                className="flex justify-between items-center mb-6 
              border-b border-gray-300 py-1"
              >
                {/* change template and colors */}
                {/* template selector */}
                <div className="flex items-center gap-2">
                  <TemplateSelector selectedTemplate={resumeData.template}
                  onChnage={(template)=>setResumedata(prev=>({...prev,template}))}/>

                  {/* color */}
                  <ColorPicker selectedColor={resumeData.accent_color} 
                  onChange={(color)=>setResumedata(prev=>({...prev,accent_color:color}))}/>
                </div>
                

                {/* next--- preview */}
                <div className="flex items-center">
                  {activeSection !== 0 && (
                    <button
                      disabled={activeSection === 0}
                      onClick={() =>
                        setActiveSection((prevIndex) =>
                          Math.max(prevIndex - 1, 0)
                        )
                      }
                      className="flex items-center gap-1
                      p-3 rounded-lg text-sm font-medium text-gray-600
                      hover:bg-purple-50 transition-all"
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}
                  <button
                      disabled={activeSection === sections.length - 1}
                      onClick={() =>
                        setActiveSection((prevIndex) =>
                          Math.min(prevIndex + 1, sections.length - 1)
                        )
                      }
                      className={`flex items-center gap-1
                      p-3 rounded-lg text-sm font-medium text-gray-600
                      hover:bg-purple-50 transition-all ${activeSection === sections.length - 1 && 'opacity-50'}`}
                    >
                      <ChevronRight className="size-4" /> Next
                    </button>
                </div>
              </div>

              {/* form content */}

              <div className="space-y-6">
                {
                  activeSectionData.id === 'personal' &&(
                      <PersonalInfoForm data={resumeData.personal_info}
                      onChange={(data)=>setResumedata(prev => ({...prev,personal_info:data}))}
                      removeBg={removeBg}
                      setRemoveBg={setRemoveBg}/> 
                  )
                }
                {
                  activeSectionData.id === 'professional_summary' &&(
                      <ProfessionalSummary
                      data={resumeData.professional_summary}
                      onChange={(data)=> setResumedata(prev => ({...prev , 
                        professional_summary: data
                      }))}
                      setResumedata={setResumedata}
                      />
                      )}

                      {
                  activeSectionData.id === 'experience' &&(
                    <ExperienceForm data={resumeData.experience}
                     onChange={(data)=> setResumedata(prev => ({...prev , 
                        experience: data
                      }))}
                      />
                  )
                      }

                       {
                  activeSectionData.id === 'education' &&(
                    <EducationForm data={resumeData.education}
                     onChange={(data)=> setResumedata(prev => ({...prev , 
                        education: data
                      }))}
                      />
                  )
                      }

                      {
                  activeSectionData.id === 'project' &&(
                    <ProjectForm data={resumeData.project}
                     onChange={(data)=> setResumedata(prev => ({...prev , 
                        project: data 
                      }))}
                      />
                  )
                      }

                      {
                  activeSectionData.id === 'skills' &&(
                    <Skillsform data={resumeData.skills}
                    onChange={(data) => setResumedata(prev => ({...prev,
                      skills: data
                    }))}
                    />
                  )
                      }

              </div>


              <button
              onClick={()=> {toast.promise(saveResume , {loading:'Saving...'})}}
              className="bg-linear-to-br from-purple-700 to-custompurple
              ring-purple-300 text-white ring hover:ring-purple-400
              transition-all rounded-md px-6 py-2 mt-6 text-sm">Save Changes</button>


            </div>
          </div>

          {/* Right Pannel - Preview*/}
          <div className="lg:col-span-7 max-lg:mt-6"> 

            <div className="relative w-full">
              {/* Buttons */}
              <div className="absolute bottom-3 left-0 right-0 flex
              items-center justify-end gap-2">
                {
                  resumeData.public && (
                    <button
                    onClick={handleShareResume}
                    className="flex items-center p-2 px-2
                    gap-2 text-xs bg-linear-to-br from-purple-100
                    to-purple-200 text-custompurple rounded-lg ring-purple-400
                    hover:ring transition-colors">
                      <Share2Icon className="size-4" />
                      Share
                    </button>
                  )
                }

                <button 
                onClick={changeResumeVisibility}
                className="flex items-center p-2 px-2
                    gap-2 text-xs bg-linear-to-br from-purple-100
                    to-purple-200 text-custompurple rounded-lg ring-purple-400
                    hover:ring transition-colors">
                  {
                    resumeData.public ? <EyeIcon className="size-4"/> : <EyeOff className="size-4" />

                  }
                  {
                    resumeData.public ? 'Public' : 'Private'
                  }
                </button>

                <button 
                onClick={handleDownloadResume}
                className="flex items-center p-2 px-2
                    gap-2 text-xs bg-linear-to-br from-purple-100
                    to-purple-200 text-custompurple rounded-lg ring-purple-400
                    hover:ring transition-colors">
                      <DownloadIcon className="size-4"/>
                      Download
                </button>
              </div>
            </div>

            {/* Resume Preview */}

             <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
