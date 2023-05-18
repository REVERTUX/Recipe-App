import { useState } from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Drawer,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

import CustomNavLink, {
  CustomNavLinkProps,
} from './common/components/CustomNavLink';

const navItems: CustomNavLinkProps[] = [
  { to: '/recipes', name: 'Recipes' },
  { to: '/favorites', name: 'Favorites' },
  { to: '/categories', name: 'Categories' },
  { to: '/cuisines', name: 'Cuisines' },
];
const drawerWidth = 240;

function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Link to="/">
            <Typography
              variant="h6"
              component="div"
              color="white"
              sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}
            >
              Recipe
            </Typography>
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: '16px' }}>
            {navItems.map(({ name, to }) => (
              <CustomNavLink key={name} to={to} name={name} />
            ))}
          </Box>
          <Button
            variant="contained"
            size="large"
            component={NavLink}
            to="/recipes/create"
            startIcon={<AddIcon />}
          >
            Create Recipe
          </Button>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Link to="/">
              <Typography
                variant="h6"
                sx={{ my: 2, color: (t) => t.palette.text.primary }}
              >
                Recipe
              </Typography>
            </Link>
            <Divider />
            <List>
              {navItems.map(({ name, to }) => (
                <ListItem key={name} disablePadding>
                  <ListItemButton
                    sx={{
                      textAlign: 'center',
                      '&.active': { textDecoration: 'underline' },
                    }}
                    component={NavLink}
                    to={to}
                  >
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
      <Container sx={{ padding: '0' }}>
        <Toolbar />
        <Box
          component="main"
          sx={{
            paddingTop: (theme) => theme.spacing(2),
            paddingBottom: (theme) => theme.spacing(2),
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}

export default Layout;
