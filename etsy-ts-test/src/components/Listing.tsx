import React from 'react';

interface ListingProps {
  items: Array<{
    listing_id: number;
    url?: string;
    MainImage?: {
      url_570xN: string;
    };
    title: string;
    currency_code: string;
    price: string;
    quantity: number;
    state: string;
  }>;
}

const Listing: React.FC<ListingProps> = ({ items = [] }) => {
  // форматирования заголовка
  const formatTitle = (title: string): string => {
    if (title.length > 50) {
      return title.substring(0, 50) + '...';
    }
    return title;
  };

  // форматирования цены
  const formatPrice = (currencyCode: string, price: string): string => {
    switch (currencyCode) {
      case 'USD':
        return `$${price}`;
      case 'EUR':
        return `€${price}`;
      case 'GBP':
        return `£${price}`;
      default:
        return `${currencyCode} ${price}`;
    }
  };

  // класса остатка
  const getStockClass = (quantity: number): string => {
    if (quantity <= 10) return 'stock-low';
    if (quantity <= 20) return 'stock-medium';
    return 'stock-high';
  };

  // текста остатка
  const getStockText = (quantity: number): string => {
    return `${quantity} left`;
  };

  // только активные товары
  const activeItems = items.filter(item => item.state === 'active');

  if (activeItems.length === 0) {
    return <div>No active listings found</div>;
  }

  return (
    <div className="product-grid">
      {activeItems.map((item) => (
        <div key={item.listing_id} className="product-card">
          <img 
            src={item.MainImage?.url_570xN}
            alt={item.title} 
            className="product-image"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/570x570?text=No+Image';
            }}
          />
          <div className="product-info">
            <h3 className="product-title">{formatTitle(item.title)}</h3>
            <div className="price-container">
              <div className="product-price">
                {formatPrice(item.currency_code, item.price)}
              </div>
              <span className={`stock-badge ${getStockClass(item.quantity)}`}>
                {getStockText(item.quantity)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Listing;