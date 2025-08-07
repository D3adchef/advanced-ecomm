import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import Register from './Register';
import Login from './Login';
import Navbar from '../components/Navbar';
import Profile from './Profile';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
