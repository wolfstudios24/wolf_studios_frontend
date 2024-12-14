"use client"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';

import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import * as React from 'react';

import PageLoader from '@/components/PageLoader/PageLoader';
import IconButton from '@mui/material/IconButton';

import { CardTitle } from '@/components/cardTitle/CardTitle';
import { PageContainer } from '@/components/container/PageContainer';
import { dayjs } from '@/lib/dayjs';
import { paths } from '@/paths';
import {
  DataGrid
} from '@mui/x-data-grid';
import { PencilSimple as PencilSimpleIcon } from '@phosphor-icons/react/dist/ssr/PencilSimple';
import { useRouter } from 'next/navigation';
import { getRecordList } from './_lib/actions';

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise < Partial < User >> ((resolve, reject) => {
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject(new Error('Error while saving user: name cannot be empty.'));
          } else {
            resolve({ ...user, name: user.name?.toUpperCase() });
          }
        }, 200);
      }),
    []
  );
};

export default function Page() {
  const router = useRouter();
  const mutateRow = useFakeMutation();
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

  const processRowUpdate = React.useCallback(
    async (newRow) => {
      console.log(newRow, "new row ........")
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      return response;
    },
    [mutateRow]
  );

  const handleProcessRowUpdateError = React.useCallback((error) => {
    console.log({ children: error.message, severity: 'error' });
  }, []);



  React.useEffect(() => {
    fetchList();
  }, [pagination])

  const columns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      editable: true,
      align: 'left',
      headerAlign: 'left',
    },
    {
      field: 'dateCreated',
      headerName: 'Date Created',
      type: 'text',
      width: 180,
      editable: true,
    },
    {
      field: 'lastLogin',
      headerName: 'Last Login',
      type: 'text',
      width: 220,
      editable: true,
    },
    {
      field: 'custom',
      headerName: 'custom',
      width: 220,
      editable: true,
    },
  ];

  const rows = [
    {
      id: 1,
      name: "fazly",
      age: 25,
      dateCreated: "2024-14-12",
      lastLogin: "2024-14-12",
      custom: 'custom data',
    },
    {
      id: 2,
      name: "fazly",
      age: 36,
      dateCreated: "2024-14-12",
      lastLogin: "2024-14-12",
      custom: 'custom data',
    },
    {
      id: 3,
      name: "fazly",
      age: 19,
      dateCreated: "2024-14-12",
      lastLogin: "2024-14-12",
      custom: 'custom data',
    },
    {
      id: 4,
      name: "fazly",
      age: 28,
      dateCreated: "2024-14-12",
      lastLogin: "2024-14-12",
      custom: 'custom data',
    },
    {
      id: 5,
      name: "fazly",
      age: 23,
      dateCreated: "2024-14-12",
      lastLogin: "2024-14-12",
      custom: 'custom data',
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
          <Box sx={{ overflowX: 'auto', height: '100%', width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
            />
          </Box>
          {!users?.length ? (
            <Box sx={{ p: 3 }}>
              <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                No customers found
              </Typography>
            </Box>
          ) : null}
        </Card>
      </PageLoader>
    </PageContainer>

  );
}
