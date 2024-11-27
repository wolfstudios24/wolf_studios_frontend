import Stack from '@mui/material/Stack';

import { config } from '@/config';
import { Box } from '@mui/material';
import { NeedOfferApprovalSideNav } from './_components/side-navbar';
import { NeedsApprovalSingleProfile } from './_components/needs-approval-single-profile';

export const metadata = { title: `Account | Settings | Dashboard | ${config.site.name}` };

export default function Page() {
    return (
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4} sx={{ position: 'relative' }}>
            <NeedOfferApprovalSideNav />
            <Box sx={{ flex: '1 1 auto', minWidth: 0 }}>
                <NeedsApprovalSingleProfile />
            </Box>
        </Stack>
    );
}
