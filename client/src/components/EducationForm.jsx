import { GraduationCap , Plus , Trash2  } from 'lucide-react'
import React from 'react'

const EducationForm = ({data = [], onChange}) => {

    const addEducation = () =>{
        
        const newEducation ={
            institution : '',
            degree : '',
            field : '',
            graduation_date : '',
            gpa : '',
        }
        onChange([ ...data , newEducation])
    }

    const removeEducation = (index) =>{
        const updated = data.filter((_ , i)=> i !== index)
        onChange(updated)
    }

    const updateEducation = (index , field , value) =>{
        const updated = [...data]
        updated[index] = {...updated[index] , [field] : value}
        onChange(updated)
    }


  return (
     <div className='space-y-4'>
        <div>
            <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold
                text-gray-900 '>Education</h3>
                <p className='text-sm text-gray-500 w-2xs'>Add your education details</p>
            </div>
            <button 
            onClick={addEducation}
            className='flex items-center gap-2 px-3 py-2 text-xs
            bg-purple-100 text-purple-700 rounded hover:bg-purple-200
            transition-colors'>
                <Plus className='size-4'/>
                Add Education
            </button>
        </div>
        </div>


        {data.length === 0 ? (
            <div className='text-center py-8 text-gray-500'>
                <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300'/>
                <p>No education added yet.</p>
                <p className='text-sm'>Click "Add Education" to start adding your education history.</p> 
            </div>
        ) : (
            <div className='space-y-4'>
                {
                    data.map((education , index)=>(
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                            <div className='flex justify-between items-start'>
                                <h4>Education #{index + 1}</h4>
                                <button
                                onClick={()=>removeEducation(index)}
                                className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash2 className='size-4' />
                                </button>
                            </div>

                            <div className='grid md:grid-cols-2 gap-3'>
                                <input type="text" placeholder='Institute Name' 
                                className='px-3 py-2 text-sm'
                                value={education.institution || ""} 
                                onChange={(e)=> updateEducation(index, "institution" , e.target.value)}/>

                                 <input type="text" placeholder='Bachelors & Master Degree' 
                                className='px-3 py-2 text-sm'
                                value={education.degree || ""} 
                                onChange={(e)=> updateEducation(index, "degree" , e.target.value)}/>

                                <input type="text" placeholder='Field of Study'
                                className='px-3 py-2 text-sm'
                                value={education.field || ""} 
                                onChange={(e)=> updateEducation(index, "field" , e.target.value)}/>

                                <input type="month"
                                className='px-3 py-2 text-sm'
                                value={education.graduation_date || ""} 
                                onChange={(e)=> updateEducation(index, "graduation_date" , e.target.value)}/>
                            </div>

                             <input type="text" placeholder='CGPA (Optional)'
                                className='px-3 py-2 text-sm'
                                value={education.gpa || ""} 
                                onChange={(e)=> updateEducation(index, "gpa" , e.target.value)}/>


                            {/* <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                    <label className='text-sm font-medium text-gray-700'>
                                        Job Description
                                    </label>
                                    <button className='flex items-center gap-1 px-2 py-1
                                    text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors
                                    disabled:opacity-50 disabled:cursor-not-allowed'>
                                        <Sparkle  className='w-3 h-3 '/>
                                        AI Enhance
                                    </button>
                                </div>

                                <textarea className='w-full text-sm px-3 py-2 rounded-lg resize-none'
                                placeholder='Describe your key responsibilities & achievements'
                                rows={4}
                                value={experience.description}
                                onChange={(e)=> updateExperience(index, "description" , e.target.value)}/>

                            </div> */}

                        </div>
                    ))
                }
            </div>
        )}
    </div>
  )
}

export default EducationForm