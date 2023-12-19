import React, { useRef, useState } from 'react'
import emailjs from 'emailjs-com';
import ReCAPTCHA from "react-google-recaptcha";
import {FaTimes} from 'react-icons/fa'

const Contact = () => {

    const form = useRef();
    


    const [send, setSend] = useState(false)

    const [alert, setAlert] = useState(false)
    const openAlert = () => {if(!alert2) setAlert(true)}
    const closeAlert = () => {
        setAlert(false);
        setSend(false);
    }


    const [alert2, setAlert2] = useState(false)
    const openAlert2 = () => {if(!alert) setAlert2(true)}
    const closeAlert2 = () => {
        setAlert2(false);
        setSend(false);
    }



    const sendEmail = () => {     
        if(!send){
            setSend(true);
            emailjs.sendForm('service_nx7ckth', 'template_0jq30it', form.current, 'eMc2TuoIt4tSFy7aq')
                .then((result) => {
                    form.current.reset();
                    window.grecaptcha.reset();
                    openAlert();
                }, (error) => {
                    window.grecaptcha.reset();
                    openAlert2();
                });
        }
    };

    function onChange(value) {
        
      }

  return (
    <div className='w-full'>
        <div className='relative flex flex-col justify-center items-center w-[100%]  h-[80%] mt-[15%]'>
            <div>
                <p className='text-2xl underline decoration-red-600	decoration-2 underline-offset-2 md:decoration-4 md:underline-offset-4 md:text-6xl flex flex-col justify-center items-center w-full'>
                    Contact
                </p>
            </div>
            <div className='flex w-[90%] mt-[5%] justify-center items-center'>
                <div>
                    <form ref={form} onSubmit={sendEmail}>
                        <div className='flex grid grid-cols-2 max-w-[100px]'>
                            <div className='flex-col justify-center items-center'>
                                Name:
                            </div>
                            <div className='flex-col justify-center items-center ml-[10px]'>
                                <input className='min-w-[250px] h-[25px]' type="text" name="name" />
                            </div>
                            
                        </div>
                        <div className='flex grid grid-cols-2 max-w-[100px] mt-[30px]'>
                            <div className='flex-col justify-center items-center'>
                                Email:
                            </div>
                            <div className='flex-col justify-center items-center ml-[10px]'>
                                <input className='min-w-[250px] h-[25px]' type="email" name="email" />
                            </div>
                        </div>
                        <div className='flex grid grid-cols-2 max-w-[100px] mt-[30px]'>
                            <div className='flex-col justify-center items-center'>
                                Subject:
                            </div>
                            <div className='flex-col justify-center items-center ml-[10px]'>
                                <input className='min-w-[250px] h-[25px]' type="text" name="subject" />
                            </div>
                        </div>
                        <div className='box w-[90%] mt-[30px]'>
                            <label>Message:</label>
                            <br />
                            <textarea className='w-[310px] h-[150px]' name="message" />
                        </div>
                        <div className='flex justify-center items-center box w-[300px] mt-[30px]'>
                            <ReCAPTCHA sitekey="6LfjuwIgAAAAAM3AcnY8qpWLTi4PetNIjdONljoM" onChange={onChange} />
                        </div>
                        <div className='flex justify-center items-center box w-[200px] mt-[30px] border-2 cursor-pointer hover:bg-[#ffffff]' onClick={sendEmail}>
                            SEND
                        </div>
                    </form>
                        
                        <div  className={!alert ? 'hidden' : 'absolute w-[70%] box justify-end items-right bottom-0 right-0'} >
                            <div className="w-[75%] p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800 cursor-pointer" onClick={closeAlert}>
                                <div>
                                    <svg className="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" ></path></svg>   
                                    Email sent successfully
                                </div>
                                <div className='flex justify-end items-right mt-[-20px]'>
                                    <FaTimes size={20} />
                                </div>
                            </div>
                        </div>
                        <div  className={!alert2 ? 'hidden' : 'absolute w-[70%] box justify-end items-right bottom-0 right-0'} >
                            <div className="w-[75%] p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 cursor-pointer" onClick={closeAlert2}>
                                <div>
                                    <svg className="inline flex-shrink-0 mr-3 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"></path></svg>
                                    Something went wrong, the Email was not sended
                                </div>
                                <div className='flex justify-end items-right ml-[5%] mt-[-20px]' >
                                    <FaTimes size={20} />
                                </div>
                            </div>
                        </div>
                        <div className='relative h-[10%]  mt-[25%]'/>
                </div>
            </div>
        </div>
        
    </div>
    
  )
}

export default Contact