import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import your Navbar component
import Home from './pages/Home'; // Import your Home page component
import Shop from './pages/Shop'; // Import your Shop page component (and others)

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />  {/* Attach the Navbar component */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />  {/* Home page route */}
            <Route path="/shop" element={<Shop />} />  {/* Shop page route */}
            {/* Add routes for other pages here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
