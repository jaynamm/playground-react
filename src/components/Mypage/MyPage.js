import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Footer from '../Base/Footer';
import Header from '../Base/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import '../../styles/Mypage.css';
import axios from 'axios';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.prototype = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyPage = () => {
  // const location = useLocation();
  // const member = location.state; // notice 가 mypage로 바뀜
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const [mypage, setMypage] = useState([]);
  const [myWriting, setMyWriting] = useState([]);
  const [folowMyPage, setFollowMyPage] = useState([]);
  // const [myPageFeedDtoList, setMyPageFeedDtoList] = useState([]);
  const [myPageFeedDtoList, setMyPageFeedDtoList] = useState([]);
  const [lists, setLists] = useState([]);

  const refreshToken = async () => {
    try {
      const response = await axios({
        method: 'POST',
        url: '/api/refresh-token',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('refreshToken'),
        },
      });
      const newAccessToken = response.data.accesstoken;
      localStorage.setItem('accessToken', newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  //refreshTokne을 다시 받습니다.
  useEffect(() => {
    axios({
      method: 'GET',
      url: 'api/mypage',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('accessToken'),
      },
    })
      .then((response) => {
        let myPageFeedDtoList = response.data;
        setMypage(response.data.memberDto);
      })
      .catch(async (error) => {
        if (error.response && error.response.status === 401) {
          try {
            const newAccessToken = await refreshToken();
            axios({
              method: 'GET',
              url: '/api/mypage',
              headers: {
                'Content-Type': 'application/json',
                Authorization: newAccessToken,
              },
            })
              .then((response) => {
                let myPageFeedDtoList = response.data;
                setMypage(response.data.memberDto);
              })
              .catch((error) => {
                console.log(error);
              });
          } catch (error) {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refresh-token');
            console.log(error);
            //refreshToken이 없으면 로그아웃
          }
        } else {
          console.log(error);
        }
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const myPageModifyHandler = () => {
  //   navigate('/mypage/modify', { state: member });
  // };

  return (
    <div>
      <Header />
      <div className="title">마이 페이지</div>
      <div className="container" id="profile">
        <div className="profile_image">
          <Avatar src="/broken-image.jpg" id="image" />
        </div>
        <div className="table profile_info">
          <table>
            <tr id="firstrow">
              <td> </td>
              <td id="modify_button">
                {/* <button type="submit" className="btn btn-primary" onClick={() => myPageModifyHandler()}>
                  수정
                </button> */}
              </td>
            </tr>
            <tr>
              {mypage && folowMyPage && (
                <div>
                  <p>이름 : {mypage.name} </p>
                  <p>이메일 : {mypage.email} </p>
                  <p>교육과정 : {mypage.curriculum} </p>
                  <p>가입날짜 : {mypage.createdDate} </p>
                  <p navigate="/mypage/following">팔로잉 : {folowMyPage.followingCount}</p>
                  <p>팔로워 : {folowMyPage.followerCount}</p>
                </div>
              )}
            </tr>
          </table>
        </div>
      </div>

      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '30px', marginBottom: '500px' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="프로필" {...a11yProps(0)} />
            <Tab label="내가 쓴 글" {...a11yProps(1)} />
            <Tab label="내가 쓴 댓글" {...a11yProps(2)} />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Button href="/Mypage/CheckSkill">스킬 추가</Button>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>
              {myPageFeedDtoList && (
                <div>
                  <p>제목 : {myPageFeedDtoList.title} </p>
                  <p>내용 : {myPageFeedDtoList.content} </p>
                  <p>작성일 : {myPageFeedDtoList.createdDate}</p>
                </div>
              )}
            </div>
          </TabPanel>
          <TabPanel value={value} index={2}>
            title
          </TabPanel>
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default MyPage;
