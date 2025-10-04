import FeaturedProducts from "@/components/featured_product";
import HeroSlider from "@/components/Heropage";
import PerfumeBanner from "@/components/tester_banner";
import WhyChooseUs from "@/components/about_portion"; 
import ClassicContactForm from "@/components/shortform";



export default function Page() {
  return (
    <>
     <div>
        <HeroSlider/>
        <FeaturedProducts />
        <PerfumeBanner/>
        <WhyChooseUs/>
        <ClassicContactForm/> 

        
        
     </div>
    </>
  );
}
