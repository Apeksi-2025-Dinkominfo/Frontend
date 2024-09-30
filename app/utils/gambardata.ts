// Mendefinisikan interface untuk ImageType
export interface ImageType {
  id: number; // Menambahkan ID untuk setiap gambar
  src: string;
  title: string;
}

// Menambahkan data gambar dengan format yang sesuai
export const images: ImageType[] = [
  { id: 1, src: 'example1.jpg', title: 'Gambar 1' },
  { id: 2, src: 'example2.jpg', title: 'Gambar 2' },
  { id: 3, src: 'example3.jpg', title: 'Gambar 3' },
  { id: 4, src: 'example4.png', title: 'Gambar 4' },
  { id: 5, src: 'example5.png', title: 'Gambar 5' },
  { id: 6, src: 'example6.jpg', title: 'Gambar 6' },
  { id: 7, src: 'example7.jpg', title: 'Gambar 7' },
  { id: 8, src: 'example8.png', title: 'Gambar 8' },
  { id: 9, src: 'example9.png', title: 'Gambar 9' },
  { id: 10, src: 'example10.jpg', title: 'Gambar 10' },
];

// Fungsi untuk mengambil gambar terbaru
export const getLatestImage = (items: ImageType[]) => {
  return items[items.length - 1]; // Mengambil gambar terakhir dalam array
};

// Gambar terbaru
export const latestImage: ImageType = getLatestImage(images);

// Fungsi untuk memotong judul jika lebih dari 50 karakter
export const getTruncatedImageTitle = (title: string) => {
  return title.length > 50 ? `${title.slice(0, 50)}...` : title;
};
