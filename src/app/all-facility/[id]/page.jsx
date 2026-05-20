import Image from 'next/image';


const detailPage =async ({params}) => {
    const {id}=await params;
    console.log(id)
    const res =await fetch(`http://localhost:5000/featured/${id}`);
    const data=await res.json();

    return (
        <div className='py-10'>
            <Image src={data?.thumbnail} alt={data?.name} width={500} height={300} />
        </div>
    );
};

export default detailPage;