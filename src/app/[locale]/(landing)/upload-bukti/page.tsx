import React from 'react';
import Tentang from "@/components/guest/tentang/tentang";
import Navbar from '@/components/guest/common/Navbar';
export default function Home() {
    return (
        <>
        <Navbar/>
        <main className="flex flex-col gap-20 pt-24">
          <Tentang/>
        </main>
        </>
      );
}