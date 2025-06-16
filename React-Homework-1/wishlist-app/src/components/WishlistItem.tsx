import React from 'react';

interface WishlistItemProps {
  name: string;
}

const WishlistItem: React.FC<WishlistItemProps> = ({ name }) => {
  return <li className="wishlist-item">{name}</li>;
};

export default WishlistItem;