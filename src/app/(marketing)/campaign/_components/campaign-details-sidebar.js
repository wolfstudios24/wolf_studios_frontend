import { Comment, Facebook, Share } from "@mui/icons-material";
import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";

export const CampaignDetailsSidebar = ({ description, details, author, campaign_title }) => {
    return (
        <Box sx={{ p: 2, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
            <Typography variant="h4" gutterBottom>
                {campaign_title}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {description}
            </Typography>
            <Box mt={3}>
                <Typography variant="subtitle2">DATE</Typography>
                <Typography variant="body1" gutterBottom>
                    {details.date}
                </Typography>
                <Typography variant="subtitle2">COMPENSATION</Typography>
                <Typography variant="body1" gutterBottom>
                    {details.compensation}
                </Typography>
                <Typography variant="subtitle2">DELIVERABLES</Typography>
                <Typography variant="body1" gutterBottom>
                    {details.deliverables}
                </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2">AUTHOR</Typography>
            <Box display="flex" alignItems="center" mt={1}>
                <Avatar
                    src={author.profile_image}
                    alt={author.name}
                    sx={{ width: 56, height: 56, mr: 2 }}
                />
                <Box>
                    <Typography variant="body1">{author.name}</Typography>
                    <Typography variant="caption">{author.title}</Typography>
                </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2">SHARE</Typography>
            <Box display="flex" mt={1} gap={1}>
                <IconButton>
                    <Comment />
                </IconButton>
                <IconButton>
                    <Share />
                </IconButton>
                <IconButton>
                    <Facebook />
                </IconButton>
            </Box>
        </Box>
    )
};