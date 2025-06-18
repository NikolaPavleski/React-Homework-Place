import React from 'react';

interface WishlistItemProps {
  name: string;
  onRemove: () => void;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ name, onRemove }) => {
  return (
    <li className="wishlist-item">
      {name}
      <button className="remove-button" onClick={onRemove}>
        Remove
      </button>
    </li>
  );
};

export default WishlistItem;