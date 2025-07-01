import { useParams, useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../api';
import type { Product } from '../types';
import { useProductContext } from '../context/ProductContext';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const { deleteProduct } = useProductContext();

  useEffect(() => {
    if (id) {
      API.get(`/products/${id}`).then(res => setProduct(res.data));
    }
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    await deleteProduct(id);
    navigate('/');
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="product-detail">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <img src={product.image} alt={product.title} width="150" />
      <p>Category: {product.category}</p>
      <Link to={`/products/edit/${product.id}`}>✏️ Edit</Link>
      <button className='delete-btn' onClick={handleDelete}>🗑️ Delete</button>
    </div>
  );
};

export default ProductDetail;