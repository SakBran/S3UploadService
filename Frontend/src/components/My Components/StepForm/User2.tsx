import { Form, Select } from 'antd';
import BasicStepForm from './BasicStepForm';

type UserStepProps = {
  current: number;
  setCurrent: (current: number) => void;
  finalStep?: boolean;
};
const UserStep2: React.FC<UserStepProps> = ({
  current,
  setCurrent,
  finalStep,
}) => {
  return (
    <BasicStepForm
      current={current}
      setCurrent={setCurrent}
      APIURL={'User'}
      finalStep={finalStep}
    >
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

export default UserStep2;
