import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { colorPalette } from "../page";
import { SalesByCategory } from "./sales-by-category";
import { TotalRoi } from "./total-roi";

export const PartnerMatrix = () => {
    return (
        <Stack spacing={4}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ alignItems: 'flex-start' }}>
                <Box sx={{ flex: '1 1 auto' }}>
                    <Typography variant="h4">Partner Metrics / Demographics</Typography>
                </Box>
            </Stack>
            <Grid container spacing={4}>
                {/* Levanta: All Sales by Category */}
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <SalesByCategory
                        data={[
                            {
                                profile_category: 'Affiliate Network',
                                sum: 10609.62,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Blog / Review',
                                sum: 14714.52,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Creator',
                                sum: 8109.70,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Publication',
                                sum: 1.70,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Review Partner',
                                sum: 71769.70,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'SEO / Content Partner',
                                sum: 73542.70,
                                color: colorPalette[11],
                            }
                        ]}
                    />
                </Grid>
                {/* Levanta: Total ROI by Category */}
                <Grid
                    size={{
                        md: 6,
                        xs: 12,
                    }}
                >
                    <TotalRoi
                        data={[
                            {
                                profile_category: 'Affiliate Network',
                                sum: 12609.62,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Blog / Review',
                                sum: 22714.52,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Creator',
                                sum: 23109.70,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Publication',
                                sum: 0,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'Review Partner',
                                sum: 149277.70,
                                color: colorPalette[11],
                            },
                            {
                                profile_category: 'SEO / Content Partner',
                                sum: 124542.70,
                                color: colorPalette[11],
                            }
                        ]}
                    />
                </Grid>
            </Grid>
        </Stack>)
};