
import { LoginForm } from '@/components/auth/custom/LoginForm';
import { GuestGuard } from '@/components/auth/guest-guard';
import { SplitLayout } from '@/components/auth/split-layout';
import { config } from '@/config';

export const metadata = { title: `Sign up | Custom | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <LoginForm />
      </SplitLayout>
    </GuestGuard>
  );
}
