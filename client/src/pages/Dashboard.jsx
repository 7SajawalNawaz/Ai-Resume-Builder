import {
  DeleteIcon,
  FilePenLineIcon,
  LoaderCircle,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../config/api";
import { toast } from "react-hot-toast";
import pdfToText from "react-pdftotext";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  // all resume
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResumes, setShowCreateResumes] = useState(false);
  const [uploadResumes, setUploadResumes] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResume, setEditResume] = useState(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const colors = ["#9333ae", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const loadAllResumes = async () => {
    try{
      const { data } = await api.get("/api/users/resume/data", {
        headers: {
          Authorization: token,
        },
      });
      setAllResumes(data.resumes);
      
    }catch(err){

      toast.error(err.response.data.message || err.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post(
        "/api/resumes/create",
        { title },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResumes(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (err) {
      toast.error(err.response.data.message || err.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      const resumeText = await pdfToText(resume);
      const { data } = await api.post(
        "/api/ai/upload-resume",
        { title, resumeText },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTitle("")
      setResume(null);
      setUploadResumes(false);
      toast.success("Resume uploaded")
      navigate(`/app/builder/${data.resumeId}`);

    }catch(err){
      toast.error(err.response.data.message || err.message);
    }
    setIsLoading(false);
  };

  const editTitle = async (event) => {
    try{
      event.preventDefault();

      const { data } = await api.put(
        `/api/resumes/update/` ,{resumeId: editResume, resumeData: {title}},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAllResumes(allResumes.map(resume => resume._id === editResume ? {...resume, title} : resume))
      setTitle("")
        setEditResume('')
        toast.success("Resume title updated");
    }catch(err){
      toast.error(err.response.data.message || err.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try{

      const confirm = window.confirm(
      "Are you sure you want to delete this resume?"
    );
    if (confirm) {
      const { data } = await api.delete(
        `/api/resumes/delete/${resumeId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setAllResumes(allResumes.filter((resume) => resume._id !== resumeId));
      toast.success("Resume deleted");
    }

    }catch(err){
      toast.error(err.response.data.message || err.message);
    }   
    }


  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-custompurple to-purple-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Sajawal Nawaz
        </p>

        {/* two button */}

        {/* button 1 create resume */}
        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResumes(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-purple-600 border border-dashed border-purple-300 hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-purple-300 to-purple-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-custompurple transition-all">
              Create Resume
            </p>
          </button>

          {/* button 2 create resume */}

          <button
            onClick={() => setUploadResumes(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-green-600 border border-dashed border-green-300 hover:border-green-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-green-300 to-green-500 text-white rounded-full" />
            <p className="text-sm group-hover:text-green-600 transition-all">
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[350px]" />
        {/* dummy resume data */}

        <div className="grid grid-col-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColors = colors[index % colors.length];
            return (
              <button
                onClick={() => navigate(`/app/builder/${resume._id}`)}
                key={index}
                className="group relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group-hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColors}10, ${baseColors}40)`,
                  borderColor: baseColors + "40",
                }}
              >
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColors }}
                />
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center "
                  style={{ color: baseColors }}
                >
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{ color: baseColors + "90" }}
                >
                  Update On {new Date(resume.updatedAt).toLocaleString()}
                </p>

                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute top-1 right-1 group-hover:flex items-center hidden"
                >
                  <TrashIcon
                    onClick={() => deleteResume(resume._id)}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                  <PencilIcon
                    onClick={() => {
                      setEditResume(resume._id);
                      setTitle(resume.title);
                    }}
                    className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* popup of create resumes */}
        {showCreateResumes && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResumes(false)}
            className="fixed  inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="realtive bg-purple-50 border shadow-sm rounded-lg
              w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Create a resume</h2>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full
                px-4 py-2 mb-4 focus:border-purple-600 ring-purple-600"
                required
              />
              <button
                className="w-full py-2 bg-custompurple text-white rounded  hover:bg-purple-700
                transition-colors"
              >
                Create Resume
              </button>

              <XIcon
                className="absolute top-4 right-4 text-purple-400 
                hover:text-custompurple cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResumes(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/* popup of upload existing resume*/}

        {uploadResumes && (
          <form
            onSubmit={uploadResume}
            onClick={() => setUploadResumes(false)}
            className="fixed  inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="realtive bg-purple-50 border shadow-sm rounded-lg
              w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Upload Resume</h2>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full
                px-4 py-2 mb-4 focus:border-purple-600 ring-purple-600"
                required
              />

              <label
                htmlFor="resume-input"
                className="block text-sm text-slate-700"
              >
                Select resume file
                <div
                  className="flex flex-col items-center justify-center gap-2
                  border group text-slate-400 border-slate-400 border-dashed
                  rounded-md p-4 py-10 my-4 hover:border-purple-500
                  hover:text-purple-700 cursor-pointer transition-colors"
                >
                  {resume ? (
                    <p className="text-custompurple">{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloudIcon className="size-14 stroke-1" />
                      <p>Upload resume</p>
                    </>
                  )}
                </div>
                <input
                  type="file"
                  id="resume-input"
                  accept=".pdf"
                  hidden
                  onChange={(e) => setResume(e.target.files[0])}
                />
              </label>

              <button
                disabled={isLoading}
                className="w-full py-2 bg-custompurple text-white rounded  hover:bg-purple-700
                transition-colors flex items-center justify-center gap-2"
              >
                {isLoading && <LoaderCircle className="animate-spin size-4 text-white"/> }
                {isLoading ? "Uploading" : "Upload Resume"}
              </button>

              <XIcon
                className="absolute top-4 right-4 text-purple-400 
                hover:text-custompurple cursor-pointer transition-colors"
                onClick={() => {
                  setUploadResumes(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}

        {/*  */}

        {editResume && (
          <form
            onSubmit={editTitle}
            onClick={() => setEditResume("")}
            className="fixed  inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="realtive bg-purple-50 border shadow-sm rounded-lg
              w-full max-w-sm p-6"
            >
              <h2 className="text-xl font-bold mb-4">Edit Resume Title</h2>
              <input
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                value={title}
                type="text"
                placeholder="Enter resume title"
                className="w-full
                px-4 py-2 mb-4 focus:border-purple-600 ring-purple-600"
                required
              />
              <button
                className="w-full py-2 bg-custompurple text-white rounded  hover:bg-purple-700
                transition-colors"
              >
                Update Title
              </button>

              <XIcon
                className="absolute top-4 right-4 text-purple-400 
                hover:text-custompurple cursor-pointer transition-colors"
                onClick={() => {
                  setEditResume("");
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
