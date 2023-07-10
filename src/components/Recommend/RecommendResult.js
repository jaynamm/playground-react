import React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Header from '../Base/Header';
import Footer from '../Base/Footer';


export const RecommendResult = () => {
  const location = useLocation();
  const result = location.state;

  console.log(result);
  
  return (
    <>
      <Header />
      <div  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', placeContent: 'center', alignItems: 'center' }}>
      
      <br></br>

      <Typography variant="h4" align="center" gutterBottom> 추천받은 채용 공고를 확인해보세요 </Typography>

      <br></br>
      {result ? (
        <Button href="/recommend" variant="contained" color="success" className="btn btn-primary">다시 추천 받기</Button>
      ) : (
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" placeContent="center" padding={10}>
            <Typography variant="h6" component="div">다시 채용추천 페이지로 이동해주세요 :)</Typography>  
            <br />
            <Button href="/recommend" variant="contained" color="success" className="btn btn-primary">돌아가기</Button>      
        </Box>
      )}

      <br></br>

      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" placeContent="center" marginBottom={10}>
        {result ? (
          Object.values(result).map((jobDescription, index) => (
            <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }} style={{ margin: 1 }}>
              <Button href={jobDescription.url} target="_blank" rel="noopener noreferrer" sx={{ ":hover": { 'backgroundColor': '#3dbbb0' } }}>
                <Card sx={{ minWidth: 800 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">{jobDescription.title}</Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">{jobDescription.company}</Typography>
                    <Typography variant="body2" color="text.secondary">{jobDescription.location}</Typography>
                  </CardContent>
                </Card>
              </Button>
            </Grid>
          ))
        ) : (
          <></>
        )}
      </Box>

      </div>
      <Footer />
    </>
  )
}

export default RecommendResult;