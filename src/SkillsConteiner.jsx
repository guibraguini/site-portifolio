import React from 'react'

const SkillsConteiner = ({title, image, content}) => {
  return (

    <div name={title} id={title} className="block min-w-[250px] min-h-[250px] max-w-[250px] max-h-[250px] w-[250px] h-[250px] border-0 border-violet-600 card mt-[15px]">
        <div className='flex flex-col justify-center items-center w-[100%] h-[100%]'>
            {title}
            <img src={image} alt={title} className='w-[150px] h-[150px]'/>
        </div>
        <div className='hidden flex-col justify-center items-center w-[0px] h-[0px] opacity-0 ml-[5px] mt-[5px] mr-[5px] mb-[5px] text-sm'>
            {content}
        </div>
    </div>

  )
}

export default SkillsConteiner