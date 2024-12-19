'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { List as ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';
import * as React from 'react';

import { Dropdown } from '@/components/core/dropdown/dropdown';
import { DropdownPopover } from '@/components/core/dropdown/dropdown-popover';
import { DropdownTrigger } from '@/components/core/dropdown/dropdown-trigger';
import { Logo } from '@/components/core/logo';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { paths } from '@/paths';

import { MobileNav } from './mobile-nav';
import { navData } from '@/router';
import { Iconify } from '@/components/iconify/iconify';
import {  SearchOff } from '@mui/icons-material';
import { alpha, InputBase, styled } from '@mui/material';

export function MainNav() {
  const [openNav, setOpenNav] = React.useState(false);
  const pathname = usePathname();

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          bgcolor: 'var(--mui-palette-neutral-950)',
          color: 'var(--mui-palette-common-white)',
          left: 0,
          position: 'sticky',
          right: 0,
          top: 0,
          zIndex: 'var(--MainNav-zIndex)',
        }}
      >
        <Container maxWidth="lg" sx={{ display: 'flex', minHeight: 'var(--MainNav-height)', py: '16px' }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
            <Box component={RouterLink} href={paths.home} sx={{ display: 'inline-flex' }}>
              <Logo color="light" height={32} width={122} />
            </Box>
            <Box component="nav" sx={{ display: { xs: 'none', md: 'block' } }}>
              <Stack component="ul" direction="row" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {
                  navData.map((item, index) => (
                    <NavItem key={index} href={item.path} pathname={pathname} title={item.title} icon={item.icon} />
                  ))
                }
              </Stack>
            </Box>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: 'center', justifyContent: 'flex-end' }}
          >
            <Search>
              <SearchIconWrapper>
                <SearchOff />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <IconButton
              onClick={() => {
                setOpenNav(true);
              }}
              sx={{ color: 'var(--mui-palette-common-white)', display: { xs: 'flex', md: 'none' } }}
            >
              <ListIcon />
            </IconButton>
          </Stack>
        </Container>
      </Box>
      <MobileNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}

export function NavItem({ children, disabled, external, href, matcher, pathname, title, icon }) {
  console.log(icon, "icon.........")
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const hasPopover = Boolean(children);

  const element = (
    <Box component="li" sx={{ userSelect: 'none' }}>
      <Box
        {...(hasPopover
          ? {
            onClick: (event) => {
              event.preventDefault();
            },
            role: 'button',
          }
          : {
            ...(href
              ? {
                component: external ? 'a' : RouterLink,
                href,
                target: external ? '_blank' : undefined,
                rel: external ? 'noreferrer' : undefined,
              }
              : { role: 'button' }),
          })}
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          color: 'var(--mui-palette-neutral-300)',
          cursor: 'pointer',
          display: 'flex',
          flex: '0 0 auto',
          gap: 1,
          p: '6px 16px',
          textAlign: 'left',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
          ...(disabled && {
            bgcolor: 'var(--mui-palette-action-disabledBackground)',
            color: 'var(--mui-action-disabled)',
            cursor: 'not-allowed',
          }),
          ...(active && { color: 'var(--mui-palette-common-white)' }),
          '&:hover': {
            ...(!disabled &&
              !active && { bgcolor: 'rgba(255, 255, 255, 0.04)', color: 'var(--mui-palette-common-white)' }),
          },
        }}
        tabIndex={0}
      >
        <Box component="span" sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          <Iconify width={14} icon={icon} />
          <Typography
            component="span"
            sx={{ color: 'inherit', fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
        {hasPopover ? (
          <Box sx={{ alignItems: 'center', color: 'inherit', display: 'flex', flex: '0 0 auto' }}>
            <CaretDownIcon fontSize="var(--icon-fontSize-sm)" />
          </Box>
        ) : null}
      </Box>
    </Box>
  );

  if (hasPopover) {
    return (
      <Dropdown>
        <DropdownTrigger>{element}</DropdownTrigger>
        <DropdownPopover
          PaperProps={{ sx: { width: '800px', maxWidth: '100%' } }}
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          {children}
        </DropdownPopover>
      </Dropdown>
    );
  }

  return element;
}


const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));