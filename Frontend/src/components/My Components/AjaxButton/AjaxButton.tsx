import { LoadingOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';

type Props = {
  writeLoading: boolean;
  action: string;
};
export const AjaxButton = ({ writeLoading, action }: Props) => {
  const BtnTemplate = () =>
    action === 'Detail' ? (
      ''
    ) : (
      <>
        <Button type="primary" htmlType="submit">
          {writeLoading ? (
            <Spin
              tip="Loading"
              size="small"
              spinning={writeLoading}
              indicator={<LoadingOutlined style={{ color: 'white' }} spin />}
            ></Spin>
          ) : (
            action
          )}
        </Button>{' '}
      </>
    );
  return (
    <>
      <BtnTemplate />
      <Button onClick={() => window.history.back()}>Back</Button>
    </>
  );
};
