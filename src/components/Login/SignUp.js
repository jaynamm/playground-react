import React, { useState } from 'react'
import { styles } from'./styles'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import axios from "axios"

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../../styles/App.css';


export default function SignUp() {
  const navigate = useNavigate();
  const [userId, setUserid] = useState('');  //아이디 값을 입력받음
  const [userEmail, setEmail] = useState('');  //비밀번호 값을 입력 받음
  const [userName, setName] = useState('');  //비밀번호 입력값을 받음
  const [userNickname, setUserNickname] = useState('');  //닉네임 값을 입력 받음
  const [userPassword, setPassword] = useState('');  //닉네임 값을 입력 받음
  const [userPasswordCheck, setPasswordCheck] = useState('');  //닉네임 값을 입력 받음
  const [userCurriculm, setCurriculum] = useState('');  //닉네임 값을 입력 받음
  const theme = createTheme();

  const idCheck = () => {
    const id = {
      "userid": userId,
    }
    .axios 
    .get("/member/signup", id)
    .then((respons) => {
      console.log(respons.data);
    })
    .catch((error) =>{
      console.log(error)
      alert("회원가입에 실패하였습니다.");
    });
  }

  const signUpHandler = () =>{
      const regl = /^[A-Za-z0-9]{8,20}$/;
      // 패스워드랑 패스워드 확인이 일치하는지 검증
      if (userPassword !== userPasswordCheck) {
        alert("패스워드 일치하지 않습니다.");
        return;
      }
      if(userPassword.match(regl) === null) {
        alert("비밀번호 형식에 맞지 않습니다.")
        return;
      }

    const data = {
      "userid": userId,
      "password": userPassword,
      "email": userEmail,
      "name": userName,
      "nickname": userNickname,
      "curriculum": userCurriculm,
    };
  
    axios //입력한 데이터를 받음.
    .post("/api/member/signup", data)
    .then((response) => {
      console.log(response.data);

      alert("회원가입에 성공하였습니다.");

      navigate('/signin');
    })  //성공했을시 response를 받아옴.
    .catch((error) =>{
      console.log(error)
      alert("회원가입에 실패하였습니다.");
    });   //실패했을 시 error를 발생함.
};

  return (
    <ThemeProvider theme={theme}>
      <style>{styles}</style>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <p className='play'>PLAY <span className="ground">GROUND</span></p>
          <div className="data">PLAY DATA의 정보를 알고 싶다면 
            가입하세요.</div>
          <Box component="form" noValidate onSubmit={signUpHandler} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Button onClick={idCheck}>중복확인</Button>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="Id"
                  required
                  fullWidth
                  id="Id"
                  label="아이디"
                  autoFocus
                  onChange={(e) => setUserid(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="password"
                  label="비밀번호"
                  name="password"
                  autoComplete="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="passwordCheck"
                  label="비밀번호 확인"
                  name="passwordCheck"
                  autoComplete="passwordCheck"
                  type="password"
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="이메일"
                  name="email"
                  autoComplete="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="이름"
                  name="name"
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nickname"
                  label="닉네임"
                  name="nickname"
                  autoComplete="nickname"
                  onChange={(e) => setUserNickname(e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">교육과정</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={userCurriculm}
                    label="Curriculm"
                    onChange={(e) => setCurriculum(e.target.value)}
                  >
                    <MenuItem value={1}>빅데이터</MenuItem>
                    <MenuItem value={2}>인공지능</MenuItem>
                    <MenuItem value={3}>클라우드</MenuItem>
                    <MenuItem value={4}>백엔드</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Button
              type="button"
              fullWidth
              variant="contained" color="secondary"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => signUpHandler() }
            > 회원가입
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Signin" variant="body1">
                  이미 아이디가 있으신가요? 로그인
                </Link>
              </Grid>
            </Grid>

          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
