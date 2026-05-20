import React from "react";
import FacilityCrd from "./FacilityCrd";
import { MdFeaturedPlayList } from "react-icons/md";
const Featured = async () => {
  const res = await fetch("http://localhost:5000/featured");
  const data = await res.json();
  const result = data.slice(3, 10);
  console.log(result);
  return (
    <div>
      <h1 className="text-2xl font-bold mt-10 flex items-center gap-2"><MdFeaturedPlayList className="text-yellow-500"/> Featured Sports</h1>
      <div className="grid md:grid-cols-3 gap-5 py-5">
        {result.map((re) => (
          <FacilityCrd key={re._id} re={re} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
