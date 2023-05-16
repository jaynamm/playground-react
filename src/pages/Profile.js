import React, { useState } from 'react'
import { Avatar } from '@mui/material';

const Profile = () => {
  const [imageFile, setImageFile] = useState({
      imageFile: "",
      viewUrl: ""
  });

  const [loaded, setLoaded] = useState(false);

  const onChangeUploadHandler = (e) => {
    const reader = new FileReader();

    if(e.target.files[0]) { // 업로드 할 때
      setLoaded(true);
      reader.readAsDataURL(e.target.files[0]);
    }
    
    reader.onload = () => {
      setImageFile({
        imageFile: e.target.files[0],
        viewUrl: reader.result
      });
      setLoaded(true);
    }
  }

  const onClickDeleteHandler = () => {
    console.log("사진 삭제 버튼 클릭");
    setImageFile({
        imageFile: "",
        viewUrl: ""
    });
};  // 삭제 버튼 클릭시 이미지 정보 초기화


  const data = [{
    "id": "asdf",
    "nickname": "asdf",
    "curricurum": "빅데이터"
  }];
    
  return (
    <div>
      <Avatar 
        src={imageFile}
        style={{margin: '10px'}}
        sizes='100'
        onClick={onChangeUploadHandler}
      />

      <button type='button' onClick={onClickDeleteHandler}>프로필 삭제</button>

      {data.map((member) => (
        <form>
          <label>아이디</label>
          <input type='text' value={member.id} readOnly />

          <label>닉네임</label>
          <input type='text' value={member.nickname} />

          <label>커리큘럼</label>
          <input type='text' value={member.curricurum} />
        </form>
      ))}
      
    </div>
  )
}
export default Profile;

