import Banner from "@/components/Banner";
import Featured from "@/components/Featured";
import ReviewCard from "@/components/ReviewCard";
import SimpleStep from "@/components/SimpleStep";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      
      <Banner/>
      <Featured/>
      <SimpleStep/>
      <ReviewCard/>
    </div>
  );
}
