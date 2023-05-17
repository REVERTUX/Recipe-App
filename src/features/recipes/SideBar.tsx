import { Box } from '@mui/material';
import CustomSearch from './CustomSearch';

interface SideBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

function SideBar({ search, onSearchChange }: SideBarProps) {
  return (
    <Box width="300px">
      <CustomSearch
        value={search}
        onSearchChange={onSearchChange}
        placeholder="Search..."
      />
    </Box>
  );
}

export default SideBar;
