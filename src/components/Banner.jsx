import React from 'react';
import PlayNowButton from './PlayNawButton';

const Banner = () => {
    return (
        <div 
            className="relative h-screen bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url('/khele-hero-bg.jpg')" }}
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Your content goes here */}
            <div className="relative z-10 flex h-full items-center justify-center">
                <h1 className="text-white text-5xl font-bold">Your Title</h1>
            </div>
            <PlayNowButton/>
        </div>
    );
};

export default Banner;