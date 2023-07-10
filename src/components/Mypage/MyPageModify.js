import { useCallback, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from '../Token/Interceptor';
import Header from '../Base/Header';
import { useNavigate } from 'react-router-dom';

const MyPageModify = () => {
  const [userPassword, setPassword] = useState('');
  const [userNewPassword, setUserNewPassword] = useState('');
  const [userNewPasswordCheck, setUserNewPasswordCheck] = useState('');
  const navigate = useNavigate();

  const passwordChangeHandler = () => {
    const regl = /^[A-Za-z0-9]{8,20}$/;
    // 패스워드랑 패스워드 확인이 일치하는지 검증
    if (userNewPassword !== userNewPasswordCheck) {
      alert('패스워드 일치하지 않습니다.');
      return;
    }
    if (userPassword.match(regl) === null) {
      alert('비밀번호 형식에 맞지 않습니다.');
      return;
    }

    const data = {
      userNewPassword: userNewPassword,
    };

    axios //입력한 데이터를 받음.
      .post('/api/member/signup', data)
      .then((response) => {
        console.log(response.data);

        alert('회원가입에 성공하였습니다.');

        navigate('/signin');
      }) //성공했을시 response를 받아옴.
      .catch((error) => {
        console.log(error);
        alert('회원가입에 실패하였습니다.');
      }); //실패했을 시 error를 발생함.
  };

  return (
    <div>
      <Header />
      <div className="myPageModify">
        <Card sx={{ height: '450px', width: '500px', textAlign: 'center' }}>
          <CardHeader subheader="비밀번호 변경" title="비밀번호" />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{}}>
              <TextField
                fullWidth
                label="현재 비밀번호"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={userPassword}
              />
              <TextField
                fullWidth
                label="새 비밀번호"
                name="confirm"
                onChange={(e) => setUserNewPassword(e.target.value)}
                type="password"
                value={userNewPassword}
              />
              <TextField
                fullWidth
                label="새 비밀번호"
                name="confirm"
                onChange={(e) => setUserNewPasswordCheck(e.target.value)}
                type="password"
                value={userNewPasswordCheck}
              />
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'center', marginTop: '5%' }}>
            <Button variant="contained" onClick={() => passwordChangeHandler()}>
              <Link to="/mypage">비밀번호 변경하기</Link>
            </Button>
            <Button variant="contained" color="error">
              <Link to="/mypage">비밀번호 변경 취소하기</Link>
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default MyPageModify;
