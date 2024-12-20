import { textShortner } from "@/utils/utils";
import {
    Box,
    Button,
    Paper,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";

export const PortfolioView = () => {

    const portfolioData = [
        {
            title: "Mary Ann",
            description: "Session with Mary Ann, shot by Combina in February 2018",
            model: "Mary Ann",
            dp: "Combina Key",
            projectLink: "Link to project",
            image: "https://picsum.photos/300/200?random=1", // Placeholder image
        },
        {
            title: "Prints: Abstract",
            description: "On Session production for portraits, shot by Combina in November 2016.",
            dp: "Combina Key",
            projectLink: "Link to project",
            image: "https://picsum.photos/300/200?random=2", // Placeholder image
        },
        {
            title: "Kansha: Love Bite",
            description: "In Studio Production for Kansha Magazine, shot by Combina Key in August 2018.",
            publication: "Kansha",
            dp: "Combina Key",
            projectLink: "Link to project",
            image: "https://picsum.photos/300/200?random=3", // Placeholder image
        },
        {
            title: "Pump Magazine: Sharee",
            description: "In Studio Production with Sharee Michelle for Pump Magazine, shot by Combina Key in November 2018.",
            model: "Sharee Michelle",
            publication: "Pump Magazine",
            dp: "Combina Key",
            projectLink: "Link to project",
            image: "https://picsum.photos/300/200?random=4", // Placeholder image
        },
        {
            title: "Elegant Magazine: Elena",
            description: "In Studio Production with Elena for Elegant Magazine, shot by Combina Key in May 2019.",
            model: "Elena",
            publication: "Elegant Magazine",
            dp: "Combina Key",
            projectLink: "Link to project",
            image: "https://picsum.photos/300/200?random=5", // Placeholder image
        },
        {
            title: "Imirage Mag",
            description: "In Studio Production for Imirage Magazine, shot by Combina Key in February 2019.",
            publication: "Imirage Mag",
            dp: "Combina Key",
            projectLink: "Link to project",
            image: "https://picsum.photos/300/200?random=6", // Placeholder image
        },
        {
            title: "Tamara Rzaeva",
            description: "Session with Tamara Rzaeva, shot by Combina Key on April 2018.",
            model: "Tamara Rzaeva",
            dp: "Combina Key",
            projectLink: "Link to project",
            image: "https://picsum.photos/300/200?random=7", // Placeholder image
        },
        {
            title: "Street Style: Karla Marie",
            description: "Street Style Session with Karla Marie, shot by Combina Key in December 2018.",
            model: "Karla Marie",
            dp: "Combina Key",
            projectLink: "Link to project",
            image: "https://picsum.photos/300/200?random=8", // Placeholder image
        },
        {
            title: "Shuba Magazine: Jyaira Moore",
            description: "A session with Jyaira Moore, shot by Combina in July 2018.",
            model: "Jyaira Moore",
            dp: "Combina Key",
            projectLink: "Link to project",
            image: "https://picsum.photos/300/200?random=9", // Placeholder image
        },
        {
            title: "Elena Tretyakova",
            description: "Session with Elena Tretyakova, shot by Combina Key in March 2018.",
            model: "Elena Tretyakova",
            dp: "Combina Key",
            projectLink: "Link to project",
            image: "https://picsum.photos/300/200?random=10", // Placeholder image
        },
        {
            title: "Lissa DeLorenzo",
            description: "Session with Lissa DeLorenzo, shot by Combina Key in July 2018.",
            model: "Lissa DeLorenzo",
            dp: "Combina Key",
            projectLink: "Link to project",
            image: "https://picsum.photos/300/200?random=11", // Placeholder image
        },
        {
            title: "Lydia DTLA",
            description: "Session with Lydia, shot by Combina in DTLA in June 2024.",
            model: "Lydia",
            dp: "Combina Key",
            projectLink: "Link to project",
            image: "https://picsum.photos/300/200?random=12", // Placeholder image
        },
    ];


    return (
        <Box sx={{ py: 4 }}>
            <Typography gutterBottom sx={{
                fontWeight: 300,
                fontSize: {
                    xs: '1.4rem',
                    md: '2rem'
                },
                lineHeight: 1
            }}>
                Portfolios
            </Typography>
            <Grid container spacing={2}>
                {
                    portfolioData.map((portfolio, index) => (
                        <Grid item size={{ xs: 12, md: 3 }} key={index}>
                            <PortfolioCard portfolio={portfolio} />
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    );
};

const PortfolioCard = ({ portfolio }) => {
    return (
        <Box>
            <Paper elevation={1} variant="outlined">
                <Box
                    component="img"
                    src={portfolio.image}
                    sx={{ height: 200, width: '100%', objectFit: 'cover', border: 0, borderRadius: "5px 5px 0 0" }}
                />
                <Box p={2}>
                    <Typography
                        color="text.secondary"
                        sx={{ fontWeight: 600 }}>
                        {portfolio.title}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                    >
                        {textShortner(portfolio.description, 80)}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight={600}
                    >
                        Model: {portfolio.model || "-"}
                    </Typography>
                    <Button>
                        View Project
                    </Button>
                </Box>
            </Paper>
        </Box>
    )
}
