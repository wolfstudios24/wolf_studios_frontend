"use client"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import RouterLink from 'next/link';

import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import * as React from 'react';

import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersSelectionProvider, useCustomersSelection } from '@/components/dashboard/customer/customers-selection-context';
import PageLoader from '@/components/PageLoader/PageLoader';
import IconButton from '@mui/material/IconButton';

import { DataTable } from '@/components/core/data-table';
import { dayjs } from '@/lib/dayjs';
import { paths } from '@/paths';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { getUsers } from './_lib/actions';
import { defaultUser } from './_lib/types';
import { ManageUserDialog } from './manage-user-dialog';



export default function Page({ searchParams }) {
  const { deselectAll, deselectOne, selectAll, selectOne, selected } = useCustomersSelection();
  const { email, phone, sortDir, status } = searchParams;
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 10 });
  const [totalRecords, setTotalRecords] = React.useState(0);

  async function fetchList() {
    try {
      setLoading(true)
      const response = await getUsers({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit
      });
      if (response.success) {
        setUsers(response.data);
        setTotalRecords(response.totalRecords)
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }


  const handleOpenModal = (data) => {
    setOpenModal(true);
    setModalData(data);
  }


  const handleConfirm = () => {
    setOpenModal(false);
    fetchUsersData();
  }


  React.useEffect(() => {
    fetchList();
  }, [pagination])

  const columns = [
    {
      formatter: (row) => (
        <IconButton onClick={() => handleOpenModal(row)}>
          <PencilSimpleIcon />
        </IconButton>
      ),
      name: 'Actions',
      // hideName: true,
      // align: 'right',
    },
    {
      formatter: (row) => (
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <div>
            <Link
              color="inherit"
              component={RouterLink}
              href={paths.dashboard.customers.details('1')}
              sx={{ whiteSpace: 'nowrap' }}
              variant="subtitle2"
            >
              {row.first_name} {row.last_name}
            </Link>
            <Typography color="text.secondary" variant="body2">
              {row.email}
            </Typography>
          </div>
        </Stack>
      ),
      name: 'Name',
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.contact_number}
        </Typography>
      ),
      name: 'Phone',
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.role}
        </Typography>
      ),
      name: 'Phone',
    },
    {
      formatter(row) {
        return dayjs(row.createdAt).format('MMM D, YYYY h:mm A');
      },
      name: 'Created at',
    },
    {
      formatter: (row) => {
        return <Chip label={row.status} size="small" variant="outlined" />
      },
      name: 'Status',
    },

  ];

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
            <Button startIcon={<PlusIcon />} variant="contained" onClick={() => handleOpenModal(defaultUser)}>
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
                <React.Fragment>
                  <DataTable
                    isPagination={true}
                    totalRecords={totalRecords}
                    rowsPerPageOptions={pagination.limit}
                    pageNo = {pagination.pageNo}
                    columns={columns}
                    onDeselectAll={deselectAll}
                    onDeselectOne={(_, row) => {
                      deselectOne(row.id);
                    }}
                    onSelectAll={selectAll}
                    onSelectOne={(_, row) => {
                      selectOne(row.id);
                    }}
                    rows={users}
                    selectable
                    selected={selected}
                    onRowsPerPageChange={(pageNumber, rowsPerPage) => setPagination({ pageNo: pageNumber, limit: rowsPerPage })}
                    onPageChange={(newPageNumber) => setPagination({ ...pagination, pageNo: newPageNumber })}
                  />
                  {!users?.length ? (
                    <Box sx={{ p: 3 }}>
                      <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                        No customers found
                      </Typography>
                    </Box>
                  ) : null}
                </React.Fragment>
              </Box>
            </Card>
          </CustomersSelectionProvider>
        </PageLoader>
      </Stack>
      {
        openModal && (
          <ManageUserDialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            onConfirm={handleConfirm}
            data={modalData}
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
