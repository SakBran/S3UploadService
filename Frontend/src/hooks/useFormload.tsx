import { FormInstance } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { GetSingle } from '../services/BasicHttpServices';
import { AnyObject } from '../types/AnyObject';

const useFormLoad = (
  id: string,
  action: string,
  url: string,
  setApplicationNo?: (value: string) => void
) => {
  const [loading, setLoading] = useState(true);
  const formRef = React.useRef<FormInstance>(null);
  const result = React.useMemo<AnyObject>(() => ({}), []);
  const onLoad = useCallback(() => {
    if (action !== 'New') {
      if (id) {
        const asycMethod = async () => {
          const resp = JSON.parse(
            JSON.stringify(await GetSingle(url + '/' + id))
          );
          const { applicationNo } = resp;
          if (setApplicationNo && applicationNo) {
            setApplicationNo(applicationNo);
          } else {
            setApplicationNo && setApplicationNo('TEST IN USE FORM LOAD');
          }
          formRef.current?.setFieldsValue(resp);
          Object.assign(result, resp);
          setLoading(false);
        };
        asycMethod();
      }
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [action, id, result, url]);
  useEffect(() => onLoad(), [onLoad]);
  return { formRef, loading, setLoading, result };
};
export default useFormLoad;
