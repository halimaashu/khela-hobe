import FacilityCrd from "@/components/FacilityCrd";
import { Button } from "@heroui/react";
import React from "react";

const AllFacilityPage = async ({ searchParams }) => {
  const { search = "", sport = "" } = await searchParams;

  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (sport) params.append("sport", sport);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/featured?${params}`,
  );
  const data = await res.json();

  return (
    <div>
      <h1 className="text-2xl font-bold mt-10">All Facility</h1>

      <form className="flex gap-3 my-5">
        <input
          type="text"
          name="search"
          defaultValue={search}
          placeholder="Search by name"
          className="border px-3 py-2 rounded w-full max-w-sm"
        />
        <select
          name="sport"
          defaultValue={sport}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Sports</option>
          <option value="Football">Football</option>
          <option value="Cricket">Cricket</option>
          <option value="Futsal">Futsal</option>
          <option value="Badminton">Badminton</option>
          <option value="Tennis">Tennis</option>
          <option value="Swimming">Swimming</option>
        </select>
        <button
          type="submit"
          className="bg-[#810B38] text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>

      {data.length === 0 ? (
        <p className="text-gray-500 py-10 text-center">No facilities found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-5 py-5">
          {data.map((re) => (
            <FacilityCrd key={re._id} re={re} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFacilityPage;
