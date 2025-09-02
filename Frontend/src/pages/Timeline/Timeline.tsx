import React from 'react';
import {
  CarOutlined,
  CheckCircleOutlined,
  CheckSquareTwoTone,
  DockerOutlined,
  RocketOutlined,
} from '@ant-design/icons';
import { Timeline, Typography } from 'antd';

const TimelinePage: React.FC = () => (
  <Timeline
    mode="alternate"
    items={[
      {
        children: 'Start',
      },
      {
        children: (
          <>
            Location: ရန်ကုန်လေဆိပ် <br /> Time: ၁နာရီ
          </>
        ),
        color: 'green',
      },
      {
        dot: <RocketOutlined style={{ fontSize: '16px' }} />,
        children: <Typography.Text code>လေကြောင်း</Typography.Text>,
      },
      {
        children: 'နေပြည်တော်လေဆိပ်',
        color: 'green',
      },
      {
        dot: <CarOutlined style={{ fontSize: '16px' }} />,
        children: <Typography.Text code>မြေလမ်း</Typography.Text>,
      },
      {
        children: (
          <>
            နေပြည်တော် ကားကြီးဝင်း{'    '} <CheckSquareTwoTone />
          </>
        ),
        color: 'green',
      },
      {
        dot: <DockerOutlined style={{ fontSize: '16px' }} />,
        children: <Typography.Text code>ရေကြောင်း</Typography.Text>,
      },
      {
        children: 'Solve initial network problems 2015-09-01',
        color: 'red',
      },
      {
        color: 'red',
        children: 'Network problems being solved 2015-09-01',
      },
      {
        children: 'Create a services site 2015-09-01',
        color: 'red',
      },
      {
        dot: <CheckCircleOutlined style={{ fontSize: '16px' }} />,
        children: 'End',
      },
    ]}
  />
);

export default TimelinePage;
