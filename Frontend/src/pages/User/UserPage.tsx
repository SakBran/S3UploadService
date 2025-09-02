import { Form, Input, Select } from 'antd';
import Password from 'antd/es/input/Password';
import { AjaxButton } from '../../components/My Components/AjaxButton/AjaxButton';
import useFormActions from '../../hooks/useFormActions';
import useFormhelper from '../../hooks/useFormhelper';
import useFormLoad from '../../hooks/useFormload';
import { PageHeader } from '../../components';
import BasicForm from '../../components/My Components/Form/BasicForm';

const APIURL = 'User';

const UserPage = () => {
  const { readOnly, id, action } = useFormhelper();
  const { formRef, loading } = useFormLoad(id, action, APIURL);
  const { onFinish, writeLoading } = useFormActions(id, action, APIURL);

  return (
    <>
      <PageHeader title="User Form" />
      <BasicForm
        formRef={formRef}
        onFinish={onFinish}
        readOnly={loading ? loading : writeLoading ? writeLoading : readOnly}
        loading={loading}
      >
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
            disabled={true}
            options={[
              { value: 'True', label: 'Active' },
              { value: 'False', label: 'InActive' },
              // { value: null, label: 'N/A' },
            ]}
          />
        </Form.Item>

        <Form.Item>
          <AjaxButton writeLoading={writeLoading} action={action} />
        </Form.Item>
      </BasicForm>
    </>
  );
};

export default UserPage;
