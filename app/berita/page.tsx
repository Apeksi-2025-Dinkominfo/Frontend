import Link from 'next/link';
import {
  SurabayFetch,
  fetchNewsItems,
  getTruncatedTitle,
  getTruncatedBody,
  parseDate,
  formatDate,
  NewsItem,
  SurabayaItem,
} from '../utils/beritaData';
import DOMPurify from 'dompurify';
const BeritaPage = async ({
  searchParams,
}: {
  searchParams: { page?: string; tab?: string };
}) => {
  // Fetch data and handle potential errors
  let infoSurabaya: SurabayaItem[] = [];
  let apeksiNews: NewsItem[] = [];
  try {
    infoSurabaya = await SurabayFetch();
    apeksiNews = await fetchNewsItems();
  } catch (error) {
    console.error('Failed to fetch news items:', error);
  }

  // Determine which tab is selected based on the searchParams
  const selectedTab = searchParams.tab || 'surabaya'; // Default to 'surabaya' tab

  // Determine which news items to show based on selected tab and sort by date
  const newsItems =
    selectedTab === 'surabaya'
      ? infoSurabaya.sort(
          (a, b) =>
            parseDate(b.created_at).getTime() -
            parseDate(a.created_at).getTime()
        )
      : apeksiNews.sort(
          (a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()
        );

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
              selectedTab === 'surabaya'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
          >
            Info Surabaya
          </button>
        </Link>
        <Link href="?tab=apeksi&page=1" passHref>
          <button
            className={`ml-4 py-2 px-4 font-semibold ${
              selectedTab === 'apeksi'
                ? 'text-blue-500 border-b-2 border-blue-500'
                : 'text-gray-500'
            }`}
          >
            Berita Apeksi
          </button>
        </Link>
      </div>

      {/* Show news items or a message if empty */}
      {currentItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {currentItems.map((item) => {
            const isSurabayaItem = 'title' in item;
            return (
              <Link href={`/berita/${item.id}`} key={item.id}>
                <div className="flex flex-col bg-white p-4 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer overflow-hidden">
                  <img
                    src={isSurabayaItem ? item.feature_image_url : item.images}
                    alt={
                      isSurabayaItem ? item.title : item.tittle || 'News Image'
                    }
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h2 className="font-bold text-lg text-black mb-1 truncate">
                    {getTruncatedTitle(
                      isSurabayaItem ? item.title : item.tittle || 'No Title'
                    )}
                  </h2>
                  <p
                    className="text-sm text-gray-700 mb-1 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: getTruncatedBody(
                        isSurabayaItem
                          ? item.content
                          : item.body || 'No description available.'
                      ),
                    }}
                  />

                  <p className="text-xs text-gray-500">
                    {isSurabayaItem ? item.category : item.location} -{' '}
                    {formatDate(
                      parseDate(
                        isSurabayaItem ? item.created_at : item.publish_date
                      )
                    )}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-8">
          No news items available.
        </p>
      )}

      {/* Numeric Pagination Controls */}
      <div className="flex justify-center mt-8">
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <Link key={page} href={`?tab=${selectedTab}&page=${page}`} passHref>
              <button
                className={`mx-2 px-4 py-2 rounded ${
                  page === currentPage
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {page}
              </button>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default BeritaPage;
