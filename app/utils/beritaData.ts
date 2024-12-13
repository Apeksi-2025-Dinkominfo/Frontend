import { parseISO, parse, format } from 'date-fns';

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
  feature_image_url: string;
  publish_date: string;
  content: string;
}

export const SurabayFetch = async (): Promise<SurabayaItem[]> => {
  const url = 'https://surabaya.go.id/api/data/news?page=1&category=berita';

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Failed to fetch news items');
    }

    const jsonResponse = await response.json();

    // Extract the data, assuming the response has a `data` field containing the items
    return jsonResponse.data || [];
  } catch (error) {
    console.error('Error fetching Surabaya news:', error);
    return [];
  }
};


export const fetchNewsItems = async (): Promise<NewsItem[]> => {
  try {
    const response = await fetch('http://localhost:5000/news?limit=50');
    if (!response.ok) {
      throw new Error('Failed to fetch news items');
    }
    const data = await response.json();
    // console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};



export const formatDate = (dateString: string): string => {
  try {
    const date = dateString.includes('T') 
      ? parseISO(dateString) 
      : parse(dateString, 'yyyy-MM-dd', new Date());
    return format(date, 'dd MMMM yyyy');
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

