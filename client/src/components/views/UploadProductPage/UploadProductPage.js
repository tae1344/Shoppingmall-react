import React, { useState } from 'react';
import { Typography, Button, Form, Input } from 'antd';
import FileUpload from '../../utils/FileUpload';


const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Austraila" },
  { key: 7, value: "Antarctica" },
];

function UploadProductPage() {
  const [TitleProduct, setTitleProduct] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState(0);
  const [Continent, setContinent] = useState(1);
  const [Images, setImages] = useState([]);


  const titleChangeHandler = (event) => {
    setTitleProduct(event.currentTarget.value);
  }

  const descriptionChangeHandler = (event) => {
    setDescription(event.currentTarget.value);
  }

  const priceChangeHandler = (event) => {
    setPrice(event.currentTarget.value);
  }

  const ContinentChangeHandler = (event) => {
    setContinent(event.currentTarget.value);
  }

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>여행 상품 업로드</Title>
      </div>
      <Form>

        <FileUpload />

        <br />
        <br />
        <label>이름</label>
        <Input value={TitleProduct} onChange={titleChangeHandler} />
        <br />
        <br />
        <label>설명</label>
        <TextArea onChange={descriptionChangeHandler} value={Description} />
        <br />
        <br />
        <label>가격($)</label>
        <Input type="number" onChange={priceChangeHandler} value={Price} />
        <br />
        <br />
        <select onChange={ContinentChangeHandler} value={Continent}>
          {Continents.map(item => (
            <option key={item.key} value={item.key}>{item.value}</option>
          ))}

        </select>
        <br />
        <br />
        <Button>
          확인
        </Button>
      </Form>
    </div>
  )
}

export default UploadProductPage