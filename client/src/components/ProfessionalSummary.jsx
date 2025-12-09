import { Loader2, Sparkle } from 'lucide-react'
import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import {toast} from 'react-hot-toast'
import api from '../config/api'


const ProfessionalSummary = ({data , onChange , setResumedata}) => {

    const {token} = useSelector(state=>state.auth)
    const [isGenerating , setIsGenerating] = useState(false)
    
    const generateSummary = async()=>{
        try{
            setIsGenerating(true)
            const prompt =  `enhance my professional summary ${data}`
            const response = await api.post('/api/ai/enhance-professional-summary' ,
                {userContent: prompt} , {
                    headers :{
                        Authorization : token
                    }
                }
            )
            setResumedata(prev => ({...prev , professional_summary:response.data.enhancedSummary}))
        }catch(err){
            toast.error(err?.response?.data?.message || err.message)
        }finally{
            setIsGenerating(false)
        }
    }


  return (
    <div className='space-y-4'>
        <div className='flex items-center justify-between'>
            <div>
                <h3 className='flex items-center gap-2 text-lg font-semibold
                text-gray-900 '>Professional Summary</h3>
                <p className='text-sm text-gray-500 w-2xs'>Add summary about your professional experience and skills</p>
            </div>
            <button
            disabled={isGenerating}
            onClick={generateSummary}
            className='flex items-center gap-2 px-3 py-2 text-xs
            bg-purple-100 text-purple-700 rounded hover:bg-purple-200
            transition-colors disabled:opacity-50'>
                {isGenerating ? (<Loader2 className='size-4 animate-spin'/>) : (<Sparkle className='size-4'/>)}
                {isGenerating ? 'Generating' : 'AI Enhance'}
            </button>
        </div>

        <div className='mt-6 '>
            <textarea rows={7} value={data || ''}
            onChange={(e)=>onChange(e.target.value)}
            className='w-full p-3 px-4 mt-2 border text-sm border-purple-300
            rounded-lg focus:ring focus:ring-purple-500 focus:border-purple-500
            outline-none transition-colors resize-none'
            placeholder='Write a professional summary that highlights your skills and experience.'>
            </textarea>
            <p className='text-xs text-gray-500 max-w-4/5 mx-auto text-center'>Keep it concise and under 200 words</p>
        </div>
    </div>
  )
}

export default ProfessionalSummary