import { useEffect } from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { IconButton, Tooltip } from '@mui/material';
import { useSnackbar } from 'notistack';

import { useUpdateRecipeFavoriteMutation } from '../../services/recipes';

interface FavoriteProps {
  favorite: boolean;
  recipeId: string;
  disabled?: boolean;
}

function Favorite({ favorite, recipeId, disabled }: FavoriteProps) {
  const [updateRecipeFavorite, { isLoading, isError, isSuccess }] =
    useUpdateRecipeFavoriteMutation();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(
        `Recipe is ${!favorite ? 'now favorite' : 'no longer favorite'}`,
        { variant: 'success' }
      );
    }

    if (isError) {
      enqueueSnackbar('Something went wrong ', { variant: 'error' });
    }
  }, [isError, isSuccess, enqueueSnackbar, favorite]);

  const handleFavoriteChange = () => {
    if (disabled || isLoading) return;
    updateRecipeFavorite({ favorite: !favorite, recipeId });
  };

  return (
    <Tooltip
      title={!disabled ? favorite ? 'Unmark favorite' : 'Mark as favorite' : null}
      placement="top"
      disableInteractive={disabled}
    >
    <span>
      <IconButton
        disabled={disabled || isLoading}
        onClick={handleFavoriteChange}
      >
        {favorite ? (
          <StarIcon color="warning" />
        ) : (
          <StarOutlineIcon color="warning" />
        )}
      </IconButton>
      </span>
    </Tooltip>
  );
}
export default Favorite;
