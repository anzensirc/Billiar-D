'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-blue-500 text-white-800 px-22 py-8">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-[570px_260px_260px] gap-10">
            {/* Kolom 1: Deskripsi */}
         <div>
            <h2 className="font-bold mb-2">Joker-BilliarD</h2>
            <p className="text-sm">
                Dongans Billiard bukan sekadar tempat main billiard—di sini kamu bisa nongkrong santai sambil nikmati kopi dan camilan lezat di warkop kami. Suasana nyaman, meja berkualitas, plus obrolan seru bareng teman. Mau latihan serius atau sekadar hangout? Semua bisa di Dongans Billiard!<br />
                Bandar Lampung 35131, Lampung, Indonesia<br />
                Telp +6281271589534<br />
                Email: dongansbilliar@gmail.com<br />
                Alamat: Jl. Pangeran Senopati Raya, jalur 2 Korpri Sukarame (Belakang RM Padang Airan)<br />
                Buka Setiap Hari 12.00 - 02.00 WIB
            </p>
        </div>

        {/* Kolom 2: Halaman Cepat */}
        <div className="text-left">
            <h3 className="font-bold mb-4">Halaman Cepat</h3>
            <ul className="space-y-5 text-sm flex flex-col items-start">
                <li><Link href="/dashboard">Beranda</Link></li>
                <li><Link href="/booking">Booking</Link></li>
                <li><Link href="/tentang">Tentang</Link></li>
            </ul>
        </div>

        {/* Kolom 3: Follow Kami */}
        <div className="text-center">
        <h3 className="font-bold mb-2">Follow Kami</h3>
        <div className="flex justify-center gap-5">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Image 
                src="/icons/ikonfb.png" 
                alt="Facebook"
                width={32} 
                height={32}
                className="hover:scale-110 transition"
            />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Image 
                src="/icons/ikonig1.png" 
                alt="Instagram"
                width={32} 
                height={32}
                className="hover:scale-110 transition"
            />
            </a>
            <a href="https://wa.me/62812803196" target="_blank" rel="noopener noreferrer">
            <Image 
                src="/icons/ikonwa1.png" 
                alt="WhatsApp"
                width={32} 
                height={32}
                className="hover:scale-110 transition"
            />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Image 
                src="/icons/ikontwt.png" 
                alt="Twitter"
                width={32} 
                height={32}
                className="hover:scale-110 transition"
            />
            </a>
        </div>
        </div>
  </div>

        {/* Copyright */}
        <div className="border-t border-gray-400 mt-8 pt-1 text-sm text-center">
            <p>Hak Cipta Joker-BilliarD 2025</p>
            <p>Developed by Kuliah Praktek Teknik Informatika Institut Teknologi Sumatera</p>
        </div>
</footer>

  )
}
