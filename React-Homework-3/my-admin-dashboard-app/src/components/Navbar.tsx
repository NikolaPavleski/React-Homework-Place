import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
    <Link to="/">Dashboard</Link>
  </nav>
);

export default Navbar;