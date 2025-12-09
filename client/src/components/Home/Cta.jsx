import React, { useRef, useState } from 'react'  
import Title from './Title';
import { DatabaseZapIcon, LucidePlugZap } from 'lucide-react';


const Cta = () => {

    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const divRef = useRef(null);

    const handleMouseMove = (e) => {
        const bounds = divRef.current.getBoundingClientRect();
        setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
    };

  return (
    <>
    <div className='flex flex-col items-center'>

        {/* status badge */}

      <div className="flex mt-10 items-center gap-2 text-sm text-custompurple bg-purple-400/10 border border-purple-200 rounded-full px-4 py-1">
        <DatabaseZapIcon width={14} />
        <span>Developer</span>
      </div>

      {/* ............... */}

        <Title title='The developer behind AI Resume' description='Meet the developer behind AI Resume, a passionate software developer with a love for creating innovative solutions.' />
   
        <div ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}
            className="mt-10 relative w-80 h-96 rounded-xl p-0.5 bg-white backdrop-blur-md text-gray-800 overflow-hidden shadow-lg cursor-pointer"
        >
            {visible && (
                <div className="pointer-events-none blur-xl bg-linear-to-r from-blue-400 via-custompurple to-purple-500 size-60 absolute z-0 transition-opacity duration-300"
                    style={{ top: position.y - 120, left: position.x - 120,}}
                />
            )}

            <div className="relative z-10 bg-white p-6 h-full w-full rounded-[10px] flex flex-col items-center justify-center text-center">
                <img src='ceo.JPG' alt="Profile Avatar" className="w-24 h-24 rounded-full shadow-md my-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Sajawal Nawaz</h2>
                <p className="text-sm text-custompurple font-medium mb-4">Software Developer</p>
                <p className="text-sm text-gray-500 mb-4 px-4">
                    Passionate about clean code, scalable systems, and solving real-world problems with elegant software.
                </p>
                <div className="flex space-x-4 mb-4 text-xl text-custompurple">
                    <a href="https://mail.google.com/mail/?view=cm&fs=1&to=7sajawalnawaz@gmail.com" target="_blank" className='hover:-translate-y-0.5 transition'>
                        <svg className="size-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2ZM4 8l8 5 8-5v10H4V8Zm8 3L4 6h16l-8 5Z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a href="https://www.linkedin.com/in/sajawal-nawaz/" target="_blank" className='hover:-translate-y-0.5 transition'>
                        <svg className="size-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12.51 8.796v1.697a3.738 3.738 0 0 1 3.288-1.684c3.455 0 4.202 2.16 4.202 4.97V19.5h-3.2v-5.072c0-1.21-.244-2.766-2.128-2.766-1.827 0-2.139 1.317-2.139 2.676V19.5h-3.19V8.796h3.168ZM7.2 6.106a1.61 1.61 0 0 1-.988 1.483 1.595 1.595 0 0 1-1.743-.348A1.607 1.607 0 0 1 5.6 4.5a1.601 1.601 0 0 1 1.6 1.606Z" clipRule="evenodd" />
                            <path d="M7.2 8.809H4V19.5h3.2V8.809Z" />
                        </svg>
                    </a>
                    <a href="https://github.com/7SajawalNawaz" target="_blank" className='hover:-translate-y-0.5 transition'>
                        <svg className="size-7" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                            <path fillRule="evenodd" d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>

    </div>
{/* call to action  */}

    <div id='cta' className='border-y border-dashed border-slate-200 w-full max-w-5xl mx-auto px-10 sm:px-16 mt-20'>
            <div className="flex flex-col md:flex-row text-center md:text-left items-center justify-between gap-8 px-3 md:px-10 border-x border-dashed border-slate-200 py-16 sm:py-20 -mt-10 -mb-10 w-full">
                <p className="text-xl font-medium max-w-md text-slate-800">Build your resume with AI in just a few simple steps.</p>
                <a href="/app" className="flex items-center gap-2 rounded py-3 px-8 bg-custompurple hover:bg-purple-700 transition text-white">
                    <span>Get Started</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-4.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
            </div>
        </div>

</>

  )
}

export default Cta