import { Routes, Route } from 'react-router-dom';

import './App.css';
import Home from './Home';
import Layout from './Layout';
import Recipes from './recipes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes" element={<Recipes />} />
      </Route>
    </Routes>
  );
}

export default App;
