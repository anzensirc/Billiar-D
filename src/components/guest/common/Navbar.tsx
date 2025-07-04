'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart } from 'lucide-react';
import CartSidebar from '@/components/modal/CartSidebar';

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <>
      <nav className="absolute top-0 left-0 w-full flex items-center justify-between px-20 py-4 shadow-md bg-blue-500 z-50">
        <div className="flex items-center gap-4">
          <Link href="" className="flex items-center">
            <Image
              src="/icons/ikonjoker.png"
              alt="Logo JokerBilliarD"
              width={48}
              height={48}
            />
          </Link>
          <Link href="" className="flex items-center">
            <span className="font-bold text-lg text-white">Dongan&apos;s Billiard</span>
          </Link>
        </div>

        <div className="flex gap-6">
          <Link href=""className="px-3 py-2 rounded hover:bg-blue-700 hover:text-white text-white transition">Beranda</Link>
          <Link href="/booking"className="px-3 py-2 rounded hover:bg-blue-700 hover:text-white text-white transition">Booking</Link>
          <Link href="/tentang" className="px-3 py-2 rounded hover:bg-blue-700 hover:text-white text-white transition">Tentang</Link>
        </div>

        <div className="flex items-center gap-6">
          <Link href="/uploadbukti" className="px-3 py-2 rounded hover:bg-blue-700 hover:text-white text-white transition">Upload Bukti</Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="transition-transform duration-200 hover:scale-125">
            <ShoppingCart className="w-6 h-6 text-white" />
          </button>
        </div>
      </nav>

      {/* Komponen Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
