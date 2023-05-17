import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';

import { useGetRecipesQuery } from '../services/recipes';
import RecipesView from '../features/recipes/RecipesView';
import SideBar from '../features/recipes/SideBar';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
}));

const ITEMS_PER_PAGE = 10;

function useDebounce(value: string, delay: number): string {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function RecipesPage() {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  const searchTerm = useDebounce(search, 1000);

  const { data, isFetching } = useGetRecipesQuery({
    take: ITEMS_PER_PAGE,
    skip: page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
    search: searchTerm,
  });

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Wrapper>
      <SideBar search={search} onSearchChange={setSearch} />
      <RecipesView
        recipes={data?.data}
        count={data?.count}
        itemsPerPage={ITEMS_PER_PAGE}
        page={page}
        isFetching={isFetching}
        handlePageChange={handlePageChange}
      />
    </Wrapper>
  );
}

export default RecipesPage;
