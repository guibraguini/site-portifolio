import React from 'react'

const About = () => {
  return (
    <div className='w-full'>
        <div className='relative flex flex-col justify-center items-center w-[80%] ml-[10%] h-[80%] mt-[15%]'>
            <div>
                <div>
                    <p className='text-2xl underline decoration-red-600	decoration-2 underline-offset-2 md:decoration-4 md:underline-offset-4 md:text-6xl flex flex-col justify-center items-center w-full'>
                        About
                    </p>
                </div>
                <div className='w-[80%] ml-[10%] mt-[5%] grid grid-cols-2'>
                    <div>
                        <p className='text-lg  md:text-3xl pr-3'> Hi. I'm Guilherme Braguini, and this is what I think you should know about me.</p>
                    </div>
                    <div>
                        <p className='text-xs md:text-base'> 
                            I'm a developer passionate about blockchain, decentralization, and learning new skills. I'm looking for opportunities to develop amazing dapps that will change the web forever. This is a new part of history and i want to be part of it.
                            I was born in 1995 and i've been developing softwares since 2010. Recently I started to build decentralized applications using all my past experience to make projects that are secure and gas-efficiency. Still the single most important thing I have to say is that I can promisse nothing, but that I will put all my effort on be a core part of the company team and build the best applications I can
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div className='relative h-[10%]  mt-[10%]'/>
    </div>
  )
}

export default About