import {
    Button,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import React from "react";
import { FilterPopover, useFilterContext } from "../filter-button";

export function HideColumsPopover() {
    const { anchorEl, onApply, onClose, open, value: initialValue } = useFilterContext();
    const [value, setValue] = React.useState([]);
    const [search, setSearch] = React.useState("");

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setValue(typeof value === "string" ? value.split(",") : value);
    };

    const handleSearchChange = (event) => {
        event.stopPropagation();
        console.log(event.target.value, "search");
        setSearch(event.target.value);
    };

    const handleFocus = (event) => {
        event.stopPropagation();
    };

    const handleKeyDown = (event) => {
        if (event.key !== "Escape") {
            event.stopPropagation();
        }
    };

    React.useEffect(() => {
        setValue(initialValue ? initialValue.map((name) => name.field) : []);
    }, [initialValue]);

    // Filter options based on search input
    const filteredOptions = initialValue.filter((name) =>
        name.field.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <FilterPopover anchorEl={anchorEl} onClose={onClose} open={open} title="Filter columns">
            <FormControl sx={{ m: 1, width: 300 }}>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={value}
                    onChange={handleChange}
                    input={<OutlinedInput label="Columns" />}
                    renderValue={(selected) => selected?.join(", ")}
                    MenuProps={MenuProps}
                >
                    <MenuItem disableRipple>
                        <TextField
                            placeholder="Search..."
                            variant="outlined"
                            size="small"
                            value={search}
                            onChange={handleSearchChange}
                            fullWidth
                            onKeyDown={handleKeyDown}
                        />
                    </MenuItem>
                    {filteredOptions.map((name) => (
                        <MenuItem key={name.field} value={name.field} >
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
