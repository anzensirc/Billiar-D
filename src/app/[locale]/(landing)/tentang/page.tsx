import React from "react";
import Tentang from "@/components/guest/tentang/tentang";
import Footer from "@/components/guest/common/Footer";
import Navbar from "@/components/guest/common/Navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-20 pt-24">
        <Tentang />
      </main>
      <Footer />
    </>
  );
}
