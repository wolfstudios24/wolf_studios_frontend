import * as React from 'react';

import { config } from '@/config';
import { LoginForm, SignInForm } from '@/components/auth/custom/LoginForm';
import { GuestGuard } from '@/components/auth/guest-guard';
import { SplitLayout } from '@/components/auth/split-layout';
import { SignUpForm } from '@/components/auth/cognito/sign-up-form';

export const metadata = { title: `Sign in | Custom | Auth | ${config.site.name}` };

export default function Page() {
  return (
    <GuestGuard>
      <SplitLayout>
        <LoginForm />
        {/* <SignInForm /> */}
        {/* <SignUpForm /> */}
      </SplitLayout>
    </GuestGuard>
  );
}
