import { Box, Button, Card, CardContent, CardMedia, Divider, Stack, Typography } from '@mui/material';

const PortfolioSliderItem = ({ item, index, currentIndex }) => {
  return (
    <Card
      sx={{
        width: '100%',
        height: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: 3,
        zIndex: -10,
      }}
    >
      <CardMedia
        component="img"
        image={item.image}
        alt="Background Image"
        sx={{ height: '100%', width: '100%', objectFit: 'cover', filter: 'brightness(100%)' }}
      />
      <CardContent
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          color: 'white',
          px: 2,
          display: currentIndex === index ? 'block' : 'none',
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: -2.5 }}>
          <Stack direction="column" alignItems="flex-start">
            <Typography variant="h5">{item.title}</Typography>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography variant="body2">Model: {item.model}</Typography>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Typography variant="body2">Publication: {item.publication}</Typography>
              <Divider orientation="vertical" variant="middle" flexItem />
              <Typography variant="body2">DP: {item.dp}</Typography>
            </Box>
          </Stack>
          <Button variant="outlined">View Portfolio</Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PortfolioSliderItem;
