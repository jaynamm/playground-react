import React, { useState } from 'react'
import axios from "axios"
import '../styles/App.css';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
 

export default function SignIn() {
    const [userId, setUserid] = useState('');  //아이디 값을 입력받음
    const [userPassword, setPassword] = useState(''); // 패스워드 값을 입력받음
    const navigate = useNavigate();
    const theme = createTheme();

    const signUpHandler = () => {
        if (userId.length === 0 || userPassword.length === 0){
            alert("이메일과 비밀번호를 입력하세요.");
            return;
        } // 아무런 값을 입력하지 않았을 때 alert를 호출합니다.

      const data = {
        "userid": userId,
        "password": userPassword,
      };

      axios //입력한 데이터를 받음.
        .post("/api/member/login", data)
        .then((response) => {             
          console.log(response.data);
          const responseData = response.data;

          // Request 헤더에서 토큰을 가져와서 localStorage 에 저장한다.
          let jwtToken = response.headers.get("Authorization");
          localStorage.setItem("Authorizaion", jwtToken);

          alert("로그인 성공했습니다.");

          navigate('/', {
            state : responseData
          })
        })
        .then((result) => {
          console.log(result);
        })
        .catch((error) =>{
          console.log(error);
          alert('로그인에 실패했습니다.') //axios값에 데이터가 일치 하지 않으면 함수를 호출함
        });   
    };
    
  return (
  
    <ThemeProvider theme={theme}>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <Grid container component="main" sx={{ height: '50vh' }}>
        <CssBaseline />
        <p className='main'>PLAY <span className="ground">GROUND</span></p>
        <Grid
          item
          xs={false}
          sm={5}
          md={8}
        
        />
        <Grid item xs={12} sm={4} md={3.5} component={Paper} elevation={3} square>
        <p className='login'>로그인 </p>
          <Box
            sx={{
              my: 15,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
            }}
          >
            <Box noValidate sx={{ mt: -12 }}>

              <TextField
                margin="normal"
                required
                fullWidth
                id="userId"
                label="아이디를 입력해주세요."
                name="userId"
                autoComplete="userId"
                autoFocus
                onChange={(e) => setUserid(e.target.value)}
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="userPassword"
                label="비밀번호를 입력해주세요."
                type="password"
                id="userPassword"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained" color="warning"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => signUpHandler()}
              >
              PLAY LOGIN
              </Button>
              <Grid container>
                  <Stack spacing={8.4} direction="row">
                  <Button variant="outlined" color="primary" href='/signup'>아이디 찾기</Button>
                  <Button variant="outlined" color="success" href='/signup'>비밀번호 찾기</Button>
                  <Button variant="outlined" color="warning" href='/signup'>회원가입</Button>
                  </Stack>
                </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
