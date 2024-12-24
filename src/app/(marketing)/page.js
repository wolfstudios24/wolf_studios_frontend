
import { config } from '@/config';
import { Container } from '@mui/material';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <Container maxWidth="xl">
      homepage content will be added soon.
    </Container>
  );
}
