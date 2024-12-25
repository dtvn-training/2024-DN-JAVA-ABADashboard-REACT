import React from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import classnames from 'classnames/bind';
import styles from './filter-dropdown.module.scss';

const cx = classnames.bind(styles);

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (event: SelectChangeEvent) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ label, options, value, onChange }) => {
  return (
    <FormControl variant="outlined" className={cx('filter-dropdown')}>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={onChange} label={label}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterDropdown;