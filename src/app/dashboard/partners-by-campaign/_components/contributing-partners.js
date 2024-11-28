import { CustomLinkViewer } from "@/components/formFields/CustomLinkViewer";
import { Box, InputLabel, Paper, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

export const ContributingPartners = ({ data }) => {
    return (
        <Paper elevation={3} sx={{ mt: 2 }}>
            <Grid container>
                <Grid item size={{ xs: 12, md: 3 }}>
                    <Box
                        sx={{ height: '100px', width: '100px' }}
                        component="img"
                        src={data?.avatar}
                    />
                </Grid>
                <Grid
                    item
                    size={{ xs: 12, md: 9 }}
                    py={2}
                    px={1}
                >
                    <Typography color="text.secondary">{data?.name}</Typography>
                    <Grid container spacing={2} mt={1}>
                        <Grid item size={{ xs: 12, md: 6 }}>
                            <InputLabel>Instagram</InputLabel>
                            <CustomLinkViewer domain="https://www.instagram.com/" value={data?.instagram} />
                        </Grid>
                        <Grid item size={{ xs: 12, md: 6 }}>
                            <InputLabel>Instagram Following</InputLabel>
                            <Typography color="text.secondary">{data?.instagram_following || '-'}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};