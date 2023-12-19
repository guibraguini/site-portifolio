import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const WorksConteiner = ({title, image, text, link1, link2, link3}) => {

  return (

        <div className=' flex flex-col w-full mt-[50px] justify-center items-center'>
            <div className="min-w-[70%] min-h-[200px] max-w-[70%] max-h-[30%] max-w-[70%] w-[70%] h-[30%] border-4 border-sky-100  justify-center items-center">            
                <div>
                    <p className='text-2xl z-5 flex flex-col w-full justify-center items-center mt-[30px]'>
                        {title}
                    </p>
                    <img src={image} alt={title} className='min-w-[100%]'/>
                </div>
                <div className='flex flex-col justify-center items-center mt-[30px] ml-[10px] mr-[10px] mb-[10px] md:text-lg border-t-4 border-sky-100'>
                    <p className='mt-[10px]'>
                        {text}
                    </p>
                </div>
                <div className='flex flex-col justify-center items-center mt-[0px] ml-[10px] mr-[10px] md:text-lg border-t-4 border-sky-100'>
                    <div className='grid grid-cols-3 mt-[20px] mb-[20px] flex flex-col justify-center items-center'>
                        <a href={link1} target="_blank">
                            <div className='flex flex-col justify-center items-center border-4 border-sky-100 border-double rounded-full min-h-[50px] min-w-[50px] ml-[20px] mr-[20px] hover:bg-slate-400 cursor-pointer'>
                                Code
                            </div>
                        </a>
                        <a href={link2} target="_blank">
                            <div className='flex flex-col justify-center items-center border-4 border-sky-100 border-double rounded-full min-h-[50px] min-w-[50px] ml-[20px] mr-[20px] hover:bg-slate-400 cursor-pointer'>
                                Demo
                            </div>
                        </a>
                        <a href={link3} target="_blank">
                            <div className='flex flex-col justify-center items-center border-4 border-sky-100 border-double rounded-full min-h-[50px] min-w-[80px] ml-[20px] mr-[20px] hover:bg-slate-400 cursor-pointer'>
                                Video
                            </div>
                        </a>
                    </div>
                   
                </div>
                
            </div>
        </div>

  )
}

export default WorksConteiner