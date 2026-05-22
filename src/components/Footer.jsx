import { Separator } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagramSquare } from 'react-icons/fa';
import { FaSquareWhatsapp } from 'react-icons/fa6';

const Footer = () => {
    return (
        <div className='py-20 text-center bg-[#DCC3AA] '>
            <div className="md:flex justify-between items-center md:px-10 mb-10 p-3">
                <div className="mt-5">
                    <Image src="/khela-hobe.png" alt="Khela Hobe Logo" width={200} height={200} className="mx-auto" />
                    <h1 className='text-2xl font-bold text-[#333] '>Khela Hobe</h1>
                </div>
                <div className="flex flex-col md:items-start  mt-5">
                    <h1 className='text-2xl font-bold text-[#333] '>Khela Hobe</h1>
                    <ul className='space-y-3' >
                        <li><Link href="/" className='hover:underline'>Home</Link></li>
                        <li><Link href="/" className='hover:underline'>About</Link></li>
                        <li><Link href="/" className='hover:underline'>Contact</Link></li>
                    </ul>
                </div>
                
                <div className="flex flex-col md:items-start  mt-5">
                    <h1 className='text-2xl font-bold text-[#333] '>Social</h1>
                   <div className="flex items-center gap-4 mt-5 mx-auto">
                     <span><FaFacebook size={24} className='hover:text-blue-500' /></span>
                    <span><FaSquareWhatsapp size={24} className='hover:text-green-600' /></span>
                    <span><FaInstagramSquare size={24} className='hover:text-pink-500' /></span>
                   </div>
                </div>
            </div>
           
            <p>&copy; 2026 Khela Hobe. All rights reserved.</p>
        </div>
    );
};

export default Footer;