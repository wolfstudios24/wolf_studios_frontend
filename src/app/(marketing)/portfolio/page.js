
import { Hero } from '@/components/marketing/home/hero';
import { config } from '@/config';
import { PortfolioView } from './portfolio-view';
import { Box, Container } from '@mui/material';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <Container maxWidth="xl">
      <PortfolioView />
    </Container>
  );
}
