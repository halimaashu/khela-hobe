import React from 'react';
import { FadeLoader } from 'react-spinners';

const loading = () => {
    return (
        <div className='text-center py-20  h-screen flex justify-center items-center'>
            <FadeLoader color="#810B38"/>
        </div>
    );
};

export default loading;