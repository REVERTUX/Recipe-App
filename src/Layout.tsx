import { Outlet, Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Container } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import CustomNavLink, {
  CustomNavLinkProps,
} from './common/components/CustomNavLink';

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
            <Box component="nav" display="flex" gap="32px">
              <div>
                {navItems.map(({ name, to }) => (
                  <CustomNavLink key={name} to={to} name={name} />
                ))}
              </div>
              <CustomNavLink
                to="/recipes/create"
                name="Create Recipe"
                variant="outlined"
                icon={<AddIcon />}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Container
        sx={{
          paddingTop: (theme) => theme.spacing(2),
          paddingBottom: (theme) => theme.spacing(2),
        }}
      >
        <Outlet />
      </Container>
    </div>
  );
}

export default Layout;
