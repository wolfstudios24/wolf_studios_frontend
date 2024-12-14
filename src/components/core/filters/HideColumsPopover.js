import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import React from "react";
import { FilterPopover, useFilterContext } from "../filter-button";

export function HideColumsPopover() {
    const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
    const [value, setValue] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setValue(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    React.useEffect(() => {
        setValue(initialValue ? initialValue.map(name => name.field) : []);
    }, [initialValue]);

    return (
        <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter by status">
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected?.join(', ')}
                    MenuProps={MenuProps}
                >
                    {initialValue.map((name) => (
                        <MenuItem key={name.field} value={name.field}>
                            <Checkbox checked={value.includes(name.field)} />
                            <ListItemText primary={name.field} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                onClick={() => {
                    onApply(value);
                }}
                variant="contained"
            >
                Apply
            </Button>
        </FilterPopover>
    );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};