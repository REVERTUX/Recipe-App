import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';

export interface CustomNavLinkProps {
  to: string;
  name: string;
}

function CustomNavLink({ name, to }: CustomNavLinkProps) {
  return (
    <Button variant="text" color="inherit" component={NavLink} to={to}>
      {name}
    </Button>
  );
}

export default CustomNavLink;
