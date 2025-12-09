import { Trash2, Plus,} from 'lucide-react'
import React from 'react'

const ProjectForm = ({data = [], onChange}) => {

    const addProject = () =>{
        const newProject ={
            name : '',
            type : '',
            description : '',
        }
        onChange([ ...data , newProject])
    }

    const removeProject = (index) =>{
        onChange(data.filter((item, i) => i !== index))
    }

    const updateProject = (index , field , value) =>{
        const updated = [...data]
        updated[index][field] = value
        onChange(updated)
    }


  return (
    <div className=''>
        <div>
            <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold
                text-gray-900 '>Projects</h3>
                <p className='text-sm text-gray-500 w-2xs'>Add your project details</p>
            </div>
            <button 
            onClick={addProject}
            className='flex items-center gap-2 px-3 py-2 text-xs
            bg-purple-100 text-purple-700 rounded hover:bg-purple-200
            transition-colors'>
                <Plus className='size-4'/>
                Add Project
            </button>
        </div>
        </div>


        
            <div className='space-y-4 mt-6'>
                {
                    data.map((project , index)=>(
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                            <div className='flex justify-between items-start'>
                                <h4>Project #{index + 1}</h4>
                                <button
                                onClick={()=>removeProject(index)}
                                className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash2 className='size-4' />
                                </button>
                            </div>

                            <div className='grid gap-3'>
                                <input type="text" placeholder='Project name' 
                                className='px-3 py-2 text-sm rounded-lg'
                                value={project.name || ""} 
                                onChange={(e)=> updateProject(index, "name" , e.target.value)}/>

                                 <input type="text" placeholder='Project type' 
                                className='px-3 py-2 text-sm rounded-lg'
                                value={project.type || ""} 
                                onChange={(e)=> updateProject(index, "type" , e.target.value)}/>

                                <textarea rows={4} type="text" placeholder='Project description' 
                                className='w-full px-3 py-2 text-sm rounded-lg resize-none'
                                value={project.description || ""} 
                                onChange={(e)=> updateProject(index, "description" , e.target.value)}/>

                                
                            </div>

                            {/* <label>
                                <input type="checkbox"
                                checked={experience.is_current || false }
                                onChange={(e)=> updateExperience(index, "is_current" , e.target.checked ? true : false)}
                                className='rounded border-gray-300 text-purple-600 focus:ring-custompurple' 
                                />
                                <span className='text-sm text-gray-600'>I currently work here</span>
                            </label>

                            <div className='space-y-2'>
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
        
    </div>
  )
}

export default ProjectForm