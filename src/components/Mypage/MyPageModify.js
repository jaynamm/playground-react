import { useCallback, useState } from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Stack, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from '../Token/Interceptor';
import Header from '../Base/Header';
import { useNavigate } from 'react-router-dom';

const MyPageModify = () => {
  const [userPassword, setUserPassword] = useState('');
  const [userNewPassword, setUserNewPassword] = useState('');
  const [userNewPasswordCheck, setUserNewPasswordCheck] = useState('');
  const navigate = useNavigate();

  const passwordChangeHandler = () => {
    const regl = /^[A-Za-z0-9]{8,20}$/;
    // 패스워드랑 패스워드 확인이 일치하는지 검증
    if (userNewPassword !== userNewPasswordCheck) {
      alert('새 패스워드가 일치하지 않습니다.');
      return;
    }
    if (!regl.test(userNewPassword)) {
      alert('비밀번호 형식이 올바르지 않습니다.');
      return;
    }

    axios // 입력한 데이터를 전송
      .post('/api/member/password', { password: userPassword, newPassword: userNewPassword })
      .then((response) => {
        console.log(response);
        if (response.data.responseMessage.includes('PASSWORD_CHANGE_FAILED')) {
          setUserPassword('');
          setUserNewPassword('');
        } else if (response.data.success) {
          alert('비밀번호 변경에 성공하였습니다.');
          navigate('/mypage');
        }
      })
      .catch((error) => {
        console.log(error);
        alert('비밀번호 변경에 실패하였습니다.');
      });
  };

  return (
    <div>
      <Header />
      <div className="myPageModify">
        <Card sx={{ height: '450px', width: '500px', textAlign: 'center' }}>
          <CardHeader title="비밀번호 변경" subheader="새 비밀번호를 입력해주세요." />
          <Divider />
          <CardContent>
            <Stack spacing={3} sx={{}}>
              <TextField
                fullWidth
                label="현재 비밀번호"
                name="password"
                onChange={(e) => setUserPassword(e.target.value)}
                type="password"
                value={userPassword}
              />
              <TextField
                fullWidth
                label="새 비밀번호"
                name="newPassword"
                onChange={(e) => setUserNewPassword(e.target.value)}
                type="password"
                value={userNewPassword}
              />
              <TextField
                fullWidth
                label="새 비밀번호 확인"
                name="newPasswordCheck"
                onChange={(e) => setUserNewPasswordCheck(e.target.value)}
                type="password"
                value={userNewPasswordCheck}
              />
            </Stack>
          </CardContent>
          <Divider />
          <CardActions sx={{ justifyContent: 'center', marginTop: '5%' }}>
            <Button variant="contained" onClick={passwordChangeHandler}>
              {' '}
              변경{' '}
            </Button>
            <Button variant="contained" color="error">
              <Link to="/mypage"> 취소 </Link>
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default MyPageModify;
