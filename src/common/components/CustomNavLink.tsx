import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';

export interface CustomNavLinkProps {
  to: string;
  name: string;
  icon?: React.ReactNode;
  variant?: 'text' | 'outlined' | 'contained';
}

function CustomNavLink({
  name,
  to,
  icon,
  variant = 'text',
}: CustomNavLinkProps) {
  return (
    <Button
      variant={variant}
      color="inherit"
      component={NavLink}
      to={to}
      startIcon={icon}
    >
      {name}
    </Button>
  );
}

export default CustomNavLink;
