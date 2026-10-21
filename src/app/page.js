import Banner from "@/components/Banner";
import BrowseBySport from "@/components/BrowseBySport";
import Faq from "@/components/Faq";
import Featured from "@/components/Featured";
import FinalCta from "@/components/Finalcta";
import Footer from "@/components/Footer";
import OurCta from "@/components/OurCta";
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
      <BrowseBySport/>
      <OurCta/>
      <Faq/>
      <FinalCta/>
      
    </div>
  );
}
