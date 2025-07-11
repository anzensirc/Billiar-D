import Hero from "@/components/guest/dashboard/Hero";
import Banner from "@/components/guest/dashboard/Banner";
import Navbar from "@/components/guest/common/Navbar";
import Footer from "@/components/guest/common/Footer";

export default function Home() {
  return (
    <main className="flex flex-col gap-20">
      <Navbar />
      <Hero />
      <Banner />
      <Footer />
    </main>
  );
}
