import React, { useState } from 'react';
import './index.css';
import WishlistItem from './components/WishlistItem';
import AddItemForm from './components/AddItemForm';

const App: React.FC = () => {
  const [items, setItems] = useState<string[]>([
    'New Headphones',
    'Fancy Coffee Machine',
    'Learn React Fast',
  ]);

  const addItem = (newItem: string) => {
    if (newItem.trim()) {
      setItems([...items, newItem]);
    }
  };

  const removeItem = (indexToRemove: number) => {
    setItems(items.filter((_, index) => index !== indexToRemove));
  };

  const clearAllItems = () => {
    setItems([]);
  };

  return (
    <div className="app-container">
      <h1>My Wishlist</h1>
      <AddItemForm onAdd={addItem} />

      {items.length > 0 ? (
        <>
          <ul className="wishlist">
            {items.map((item, index) => (
              <WishlistItem
                key={index}
                name={item}
                onRemove={() => removeItem(index)}
              />
            ))}
          </ul>
          <button className="clear-button" onClick={clearAllItems}>
            Clear All
          </button>
        </>
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
  );
};

export default App;