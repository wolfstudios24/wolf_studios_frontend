"use client"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import RouterLink from 'next/link';

import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import * as React from 'react';

import PageLoader from '@/components/PageLoader/PageLoader';
import IconButton from '@mui/material/IconButton';

import { DataTable } from '@/components/core/data-table';
import { FilterButton } from '@/components/core/filter-button';
import { StatusFilterPopover } from '@/components/core/filters/StatusFilterPopover';
import { RefreshPlugin } from '@/components/core/plugins/RefreshPlugin';
import { dayjs } from '@/lib/dayjs';
import { paths } from '@/paths';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { getRecordList, getUsers } from './_lib/actions';
import { defaultUser } from './_lib/types';
import { useRouter } from 'next/navigation';
import { CardTitle } from '@/components/cardTitle/CardTitle';
import { PageContainer } from '@/components/container/PageContainer';



export default function Page() {
  const router = useRouter();
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [modalData, setModalData] = React.useState(null);
  const [pagination, setPagination] = React.useState({ pageNo: 1, limit: 10 });
  const [totalRecords, setTotalRecords] = React.useState(0);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [status, setStatus] = React.useState("");
  async function fetchList() {
    try {
      setLoading(true)
      const response = await getRecordList({
        page: pagination.pageNo,
        rowsPerPage: pagination.limit,
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



  React.useEffect(() => {
    fetchList();
  }, [pagination])

  const columns = [
    {
      formatter: (row) => (
        <IconButton onClick={() => router.push(paths.dashboard.records + '/' + (row.id))}>
          <PencilSimpleIcon />
        </IconButton>
      ),
      name: 'Actions',
      // hideName: true,
      // align: 'right',
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.title}
        </Typography>
      ),
      name: 'Title',
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.REVO_pinterest}
        </Typography>
      ),
      name: 'Revo pinterest',
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.YT_account_used}
        </Typography>
      ),
      name: 'YT account used',
    },
    {
      formatter: (row) => (
        <Typography color="text.secondary" variant="body2">
          {row.tiktok_accounts_used}
        </Typography>
      ),
      name: 'Tiktok accounts used',
    },
    {
      formatter(row) {
        return dayjs(row.createdAt).format('MMM D, YYYY h:mm A');
      },
      name: 'Created at',
    },


  ];


  return (

    <PageContainer>
      <CardTitle
        title={"Records"}
        rightItem={<>
          <Button startIcon={<PlusIcon />} variant="contained" onClick={() => router.push(paths.dashboard.records + '/create')}>
            Add
          </Button>
        </>} />
      <PageLoader
        loading={loading}
        error={null}
      >
        <Card>
          <Box sx={{ overflowX: 'auto' }}>
            <React.Fragment>
              <DataTable
                isPagination={true}
                totalRecords={totalRecords}
                rowsPerPageOptions={pagination.limit}
                pageNo={pagination.pageNo}
                columns={columns}
                rows={users}
                uniqueRowId="id"
                selectionMode="multiple"

                leftItems={<>
                  <FilterButton
                    displayValue={status}
                    label="Status"
                    onFilterApply={(value) => {
                      setStatus(value)
                    }}
                    onFilterDelete={() => {
                      handlePhoneChange();
                    }}
                    popover={<StatusFilterPopover />}
                    value={status}
                  />
                  <RefreshPlugin onClick={fetchList} />
                </>}

                rightItems={<></>}

                onRowsPerPageChange={(pageNumber, rowsPerPage) => setPagination({ pageNo: pageNumber, limit: rowsPerPage })}
                onPageChange={(newPageNumber) => setPagination({ ...pagination, pageNo: newPageNumber })}
                onSelection={(selectedRows) => setSelectedRows?.(selectedRows)}
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
      </PageLoader>
    </PageContainer>

  );
}
