import { paths } from '@/paths';

export const layoutConfig = {
  navItems: [
    {
      key: 'general',
      title: 'General',
      items: [
        { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'house' },
        { key: 'analytics', title: 'Analytics', href: paths.dashboard.analytics, icon: 'chart-pie' },
        { key: 'user-verification', title: 'User Verification', href: paths.dashboard.user_verification, icon: 'users' },
      ],
    },
    {
      key: 'admin',
      title: 'Admin',
      items: [
        { key: 'usrs', title: 'Users', href: paths.dashboard.crypto, icon: 'users' },
      ],
    }
  ],
};
