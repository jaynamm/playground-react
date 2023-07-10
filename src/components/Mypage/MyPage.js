import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [folowMyPage, setFollowMyPage] = useState([]);
  const [myPageFeedDtoList, setMyPageFeedDtoList] = useState([]);
  const [myPageQuestionDtoList, setMyPageQuestionDtoList] = useState([]);
  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    axios({
      method: 'GET',
      url: '/api/mypage',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setMypage(response.data.memberMyPageDto);
        setFollowMyPage(response.data.followMyPageDto);
        setMyPageFeedDtoList(response.data.myPageFeedDtoList);
        setMyPageQuestionDtoList(response.data.myPageQuestionDtoList);
        console.log(response.data.myPageQuestionDtoList);
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
            {mypage && folowMyPage && (
              <Card sx={{ width: 260, height: 300, minWidth: 275, marginTop: '80px', backgroundColor: '#EDF4FF' }}>
                <CardContent>
                  <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: '10px' }}>
                    {mypage.name}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    이메일 : {mypage.email}
                    <br />
                    팔로잉 : {folowMyPage.followingCount}
                    <br />
                    팔로워 : {folowMyPage.followerCount}
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
            <Card sx={{ width: 260, height: 200, minWidth: 275, marginTop: '80px', backgroundColor: '#EDF4FF' }}>
              <CardContent>
                <Typography variant="h5" component="div" sx={{ textAlign: 'center', marginBottom: '10px' }}>
                  나의 스킬
                </Typography>
                <Typography variant="body2">{mypage.myskill}</Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button variant="contained">
                  <Link to="/Mypage/MySkill">스킬 추가</Link>
                </Button>
              </CardActions>
            </Card>
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
                  {myPageFeedDtoList.map((feed) => (
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
                          <Typography sx={{ color: 'text.secondary' }}>{feed.createdDate}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{feed.content}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
                </Box>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <div>
                <Box sx={{ justifyContent: 'center' }}>
                  {myPageQuestionDtoList.map((question) => (
                    <div key={question.id}>
                      <Accordion
                        expanded={expanded === question.id}
                        onChange={handleChanges(question.id)}
                        sx={{ marginBottom: '1%' }}
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls={`panel-${question.id}-content`}
                          id={`panel-${question.id}-header`}
                        >
                          <Typography sx={{ width: '33%', flexShrink: 0 }}>{question.title}</Typography>
                          <Typography sx={{ color: 'text.secondary' }}>{question.createdDate}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>{question.content}</Typography>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
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
