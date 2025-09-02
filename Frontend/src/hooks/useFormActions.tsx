import { useCallback, useState } from 'react';
import {
  Post,
  Put,
  Delete,
  ToggleUserActive,
} from '../services/BasicHttpServices';
import { message, Modal } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnyObject } from '../types/AnyObject';

const useFormActions = (
  id: string,
  action: string,
  APIURL: string,
  result?: Record<string, AnyObject>,
  setApplicationNo?: (value: string) => void
) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [writeLoading, setWriteLoading] = useState(false);
  const success = () => {
    Modal.success({
      title: 'Success',
      content: 'Operation is successful...',
    });
  };

  const error = () => {
    Modal.error({
      title: 'Error',
      content: 'Something went wrong...',
    });
  };

  const onFinish = useCallback(
    (values: unknown) => {
      setWriteLoading(true);
      if (action === 'New') {
        const action = async () => {
          try {
            await Post(APIURL, values);
            setWriteLoading(false);
            success();
          } catch (ex) {
            setWriteLoading(false);
            error();
          }
        };
        action();
      } else if (action === 'Edit') {
        const action = async () => {
          try {
            await Put(APIURL, id, values);
            setWriteLoading(false);
            success();
          } catch (ex) {
            setWriteLoading(false);
            error();
          }
        };
        action();
      } else if (action === 'Delete') {
        const action = async () => {
          Modal.confirm({
            title: 'Are you sure?',
            content:
              'Do you really want to delete this record? This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger', // Make the OK button red for destructive action
            cancelText: 'No, Cancel',
            onOk: async () => {
              // This function will be called if the user clicks "Yes, Delete"
              setWriteLoading(true); // Set loading state before API call
              try {
                await Delete(APIURL, id);
                setWriteLoading(false);
                message.success('Record deleted successfully!'); // Use Ant Design's message for success
                window.history.back();
              } catch (ex) {
                setWriteLoading(false);
                message.error('Failed to delete record. Please try again.'); // Use Ant Design's message for error
                // Optionally, you can log the error for debugging: console.error(ex);
              }
            },
            onCancel() {
              // This function will be called if the user clicks "No, Cancel" or closes the modal
              setWriteLoading(false);
              console.log('Deletion cancelled');
            },
          });
        };
        action();
      } else if (action === 'ToggleActive') {
        const action = async () => {
          try {
            await ToggleUserActive(APIURL, id);
            setWriteLoading(false);
            success();
            window.history.back();
          } catch (ex) {
            setWriteLoading(false);
            error();
          }
        };
        action();
      } else if (action === 'Detail') {
        setWriteLoading(false);
      }
    },
    [APIURL, action, id]
  );

  const onFinishStepper = useCallback(
    (values: unknown) => {
      setWriteLoading(true);
      if (action === 'New') {
        const action = async () => {
          try {
            const response = await Post(APIURL, values);
            console.log(response);
            const { id, applicationNo } = response; // Assuming the response contains the new record's ID
            if (applicationNo && applicationNo !== '') {
              setApplicationNo &&
                setApplicationNo('TEST IN USE FORM ACTION 654321');
            } else {
              //Just for Testing
              setApplicationNo &&
                setApplicationNo('TEST IN USE FORM ACTION 123456');
            }
            navigate(
              `${location.pathname.replace('New', 'Edit')}/${id}` // Navigate to the new record's detail page
            );
            setWriteLoading(false);
            success();
          } catch (ex) {
            setWriteLoading(false);
            error();
            console.error(ex); // Log the error for debugging
          }
        };
        action();
      } else if (action === 'Edit') {
        const action = async () => {
          try {
            if (result !== undefined && result !== null) {
              const updatedValues: Record<string, AnyObject> = { ...result };
              if (values) {
                for (const key in values) {
                  if (key in result) {
                    updatedValues[key] = (values as Record<string, AnyObject>)[
                      key
                    ];
                  }
                }
              }

              await Put(APIURL, id, updatedValues);
            } else {
              await Put(APIURL, id, values);
            }

            setWriteLoading(false);
          } catch (ex) {
            console.error('Error during action:', ex);
            setWriteLoading(false);
            error();
          }
        };

        action();
      } else if (action === 'Detail') {
        setWriteLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [APIURL, action, id]
  );
  return { onFinish, writeLoading, onFinishStepper };
};
export default useFormActions;
