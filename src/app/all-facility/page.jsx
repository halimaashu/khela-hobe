import FacilityCrd from '@/components/FacilityCrd';
import React from 'react';

const AllFacilityPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured`);
  const data = await res.json();
    return (
        <div>
            <h1 className="text-2xl font-bold mt-10">All Facility</h1>
            <div className="grid md:grid-cols-3 gap-5 py-5">
        {data.map((re) => (
          <FacilityCrd key={re._id} re={re} />
        ))}
      </div>
        </div>
    );
};

export default AllFacilityPage;