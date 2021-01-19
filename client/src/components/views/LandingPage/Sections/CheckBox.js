import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {
  const [Checked, setChecked] = useState([]);


  const handleToggle = (value) => {
    // 누른 것의 index를 구하고, 전체 선택된 state에서
    // 현재 누른 체크박스가 이미 있다면 빼주고
    // 없다면 state 넣어준다.

    const currentIndex = Checked.indexOf(value); // indexOf()은 없는 값은 인덱스 -1이 나옴
    const newChecked = [...Checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1); // 현재 인덱스 값 1개 지움
    }

    setChecked(newChecked);
    props.handleFilters(newChecked); // 부모 컴포넌트에 state 전달

  }

  const renderCheckBoxList = () => props.list && props.list.map((value, index) => (
    <React.Fragment key={index}>
      <Checkbox
        onChange={() => handleToggle(value._id)}
        checked={Checked.indexOf(value._id) === -1 ? false : true} />{/*체크 된 아이템에는 무조건 checked 설정을 해줘야한다 */}
      <span>{value.name}</span>

    </React.Fragment>
  ))

  return (
    <div>
      <Collapse defaultActiveKey={['1']}>
        <Panel header="This is panel header 1" key="1">
          {renderCheckBoxList()}

        </Panel>
      </Collapse>
    </div>
  )
}

export default CheckBox
