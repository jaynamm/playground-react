import React, { useState } from 'react';
import { kakaoURL } from '../../config/KakaoAuth';
import { ButtonGroup } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useNavigate } from 'react-router-dom';
import { styles } from './styles';
import axios from 'axios';

import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import '../../styles/water.css';
import '../../styles/login.css';

export default function SignIn() {
  const [userId, setUserid] = useState(''); //아이디 값을 입력받음
  const [userPassword, setPassword] = useState(''); // 패스워드 값을 입력받음
  const navigate = useNavigate();
  const theme = createTheme();

  const buttons = [
    <Button color="primary" key="idSearch" component={Link} to="/Idsearch">
      아이디 찾기
    </Button>,
    <Button color="success" key="PasswordSearch" component={Link} to="/PasswordSearch">
      비밀번호 찾기
    </Button>,
    <Button color="secondary" key="signUp" component={Link} to="/signup">
      회원가입
    </Button>,
  ];

  const signUpHandler = () => {
    if (userId.length === 0 || userPassword.length === 0) {
      alert('이메일과 비밀번호를 입력하세요.');
      return;
    } // 아무런 값을 입력하지 않았을 때 alert를 호출합니다.

    const data = {
      userid: userId,
      password: userPassword,
    };

    axios //입력한 데이터를 받음.
      .post('/api/member/login', data)
      .then((response) => {
        console.log(response.data);
        // const responseData = response.data;
        const jwtToken = response.headers['authorization'];
        const refreshToken = response.data['refresh-token'];
        console.log(axios.defaults);
        // const refreshToken = response.data['refresh-token'];
        if (jwtToken && refreshToken) {
          axios.defaults.headers.common['Authorization'] = jwtToken;
          localStorage.setItem('accessToken', jwtToken);
          localStorage.setItem('refresh-token', refreshToken);

          // axios.defaults.data.common['refresh-token'] = refreshToken;
          // localStorage.setItem('refreshToken', refreshToken);
        }
        alert('로그인 성공했습니다.');

        navigate('/home', {
          // state: responseData,
        });
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
        alert('로그인에 실패했습니다.'); //axios값에 데이터가 일치 하지 않으면 함수를 호출함
      });
  };

  return (
    <ThemeProvider theme={theme}>
      <style>{styles}</style>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid item id="background" xs={false} sm={7} md={8} sx={{}} className="backgruond" />

        <Grid item xs={12} sm={5} md={4.0} component={Paper} elevation={3} square>
          <Box
            sx={{
              my: 14,
              mx: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p className="login">로그인 </p>
            <Box component="form" noValidate onSubmit={signUpHandler} sx={{ mt: 4 }}>
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
                type="button"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 3 }}
                onClick={() => signUpHandler()}
              >
                PLAY LOGIN
              </Button>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <ButtonGroup fullWidth style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {buttons}
                </ButtonGroup>
              </Box>
              <br></br>

              {/* 카카오 로그인 버튼 입니다. */}
              <Button
                fullWidth
                href={kakaoURL}
                startIcon={<ChatBubbleIcon />}
                sx={{
                  backgroundColor: '#FEE500',
                  color: '#191919',
                }}
              >
                <span>카카오계정 로그인</span>
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      {/* 뒷 배경을 가져온 것 입니다. */}
      <div className="ocean">
        <div className="wave"></div>
        <div className="wave"></div>
      </div>
    </ThemeProvider>
  );
}
