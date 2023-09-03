import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Tooltip, IconButton, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuthenticator } from '@aws-amplify/ui-react';

function UserProfileMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();
  const { signOut } = useAuthenticator((context) => [context.user]);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signOut();
    navigate('/sign-in');
  };

  const menuId = 'account-menu';
  return (
    <>
      <Tooltip title="Open settings">
        <IconButton
          size="large"
          edge="end"
          color="inherit"
          onClick={handleProfileMenuOpen}
          aria-controls={menuId}
        >
          <AccountCircle />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose} component={NavLink} to="/profile">
          Profile
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

export default UserProfileMenu;
