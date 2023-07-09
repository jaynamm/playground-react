import React, { useState } from 'react'
import Header from '../Base/Header';
import Footer from '../Base/Footer';
// import axios from 'axios';
import axios from '../Token/Interceptor';

import jobNameList from '../Data/Job';
import jobSkillList from '../Data/Skill';
import jobLocationList from '../Data/Location';
import { Autocomplete, Button, Grid, IconButton, List, ListItem, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RecommendView from './RecommendView';



const Recommend = () => {
  const [jobName, setJobName] = useState("");
  const [jobLocaction, setJobLocation] = useState("");
  const [jobSkill, setJobSkill] = useState("");
  const [jobSkillSet, setJobSkillSet] = useState([]);
  const [jobGrade, setJobGrade] = useState("");
  const jobGradeList = ["초급", "중급", "고급"]

  const addSkillHandler = () => {
    if (jobSkill === "" || jobGrade === "") {
      window.alert("스킬 또는 등급을 입력해주세요.");
      return;
    }

    if (jobSkillSet.some(item => item.includes(jobSkill))) {
      window.alert("이미 등록한 기술/스택 입니다.");
      return;
    }

    const newSkill = jobSkill + "-" + jobGrade;

    if (newSkill.trim() !== '') {
      setJobSkillSet([...jobSkillSet, newSkill]);
      setJobSkill("");
      setJobGrade("");
    }
  };

  const removeSkillHandler = (index) => {
    const updatedSkills = jobSkillSet.filter((_, i) => i !== index);
    setJobSkillSet(updatedSkills);
  };

  // // 채용 공고 찾기 버튼 누를 때 실행
  const recommendedDataHandler = () => {

    if (jobSkillSet.length < 3) {
      window.alert("기술/스택을 최소 3개 이상 선택해주세요.")
      return;
    } else if (jobSkillSet.length > 20) {
      window.alert("선택 가능한 기술/스택의 수가 초과하였습니다. (최대 20개)")
      return;
    }

    const skillSetDict = jobSkillSet.reduce((dict, item) => {
      let gradePoint = 0;

      if (item.split('-')[1] === "초급") {
        gradePoint = 1;
      } else if (item.split('-')[1] === "중급") {
        gradePoint = 2;
      } else if (item.split('-')[1] === "고급") {
        gradePoint = 3;
      }

      dict[item.split('-')[0]] = gradePoint;

      return dict;
    }, {});

    const inputData = {
      "job_name": jobName,
      "location": jobLocaction,
      "skils": skillSetDict
    };

    console.log(inputData);

    axios.post('/api/recommend/list', inputData, 
      { 
        headers: { 
          'Content-Type': 'application/json' 
        } 
      }
    )
    .then((res) => {
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  };

  return (
      <>
        <Header />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', placeContent: 'center', alignItems: 'center', padding: 50, marginBottom: 200 }}>
          <div className='fs-1 fw-bold'>채용 사이트 추천</div>

          <br></br>

          <br></br>

          <div className='fw-bold'>직무 / 지역 선택</div>

          <br></br>

          <p>원하는 직무와 지역 그리고 기술/스택을 선택해보세요!</p>

          <br></br>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', placeContent: 'center', alignItems: 'center' }}>
            <Autocomplete
              value={jobName}
              onChange={(event, value) => {
                setJobName(value);
              }}
              id="controllable-states-demo"
              options={jobNameList.map((option) => option.title)}
              sx={{ width: 300, margin: 1 }}
              renderInput={(params) => <TextField {...params} label="직무" />}
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
          
          <div className='fw-bold'>기술 / 스택 선택</div>
          
          <br></br>
          
          <div className='fw-bold'>기술 / 스택 과 등급을 선택해주세요.</div>

          <br></br>

          <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', placeContent: 'center', alignItems: 'center' }}>
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
          <Button variant="outlined" color="secondary" className="btn btn-warning" onClick={addSkillHandler}>기술/스택 추가</Button>

          <br></br>
          
          <div>기술/스택 목록 (최대 20개)</div>

          <br></br>

          <div style={{width: '60%'}}>
            <List style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', placeContent: 'center', alignItems: 'center' }}>
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
              {jobSkillSet.map((item, index) => (
                <ListItem key={index} style={{ width: 'fit-content' }}>
                  {item}
                  <IconButton aria-label="delete" size='small' color="error" 
                    onClick={() => removeSkillHandler(index)}>
                      <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </ListItem>
              ))}
            </Grid>
            </List>
          </div>
          
          

          <br></br>

          <Button variant="contained" color="success" className="btn btn-primary" onClick={recommendedDataHandler}>채용 공고 추천 받기</Button>

          <RecommendView />
        </div>
        <Footer />
      </>
  )
}

export default Recommend;