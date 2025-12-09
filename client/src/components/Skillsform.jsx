import { Cross, CrossIcon, Plus, Sparkle, X } from 'lucide-react';
import React, { useState } from 'react'

const Skillsform = ({data, onChange}) => {
    
    const [newSkill, setNewSkill] = useState("");

    const addSkill = () => {
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data, newSkill.trim()]);
            setNewSkill("")
        }
    }

    const removeSkill = (skillToRemove) => {
        onChange(data.filter((_, index)=> index !== skillToRemove));
    }

     const handleSkillChange = (e) => {
        if(e.key === "Enter"){
            e.preventDefault();
            addSkill();
        }
    }

  return (
    <div className='space-y-4'>

        <div>
            <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Skills</h3>
            <p className='text-sm text-gray-500'>Add your skills</p>

        </div>

        <div className='flex gap-2'> 
            <input type="text" 
            className='flex-1 px-3 py-2 text-sm'
            onChange={(e)=>setNewSkill(e.target.value)}
            value={newSkill}
            onKeyDown={handleSkillChange}
            placeholder='Enter a skill' />

            <button
            onClick={addSkill}
            disabled={!newSkill.trim()}
            className='flex items-center gap-2 px-4 py-2 text-sm bg-purple-600
            text-white rounded-lg hover:bg-custompurple transition-colors
            disabled:opacity-50 disabled:cursor-not-allowed'
            ><Plus className='size-4' />Add</button>
        </div>

        {
            data.length > 0 ? (
                <div className='flex flex-wrap gap-2'>
                    {data.map((skill, index)=>(
                        <span key={index}
                        className='flex items-center gap-1 px-3 py-1
                        bg-purple-100 text-purple-800 rounded-full text-sm'
                        >
                            {skill}
                            <button
                            onClick={()=> removeSkill(index)}
                            className='ml-1 hover:bg-purple-200 rounded-full p-0.5 transition-colors'>
                                <X className='h-3 w-3' />
                            </button>
                        </span>
                    ))}
                </div>
            ):(
                <div className='text-center py-6 text-gray-500'>
                    <Sparkle className='w-10 h-10 mx-auto mb-2 text-gray-300'/>
                    <p>No skills added yet</p>
                    <p className='text-sm'>Add your technical skills to showcase your expertise</p>
                </div>
            )
        }

        <div className='bg-purple-50 p-3 rounded-lg'>
            <p className='text-sm text-custompurple'> <strong>Tip: </strong>Add your skills to highlight your expertise in a visually appealing way.</p>
        </div>

    </div>
  )
}

export default Skillsform