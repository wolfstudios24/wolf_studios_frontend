import { RightPanel } from "@/components/rightPanel/right-panel";
import { Button, Stack, Typography } from "@mui/material";

export const SingleContributingPartnerRightPanel = ({ open, onClose, }) => {
    return (
        <RightPanel
            open={open}
            heading="Validate"
            onClose={onClose}
            drawerProps={{ zIndex: 1500 }}
            actionButtons={() => {
                return (
                    <Stack spacing={2} direction={"row"}>
                        <Button
                            variant="contained"
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                        >
                            Close
                        </Button>

                    </Stack>
                );
            }}
        >
            <Typography variant="h4">Fill the parameters</Typography>

        </RightPanel>
    );
}