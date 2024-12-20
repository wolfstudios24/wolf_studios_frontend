import {
    Box
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { CampaignDetailsRightPanel } from "./_components/campaign-details-right-panel";
import { CampaignDetailsSidebar } from "./_components/campaign-details-sidebar";

export const CampaignDetailsView = ({ data }) => {
    const {
        campaign_title,
        description,
        details,
        author,
        article,
        images,
        videos,
        social_share,
    } = data;

    return (
        <Box sx={{ p: 4 }}>
            <Grid container spacing={4}>
                {/* Left Panel */}
                <Grid item size={{ xs: 12, md: 4 }}>
                    <CampaignDetailsSidebar
                        description={description}
                        details={details}
                        author={author}
                        campaign_title={campaign_title}
                    />
                </Grid>

                {/* Right Content */}
                <Grid item size={{ xs: 12, md: 8 }}>
                    <CampaignDetailsRightPanel
                        article={article}
                        images={images}
                        videos={videos}
                        social_share={social_share}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};
