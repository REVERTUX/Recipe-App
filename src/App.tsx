import { Routes, Route } from 'react-router-dom';

import Home from './Home';
import Layout from './Layout';
import Recipes from './recipes/RecipesPage';
import RecipePage from './recipe/RecipePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="recipes/:id" element={<RecipePage />} />
        <Route path="favorites" element={<div>Favorites</div>} />
        <Route path="categories" element={<div>Categories</div>} />
        <Route path="cuisines" element={<div>Cuisines</div>} />
      </Route>
    </Routes>
  );
}

export default App;
