export interface NewsItem {
    id_berita: number; 
    title: string;
    image: string;
    location: string;
    date: string;
    body: string; // Added body for each news item
  }
  
  export const beritaItems: NewsItem[] = [
    {
      id_berita: 1,
      title: 'The Impact of Global Technological Advancements on Modern Society...',
      image: '/kuliner.jpg',
      location: 'San Francisco',
      date: '23 Sep 2024',
      body: 'Leading technology companies gathered at the annual Global Summit...',
    },
    {
      id_berita: 2,
      title: 'A Comprehensive Study on Climate Change and Its Effects on Coastal Regions...',
      image: '/climate.jpg',
      location: 'Sydney',
      date: '22 Sep 2024',
      body: 'A global research initiative has been launched to tackle the growing threat...',
    },
    {
      id_berita: 3,
      title: 'Exploring the Role of Education in Fostering Innovation...',
      image: '/education.jpg',
      location: 'New York',
      date: '21 Sep 2024',
      body: 'Educational institutions worldwide are undergoing transformative changes...',
    },
    {
      id_berita: 4,
      title: 'The Growing Influence of Social Media on Public Opinion...',
      image: '/social_media.jpg',
      location: 'London',
      date: '20 Sep 2024',
      body: 'Social media’s impact on politics continues to grow...',
    },
    {
      id_berita: 5,
      title: 'A Deep Dive Into the Future of Space Exploration...',
      image: '/space.jpg',
      location: 'Houston',
      date: '19 Sep 2024',
      body: 'The future of space exploration is brighter than ever...',
    },
    {
      id_berita: 6,
      title: 'The Evolution of Artificial Intelligence in Healthcare...',
      image: '/ai_healthcare.jpg',
      location: 'Berlin',
      date: '18 Sep 2024',
      body: 'AI technologies are reshaping the healthcare industry...',
    },
    {
      id_berita: 7,
      title: 'How Renewable Energy is Revolutionizing Power Supply...',
      image: '/renewable_energy.jpg',
      location: 'Amsterdam',
      date: '17 Sep 2024',
      body: 'Countries are adopting renewable energy solutions...',
    },
    {
      id_berita: 8,
      title: 'The Impact of Automation on the Global Workforce...',
      image: '/automation.jpg',
      location: 'Tokyo',
      date: '16 Sep 2024',
      body: 'Automation is changing the landscape of industries worldwide...',
    },
    {
      id_berita: 9,
      title: 'Examining the Rise of Sustainable Fashion...',
      image: '/sustainable_fashion.jpg',
      location: 'Paris',
      date: '15 Sep 2024',
      body: 'Sustainable fashion is gaining momentum as consumers prioritize ethics...',
    },
    {
      id_berita: 10,
      title: 'The Role of Blockchain in Securing Digital Transactions...',
      image: '/blockchain.jpg',
      location: 'Singapore',
      date: '14 Sep 2024',
      body: 'Blockchain technology is proving to be vital in securing financial operations...',
    },
    {
      id_berita: 11,
      title: 'Breaking Barriers: Women in the Tech Industry...',
      image: '/women_tech.jpg',
      location: 'Toronto',
      date: '13 Sep 2024',
      body: 'Women are making significant strides in the tech world...',
    },
    {
      id_berita: 12,
      title: 'The Future of Urban Mobility and Smart Cities...',
      image: '/smart_cities.jpg',
      location: 'Dubai',
      date: '12 Sep 2024',
      body: 'Smart cities are shaping the future of urban transportation...',
    },
    {
      id_berita: 13,
      title: 'Artificial Intelligence in Agriculture: A New Era...',
      image: '/ai_agriculture.jpg',
      location: 'Delhi',
      date: '11 Sep 2024',
      body: 'AI is helping farmers optimize productivity...',
    },
    {
      id_berita: 14,
      title: 'The Importance of Mental Health in the Workplace...',
      image: '/mental_health.jpg',
      location: 'Los Angeles',
      date: '10 Sep 2024',
      body: 'Companies are taking steps to prioritize mental health...',
    },
    {
      id_berita: 15,
      title: 'Cybersecurity Threats and the Modern Business Environment...',
      image: '/cybersecurity.jpg',
      location: 'Seattle',
      date: '09 Sep 2024',
      body: 'Businesses are constantly fighting against cyber threats...',
    },
    {
      id_berita: 16,
      title: 'The Role of 5G in Shaping the Future of Communication...',
      image: '/5g.jpg',
      location: 'Beijing',
      date: '08 Sep 2024',
      body: '5G technology is unlocking new possibilities in communication...',
    },
    {
      id_berita: 17,
      title: 'Exploring the Economic Benefits of the Green Economy...',
      image: '/green_economy.jpg',
      location: 'Stockholm',
      date: '07 Sep 2024',
      body: 'The transition to a green economy offers numerous economic benefits...',
    },
    {
      id_berita: 18,
      title: 'The Rise of Virtual Reality in Entertainment...',
      image: '/vr_entertainment.jpg',
      location: 'Los Angeles',
      date: '06 Sep 2024',
      body: 'Virtual reality is changing the landscape of the entertainment industry...',
    },
    {
      id_berita: 19,
      title: 'Addressing the Global Housing Crisis Through Innovation...',
      image: '/housing.jpg',
      location: 'Mexico City',
      date: '05 Sep 2024',
      body: 'Innovative solutions are being developed to address the housing crisis...',
    },
    {
      id_berita: 20,
      title: 'Exploring the Future of Autonomous Vehicles...',
      image: '/autonomous_vehicles.jpg',
      location: 'Detroit',
      date: '04 Sep 2024',
      body: 'Autonomous vehicles are set to revolutionize transportation...',
    },
  ];
  
// Function to sort items by date and get the latest one for main news
export const getLatestNews = (items: NewsItem[]) => {
    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  };
  
  // The main news will be the latest news item
  export const mainNews: NewsItem = getLatestNews(beritaItems);
  
  // Function to truncate body if it's longer than 300 characters
  export const getTruncatedBody = (body: string) => {
    return body.length > 300 ? `${body.slice(0, 300)}...` : body;
  };
  
  // Function to truncate title if it's longer than 50 characters
export const getTruncatedTitle = (title: string) => {
    return title.length > 50 ? `${title.slice(0, 50)}...` : title;
  };