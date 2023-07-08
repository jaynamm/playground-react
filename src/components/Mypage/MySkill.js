import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import skill from '../Data/Skill';

export default function MySkill() {
  return (
    <Stack spacing={3} sx={{ width: 300 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={skill}
        getOptionLabel={(option) => option.title}
        defaultValue={[skill[1]]}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label="Skill" />}
      />
    </Stack>
  );
}
