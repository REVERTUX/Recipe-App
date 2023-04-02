import { Outlet, Link } from 'react-router-dom';

import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import CustomNavLink, { CustomNavLinkProps } from './components/CustomNavLink';

const navItems: CustomNavLinkProps[] = [
  { to: '/recipes', name: 'Recipes' },
  { to: '/favorites', name: 'Favorites' },
  { to: '/categories', name: 'Categories' },
  { to: '/cuisines', name: 'Cuisines' },
];

function Layout() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/">
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                Recipe
              </Typography>
            </Link>
            <nav>
              {navItems.map(({ name, to }) => (
                <CustomNavLink key={name} to={to} name={name} />
              ))}
            </nav>
          </Toolbar>
        </AppBar>
      </Box>
      <Container sx={{ paddingTop: '8px' }}>
        <Outlet />
      </Container>
    </div>
  );
}

export default Layout;
