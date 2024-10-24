'use client';
import Sidebar from '../../components/sidebar';
import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import XLSX for Excel generation

// Define the interface for the participant data
interface PesertaData {
  asal_kota: string;
  nama_walikota: string;
  nama_ajudan: string;
  nomor_handphone: string;
  tanggal_kedatangan: string;
  jam_kedatangan: string;
  tanggal_kepulangan: string;
  lokasi_menginap: string;
  jumlah_rombongan: number;
  pesawat: string;
}

export default function DataRegistrasi() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeButton, setActiveButton] = useState(2); // Use number (2 represents Data Registrasi)

  // Explicitly type the useState with PesertaData[] (array of PesertaData)
  const [data, setData] = useState<PesertaData[]>([]);

  // Fetch data from the backend API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/peserta');
        const result: PesertaData[] = await response.json(); // Type the API response correctly
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Format date to display month name (e.g., "October 10, 2024")
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return date.toLocaleDateString('en-US', options); // This will give you 'October 10, 2024'
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSidebarClick = (buttonId: number) => {
    setActiveButton(buttonId);
  };

  // Function to download the data as Excel file
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      data.map((item) => ({
        'Asal Kota': item.asal_kota,
        'Nama Walikota': item.nama_walikota,
        'Nama Ajudan': item.nama_ajudan,
        'Nomor Handphone': item.nomor_handphone,
        'Tanggal Kedatangan': formatDate(item.tanggal_kedatangan),
        'Jam Kedatangan': item.jam_kedatangan,
        'Tanggal Kepulangan': formatDate(item.tanggal_kepulangan),
        'Lokasi Menginap': item.lokasi_menginap,
        'Jumlah Rombongan': item.jumlah_rombongan,
        Pesawat: item.pesawat,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Peserta');

    // Trigger download
    XLSX.writeFile(workbook, 'data_peserta.xlsx');
  };

  return (
    <div className="flex">
      <Sidebar activeButton={activeButton} onButtonClick={handleSidebarClick} />
      <div className="flex-1 p-6 ">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-semibold">Search</h2>
            <input
              type="text"
              placeholder="Search by Kota/Walikota"
              className="border p-2 mt-1"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2"
              onClick={downloadExcel}
            >
              Download Excel
            </button>
            <button className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600">
              + Add Participant
            </button>
          </div>
        </div>

        <div className="overflow-auto">
          {' '}
          {/* Add scrollable area for overflow */}
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-2 py-2 w-8">No</th>{' '}
                {/* Smaller width */}
                <th className="border px-4 py-2 w-40">Asal Kota</th>
                <th className="border px-4 py-2 w-40">Nama Walikota</th>
                <th className="border px-4 py-2 w-40">Nama Ajudan</th>
                <th className="border px-4 py-2 w-40">Nomor Handphone</th>
                <th className="border px-4 py-2 w-36">Tanggal Kedatangan</th>
                <th className="border px-4 py-2 w-36">Jam Kedatangan</th>
                <th className="border px-4 py-2 w-36">Tanggal Kepulangan</th>
                <th className="border px-4 py-2 w-40">Lokasi Menginap</th>
                <th className="border px-4 py-2 w-40">Jumlah Rombongan</th>
                <th className="border px-4 py-2 w-36">Pesawat</th>
                <th className="border px-4 py-2 w-36">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter(
                  (item) =>
                    item.asal_kota
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase()) ||
                    item.nama_walikota
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                )
                .map((item, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2">{item.asal_kota}</td>
                    <td className="border px-4 py-2">{item.nama_walikota}</td>
                    <td className="border px-4 py-2">{item.nama_ajudan}</td>
                    <td className="border px-4 py-2">{item.nomor_handphone}</td>
                    <td className="border px-4 py-2">
                      {formatDate(item.tanggal_kedatangan)}
                    </td>
                    <td className="border px-4 py-2">{item.jam_kedatangan}</td>
                    <td className="border px-4 py-2">
                      {formatDate(item.tanggal_kepulangan)}
                    </td>
                    <td className="border px-4 py-2">{item.lokasi_menginap}</td>
                    <td className="border px-4 py-2 text-center">
                      {item.jumlah_rombongan}
                    </td>
                    <td className="border px-4 py-2">{item.pesawat}</td>
                    <td className="border px-4 py-2">
                      <button className="bg-blue-500 text-white px-4 py-1 mr-2 rounded hover:bg-blue-600">
                        Update
                      </button>
                      <button className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
