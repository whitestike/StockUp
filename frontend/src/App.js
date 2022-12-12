import './App.css';
import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomeView from './views/HomeView';
import ScanningView from './views/ScanningView';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<HomeView />} />
          <Route path="scanner" element={<ScanningView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
