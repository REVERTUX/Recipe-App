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
  const [updateRecipeFavorite, { isLoading }] =
    useUpdateRecipeFavoriteMutation();
  const { enqueueSnackbar } = useSnackbar();

  const handleFavoriteChange = () => {
    if (disabled || isLoading) return;
    updateRecipeFavorite({ favorite: !favorite, recipeId })
      .unwrap()
      .then(() =>
        enqueueSnackbar(
          `Recipe is ${!favorite ? 'now favorite' : 'no longer favorite'}`,
          { variant: 'success' }
        )
      )
      .catch(() => {
        enqueueSnackbar('Something went wrong ', { variant: 'error' });
      });
  };

  return (
    <Tooltip
      title={!disabled && (favorite ? 'Unmark favorite' : 'Mark as favorite')}
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
