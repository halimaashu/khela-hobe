import React from 'react';
import PlayNowButton from './PlayNawButton';
import { FaStarHalfAlt } from 'react-icons/fa';
import { IoIosTrophy } from 'react-icons/io';
import { Button } from '@heroui/react';
import { BsBrowserChrome } from 'react-icons/bs';


const Banner = () => {
    return (
        <div 
        
            className="relative h-screen bg-cover bg-center bg-no-repeat flex justify-center items-center"
            style={{ backgroundImage: "url('/khele-hero-bg.jpg')" }}
        >

           
            <div className="absolute inset-0 bg-black/50 flex justify-center items-center" />
            
      
            <div className="relative z-10 p-1 md:p-5 flex justify-center items-center flex-col">
                <h1 className="text-white text-5xl font-bold flex items-center gap-3 flex-wrap">Online <span className='text-yellow-400'>Sport</span> booking <span className='text-[#810B38]'>app</span> <IoIosTrophy className='text-yellow-500'  /></h1>
                <h2 className="text-white font-semibold text-xl mt-4 flex items-center gap-2"><FaStarHalfAlt  className='text-green-500'/> Cholo Kheli! Say yes to fitness and no to drugs. <br /> Book your favorite local sports  instantly.</h2>
                <button className="mt-6">
                    <PlayNowButton />
                </button>
                <Button  className={"bg-[#810B38] "}><BsBrowserChrome/> Browse all Facilities</Button>
            </div>
            
               
           
        </div>
    );
};

export default Banner;