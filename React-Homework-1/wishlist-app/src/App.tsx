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

  return (
    <div className="app-container">
      <h1>My Wishlist</h1>
      <AddItemForm onAdd={addItem} />
      <ul>
        {items.map((item, index) => (
          <WishlistItem key={index} name={item} />
        ))}
      </ul>
    </div>
  );
};

export default App;