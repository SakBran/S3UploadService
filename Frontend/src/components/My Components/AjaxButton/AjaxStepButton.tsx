import { LoadingOutlined } from '@ant-design/icons';
import { Button, Spin } from 'antd';

type Props = {
  writeLoading: boolean;
  action: string;
  current: number;
  setCurrent: (current: number) => void;
  finalStep?: boolean;
};
export const AjaxStepButton = ({
  writeLoading,
  action,
  current,
  setCurrent,
  finalStep = false,
}: Props) => {
  const BtnTemplate = () =>
    action === 'Detail' ? (
      ''
    ) : (
      <>
        {!finalStep && (
          <>
            <Button type="primary" htmlType="submit">
              {writeLoading ? (
                <Spin
                  // Removed tip="Loading" as it's not applicable here
                  size="small"
                  spinning={writeLoading}
                  indicator={
                    <LoadingOutlined style={{ color: 'white' }} spin />
                  }
                ></Spin>
              ) : action !== 'New' ? (
                'Next'
              ) : (
                'Save'
              )}
            </Button>{' '}
          </>
        )}
      </>
    );
  return (
    <>
      <BtnTemplate />
      {current !== 0 && (
        <Button onClick={() => setCurrent(current - 1)}>Previous</Button>
      )}
    </>
  );
};
