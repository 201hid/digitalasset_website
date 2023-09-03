import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import ViewPage from './pages/ViewPage';
import TransactionPage from './pages/TransactionPage';
import OrderSummary from './pages/OrderSummary';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';



function App() {
  return (
    <Router>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search/:title" element={<SearchPage />} />
        <Route path="/search/category/:category" element={<SearchPage />} />
        <Route path="/view" element={<ViewPage />} />
        <Route path="/transaction" element={<TransactionPage />} />
        <Route path="/ordersummary" element={<OrderSummary />} />
        {/* Add any other routes here */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
