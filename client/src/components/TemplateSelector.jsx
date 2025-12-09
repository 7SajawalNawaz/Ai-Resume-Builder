import { CheckIcon, Layout } from 'lucide-react'
import React, { useState } from 'react'

const TemplateSelector = ({selectedTemplate , onChnage}) => {
    const [isOpen , setIsOpen] = useState(false)
    const templates = [
        {
            id: "classic",
            name: "Classic",
            preview: "A clean and simple resume template."
        },
        {
            id: "modern",
            name: "Modern",
            preview: "A modern and stylish resume template."
        },
        {
            id: "minimal",
            name: "Minimal",
            preview: "A minimalistic resume template."
        },
        {
            id: "minimal-image",
            name: "Minimal with Image",
            preview: "A minimalistic resume template with a profile image."
        }
    ]
  return (
    <div className='relative'>
        <button
        onClick={()=> setIsOpen(!isOpen)} 
        className='flex items-center gap-1 text-sm text-custompurple
        bg-linear-to-br from-purple-50 to-purple-100 ring-purple-300
        hover:ring transition-all px-3 py-2 rounded-lg'>
            <Layout size={14} /><span className='max-sm:hidden'>Template</span>
        </button>
        {
            isOpen && (
                <div className='absolute top-full w-xs p-3 mt-2 space-y-3
                z-10 bg-white rounded-md border-purple-200 shadow-sm'>
                    {templates.map((template)=>(
                        <div key={template.id} onClick={()=>{onChnage(template.id)
                             setIsOpen(false)}} className={`relative p-3 border rounded-md
                                cursor-pointer transition-all ${selectedTemplate === template.id ?
                                "border-purple-400 bg-purple-100"
                                : "border-gray-300 hover:border-gray-400 hover:bg-gray-100"
                              }`}>
                            {selectedTemplate=== template.id && (
                                <div className='absolute top-2 right-2'>
                                    <div className='size-5 bg-purple-400 rounded-full
                                    flex items-center justify-center'>
                                        <CheckIcon className='w-3 h-3 text-white'/>
                                    </div>
                                </div>
                            )}

                            <div className='space-y-1'>
                                <h4 className='font-medium text-gray-800'>{template.name}</h4>
                                <div className='mt-2 p-2 bg-purple-50 rounded text-sm
                                text-gray-500 italic'>{template.preview}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )
        }
    </div>
  )
}

export default TemplateSelector