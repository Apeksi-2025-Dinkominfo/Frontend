export interface Gambar {
  id: number;
  url: string;
  photoType: string;
}

  export const fetchGambarData = async (): Promise<Gambar[]> => {
    try {
      const response = await fetch('http://localhost:5000/gambar');
      if (!response.ok) {
        throw new Error('Failed to fetch gambar data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };