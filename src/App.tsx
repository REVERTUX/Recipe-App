import { Routes, Route } from 'react-router-dom';

import Home from './features/home';
import Layout from './Layout';
import RecipesPage from './page/RecipesPage';
import RecipePage from './page/RecipePage';
import CreateRecipePage from './page/CreateRecipePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="recipes" element={<RecipesPage />} />
        <Route path="recipes/create" element={<CreateRecipePage />} />
        <Route path="recipes/:id" element={<RecipePage />} />
        <Route path="favorites" element={<div>Favorites</div>} />
        <Route path="categories" element={<div>Categories</div>} />
        <Route path="cuisines" element={<div>Cuisines</div>} />
      </Route>
    </Routes>
  );
}

export default App;
