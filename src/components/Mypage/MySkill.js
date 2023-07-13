import React, { useState } from 'react';
import { Autocomplete, TextField, Stack, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import skill from '../Data/Skill';
import Header from '../Base/Header';

export default function MySkill() {
  const navigate = useNavigate();
  const [mySkills, setMySkills] = useState([]);

  const mySkillHandler = () => {
    const data = {
      skill: mySkills,
    };

    axios
      .post('/api/member/skills', data)
      .then((response) => {
        const responseData = response.data;
        console.log(responseData);
        alert('스킬이 추가되었습니다.');
        navigate('/mypage');
      })
      .catch((error) => {
        console.log(error);
        alert('스킬 추가를 실패하였습니다.');
      });
  };

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
            value={mySkills}
            renderInput={(params) => <TextField {...params} label="Skill" />}
            onChange={(e, selectedSkills) => setMySkills(selectedSkills)}
          />
          <Button variant="contained" onClick={mySkillHandler}>
            기술/스택 추가
            {/* <Link to="/mypage">스킬 추가하기</Link> */}
          </Button>
        </Stack>
      </div>
    </div>
  );
}
