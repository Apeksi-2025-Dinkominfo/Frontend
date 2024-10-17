// utils/fetchData.ts

export interface Peserta {
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
  
  export const fetchPesertaData = async (): Promise<Peserta[]> => {
    const response = await fetch('http://localhost:5000/peserta');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return response.json();
  };
  