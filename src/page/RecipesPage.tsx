import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';

import { useGetRecipesQuery } from '../services/recipes';
import RecipesView from '../features/recipes/RecipesView';
import SideBar from '../features/recipes/SideBar';
import useDebounce from '../utils/useDebounce';
import { getSearchParamPage, getSearchParamSearch } from '../utils/pagination';

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
}));

const ITEMS_PER_PAGE = 10;

function RecipesPage() {
  const [page, setPage] = useState<number>(
    getSearchParamPage(window.location.search, 1)
  );
  const [search, setSearch] = useState<string>(
    getSearchParamSearch(window.location.search, '')
  );
  const [, setSearchParams] = useSearchParams();

  const searchTerm = useDebounce(search, 1000);

  const { data, isFetching } = useGetRecipesQuery({
    take: ITEMS_PER_PAGE,
    skip: page * ITEMS_PER_PAGE - ITEMS_PER_PAGE,
    search: searchTerm,
  });

  useEffect(() => {
    setSearchParams({ page: `${page}`, search: searchTerm });
  }, [page, searchTerm, setSearchParams]);

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
