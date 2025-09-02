import React, { useEffect, useState } from 'react';
import { Steps, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive';
import UserStep from './User';
import UserStep2 from './User2';
import { useStepContext } from './StepContext';

const StepFom: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [current, setCurrent] = useState(0);
  const steps = [
    {
      title: 'First',
      content: <UserStep current={current} setCurrent={setCurrent}></UserStep>,
    },
    {
      title: 'Second',
      content: (
        <UserStep2 current={current} setCurrent={setCurrent}></UserStep2>
      ),
    },
    {
      title: 'Last',
      content: (
        <UserStep2
          current={current}
          setCurrent={setCurrent}
          finalStep={true}
        ></UserStep2>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const stepContext = useStepContext();
  useEffect(() => {
    console.log(stepContext.applicationNo);
  }, [stepContext.applicationNo]);
  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <Typography.Text code>
          Application No : {stepContext.applicationNo}
        </Typography.Text>
      </div>
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 8,
          padding: isMobile ? '1rem' : '2rem',
          paddingBottom: 0,
        }}
      >
        <Steps current={current} items={items} responsive />
        {steps[current].content}
      </div>
    </>
  );
};

export default StepFom;
