"use client"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import * as React from 'react';

import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersPagination } from '@/components/dashboard/customer/customers-pagination';
import { CustomersSelectionProvider } from '@/components/dashboard/customer/customers-selection-context';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import PageLoader from '@/components/PageLoader/PageLoader';
import { getUsers } from './_lib/actions';
import { ManageUserDialog } from './create-user-dialog';



export default function Page({ searchParams }) {
  const { email, phone, sortDir, status } = searchParams;
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);

  async function fetchUsersData() {
    try {
      setLoading(true)
      const response = await getUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }


  const handleOpenModal = () => {
    setOpenModal(false);
    fetchUsersData();
  }


  React.useEffect(() => {
    fetchUsersData();
  }, [])

  // const sortedUsers = applySort(users, sortDir);
  // const filteredUsers = applyFilters(sortedUsers, { email, phone, status });

  return (

    <Box
      sx={{
        maxWidth: 'var(--Content-maxWidth)',
        m: 'var(--Content-margin)',
        p: 'var(--Content-padding)',
        width: 'var(--Content-width)',
      }}
    >
      <Stack spacing={4}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Box sx={{ flex: '1 1 auto' }}>
            <Typography variant="h4">Users</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button startIcon={<PlusIcon />} variant="contained" onClick={() => setOpenModal(true)}>
              Add
            </Button>
          </Box>
        </Stack>
        <PageLoader
          loading={loading}
          error={null}
        >
          <CustomersSelectionProvider customers={users}>
            <Card>
              <CustomersFilters filters={{ email, phone, status }} sortDir={sortDir} />
              <Divider />
              <Box sx={{ overflowX: 'auto' }}>
                <CustomersTable rows={users} />
              </Box>
              <Divider />
              <CustomersPagination count={users?.length + 100} page={0} />
            </Card>
          </CustomersSelectionProvider>
        </PageLoader>
      </Stack>
      {
        openModal && (
          <ManageUserDialog
            open={openModal}
            onClose={handleOpenModal}
            data={null}
          />
        )
      }
    </Box>

  );
}

// Sorting and filtering has to be done on the server.

function applySort(row, sortDir) {
  return row.sort((a, b) => {
    if (sortDir === 'asc') {
      return a.createdAt.getTime() - b.createdAt.getTime();
    }

    return b.createdAt.getTime() - a.createdAt.getTime();
  });
}

function applyFilters(row, { email, phone, status }) {
  return row.filter((item) => {
    if (email) {
      if (!item.email?.toLowerCase().includes(email.toLowerCase())) {
        return false;
      }
    }

    if (phone) {
      if (!item.phone?.toLowerCase().includes(phone.toLowerCase())) {
        return false;
      }
    }

    if (status) {
      if (item.status !== status) {
        return false;
      }
    }

    return true;
  });
}
