import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; // Import XLSX for Excel generation
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Pagination from '@mui/material/Pagination';

interface PesertaData {
  id: number;
  asal_kota: string;
  nama: string;
  jabatan: string;
  instansi: string;
  nama_unit_kerja: string;
  nama_ajudan: string;
  nomor_handphone: string;
  tanggal_kedatangan: string;
  jam_kedatangan: string;
  tanggal_kepulangan: string;
  lokasi_menginap: string;
  jumlah_rombongan: number;
  transportasi: string;
  ukuran_baju_ibuk: string; // New field for Ibuk's shirt size
  ukuran_baju_bapak: string; // New field for Bapak's shirt size
  updated: boolean;
}

export default function DataRegistrasi() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeButton, setActiveButton] = useState(2); // Use number (2 represents Data Registrasi)
  const [data, setData] = useState<PesertaData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/optd');
        const result: PesertaData[] = await response.json();

        const updatedStatus = JSON.parse(
          localStorage.getItem('updatedStatus') || '{}'
        );

        const newData = result.map((item) => ({
          ...item,
          updated: updatedStatus[item.id] || false,
        }));

        setData(newData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data
    .filter(
      (item) =>
        item.asal_kota.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstItem, indexOfLastItem);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSidebarClick = (buttonId: number) => {
    setActiveButton(buttonId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Function to download the data as an Excel file
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      currentItems.map((item) => ({
        'Asal Kota': item.asal_kota,
        'Nama Walikota': item.nama,
        'Nama Jabatan': item.jabatan,
        'Nama Instansi': item.instansi,
        'Unit Kerja': item.nama_unit_kerja,
        'Nama Ajudan': item.nama_ajudan,
        'Nomor Handphone': item.nomor_handphone,
        'Tanggal Kedatangan': formatDate(item.tanggal_kedatangan),
        'Jam Kedatangan': item.jam_kedatangan,
        'Tanggal Kepulangan': formatDate(item.tanggal_kepulangan),
        'Lokasi Menginap': item.lokasi_menginap,
        'Jumlah Rombongan': item.jumlah_rombongan,
        Transportasi: item.transportasi,
        'Baju Wali Kota / Wakil': item.ukuran_baju_bapak,
        'Baju Suami / Istri Walikota': item.ukuran_baju_ibuk,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Peserta');

    // Trigger download
    XLSX.writeFile(workbook, 'data_peserta.xlsx');
  };

  const handleUpdate = async (item: PesertaData) => {
    const { value: formValues } = await Swal.fire({
      // Add new input fields for ukuran_baju_ibuk and ukuran_baju_bapak
      title: 'Update Pejabat Perwakilan',
      html: `
        <input id="asal_kota" class="swal2-input" placeholder="Asal Kota" value="${
          item.asal_kota
        }">
        <input id="nama_walikota" class="swal2-input" placeholder="Nama Walikota" value="${
          item.nama
        }">
        <input id="jabatan" class="swal2-input" placeholder="Nama Jabatan" value="${
          item.jabatan
        }">
        <input id="instansi" class="swal2-input" placeholder="instansi Kerja" value="${
          item.instansi
        }">
        <input id="nama_unit_kerja" class="swal2-input" placeholder="Nama Unit kerja" value="${
          item.nama_unit_kerja
        }">
        <input id="nama_ajudan" class="swal2-input" placeholder="Nama Ajudan" value="${
          item.nama_ajudan
        }">
        <input id="nomor_handphone" class="swal2-input" placeholder="Nomor Handphone" value="${
          item.nomor_handphone
        }">
        <input id="tanggal_kedatangan" class="swal2-input" placeholder="Tanggal Kedatangan" type="date" value="${
          item.tanggal_kedatangan.split('T')[0]
        }">
        <input id="jam_kedatangan" class="swal2-input" placeholder="Jam Kedatangan" value="${
          item.jam_kedatangan
        }">
        <input id="tanggal_kepulangan" class="swal2-input" placeholder="Tanggal Kepulangan" type="date" value="${
          item.tanggal_kepulangan.split('T')[0]
        }">
        <input id="lokasi_menginap" class="swal2-input" placeholder="Lokasi Menginap" value="${
          item.lokasi_menginap
        }">
        <input id="jumlah_rombongan" class="swal2-input" placeholder="Jumlah Rombongan" type="number" value="${
          item.jumlah_rombongan
        }">
        <input id="transportasi" class="swal2-input" placeholder="Transportasi" value="${
          item.transportasi
        }">
        <input id="ukuran_baju_ibuk" class="swal2-input" placeholder="Ukuran Baju Ibuk" value="${
          item.ukuran_baju_ibuk
        }">
        <input id="ukuran_baju_bapak" class="swal2-input" placeholder="Ukuran Baju Bapak" value="${
          item.ukuran_baju_bapak
        }">
      `,
      focusConfirm: false,
      preConfirm: () => {
        return {
          asal_kota: (document.getElementById('asal_kota') as HTMLInputElement)
            .value,
          nama_walikota: (
            document.getElementById('nama_walikota') as HTMLInputElement
          ).value,
          jabatan: (document.getElementById('jabatan') as HTMLInputElement)
            .value,
          instansi: (document.getElementById('instansi') as HTMLInputElement)
            .value,
          nama_unit_kerja: (
            document.getElementById('nama_unit_kerja') as HTMLInputElement
          ).value,
          nama_ajudan: (
            document.getElementById('nama_ajudan') as HTMLInputElement
          ).value,
          nomor_handphone: (
            document.getElementById('nomor_handphone') as HTMLInputElement
          ).value,
          tanggal_kedatangan: new Date(
            (
              document.getElementById('tanggal_kedatangan') as HTMLInputElement
            ).value
          ).toISOString(),
          jam_kedatangan: (
            document.getElementById('jam_kedatangan') as HTMLInputElement
          ).value,
          tanggal_kepulangan: new Date(
            (
              document.getElementById('tanggal_kepulangan') as HTMLInputElement
            ).value
          ).toISOString(),
          lokasi_menginap: (
            document.getElementById('lokasi_menginap') as HTMLInputElement
          ).value,
          jumlah_rombongan: parseInt(
            (document.getElementById('jumlah_rombongan') as HTMLInputElement)
              .value,
            10
          ),
          transportasi: (
            document.getElementById('transportasi') as HTMLInputElement
          ).value,
          ukuran_baju_ibuk: (
            document.getElementById('ukuran_baju_ibuk') as HTMLInputElement
          ).value,
          ukuran_baju_bapak: (
            document.getElementById('ukuran_baju_bapak') as HTMLInputElement
          ).value,
        };
      },
    });

    if (formValues) {
      try {
        await fetch(`http://localhost:5000/optd/${item.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formValues),
        });

        Swal.fire('Updated!', 'Participant data has been updated.', 'success');

        setData(
          data.map((d) =>
            d.id === item.id ? { ...d, ...formValues, updated: true } : d
          )
        );

        const updatedStatus = JSON.parse(
          localStorage.getItem('updatedStatus') || '{}'
        );
        updatedStatus[item.id] = true;
        localStorage.setItem('updatedStatus', JSON.stringify(updatedStatus));
      } catch (error) {
        console.error('Error updating data:', error);
      }
    }
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`http://localhost:5000/optd/${id}`, {
            method: 'DELETE',
          });
          Swal.fire(
            'Deleted!',
            'Your participant has been deleted.',
            'success'
          );
          setData(data.filter((item) => item.id !== id));
        } catch (error) {
          console.error('Error deleting data:', error);
        }
      }
    });
  };

  // Pagination controls
  const pageCount = Math.ceil(data.length / itemsPerPage);

  return (
    <div className="mr-20">
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
            <h3 className='text-2xl font-semibold'> Data Pejabat</h3>
          <div>
            <h2 className="text-lg font-semibold">Search</h2>
            <input
              type="text"
              placeholder="Search by Kota/Pejabat"
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
          </div>
        </div>

        <div className="overflow-auto">
          <table className="table-auto w-full border-collapse">
            <thead>
              <tr>
                <th className="border px-2 py-2 w-8">No</th>
                <th className="border px-4 py-2 w-40">Asal Kota</th>
                <th className="border px-4 py-2 w-40">Nama Pejabat</th>
                <th className="border px-4 py-2 w-40">Nama Jabatan</th>
                <th className="border px-4 py-2 w-40">Nama Instansi</th>
                <th className="border px-4 py-2 w-40">Nama Unit Kerja</th>
                <th className="border px-4 py-2 w-40">Nama Ajudan</th>
                <th className="border px-4 py-2 w-40">Nomor Handphone</th>
                <th className="border px-4 py-2 w-36">Tanggal Kedatangan</th>
                <th className="border px-4 py-2 w-36">Jam Kedatangan</th>
                <th className="border px-4 py-2 w-36">Tanggal Kepulangan</th>
                <th className="border px-4 py-2 w-40">Lokasi Menginap</th>
                <th className="border px-4 py-2 w-40">Jumlah Rombongan</th>
                <th className="border px-4 py-2 w-36">Transportasi</th>
                <th className="border px-4 py-2 w-36">Ukuran Baju Bapak</th>
                <th className="border px-4 py-2 w-36">Ukuran Baju Ibuk</th>
                <th className="border px-4 py-2 w-36">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id}>
                  <td className="border px-2 py-2 text-center">
                    {index + 1 + indexOfFirstItem}
                  </td>
                  <td className="border px-4 py-2">
                    {item.asal_kota.replace(/_/g, ' ')}
                  </td>
                  <td className="border px-4 py-2">{item.nama}</td>
                  <td className="border px-4 py-2">{item.instansi}</td>
                  <td className="border px-4 py-2">{item.jabatan}</td>
                  <td className="border px-4 py-2">{item.nama_unit_kerja}</td>
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
                  <td className="border px-4 py-2">{item.transportasi}</td>
                  <td className="border px-4 py-2">{item.ukuran_baju_bapak}</td>
                  <td className="border px-4 py-2">{item.ukuran_baju_ibuk}</td>
                  <td className="border px-4 py-2">
                    <div className="flex justify-center">
                      <button
                        className={`px-2 py-1 mr-2 rounded hover:bg-blue-600 ${
                          item.updated
                            ? 'bg-gray-300 cursor-not-allowed'
                            : 'bg-blue-500 text-white'
                        }`}
                        onClick={() => !item.updated && handleUpdate(item)}
                        disabled={item.updated}
                      >
                        <Typography
                          variant="body2"
                          component="span"
                          fontWeight={item.updated ? 'normal' : 'bold'}
                        >
                          <EditIcon />
                        </Typography>
                      </button>
                      <button
                        className="px-2 py-1 rounded hover:bg-red-600 bg-red-500 text-white"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Typography
                          variant="body2"
                          component="span"
                          fontWeight="bold"
                        >
                          <DeleteIcon /> {/* Your delete icon component */}
                        </Typography>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4">
          <Pagination
            count={pageCount} // Total number of pages
            page={currentPage} // Current page
            onChange={(event, value) => setCurrentPage(value)} // Handle page change
            color="primary" // Optional: change color
            size="medium" // Optional: adjust size
            variant="outlined" // Optional: change style
            shape="rounded" // Optional: round pagination buttons
          />
        </div>
      </div>
    </div>
  );
}
