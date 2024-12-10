import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { ChannelSessionsVsBounce, NumberOfAssestsByCampaign } from '@/components/dashboard/analytics/number-of-assests-by-campaign';
import { Devices } from '@/components/dashboard/analytics/devices';
import { IgViewsByPost } from '@/components/dashboard/analytics/ig-views-by-post';
import { InboundOutbound } from '@/components/dashboard/analytics/inbound-outbound';
import { Insight } from '@/components/dashboard/analytics/insight';
import { TotalContributedEngagement } from '@/components/dashboard/analytics/total-contributed-engagement';
import { config } from '@/config';

export const metadata = { title: `Analytics | Dashboard | ${config.site.name}` };

const colorPalette = [
  "#FF5733", // Red
  "#33FF57", // Green
  "#3357FF", // Blue
  "#FF33A1", // Pink
  "#FFC300", // Yellow
  "#DAF7A6", // Light Green
  "#FF4500", // Orange
  "#4B0082", // Indigo
  "#00FFFF", // Cyan
  "#FF1493", // Deep Pink
  "#A52A2A", // Brown
  "#4787CD", // Brown
];

export default function Page() {
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
            <Typography variant="h4">Content Performance</Typography>
          </Box>
        </Stack>
        <Grid container spacing={4}>
          {/* Total Contributed Engagement by Post Over 20K */}
          <Grid
            size={{
              lg: 6,
              xs: 12,
            }}
          >
            <TotalContributedEngagement
              data={[
                {
                  name: 'Alex Siquig Outdoor Workout 6',
                  campaign: "REVO massage gun",
                  sum: 92609,
                  total: 92609,
                  color: colorPalette[0],
                },
                {
                  name: 'Alex Siquig Outdoor Workout 6',
                  campaign: "REVO UGC ARMY",
                  sum: 3990,
                  total: 31609,
                  color: colorPalette[1]
                },
                {
                  name: 'Alex Siquig Outdoor Workout 6',
                  campaign: "REVO Walking Pad",
                  sum: 3990,
                  total: 21609,
                  color: colorPalette[3]
                },
                {
                  name: 'Alex Siquig Outdoor Workout 6',
                  campaign: "50 Review Challenge",
                  sum: 3990,
                  total: 41609,
                  color: colorPalette[4]
                },
                {
                  name: 'Alex Siquig Outdoor Workout 6',
                  campaign: "50 Review Challenge",
                  sum: 3990,
                  total: 21609,
                  color: colorPalette[5]
                },
                {
                  name: 'Publish fazly posts',
                  campaign: "50 Review Challenge 2",
                  sum: 3990,
                  total: 41609,
                  color: colorPalette[6]
                },
                {
                  name: 'Sarah Louise Rector Walking Pad',
                  campaign: "REVO Cupper",
                  sum: 13990,
                  total: 13990,
                  color: colorPalette[7]
                },
                {
                  name: 'Roen Gjoka',
                  campaign: "REVO Cupper",
                  sum: 23990,
                  total: 23990,
                  color: colorPalette[8]
                },
                {
                  name: 'Kiana Daigneault The Pill 1 - 2',
                  campaign: "REVO Cupper",
                  sum: 53990,
                  total: 53990,
                  color: colorPalette[9]
                },
              ]}
            />
          </Grid>

          {/* Over 20,000 IG Views by Post */}
          <Grid
            size={{
              lg: 6,
              xs: 12,
            }}
          >
            <IgViewsByPost
              data={[
                {
                  name: 'Alex Siquig Outdoor Workout 6',
                  campaign: "REVO massage gun",
                  sum: 92609,
                  total: 92609,
                  color: colorPalette[0],
                },
                {
                  name: 'Alex Siquig Outdoor Workout 6',
                  campaign: "REVO UGC ARMY",
                  sum: 3990,
                  total: 31609,
                  color: colorPalette[1]
                },
                {
                  name: 'Alex Siquig Outdoor Workout 6',
                  campaign: "REVO Walking Pad",
                  sum: 3990,
                  total: 21609,
                  color: colorPalette[3]
                },
                {
                  name: 'Alex Siquig Outdoor Workout 6',
                  campaign: "50 Review Challenge",
                  sum: 3990,
                  total: 41609,
                  color: colorPalette[4]
                },
                {
                  name: 'Alex Siquig Outdoor Workout 6',
                  campaign: "50 Review Challenge",
                  sum: 3990,
                  total: 21609,
                  color: colorPalette[5]
                },
                {
                  name: 'Publish fazly posts',
                  campaign: "50 Review Challenge 2",
                  sum: 3990,
                  total: 41609,
                  color: colorPalette[6]
                },
                {
                  name: 'Sarah Louise Rector Walking Pad',
                  campaign: "REVO Cupper",
                  sum: 13990,
                  total: 13990,
                  color: colorPalette[7]
                },
                {
                  name: 'Roen Gjoka',
                  campaign: "REVO Cupper",
                  sum: 23990,
                  total: 23990,
                  color: colorPalette[8]
                },
                {
                  name: 'Kiana Daigneault The Pill 1 - 2',
                  campaign: "REVO Cupper",
                  sum: 53990,
                  total: 53990,
                  color: colorPalette[9]
                },
              ]}
            />
          </Grid>

          {/*Number of Assets by Campaign */}
          <Grid
            size={{
              lg: 6,
              xs: 12,
            }}
          >
            <NumberOfAssestsByCampaign
              data={[
                { campaign: '#hotgirlwalks', no_of_contents: 5, color: colorPalette[11] },
                { campaign: '50 Review Challenge', no_of_contents: 15, color: colorPalette[11] },
                { campaign: 'B2B', no_of_contents: 4, color: colorPalette[11] },
                { campaign: 'Club REVO I', no_of_contents: 8, color: colorPalette[11] },
                { campaign: 'REVO Collabs', no_of_contents: 70, color: colorPalette[11] },
                { campaign: 'REVO Cupper', no_of_contents: 324, color: colorPalette[11] },
                { campaign: 'REVO Massage Gun', no_of_contents: 213, color: colorPalette[11] },
                { campaign: 'REVO UGC ARMY', no_of_contents: 629, color: colorPalette[11] },
                { campaign: 'REVO Walking Pad', no_of_contents: 190, color: colorPalette[11] },
              ]}
            />
          </Grid>
          <Grid
            size={{
              lg: 4,
              xs: 12,
            }}
          >
            <Devices
              data={[
                { name: 'Desktop', value: 68.2, color: 'var(--mui-palette-primary-main)' },
                { name: 'Mobile', value: 22.8, color: 'var(--mui-palette-success-main)' },
                { name: 'Tablet', value: 10, color: 'var(--mui-palette-warning-main)' },
              ]}
            />
          </Grid>
          <Grid
            size={{
              lg: 4,
              xs: 12,
            }}
          >
            <InboundOutbound
              inbound={{
                color: 'var(--mui-palette-error-main)',
                data: [
                  720, 705, 707, 691, 692, 640, 634, 630, 647, 640, 661, 670, 652, 638, 631, 620, 624, 636, 632, 631,
                  616, 601, 602, 580, 572, 571, 562, 540,
                ],
                diff: 25,
                trend: 'down',
                value: 560,
              }}
              outbound={{
                color: 'var(--mui-palette-success-main)',
                data: [
                  1836, 1872, 1911, 1912, 1920, 1942, 1941, 1956, 1971, 1972, 1976, 1964, 1960, 1971, 1978, 1992, 2009,
                  2001, 1980, 1987, 1970, 1973, 1979, 2028, 2029, 2034, 2035, 2040,
                ],
                diff: 10,
                trend: 'up',
                value: 2040,
              }}
            />
          </Grid>
          <Grid
            size={{
              lg: 4,
              xs: 12,
            }}
          >
            <Insight
              insights={[
                {
                  id: 'INSIGHT-1',
                  title: '+15%',
                  description: 'forecasted increase in your traffic by the end of the current month',
                },
                {
                  id: 'INSIGHT-2',
                  title: '2.5%',
                  description: 'forecasted increase in your conversion rate by the end of the current month',
                },
                {
                  id: 'INSIGHT-3',
                  title: '3.5%',
                  description: 'forecasted increase in your revenue by the end of the current month',
                },
              ]}
            />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
