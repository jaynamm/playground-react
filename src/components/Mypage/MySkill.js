import React, { useState } from 'react';
import { Autocomplete, TextField, Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import skill from '../Data/Skill';
import Header from '../Base/Header';

export default function MySkill() {
  const [mySkill, setMySkill] = useState('');

  return (
    <div>
      <Header />
      <div className="myPageModify">
        <Stack spacing={3} sx={{ width: 400 }}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={skill}
            getOptionLabel={(option) => option.title}
            defaultValue={[skill[1]]}
            filterSelectedOptions
            renderInput={(params) => <TextField {...params} label="Skill" />}
          />
          <Button variant="contained">
            <Link to="/mypage">스킬 추가하기</Link>
          </Button>
        </Stack>
      </div>
    </div>
  );
}
