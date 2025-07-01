import { useProductContext } from '../context/ProductContext';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const { products } = useProductContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    const params: any = {};
    if (search) params.search = search;
    if (category !== 'all') params.category = category;
    setSearchParams(params);
  }, [search, category, setSearchParams]);

  const filtered = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <main>
  <h1>Product Dashboard</h1>

  <div className="filters">
    <input
      type="text"
      placeholder="Search by title..."
      value={search}
      onChange={handleSearchChange}
    />

    <select value={category} onChange={handleCategoryChange}>
      <option value="all">All Categories</option>
      {uniqueCategories.map((c) => (
        <option key={c} value={c}> {c} </option>
      ))}
    </select>

    <Link to="/products/new" className="button-link">➕ Add Product</Link>
  </div>

  <ul className="product-list">
    {filtered.map((p) => (
      <li key={p.id} className="product-list-item">
        <Link to={`/products/${p.id}`}>{p.title}</Link> - ${p.price} ({p.category})
      </li>
    ))}
  </ul>
    </main>
  );
};

export default Dashboard;