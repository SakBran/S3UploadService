import { Form, Input, Select } from 'antd';
import Password from 'antd/es/input/Password';
import BasicStepForm from './BasicStepForm';

type UserStepProps = {
  current: number;
  setCurrent: (current: number) => void;
};
const UserStep: React.FC<UserStepProps> = ({ current, setCurrent }) => {
  return (
    <BasicStepForm current={current} setCurrent={setCurrent} APIURL={'User'}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter the name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please enter the password!' }]}
      >
        <Password />
      </Form.Item>

      <Form.Item
        label="Permission"
        name="permission"
        rules={[{ required: true, message: 'Please enter the permission!' }]}
      >
        <Select
          options={[
            { value: 'Admin', label: 'Admin' },
            { value: 'Check User', label: 'Check User' },
            { value: 'Approve User', label: 'Approve User' },
            { value: 'Report User', label: 'Report User' },
            { value: 'Special User', label: 'Special User' },
            { value: 'Docareport User', label: 'Docareport User' },
            { value: 'Egovreport User', label: 'Egovreport User' },
            { value: 'Accountreport User', label: 'Accountreport User' },
          ]}
        />
      </Form.Item>

      <Form.Item label="IsActive" name="isActive" rules={[]}>
        <Select
          options={[
            { value: 'True', label: 'Active' },
            { value: 'False', label: 'InActive' },
            // { value: null, label: 'N/A' },
          ]}
        />
      </Form.Item>
    </BasicStepForm>
  );
};

export default UserStep;
