'use client';

import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { X as XIcon } from '@phosphor-icons/react/dist/ssr/X';
import RouterLink from 'next/link';
import { usePathname } from 'next/navigation';

import { Logo } from '@/components/core/logo';
import { paths } from '@/paths';
import { navData } from '@/router';
import { Typography } from '@mui/material';
import { Dropdown } from '@/components/core/dropdown/dropdown';
import { DropdownTrigger } from '@/components/core/dropdown/dropdown-trigger';
import { CaretDown as CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { DropdownPopover } from '@/components/core/dropdown/dropdown-popover';
import { isNavItemActive } from '@/lib/is-nav-item-active';



export function MobileNav({ onClose, open = false }) {
  const pathname = usePathname();

  return (
    <Dialog
      maxWidth="sm"
      onClose={onClose}
      open={open}
      sx={{
        '& .MuiDialog-container': { justifyContent: 'flex-end' },
        '& .MuiDialog-paper': {
          '--MobileNav-background': 'var(--mui-palette-background-paper)',
          '--MobileNav-color': 'var(--mui-palette-text-primary)',
          '--NavGroup-title-color': 'var(--mui-palette-neutral-400)',
          '--NavItem-color': 'var(--mui-palette-text-secondary)',
          '--NavItem-hover-background': 'var(--mui-palette-action-hover)',
          '--NavItem-active-background': 'var(--mui-palette-action-selected)',
          '--NavItem-active-color': 'var(--mui-palette-text-primary)',
          '--NavItem-disabled-color': 'var(--mui-palette-text-disabled)',
          '--NavItem-icon-color': 'var(--mui-palette-neutral-500)',
          '--NavItem-icon-active-color': 'var(--mui-palette-primary-main)',
          '--NavItem-icon-disabled-color': 'var(--mui-palette-neutral-600)',
          '--NavItem-expand-color': 'var(--mui-palette-neutral-400)',
          bgcolor: 'var(--MobileNav-background)',
          color: 'var(--MobileNav-color)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          zIndex: 'var(--MobileNav-zIndex)',
        },
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, minHeight: 0 }}>
        <Stack direction="row" spacing={3} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          
            <Logo height={32} width={122} />
          <IconButton onClick={onClose}>
            <XIcon />
          </IconButton>
        </Stack>
        <Box component="nav">
          <Stack component="ul" direction="column" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            {
              navData.map((item, index) => (
                <NavItem key={index} href={item.href} pathname={pathname} title={item.title} icon={item.icon} />
              ))
            }
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}


 function NavItem({ children, disabled, external, href, matcher, pathname, title }) {
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
          ...(active && { color: 'var(--mui-palette-common-dark)' }),
          '&:hover': {
            ...(!disabled &&
              !active && { bgcolor: 'rgba(255, 255, 255, 0.04)', color: 'var(--mui-palette-common-dark)' }),
          },
        }}
        tabIndex={0}
      >
        <Box component="span" sx={{ flex: '1 1 auto', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
          {/* <Iconify width={14} icon={icon} /> */}
          <Typography
            component="span"
            sx={{ color: 'var( --Text-primary)', fontSize: '0.875rem', fontWeight: 400, lineHeight: '28px' }}
          >
            {title}
          </Typography>
        </Box>
        {hasPopover ? (
          <Box sx={{ alignItems: 'center', color: 'var( --mui-palette-neutral-950)', display: 'flex', flex: '0 0 auto' }}>
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