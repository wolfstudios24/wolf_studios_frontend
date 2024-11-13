
import { Hero } from '@/components/marketing/home/hero';
import { config } from '@/config';

export const metadata = { title: config.site.name, description: config.site.description };

export default function Page() {
  return (
    <div>
      <Hero />
    </div>
  );
}
