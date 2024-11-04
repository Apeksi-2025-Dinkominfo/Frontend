export interface NewsItem {
  id: number;
  tittle: string;
  images: string;
  location: string;
  date: string;
  body: string;
}

// Function to fetch all news items from the backend
export const fetchNewsItems = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch('http://localhost:5000/news?limit=10000');
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

// Function to sort items by date and get the latest one for main news
export const getLatestNews = (items: NewsItem[]) => {
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
};

// Fungsi untuk memotong teks judul dengan batas 150 karakter
export const getTruncatedTitle = (title: string, maxLength = 150) => {
  if (title.length > maxLength) {
    return title.slice(0, maxLength) + '...';
  }
  return title;
};

// Fungsi untuk memotong teks body dengan batas 350 karakter
export const getTruncatedBody = (body: string, maxLength = 350) => {
  if (body.length > maxLength) {
    return body.slice(0, maxLength) + '...';
  }
  return body;
};

