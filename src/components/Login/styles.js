export const styles = `
  * {
    user-select: none;
    -ms-user-select: none;
    outline: 0;
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
  
  html {
    width: 100%;
    height: 100%;
  }
  
  body {
    width: 100%;
    height: 100%;
    /* overflow: hidden; */
    background-color: #ffffff;
  }
  
  canvas {
    width: 100%;
    height: 100%;
  }
`;
//로그인 화면에서 위 아래 스크롤이 되지 않도록 설정한 것입니다. 