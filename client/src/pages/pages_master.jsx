
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './home/home';

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
