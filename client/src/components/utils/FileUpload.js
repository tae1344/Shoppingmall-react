import React, { useState } from 'react';
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import axios from 'axios';

function FileUpload() {

  const [Images, setImages] = useState([]);

  const dropHandler = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }

    formData.append("file", files[0]);

    // 파일을 보낼때 formData와 헤더 정보를 전달해줘야 에러가 발생안함
    axios.post('/api/product/image', formData, config)
      .then(response => {
        if (response.data.success) {
          //console.log(response.data);

          // ...사용해 원래 있던 이미지 정보들으 다 넣어주고, 새로 추가한다.
          setImages([...Images, response.data.filePath])
        } else {
          alert("파일을 저장하는데 실패했습니다.");
        }
      });
  }

  const deleteHandler = (image) => {
    // 현재 이미지 인덱스 값
    const currentIndex = Images.indexOf(image);

    let newImages = [...Images];
    // splice 함수로 현재의 인덱스(첫번째 인자)에서부터 1개(2번째 인자)의 요소 제거
    newImages.splice(currentIndex, 1);

    setImages(newImages);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <Dropzone onDrop={dropHandler}>
        {({ getRootProps, getInputProps }) => (

          <div
            style={{
              width: 300, height: 300, border: '1px solid lightgray',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}
            {...getRootProps()}>
            <input {...getInputProps()} />
            <Icon type="plus" style={{ fontSize: '3rem' }} />
          </div>

        )}
      </Dropzone>

      <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>
        {Images.map((image, index) => (
          <div key={index} onClick={() => deleteHandler(image)}>
            <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:5000/${image}`} />
          </div>
        ))}
      </div>
    </div>

  )
}

export default FileUpload
