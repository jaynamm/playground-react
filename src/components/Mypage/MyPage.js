import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from '../Token/Interceptor';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Header from '../Base/Header';
import '../../styles/Mypage.css';
import Avvvatars from 'avvvatars-react';

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
  const [value, setValue] = React.useState(0);
  const [mypage, setMypage] = useState([]);
  const [followMyPage, setFollowMyPage] = useState([]);
  const [myPageFeedDtoList, setMyPageFeedDtoList] = useState([]);
  const [myPageCommentDtoList, setPageCommentDtoList] = useState([]);
  const [expanded, setExpanded] = React.useState(false);
  // const [skill, setSkill] = useState([]);
  // const [myPageQuestionDtoList, setMyPageQuestionDtoList] = useState([]);

  const navigate = useNavigate();

  const feedViewHandler = (id) => {
    navigate(`/feed/view/${id}`, {
      state: {
        id: id,
      },
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('kr-KO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/mypage',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res.data.data);

        setMypage(res.data.data.memberMyPageDto);
        setFollowMyPage(res.data.data.followMyPageDto);
        setMyPageFeedDtoList(res.data.data.myPageFeedDtoList.content);
        setPageCommentDtoList(res.data.data.myPageCommentDtoList.content);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChanges = (panelId) => (event, isExpanded) => {
    setExpanded(isExpanded ? panelId : null);
  };


  return (
    <div>
      <Header />
      <div>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginRight: '100px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {mypage && followMyPage && (
              <Card sx={{ width: 300, height: 450, minWidth: 275, marginTop: '80px', backgroundColor: '#EDF4FF' }}>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                    <Avvvatars value={mypage.userid} style="shape" size={100}/>
                  </Typography>
                  <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: '20px' }}>
                    {mypage.name}
                  </Typography>
                  <Typography sx={{ ml: 1,  mb: 1.5 }} color="text.secondary">
                    <pre>아이디    {mypage.userid}</pre>
                  </Typography>
                    <Typography sx={{ ml: 1, mb: 1.5 }} color="text.secondary">
                    <pre>이메일    {mypage.email}</pre>
                    </Typography>
                    <Typography sx={{ ml: 1, mb: 1.5 }} color="text.secondary">
                    <pre>닉네임    {mypage.nickname}</pre>
                    </Typography>
                    <Typography sx={{ ml: 1, mb: 1.5 }} color="text.secondary">
                    <pre>팔로잉    {followMyPage.followingCount}</pre>
                    </Typography>
                    <Typography sx={{ ml: 1, mb: 1.5 }} color="text.secondary">
                    <pre>팔로워    {followMyPage.followerCount}</pre>
                    </Typography>
                  
                  <Typography variant="body2">{mypage.myskill}</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                  <Button variant="contained">
                    <Link to="/mypage/modify">비밀번호 수정</Link>
                  </Button>
                </CardActions>
              </Card>
            )}

            {/* <Card sx={{ width: 260, height: 200, minWidth: 275, marginTop: '80px', backgroundColor: '#EDF4FF' }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: '10px' }}>
                  나의 스킬
                </Typography>
                <Typography variant="body2">{mypage.title}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained">
                  <Link to="/Mypage/MySkill">스킬 추가</Link>
                </Button>
              </CardActions>
            </Card> */}
            {/* 채용 추천하는 부분에서 스킬추가를 할 수 있어서 불필요하다 생각하여 주석처리 하였습니다.  */}
          </div>

          <Box sx={{ marginLeft: '80px' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{ display: 'flex', justifyContent: 'center', marginTop: '5%' }}
            >
              <Tab sx={{ width: '250px' }} label="내가 쓴 글" {...a11yProps(1)} />
              <Tab sx={{ width: '250px' }} label="내가 쓴 댓글" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0}>
              <div>
                <Box sx={{ justifyContent: 'center' }}>
                { myPageFeedDtoList !== null && myPageFeedDtoList.length > 0 ? (
                  myPageFeedDtoList.map((feed) => (
                    <div key={feed.id}>
                      <Accordion
                        expanded={expanded === feed.id}
                        onChange={handleChanges(feed.id)}
                        sx={{ marginBottom: '1%' }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel-${feed.id}-content`}
                          id={`panel-${feed.id}-header`}
                        >
                          <Typography sx={{ width: '33%', flexShrink: 0 }}>{feed.nickname}</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{formatDate(feed.createdDate)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <div className="py-3 flex gap-3 pr-6 justify-between">
                            <Typography>{feed.content}</Typography> {/* 요소의 내용을 출력 */}
                            <button className="flex items-center" style={{ fontSize: "15px"}} onClick={() => feedViewHandler(feed.id)}>
                              <p className="font-bold text-xs text-slate-500 text-center" style={{ color: "grey" }}>보러가기</p>
                            </button>
                          </div>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))
                ) : (
                  <Typography sx={{ textAlign: 'center' }}>피드를 작성해보세요 !</Typography>
                )}
                </Box>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div>
                <Box sx={{ justifyContent: 'center' }}>
                  { myPageCommentDtoList !== null && myPageCommentDtoList.length > 0 ? (
                    myPageCommentDtoList.map((content) => (
                    <div key={content.id}>
                      <Accordion
                        expanded={expanded === content.id}
                        onChange={handleChanges(content.id)}
                        sx={{ marginBottom: '1%' }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel-${content.id}-content`}
                          id={`panel-${content.id}-header`}
                        >
                          <Typography sx={{ width: '33%', flexShrink: 0 }}>{content.nickname}</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{formatDate(content.createdDate)}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{content.content}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  )) 
                  ) : (
                    <Typography sx={{ textAlign: 'center' }}>댓글을 작성해보세요 !</Typography>
                  )}
                </Box>
              </div>
            </TabPanel>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default MyPage;
