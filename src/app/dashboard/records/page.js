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
import { type } from 'os';
import moment from 'moment';

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
  const [records, setRecords] = React.useState([]);
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
        setRecords(response.data);
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
    { field: 'title', headerName: 'Title', width: 280, editable: true },
    { field: 'campaign', headerName: 'Campaign', width: 150, editable: true },
    { field: 'product', headerName: 'Product', width: 150, editable: true },
    { field: 'stakeholder', headerName: 'Stakeholder', width: 150, editable: true },
    { field: 'posting_quality', headerName: 'Posting Quality', width: 150, editable: true },
    { field: 'google_drive_files', headerName: 'Google Drive Files', width: 200, editable: true },
    { field: 'playbook_link', headerName: 'Playbook Link', width: 200, editable: true },
    { field: 'uppromote_conversion', headerName: 'Uppromote Conversion', type: 'number', width: 150, editable: true },
    { field: 'asset_status', headerName: 'Asset Status', width: 120, editable: true },
    { field: 'month_uploaded', headerName: 'Month Uploaded', width: 150, editable: true },

    // Pinterest
    { field: 'REVO_pinterest', headerName: 'Pinterest Status', width: 150, editable: true },
    { field: 'PIN_accounts_used', headerName: 'Pinterest Accounts Used', width: 200, editable: true },
    { field: 'pinterest_PIN_click', headerName: 'Pinterest Pin Clicks', type: 'number', width: 150, editable: true },
    { field: 'pinterest_view', headerName: 'Pinterest Views', type: 'number', width: 150, editable: true },

    // Instagram
    { field: 'REVO_instagram', headerName: 'Instagram Status', width: 150, editable: true },
    { field: 'IG_like', headerName: 'Instagram Likes', type: 'number', width: 150, editable: true },
    { field: 'IG_comment', headerName: 'Instagram Comments', type: 'number', width: 150, editable: true },
    { field: 'IG_share', headerName: 'Instagram Shares', type: 'number', width: 150, editable: true },
    { field: 'IG_view', headerName: 'Instagram Views', type: 'number', width: 150, editable: true },
    { field: 'IG_social_sets_used', headerName: 'Instagram Social Sets Used', width: 200, editable: true },
    { field: 'partner_IG_link', headerName: 'Partner Instagram Link', width: 200, editable: true },

    // Twitter
    { field: 'REVO_twitter', headerName: 'Twitter Status', width: 150, editable: true },

    // TikTok
    { field: 'REVO_tiktok', headerName: 'TikTok Status', width: 150, editable: true },
    { field: 'REVO_TT_view', headerName: 'TikTok REVO Views', type: 'number', width: 150, editable: true },
    { field: 'tiktok_accounts_used', headerName: 'TikTok Accounts Used', width: 200, editable: true },
    { field: 'partner_tiktok_link', headerName: 'Partner TikTok Link', width: 200, editable: true },
    { field: 'partner_TT_like', headerName: 'Partner TikTok Likes', type: 'number', width: 150, editable: true },
    { field: 'partner_TT_comment', headerName: 'Partner TikTok Comments', type: 'number', width: 150, editable: true },
    { field: 'partner_TT_share', headerName: 'Partner TikTok Shares', type: 'number', width: 150, editable: true },
    { field: 'partner_TT_view', headerName: 'Partner TikTok Views', type: 'number', width: 150, editable: true },
    { field: 'partner_TT_save', headerName: 'Partner TikTok Saves', type: 'number', width: 150, editable: true },
    { field: 'TT_dummy_account_used', headerName: 'TikTok Dummy Account Used', width: 200, editable: true },

    // YouTube
    { field: 'YT_account_used', headerName: 'YouTube Account Used', width: 200, editable: true },
    { field: 'partner_YT_link', headerName: 'Partner YouTube Link', width: 200, editable: true },
    { field: 'partner_YT_like', headerName: 'Partner YouTube Likes', type: 'number', width: 150, editable: true },
    { field: 'partner_YT_comment', headerName: 'Partner YouTube Comments', type: 'number', width: 150, editable: true },
    { field: 'partner_YT_view', headerName: 'Partner YouTube Views', type: 'number', width: 150, editable: true },
    { field: 'partner_YT_save', headerName: 'Partner YouTube Saves', type: 'number', width: 150, editable: true },
    { field: 'REVO_clubrevo_youtube', headerName: 'Club REVO YouTube Status', width: 200, editable: true },
    { field: 'REVO_youtube', headerName: 'YouTube REVO Status', width: 200, editable: true },
    { field: 'YT_clubrevo_like', headerName: 'YouTube Club REVO Likes', type: 'number', width: 150, editable: true },
    { field: 'YT_clubrevo_view', headerName: 'YouTube Club REVO Views', type: 'number', width: 150, editable: true },
    { field: 'YT_REVOMADIC_like', headerName: 'YouTube REVOMADIC Likes', type: 'number', width: 150, editable: true },
    { field: 'YT_REVOMADIC_comment', headerName: 'YouTube REVOMADIC Comments', type: 'number', width: 150, editable: true },
    { field: 'YT_REVOMADIC_share', headerName: 'YouTube REVOMADIC Shares', type: 'number', width: 150, editable: true },
    { field: 'YT_REVOMADIC_view', headerName: 'YouTube REVOMADIC Views', type: 'number', width: 150, editable: true },

    // Other Fields
    { field: 'creator_status', headerName: 'Creator Status', width: 150, editable: true },
    { field: 'profile', headerName: 'Profile', width: 150, editable: true },
    { field: 'posting_status', headerName: 'Posting Status', width: 150, editable: true },
    { field: 'partner_HQ', headerName: 'Partner HQ', width: 150, editable: true },
    { field: 'portfolio', headerName: 'Portfolio', width: 150, editable: true },
    { field: 'contributed_engagement', headerName: 'Contributed Engagement', type: 'number', width: 150, editable: true },
    { field: 'by_tags', headerName: 'Tags', width: 200, editable: true },
    { field: 'by_city', headerName: 'City', width: 150, editable: true },
    { field: 'all_internet_search', headerName: 'Internet Search', width: 200, editable: true },
    { field: 'created_at', headerName: 'Created At', width: 180, editable: true, valueGetter: (value, row) => moment(value).format('DD-MM-YYYY HH:mm:ss'), },
    { field: 'updated_at', headerName: 'Updated At', width: 180, editable: true, valueGetter: (value, row) => moment(value).format('DD-MM-YYYY HH:mm:ss') },
  ];

  const visibleColumns = columns.filter((col) => col.field !== 'updated_at' && col.field !== 'REVO_instagram' && col.field !== 'title');

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
              sx={{
                '& .MuiDataGrid-cell': {
                  border: (theme) => `1px solid ${theme.palette.divider}`,
                }
              }}
              rows={records}
              columns={visibleColumns}
              processRowUpdate={processRowUpdate}
              onProcessRowUpdateError={handleProcessRowUpdateError}
            />
          </Box>
          {!records?.length ? (
            <Box sx={{ p: 3 }}>
              <Typography color="text.secondary" sx={{ textAlign: 'center' }} variant="body2">
                No records found
              </Typography>
            </Box>
          ) : null}
        </Card>
      </PageLoader>
    </PageContainer>

  );
}
