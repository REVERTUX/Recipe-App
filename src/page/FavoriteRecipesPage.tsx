import { useState, useEffect, Suspense, lazy } from 'react';
import { styled } from '@mui/material/styles';
import { useSearchParams } from 'react-router-dom';

import { useGetFavoriteRecipesQuery } from '../services/recipes';
import SideBar from '../features/recipes/SideBar';
import useDebounce from '../utils/useDebounce';
import { getSearchParamPage, getSearchParamSearch } from '../utils/pagination';
import Loader from '../common/components/Loader';

const RecipesView = lazy(() => import('../features/recipes/RecipesView'));

const Wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing(2),
  },
}));

const ITEMS_PER_PAGE = 10;

function FavoriteRecipesPage() {
  const [page, setPage] = useState<number>(
    getSearchParamPage(window.location.search, 1)
  );
  const [search, setSearch] = useState<string>(
    getSearchParamSearch(window.location.search, '')
  );

  const searchTerm = useDebounce(search, 1000);
  const [, setSearchParams] = useSearchParams();

  const { data, isFetching } = useGetFavoriteRecipesQuery({
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
      <Suspense fallback={<Loader />}>
        <SideBar search={search} onSearchChange={setSearch} />
        <RecipesView
          recipes={data?.data}
          count={data?.count}
          itemsPerPage={ITEMS_PER_PAGE}
          page={page}
          isFetching={isFetching}
          handlePageChange={handlePageChange}
        />
      </Suspense>
    </Wrapper>
  );
}

export default FavoriteRecipesPage;
