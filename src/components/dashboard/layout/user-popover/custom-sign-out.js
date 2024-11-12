'use client';

import MenuItem from '@mui/material/MenuItem';

import useAuth from '@/hooks/useAuth';

export function CustomSignOut() {
  const { logout } = useAuth()


  return (
    <MenuItem component="div" onClick={logout} sx={{ justifyContent: 'center' }}>
      Sign out
    </MenuItem>
  );
}
