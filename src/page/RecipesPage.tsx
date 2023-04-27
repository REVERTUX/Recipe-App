import { useState } from 'react';
import { useGetRecipesQuery } from '../services/recipes';
import RecipesView from '../recipes/RecipesView';

const ITEMS_PER_PAGE = 10;

function RecipesPage() {
  const [page, setPage] = useState<number>(1);
  const { data, isFetching } = useGetRecipesQuery({
    take: ITEMS_PER_PAGE,
    skip: page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <RecipesView
      recipes={data?.data}
      count={data?.count}
      itemsPerPage={ITEMS_PER_PAGE}
      page={page}
      isFetching={isFetching}
      handlePageChange={handlePageChange}
    />
  );
}

export default RecipesPage;
