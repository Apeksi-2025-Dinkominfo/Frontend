import Link from 'next/link';
import { format } from 'date-fns';
import { apeksiNews, fetchNewsItems, getTruncatedTitle, getTruncatedBody, NewsItem } from '../utils/beritaData';

const BeritaPage = async ({ searchParams }: { searchParams: { page?: string; tab?: string } }) => {
  // Fetch data and handle potential errors
  let infoSurabaya: NewsItem[] = [];
  try {
    infoSurabaya = await fetchNewsItems();
  } catch (error) {
    console.error('Failed to fetch Info Surabaya news items:', error);
  }

  // Determine which tab is selected based on the searchParams
  const selectedTab = searchParams.tab || 'surabaya'; // Default to 'surabaya' tab

  // Determine which news items to show based on selected tab
  const newsItems = selectedTab === 'surabaya' ? infoSurabaya : apeksiNews;

  // Pagination variables
  const itemsPerPage = 10;
  const currentPage = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(newsItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="mt-8 px-8 py-8">
      <div className="mb-4 flex justify-start">
        <Link href="?tab=surabaya&page=1" passHref>
          <button
            className={`py-2 px-4 font-semibold ${
              selectedTab === 'surabaya' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            }`}
          >
            Info Suroboyo
          </button>
        </Link>
        <Link href="?tab=apeksi&page=1" passHref>
          <button
            className={`ml-4 py-2 px-4 font-semibold ${
              selectedTab === 'apeksi' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'
            }`}
          >
            Berita Apeksi
          </button>
        </Link>
      </div>

      {/* Show news items or a message if empty */}
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentItems.map((item) => (
            <Link href={`/berita/${item.id}`} key={item.id} passHref>
              <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden">
                <img
                  src={item.images}
                  alt={item.tittle || 'News Image'}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h2 className="font-bold text-lg text-black mb-1 truncate">
                  {getTruncatedTitle(item.tittle || 'No Title')}
                </h2>
                <p className="text-sm text-gray-700 mb-1 line-clamp-3">
                  {getTruncatedBody(item.body || 'No description available.')}
                </p>
                <p className="text-xs text-gray-500">
                  {item.location} - {format(new Date(item.date), 'dd MMM yyyy')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8">No news items available.</p>
      )}

      {/* Numeric Pagination Controls */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <Link key={page} href={`?tab=${selectedTab}&page=${page}`} passHref>
            <button
              className={`mx-2 px-4 py-2 rounded ${
                page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {page}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BeritaPage;
