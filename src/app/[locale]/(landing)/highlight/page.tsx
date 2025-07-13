import Navbar from "@/components/guest/common/navbar";
import Highlight from "@/components/guest/highlight/Highlight";
import Footer from "@/components/guest/common/footer";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-20">
        <Highlight />
      </main>
      <Footer />
    </>
  );
}
