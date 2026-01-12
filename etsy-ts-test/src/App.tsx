import Listing from './components/Listing';
import { data } from './data';
import './App.css';

function App() {
  // Преобразуем данные к нужному формату
  const transformedData = data.flat().map(item => ({
    listing_id: item.listing_id || 0,
    url: item.url || '',
    MainImage: item.MainImage ? { 
      url_570xN: item.MainImage.url_570xN || 'https://via.placeholder.com/570x570?text=No+Image'
    } : undefined,
    title: item.title || 'No Title',
    currency_code: item.currency_code || 'USD',
    price: item.price || '0.00',
    quantity: item.quantity || 0,
    state: item.state || 'inactive'
  }));
  
  return (
    <div className="container">
      <Listing items={transformedData} />
    </div>
  );
}

export default App;