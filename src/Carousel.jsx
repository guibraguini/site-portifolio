import React, { useState, useEffect } from 'react';

const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  let intervalId;
  useEffect(() => {
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentIndex((currentIndex + 1) % slides.length);
      }, 10000);
    }
    return () => clearInterval(intervalId);
  }, [currentIndex, isPlaying, slides]);

  const handlePlayPause = () => {
    if (isPlaying) {
      clearInterval(intervalId);
    } else {
      intervalId = setInterval(() => {
        setCurrentIndex((currentIndex + 1) % slides.length);
      }, 10000);
    }
    setIsPlaying(!isPlaying);
    console.log("sdsds");
  };



  return (
    <div className="flex flex-col w-full justify-center items-center">
        

        <div className='grid grid-cols-4 mt-[20px] justify-center items-center max-w-[70%] min-w-[70%] min-h-[200px] min border-4 border-sky-100'>
        {slides.map((slide, index) => (
          
          <div key={index} onClick={() => setCurrentIndex(index)} className="min-h-[100%] border-4 border-sky-100  justify-center items-center cursor-pointer hover:bg-slate-400 ">
            <img src={slide.image} alt={slide.title} className="min-w-[100%] min-h-[180px]"/>
            <p className='flex flex-col justify-center items-center'>
              {slide.title}
            </p>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-3 justify-center items-center max-w-[70%] min-w-[70%] mt-[20px]'>
      <button onClick={() => setCurrentIndex((currentIndex - 1 + slides.length) % slides.length)} className='hover:bg-slate-400'>Previous</button>
      <button onClick={handlePlayPause} className='hover:bg-slate-400 border-sky-100 border-l-2 border-r-2 '>{isPlaying ? 'Pause' : 'Play'}</button>
      <button onClick={() => setCurrentIndex((currentIndex + 1) % slides.length)} className='hover:bg-slate-400'>Next</button>
      </div>


      <div className="mt-[20px] min-w-[70%] min-h-[200px] max-w-[70%] max-h-[30%] max-w-[70%] w-[70%] h-[30%] border-4 border-sky-100  justify-center items-center">            
        <div>
          <p className='text-2xl z-5 flex flex-col w-full justify-center items-center mt-[30px]'>
            {slides[currentIndex].title}
          </p>
          <img src={slides[currentIndex].image} alt={slides[currentIndex].title} className='min-w-[100%]'/>
        </div>
        <div className='flex flex-col justify-center items-center mt-[30px] ml-[10px] mr-[10px] mb-[10px] md:text-lg border-t-4 border-sky-100'>
          <p className='mt-[10px] min-h-[200px] max-h-[200px] overflow-y-auto'>
            {slides[currentIndex].text}
          </p>
        </div>
        <div className='flex flex-col justify-center items-center mt-[0px] ml-[10px] mr-[10px] md:text-lg border-t-4 border-sky-100'>
          <div className='grid grid-cols-3 mt-[20px] mb-[20px] flex flex-col justify-center items-center'>
            <a href={slides[currentIndex].link1} target="_blank">
              <div className='flex flex-col justify-center items-center border-4 border-sky-100 border-double rounded-full min-h-[50px] min-w-[50px] ml-[20px] mr-[20px] hover:bg-slate-400 cursor-pointer'>
                Code
              </div>
            </a>
            <a href={slides[currentIndex].Link2} target="_blank">
              <div className='flex flex-col justify-center items-center border-4 border-sky-100 border-double rounded-full min-h-[50px] min-w-[50px] ml-[20px] mr-[20px] hover:bg-slate-400 cursor-pointer'>
                Demo
              </div>
            </a>
            <a href={slides[currentIndex].link3} target="_blank">
              <div className='flex flex-col justify-center items-center border-4 border-sky-100 border-double rounded-full min-h-[50px] min-w-[80px] ml-[20px] mr-[20px] hover:bg-slate-400 cursor-pointer'>
                Video
              </div>
            </a>
          </div>          
        </div>        
      </div>


      
    </div>
  );
}

export default Carousel