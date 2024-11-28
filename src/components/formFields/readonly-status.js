import { Chip } from "@mui/material";

export const ReadonlyStatus = ({ value }) => {
    const newStatus = typeof value === "string" ? value.replace(/_/g, " ").toUpperCase() : "";
    return (
        <Chip sx={{ mt: 1 }} size='small' color="text.secondary" label={newStatus || "--"} />
    );
};