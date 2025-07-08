import Booking from "@/components/guest/booking/booking";
import Navbar from "@/components/guest/common/Navbar";
import Footer from "@/components/guest/common/Footer";
export default function Home() {
  return (
    <>
      <Navbar /> {/* Fixed di atas, di luar main */}
      <main className="flex flex-col gap-20 pt-24">
        <Booking />
      </main>
      <Footer/>
    </>
  );
}
