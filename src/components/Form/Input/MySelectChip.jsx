import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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

function getStyles(id, selectedIds, theme) {
  return {
    fontWeight:
      selectedIds.indexOf(id) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MySelectChip({
  data,
  labelName,
  setArrIds,
  seletedIds,
}) {
  const theme = useTheme();
  const [selectedIds, setSelectedIds] = React.useState(seletedIds);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedIds(value);

    setArrIds(value);
  };

  return (
    <div>
      <FormControl sx={{ minWidth: 250 }} size="small">
        <InputLabel id="demo-multiple-chip-label">{labelName}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedIds}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={labelName} />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((id) => {
                const selectedItem = data?.find((item) => item.id === id);
                return (
                  <Chip
                    key={id}
                    label={selectedItem ? selectedItem.name : "Unknown"}
                  />
                );
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data?.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              style={getStyles(item.id, selectedIds, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
