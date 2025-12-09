// import { CheckIcon, Palette } from 'lucide-react'
// import React, { useState } from 'react'

// const ColorPicker = ({onChange , selectedColor}) => {
//     const colors = [
        
//             {name : 'blue' , value: '#3b82f6'},
//             {name : 'green' , value: '#22c55e'},
//             {name : 'orange' , value: '#f97316'},
//             {name : 'red' , value: '#ef4444'},
//             {name : 'purple' , value: '#9333ea'},
//             {name : 'yellow' , value: '#facc15'},
//             {name : 'gray' , value: '#9ca3af'},
//             {name : 'pink' , value: '#f472b6'},
//             {name : 'black' , value: '#000000'},
//             {name : 'custom-color' , value: ''}
//     ]

//     const [isOpen , setIsOpen] = useState(false)
//   return (
//     <div className='relative'>
//         <button
//         onClick={()=>setIsOpen(!isOpen)}
//         className='flex items-center gap-1 text-sm text-green-600 
//         bg-linear-to-br from-green-100 to-green-50 ring-green-300
//         hover:ring transition-all px-3 py-2 rounded-lg'>
//             <Palette size={16} /><span className='max-sm:hidden'>Accent</span>
//         </button>
//         {
//             isOpen && (
//                 <div className='grid grid-cols-4 w-60 gap-2 absolute top-full
//                             left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border
//                             border-green-200 shadow-sm'>
//                     {
//                         colors.map((color) => (
//                             <div key={color.value}
//                             className='relative cursor-pointer group
//                                 flex flex-col'
//                             onClick={()=>{onChange(color.value)}}>
//                                 <div className='w-12 h-12 rounded-full border-2
//                                 border-transparent group-hover:border-black/25
//                                 transition-colors' style={{backgroundColor:color.value}}>
//                                 </div>
//                                 {selectedColor === color.value && (
//                                     <div className='absolute top-0 left-0 right-0 bottom-4.5
//                                     flex items-center justify-center'>
//                                         <CheckIcon className='size-5 text-white' />
//                                     </div>
//                                 )}
//                                 <p className='text-xs text-center mt-1 text-gray-600'>{color.name}</p>
//                             </div>
//                         ))
//                     }
//                 </div>
//             )
//         }
//     </div>
//   )
// }

// export default ColorPicker


import { CheckIcon, Palette } from 'lucide-react'
import React, { useState } from 'react'

const ColorPicker = ({ onChange, selectedColor }) => {
    // Separate predefined colors from the custom logic
    const predefinedColors = [
        { name: 'blue', value: '#3b82f6' },
        { name: 'green', value: '#22c55e' },
        { name: 'orange', value: '#f97316' },
        { name: 'red', value: '#ef4444' },
        { name: 'purple', value: '#9333ea' },
        { name: 'yellow', value: '#facc15' },
        { name: 'gray', value: '#9ca3af' },
        { name: 'pink', value: '#f472b6' },
        { name: 'black', value: '#000000' },
    ];

    // State for dropdown visibility and the current custom color value
    const [isOpen, setIsOpen] = useState(false);
    const defaultCustomColor = '#3b82f6'; // Using blue as a safe default
    const [customColorValue, setCustomColorValue] = useState(selectedColor && selectedColor.startsWith('#') ? selectedColor : defaultCustomColor);

    // Logic to determine if the current selection is custom
    const isPredefined = predefinedColors.some(c => c.value === selectedColor);
    const isCustomSelected = !isPredefined && selectedColor === customColorValue;

    // Handlers
    const handleCustomColorChange = (e) => {
        let newColor = e.target.value;
        if (newColor.length === 7 || e.target.type === 'text') {
            setCustomColorValue(newColor);
            onChange(newColor);
        }
    };

    const handlePredefinedSelection = (colorValue) => {
        onChange(colorValue);
        setIsOpen(false);
    };
    
    const handleCustomSelection = () => {
        onChange(customColorValue);
    };


    return (
        <div className='relative'>
            {/* Original Button Style */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className='flex items-center gap-1 text-sm text-green-600 
                bg-linear-to-br from-green-100 to-green-50 ring-green-300
                hover:ring transition-all px-3 py-2 rounded-lg'>
                <Palette size={16} /><span className='max-sm:hidden'>Accent</span>
            </button>
            {
                isOpen && (
                    <div className='grid grid-cols-4 w-60 gap-2 absolute top-full
                                    left-0 right-0 p-3 mt-2 z-10 bg-white rounded-md border
                                    border-green-200 shadow-sm'>
                        
                        {/* Predefined Colors */}
                        {
                            predefinedColors.map((color) => (
                                <div key={color.value}
                                    className='relative cursor-pointer group flex flex-col items-center'
                                    onClick={() => { handlePredefinedSelection(color.value) }}>
                                    
                                    {/* Swatch Circle */}
                                    <div className='w-12 h-12 rounded-full border-2
                                        border-transparent group-hover:border-black/25
                                        transition-colors' style={{ backgroundColor: color.value }}>
                                    </div>
                                    
                                    {/* Checkmark */}
                                    {selectedColor === color.value && (
                                        <div className='absolute top-0 left-0 right-0 bottom-4.5 flex items-center justify-center'>
                                            <CheckIcon className='size-5 text-white' />
                                        </div>
                                    )}
                                    <p className='text-xs text-center mt-1 text-gray-600'>{color.name}</p>
                                </div>
                            ))
                        }

                        {/* Custom Color Option - Simple style matching the original grid */}
                        <div className='relative cursor-pointer group flex flex-col items-center'
                            onClick={handleCustomSelection}>

                            <div className={`w-12 h-12 rounded-full border-2 transition-colors 
                                            flex items-center justify-center text-gray-500
                                            ${isCustomSelected ? 'border-purple-500' : 'border-gray-300 hover:border-black/25 bg-white'}`}
                                style={isCustomSelected ? { backgroundColor: customColorValue } : {}}>

                                {/* Visible Palette Icon when NOT selected */}
                                {!isCustomSelected && <Palette size={20} />}

                                {/* Hidden Input for color picker popup */}
                                <input
                                    type="color"
                                    value={customColorValue}
                                    onChange={handleCustomColorChange}
                                    className='w-full h-full absolute opacity-0 cursor-pointer'
                                    title='Open custom color picker'
                                    onClick={handleCustomSelection}
                                />
                            </div>

                            {/* Checkmark for custom color */}
                            {isCustomSelected && (
                                <div className='absolute top-0 left-0 right-0 bottom-4.5
                                flex items-center justify-center '>
                                    <CheckIcon className='size-5 text-white' />
                                </div>
                            )}
                            <p className='text-xs text-center mt-1 text-gray-600'>custom</p>
                        </div>
                        
                        {/* Custom Color Code Display/Input Section */}
                        <div className='col-span-4 mt-3 pt-2 border-t border-gray-100'>
                            <label htmlFor='custom-hex' className='block text-xs font-semibold text-gray-700 mb-1'>HEX Code</label>
                            <div className='relative'>
                                <input
                                    id='custom-hex'
                                    type="text"
                                    value={customColorValue.toUpperCase()}
                                    onChange={handleCustomColorChange}
                                    className={`w-full pl-3 pr-10 py-1.5 border rounded-md text-sm font-mono focus:outline-none 
                                               ${isCustomSelected ? 'border-green-600 ring-1 ring-green-100 bg-green-50' : 'border-gray-300 focus:border-green-500'}`}
                                    placeholder="#RRGGBB"
                                    maxLength={7}
                                />
                                {/* Color Preview Swatch */}
                                <div className='absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
                                    <div className='w-4 h-4 rounded-sm border border-gray-200' 
                                         style={{ backgroundColor: customColorValue }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ColorPicker