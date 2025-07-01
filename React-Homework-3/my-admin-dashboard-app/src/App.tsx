import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ProductDetail from './pages/ProductDetail';
import ProductForm from './pages/ProductForm';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products/new" element={<ProductForm />} />
        <Route path="/products/edit/:id" element={<ProductForm isEdit />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
};

export default App;