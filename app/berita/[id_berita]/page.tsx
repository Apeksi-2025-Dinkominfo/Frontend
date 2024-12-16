import { notFound } from 'next/navigation';
import { SurabayFetch, fetchNewsItems, parseDate, getTruncatedBody,formatDate, NewsItem, SurabayaItem } from '../../utils/beritaData';

async function getNewsItem(id: string): Promise<NewsItem | SurabayaItem | null> {
  const [surabayaItems, apeksiItems] = await Promise.all([SurabayFetch(), fetchNewsItems()]);
  
  console.log(surabayaItems)

  const surabayaItem = surabayaItems.find(item => item.id.toString() === id);
  if (surabayaItem) return surabayaItem;
  
  console.log(apeksiItems)

  const apeksiItem = apeksiItems.find(item => item.id.toString() === id);
  if (apeksiItem) return apeksiItem;

  return null;
}


export default async function BeritaDetail({ params }: { params: { id_berita: string } }) {
  const newsItem = await getNewsItem(params.id_berita);

  if (!newsItem) {
    notFound();
  }

  const isSurabayaItem = 'title' in newsItem;

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={isSurabayaItem ? newsItem.image : newsItem.images}
          alt={isSurabayaItem ? newsItem.title : newsItem.tittle}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">
            {isSurabayaItem ? newsItem.title : newsItem.tittle}
          </h1>
          <p className="text-gray-600 mb-4">
            {isSurabayaItem ? newsItem.category : newsItem.location} - {formatDate(parseDate(isSurabayaItem ? newsItem.created_at : newsItem.date))}
          </p>
          <div className="prose max-w-none">
          <p
                    className="text-sm text-gray-700 mb-1 line-clamp-3"
                    dangerouslySetInnerHTML={{
                      __html: (
                        isSurabayaItem
                          ? newsItem.content
                          : newsItem.body || 'No description available.'
                      ),
                    }}
                  />
          </div>
        </div>
      </article>
    </div>
  );
}

