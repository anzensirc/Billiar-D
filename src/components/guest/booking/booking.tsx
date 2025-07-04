'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function Booking() {
  const searchParams = useSearchParams();
  const categoryFromQuery = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTableNumber, setSelectedTableNumber] = useState<number | null>(null);
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showNumberOptions, setShowNumberOptions] = useState(false);

  const [selectedDate, setSelectedDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const slots = [
    { time: '12.00 - 13.00', status: 'Tersedia' },
    { time: '13.00 - 14.00', status: 'Booked' },
    { time: '14.00 - 15.00', status: 'Booked' },
    { time: '15.00 - 16.00', status: 'Tersedia' },
    { time: '16.00 - 17.00', status: 'Booked' },
    { time: '17.00 - 18.00', status: 'Booked' },
    { time: '18.00 - 19.00', status: 'Tersedia' },
    { time: '19.00 - 20.00', status: 'Tersedia' },
    { time: '20.00 - 21.00', status: 'Booked' },
    { time: '21.00 - 22.00', status: 'Booked' },
    { time: '22.00 - 23.00', status: 'Tersedia' },
    { time: '23.00 - 24.00', status: 'Tersedia' },
    { time: '24.00 - 01.00', status: 'Tersedia' },
    { time: '01.00 - 02.00', status: 'Tersedia' },
  ];

  const tableCategories = ['Meja Kecil', 'Meja Besar'];
  const tableNumbers = {
    'Meja Kecil': [1, 2, 3, 4],
    'Meja Besar': [1, 2],
  };

  // ✅ Biar kategori auto ke-set dari query
  useEffect(() => {
    if (categoryFromQuery) {
      setSelectedCategory(categoryFromQuery);
      setShowCategoryOptions(false);
      setShowNumberOptions(true); // langsung buka opsi nomor meja
    }
  }, [categoryFromQuery]);

  return (
    <main className="px-8 py-12 flex flex-col lg:flex-row gap-12">
      {/* Kiri: Detail meja */}
      <div className="flex-1">
        <h1 className="text-xl font-bold mb-4">
          {selectedCategory && selectedTableNumber
            ? `Pesan ${selectedCategory}-${selectedTableNumber}`
            : 'Pesan Meja'}
        </h1>

        <div className="w-full h-64 bg-gray-300 flex items-center justify-center mb-4">
          <span className="text-gray-500">
            {selectedCategory && selectedTableNumber
              ? `Gambar ${selectedCategory}-${selectedTableNumber}`
              : 'Gambar Meja'}
          </span>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <p className="mb-2">
            {selectedCategory && selectedTableNumber
              ? `Deskripsi ${selectedCategory}-${selectedTableNumber}`
              : 'Deskripsi Singkat Meja'}
          </p>
          <p>Harga : Rp20.000 / jam</p>
        </div>
      </div>

      {/* Kanan: Pilih jadwal */}
      <div className="flex-1 relative">
        {/* Pilih Kategori Meja */}
        <button
          onClick={() => {
            setShowCategoryOptions(!showCategoryOptions);
            setShowNumberOptions(false);
          }}
          className="w-full bg-pink-300 text-gray-800 px-4 py-2 mb-2 rounded flex items-center justify-between"
        >
          <span>{selectedCategory ? selectedCategory : 'Pilih Kategori Meja'}</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showCategoryOptions && (
          <div className="absolute w-full bg-white border rounded shadow z-10 mb-2">
            {tableCategories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedCategory(category);
                  setShowCategoryOptions(false);
                  setShowNumberOptions(true);
                  setSelectedTableNumber(null);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Pilih Nomor Meja */}
        {selectedCategory && (
          <button
            onClick={() => setShowNumberOptions(!showNumberOptions)}
            className="w-full bg-pink-300 text-gray-800 px-4 py-2 mb-4 rounded flex items-center justify-between"
          >
            <span>
              {selectedTableNumber
                ? `${selectedCategory}-${selectedTableNumber}`
                : 'Pilih Nomor Meja'}
            </span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        )}

        {showNumberOptions && selectedCategory && (
          <div className="absolute w-full bg-white border rounded shadow z-10 mb-4">
            {(tableNumbers[selectedCategory] || []).map((num) => (
              <button
                key={num}
                onClick={() => {
                  setSelectedTableNumber(num);
                  setShowNumberOptions(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {`${selectedCategory}-${num}`}
              </button>
            ))}
          </div>
        )}

        {/* Pilih Tanggal */}
        <div className="mb-4 flex justify-end">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="bg-pink-300 text-gray-800 p-2 rounded"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M8 7V3M16 7V3M3 11h18M5 5h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
            </svg>
          </button>
        </div>

        {showDatePicker && (
          <div className="mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
        )}

        {/* Slot Waktu */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {slots.map((slot, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center justify-center p-4 rounded ${
                slot.status === 'Booked' ? 'bg-gray-400' : 'bg-gray-200'
              }`}
            >
              <button className="bg-gray-500 text-white rounded-full w-6 h-6 flex items-center justify-center mb-2">
                +
              </button>
              <p className="text-sm">{slot.time}</p>
              <p
                className={`text-xs ${
                  slot.status === 'Booked'
                    ? 'text-red-600 font-semibold'
                    : 'text-green-600 font-semibold'
                }`}
              >
                {slot.status}
              </p>
            </div>
          ))}
        </div>

        <Link href="/payment" passHref>
          <button className="
            w-full 
            bg-gray-800
            text-white
            px-4 py-3
            rounded
            transition
            duration-200
            hover:bg-gray-700
            active:scale-95
            active:bg-gray-900
          ">
            Lanjutkan Pembayaran
          </button>
        </Link>
        
      </div>
    </main>
  );
}
