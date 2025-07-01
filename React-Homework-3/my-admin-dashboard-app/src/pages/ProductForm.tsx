import { useForm } from 'react-hook-form';
import type { Product } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useProductContext } from '../context/ProductContext';

const ProductForm = ({ isEdit = false }: { isEdit?: boolean }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { createProduct, updateProduct } = useProductContext();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Product>();

  useEffect(() => {
    if (isEdit && id) {
      (async () => {
        try {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`);
          const data = await res.json();
          reset(data);
        } catch (error) {
          console.error('Failed to fetch product for editing', error);
        }
      })();
    }
  }, [id, isEdit, reset]);

  const onSubmit = async (data: Product) => {
    if (isEdit && id) {
      await updateProduct(id, data);
    } else {
      await createProduct(data);
    }
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title', { required: true })} placeholder="Title" />
      {errors.title && <span>Title is required</span>}

      <input type="number" step="0.01" {...register('price', { required: true, min: 0.01 })} placeholder="Price" />
      {errors.price && <span>Price must be positive</span>}

      <input {...register('category', { required: true })} placeholder="Category" />
      {errors.category && <span>Category is required</span>}

      <input {...register('image', { required: true })} placeholder="Image URL" />
      {errors.image && <span>Image URL is required</span>}

      <textarea {...register('description', { required: true })} placeholder="Description" />
      {errors.description && <span>Description is required</span>}

      <button type="submit">{isEdit ? 'Update' : 'Create'} Product</button>
    </form>
  );
};

export default ProductForm;