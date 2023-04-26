import React from 'react';

import Footer from '../features/footer/Footer';
import Navbar from '../features/navbar/Navbar';
import AppRoutes from './AppRoutes';

const App = () => {
  return (
    <div className="container">
      <Navbar />
      <body>
        <AppRoutes />
      </body>
      <Footer />
    </div>
  );
};

export default App;
