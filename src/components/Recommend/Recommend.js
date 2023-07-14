import React, { useState } from 'react';
import Header from '../Base/Header';
import Footer from '../Base/Footer';
import axios from '../Token/Interceptor';

import jobNameList from '../Data/Job';
import jobSkillList from '../Data/Skill';
import jobLocationList from '../Data/Location';
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  TextField,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate } from 'react-router-dom';

const Recommend = () => {
  const navigate = useNavigate();

  const [jobName, setJobName] = useState('');
  const [jobLocaction, setJobLocation] = useState('');
  const [jobSkill, setJobSkill] = useState('');
  const [jobSkillSet, setJobSkillSet] = useState([]);
  const [jobGrade, setJobGrade] = useState('');
  const jobGradeList = ['초급', '중급', '고급'];

  const [isLoading, setIsLoading] = useState(false);

  const addSkillHandler = () => {
    if (jobSkill === '' || jobGrade === '') {
      window.alert('스킬 또는 등급을 입력해주세요.');
      return;
    }

    if (jobSkillSet.some((item) => item.includes(jobSkill))) {
      window.alert('이미 등록한 기술/스택 입니다.');
      return;
    }

    const newSkill = jobSkill + '-' + jobGrade;

    if (newSkill.trim() !== '') {
      setJobSkillSet([...jobSkillSet, newSkill]);
      setJobSkill('');
      setJobGrade('');
    }
  };

  const removeSkillHandler = (index) => {
    const updatedSkills = jobSkillSet.filter((_, i) => i !== index);
    setJobSkillSet(updatedSkills);
  };

  // // 채용 공고 찾기 버튼 누를 때 실행
  const recommendedDataHandler = () => {
    if (jobSkillSet.length < 3) {
      window.alert('기술/스택을 최소 3개 이상 선택해주세요.');
      return;
    } else if (jobSkillSet.length > 20) {
      window.alert('선택 가능한 기술/스택의 수가 초과하였습니다. (최대 20개)');
      return;
    }

    setIsLoading(true);

    const skillSetDict = jobSkillSet.reduce((dict, item) => {
      let gradePoint = 0;

      if (item.split('-')[1] === '초급') {
        gradePoint = 1;
      } else if (item.split('-')[1] === '중급') {
        gradePoint = 2;
      } else if (item.split('-')[1] === '고급') {
        gradePoint = 3;
      }

      dict[item.split('-')[0]] = gradePoint;

      return dict;
    }, {});

    const inputData = {
      jobName: jobName,
      jobLocation: jobLocaction,
      jobSkills: skillSetDict,
    };

    console.log(inputData);

    axios
      .post(
        '/api/recommend/list',
        { inputData: inputData },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(res.data.data);

        const result = JSON.parse(res.data.data);

        navigate('/recommend/result', { state: result });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          placeContent: 'center',
          alignItems: 'center',
          padding: 50,
          marginBottom: 200,
        }}
      >
        <div className="fs-1 fw-bold">채용 공고 추천</div>

        <br></br>
        <p>내가 가진 실력으로 어떤 기업에 지원할 수 있을까요?</p>

        <br></br>

        <div className="fw-bold">직무 / 지역 선택 (선택사항)</div>

        <br></br>

        <p>원하는 직무와 지역 그리고 기술/스택을 선택해보세요! </p>

        <br></br>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            placeContent: 'center',
            alignItems: 'center',
          }}
        >
          <Autocomplete
            value={jobName}
            onChange={(event, value) => {
              setJobName(value);
            }}
            id="controllable-states-demo"
            options={jobNameList.map((option) => option.title)}
            sx={{ width: 300, margin: 1 }}
            renderInput={(params) => <TextField {...params} label="직무" placeholder="직무" />}
          />

          <Autocomplete
            value={jobLocaction}
            onChange={(event, value) => {
              setJobLocation(value);
            }}
            id="controllable-states-demo"
            options={jobLocationList.map((option) => option.title)}
            sx={{ width: 300, margin: 1 }}
            renderInput={(params) => <TextField {...params} label="지역" />}
          />
        </div>

        <br></br>

        <div className="fw-bold">
          기술 / 스택 선택 <span style={{ color: 'red' }}>(필수사항)</span>
        </div>

        <br></br>

        <div>기술 / 스택 과 등급을 선택해주세요. (최소 3개 이상)</div>

        <br></br>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            placeContent: 'center',
            alignItems: 'center',
          }}
        >
          <Autocomplete
            value={jobSkill}
            onChange={(event, value) => {
              setJobSkill(value);
            }}
            id="controllable-states-demo"
            options={jobSkillList.map((option) => option.title)}
            sx={{ width: 300, margin: 1 }}
            renderInput={(params) => <TextField {...params} label="기술 / 스택" />}
          />

          <Autocomplete
            value={jobGrade}
            onChange={(event, value) => {
              setJobGrade(value);
            }}
            id="controllable-states-demo"
            options={jobGradeList}
            sx={{ width: 300, margin: 1 }}
            renderInput={(params) => <TextField {...params} label="등급" />}
          />
        </div>
        <Button variant="outlined" color="secondary" onClick={addSkillHandler}>
          기술/스택 추가
        </Button>

        <br></br>

        <div className="fw-bold">기술/스택 목록 (최대 20개)</div>

        <br></br>

        <div style={{ width: '80%' }}>
          <List
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              placeContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
              {jobSkillSet.map((item, index) => (
                <ListItem key={index} sx={{ width: 'fit-content', placeItems: 'center' }}>
                  <Box component="span" sx={{ p: 1, paddingLeft: 2, borderRadius: 8, backgroundColor: '#3dbbb0' }}>
                    {item}
                    <IconButton
                      aria-label="delete"
                      size="small"
                      color="error"
                      sx={{ ':hover': { backgroundColor: 'transparent' } }}
                      onClick={() => removeSkillHandler(index)}
                    >
                      <CancelIcon fontSize="small" color="action" sx={{ paddingBottom: 0.2 }}></CancelIcon>
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </Grid>
          </List>
        </div>

        <br></br>

        <Button variant="contained" color="success" className="btn btn-primary" onClick={recommendedDataHandler}>
          채용 공고 추천
        </Button>

        {isLoading && (
          <Dialog
            open={isLoading}
            onClose={() => {}}
            aria-labelledby="loading-dialog-title"
            disableBackdropClick
            disableEscapeKeyDown
          >
            <DialogTitle id="loading-dialog-title">채용 공고 추천중</DialogTitle>
            <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress color="secondary" />
            </DialogContent>
          </Dialog>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Recommend;
