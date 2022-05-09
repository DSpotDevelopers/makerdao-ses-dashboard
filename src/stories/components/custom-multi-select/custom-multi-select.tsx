import React from 'react';
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material';
import CheckBoxOutlined from '@mui/icons-material/CheckBoxOutlined';

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

interface CustomSelectProps {
  items: string[],
  label: string,
  withAll?: boolean,
}

export const CustomMultiSelect = ({ withAll = true, ...props }: CustomSelectProps) => {
  const [activeItems, setActiveItems] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof activeItems>) => {
    const {
      target: { value },
    } = event;

    setActiveItems(typeof value === 'string' ? value.split(',') : value);
  };

  const toggleAll = () => {
    if (activeItems.length === props.items.length) {
      setActiveItems([]);
    } else {
      setActiveItems(props.items);
    }
  };

  return <FormControl sx={{ m: 1, width: 300, background: 'white' }}>
    <InputLabel id="multiselect-status-label">{props.label}</InputLabel>
    <Select
      labelId="multiselect-status-label"
      id="multiselect-status"
      multiple
      value={activeItems}
      onChange={handleChange}
      input={<OutlinedInput label={props.label} />}
      renderValue={(selected) => selected.join(', ')}
      MenuProps={MenuProps}
    >
      {withAll && <MenuItem key={'All'} onClick={toggleAll}>
        <CheckBoxOutlined sx={{ m: 1 }}/>
        <ListItemText primary={'All'}/>
      </MenuItem>}
      {props.items.map((item) => (
        <MenuItem key={item} value={item}>
          <Checkbox checked={activeItems.indexOf(item) > -1} />
          <ListItemText primary={item} />
        </MenuItem>
      ))}
    </Select>
  </FormControl>;
};
