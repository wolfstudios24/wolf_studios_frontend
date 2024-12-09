'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { DotsThree as DotsThreeIcon } from '@phosphor-icons/react/dist/ssr/DotsThree';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { NoSsr } from '@/components/core/no-ssr';


export function CountrySessionsVsBounce({ data }) {
  const chartHeight = 300;

  return (
    <Card>
      <CardHeader
        action={
          <IconButton>
            <DotsThreeIcon weight="bold" />
          </IconButton>
        }
        avatar={
          <Avatar>
            <ChartPieIcon fontSize="var(--Icon-fontSize)" />
          </Avatar>
        }
        title="Total Contributed Engagement by Post Over 20K"
      />
      <CardContent>
        <Stack divider={<Divider />} >
          <NoSsr fallback={<Box sx={{ height: `${chartHeight}px` }} />}>
            <ResponsiveContainer height={chartHeight}>
              <BarChart barGap={10} data={data} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 100 }}>
                <CartesianGrid horizontal={false} strokeDasharray="2 4" syncWithTicks />
                <XAxis axisLine={false} tickLine={false} type="number" />
                <YAxis axisLine={false} dataKey="name" tick={<Tick />} tickLine={false} type="category" />

                <Bar
                  dataKey="total"
                  barSize={10} shape={(props) => {
                    const { x, y, width, height, payload } = props;
                    return (
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill={payload.color}
                      />
                    );
                  }}
                  label={renderCustomBarLabel}
                />

                <Tooltip animationDuration={50} content={<TooltipContent />} cursor={false} />
              </BarChart>
            </ResponsiveContainer>
          </NoSsr>
          {/* <Legend /> */}
        </Stack>
      </CardContent>
    </Card>
  );
}

function Tick({ height, payload, width, x, y }) {
  const name = payload?.value ?? "Unknown";

  return (
    <foreignObject height={width} width={150}  x={(x ?? 0) - 150} y={(y  - 10)}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>

        <Typography noWrap color="text.secondary" variant="inherit" sx={{fontSize: "12px"}}>
          {name}
        </Typography>
      </Stack>
    </foreignObject>
  );
}

function Legend() {
  return (
    <Stack direction="row" spacing={2}>
      {bars.map((bar) => (
        <Stack direction="row" key={bar.name} spacing={1} sx={{ alignItems: 'center' }}>
          <Box sx={{ bgcolor: bar.color, borderRadius: '2px', height: '4px', width: '16px' }} />
          <Typography color="text.secondary" variant="caption">
            {bar.name}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function TooltipContent({ active, payload }) {
  if (!active) {
    return null;
  }

  return (
    <Paper sx={{ border: '1px solid var(--mui-palette-divider)', boxShadow: 'var(--mui-shadows-16)', p: 1 }}>
      <Stack spacing={2}>
        {payload?.map((entry) => (
          <Stack direction="column" key={entry.name} spacing={1} >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', flex: '1 1 auto' }}>
              <Box sx={{ bgcolor: entry.payload.color, borderRadius: '2px', height: '8px', width: '8px' }} />
              <Typography color="text.secondary" variant="h6">{entry.payload.name}</Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              Campaign: {entry.payload.campaign}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Sum: {entry.payload.sum}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Total: {entry.payload.total}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Paper>
  );
}


const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
  return <text
    x={x + width + 5} // Position the label at the end of the bar with a small offset
    y={y + 15} // Center the text vertically within the bar
    fill="#666"
    textAnchor="start" // Align text to the start of the position
    dy={-4}
    style={{ fontSize: '12px', fontWeight: 'bold' }} // Optional styling
  >
    {value}
  </text>

};