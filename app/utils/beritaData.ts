import { parseISO, parse, format as dateFormat } from 'date-fns';

export interface NewsItem {
  id: number;
  tittle: string;
  images: string;
  location: string;
  date: string;
  body: string;
}

export interface SurabayaItem {
  id: number;
  title: string;
  image: string;
  category: string;
  created_at: string;
  content: string;
}

export const SurabayFetch = async (): Promise<SurabayaItem[]> => {
  try {
    const response = await fetch('https://surabaya.go.id/api/data/news?page=1&category=berita');
    if (!response.ok) {
      throw new Error('Failed to fetch news items');
    }
    const jsonResponse = await response.json();
    return jsonResponse.data || [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

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

export const parseDate = (dateString: string | undefined): Date => {
  if (!dateString) {
    console.error('Received undefined date');
    return new Date(); // Return current date as fallback
  }
  try {
    // Try parsing as ISO format (2024-10-07T10:00:00.000Z)
    return parseISO(dateString);
  } catch {
    try {
      // Try parsing as custom format (2024-12-09T07:48:48+07:00)
      return parse(dateString, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date());
    } catch {
      console.error(`Failed to parse date: ${dateString}`);
      return new Date(); // Return current date as fallback
    }
  }
};

export const formatDate = (date: Date): string => {
  return dateFormat(date, 'dd MMM yyyy');
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

