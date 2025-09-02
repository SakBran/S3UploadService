import { Form, FormProps } from 'antd';
import useFormActions from '../../../hooks/useFormActions';
import useFormhelper from '../../../hooks/useFormhelper';
import useFormLoad from '../../../hooks/useFormload';
import { AnyObject } from '../../../types/AnyObject';
import BasicForm from '../Form/BasicForm';
import { AjaxStepButton } from '../AjaxButton/AjaxStepButton';
import { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useStepContext } from './StepContext';

interface BasicStepFormProps extends Omit<FormProps, 'children'> {
  children: React.ReactNode;
  current: number;
  setCurrent: (current: number) => void;
  APIURL: string;
  finalStep?: boolean;
}
const BasicStepForm: React.FC<BasicStepFormProps> = ({
  children,
  current,
  setCurrent,
  APIURL,
  finalStep = false,
}) => {
  const stepContext = useStepContext();
  const { readOnly, id, action } = useFormhelper();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const { formRef, loading, result } = useFormLoad(
    id,
    action,
    APIURL,
    stepContext.setApplicationNo
  );
  const [state, setState] = useState<AnyObject>();

  useEffect(() => {
    if (JSON.stringify(result) !== JSON.stringify(state)) {
      setState(result);
      console.log(state);
    }
  }, [result, state]);

  const { onFinishStepper, writeLoading } = useFormActions(
    id,
    action,
    APIURL,
    state && state,
    stepContext.setApplicationNo
  );

  const OnStepFinish = (value: AnyObject) => {
    onFinishStepper(value);
    if (action !== 'New') {
      setCurrent(current + 1);
    }
  };

  return (
    <BasicForm
      formRef={formRef}
      onFinish={OnStepFinish}
      readOnly={loading ? loading : writeLoading ? writeLoading : readOnly}
      loading={loading}
      noStyle={true}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 8,
          padding: isMobile ? '1rem' : '2rem',
          paddingBottom: 0,
        }}
      >
        {children}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end',
          marginBottom: 0,
        }}
      >
        <Form.Item>
          <AjaxStepButton
            current={current}
            setCurrent={setCurrent}
            writeLoading={writeLoading}
            action={action}
            finalStep={finalStep}
          />
        </Form.Item>
      </div>
    </BasicForm>
  );
};

export default BasicStepForm;
