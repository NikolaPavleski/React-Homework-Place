import { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '../types';
import API from '../api';

interface ProductContextProps {
  products: Product[];
  fetchProducts: () => void;
  createProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextProps | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get('/products');
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    }
  };

  const createProduct = async (product: Product) => {
    try {
      const { data } = await API.post('/products', product);
      setProducts(prev => [...prev, data]);
    } catch (error) {
      console.error('Failed to create product', error);
    }
  };

  const updateProduct = async (id: string, product: Product) => {
    try {
      const { data } = await API.put(`/products/${id}`, product);
      setProducts(prev =>
        prev.map(p => (p.id === data.id ? data : p))
      );
    } catch (error) {
      console.error('Failed to update product', error);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await API.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p.id !== Number(id)));
    } catch (error) {
      console.error('Failed to delete product', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, fetchProducts, createProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProductContext must be used within ProductProvider');
  return context;
};