import { StarFill } from '@gravity-ui/icons';
import { Card } from '@heroui/react';
import Image from 'next/image';
import { CiLocationOn } from 'react-icons/ci';
import { RiGhostFill } from 'react-icons/ri';


const detailPage =async ({params}) => {
    const {id}=await params;
    console.log(id)
    const res =await fetch(`http://localhost:5000/featured/${id}`);
    const data=await res.json();

    return (
        <div className='py-10 md:flex gap-10'>
            <Image src={data?.thumbnail} alt={data?.name} width={500} height={300} className='rounded-md shadow-md' />
            <div className="space-y-4">
                <h1 className='text-2xl font-bold text-[#810B38]'>{data?.name}</h1>
                 <div className="flex justify-between items-center">
                    <h2 className='text-lg flex font-serif items-center font-bold'><CiLocationOn/> {data?.location}</h2>
                    
                </div>
                
                <p className='text-gray-600 flex items-center'><StarFill fontSize={50} className='text-yellow-500'/> {data?.description}</p>
              <div className="flex justify-between items-center">
                 <ul>
                <li>Available Slot time</li>
                {
                data?.available_slots.map((slot, index)=> <li key={index} className='flex items-center'><RiGhostFill></RiGhostFill>{slot}</li>)
                }</ul>

                <div className="rounded-md shadow-md ">
                    <Card>
                        <h1 className='text-xl font-bold'>Book It</h1>
                        <h1 className='text-xl font-semibold text-[#541A1A] font-serif'>price per_hour: $ {data?.price_per_hour}</h1>

                    </Card>
                </div>
              </div>
            </div>
        </div>
    );
};

export default detailPage;