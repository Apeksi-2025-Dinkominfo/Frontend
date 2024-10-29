export interface NewsItem {
  id: number;
  tittle: string;
  images: string;
  location: string;
  date: string;
  body: string;
}

// Apeksi news dummy data
export const apeksiNews: NewsItem[] = [
  {
    id: 101,
    tittle: "Momentum Hari Sumpah Pemuda",
    images: "/kotalama.jpg", // Replace with actual path to the image
    location: "Surabaya",
    date: "2024-10-28",
    body: "Pemerintah Kota Surabaya menggelar upacara peringatan Hari Sumpah Pemuda ke-96...",
  },
  {
    id: 102,
    tittle: "Momentum Hari Sumpah Pemuda 2",
    images: "/KulinerNew.JPG", // Replace with actual path to the image
    location: "Surabaya",
    date: "2024-10-28",
    body: "Pemerintah Kota Surabaya menggelar upacara peringatan Hari Sumpah Pemuda ke-96...",
  },
  {
    id: 103,
    tittle: "Momentum Hari Sumpah Pemuda",
    images: "/perpus.jpg", // Replace with actual path to the image
    location: "Surabaya",
    date: "2024-10-28",
    body: "Pemerintah Kota Surabaya menggelar upacara peringatan Hari Sumpah Pemuda ke-96...",
  },
  {
    id: 104,
    tittle: "Momentum Hari Sumpah Pemuda",
    images: "/siropen.jpg", // Replace with actual path to the image
    location: "Surabaya",
    date: "2024-10-28",
    body: "Pemerintah Kota Surabaya menggelar upacara peringatan Hari Sumpah Pemuda ke-96...",
  },
  {
    id: 105,
    tittle: "Momentum Hari Sumpah Pemuda",
    images: "/path-to-your-image.jpg", // Replace with actual path to the image
    location: "Surabaya",
    date: "2024-10-28",
    body: "Pemerintah Kota Surabaya menggelar upacara peringatan Hari Sumpah Pemuda ke-96...",
  },
  {
    id: 106,
    tittle: "Momentum Hari Sumpah Pemuda",
    images: "/path-to-your-image.jpg", // Replace with actual path to the image
    location: "Surabaya",
    date: "2024-10-28",
    body: "Pemerintah Kota Surabaya menggelar upacara peringatan Hari Sumpah Pemuda ke-96...",
  },
  {
    id: 107,
    tittle: "Momentum Hari Sumpah Pemuda",
    images: "/path-to-your-image.jpg", // Replace with actual path to the image
    location: "Surabaya",
    date: "2024-10-28",
    body: "Pemerintah Kota Surabaya menggelar upacara peringatan Hari Sumpah Pemuda ke-96...",
  },
  // Add more dummy items as needed
];

// Function to fetch all news items from the backend
export const fetchNewsItems = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch('http://localhost:5000/news?limit=100');
    if (!response.ok) {
      throw new Error('Failed to fetch news items');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Other utility functions remain the same
export const getLatestNews = (items: NewsItem[]) => {
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
};

export const getTruncatedTitle = (title: string, maxLength = 150) => {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '...';
  }
  return title;
};

export const getTruncatedBody = (body: string, maxLength = 350) => {
  if (body.length > maxLength) {
    return body.slice(0, maxLength) + '...';
  }
  return body;
};
