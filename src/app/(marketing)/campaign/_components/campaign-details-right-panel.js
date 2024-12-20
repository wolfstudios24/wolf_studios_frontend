import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';

export const CampaignDetailsRightPanel = ({ article, images, videos, social_share }) => {
    return (
        <>
            <Box>
                <Typography variant="h4" gutterBottom>
                    {article.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {article.content}
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2, borderRadius: 2 }}
                >
                    {article.button_text}
                </Button>
            </Box>
            <Box display="flex" gap={2} mt={4} overflow="auto">
                {/* Images */}
                {images.map((img, index) => (
                    <Card
                        key={index}
                        sx={{
                            width: 100,
                            height: 100,
                            borderRadius: 2,
                            overflow: "hidden",
                        }}
                    >
                        <CardMedia
                            component="img"
                            src={img}
                            alt={`Preview ${index + 1}`}
                        />
                    </Card>
                ))}
            </Box>
            <Grid container spacing={2} mt={2}>
                {/* Videos */}
                {videos.map((video, index) => (
                    <Grid item  size={{ xs: 12, md: 4 }} key={index}>
                        <Card>
                            <CardMedia
                                component="iframe"
                                src={video.url}
                                sx={{ height: 140 }}
                            />
                            <CardContent>
                                <Typography variant="subtitle1">{video.title}</Typography>
                                <Typography variant="body2">{video.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </>
    )
};