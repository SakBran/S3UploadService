import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useFormhelper = () => {
  const location = useLocation();
  const [readOnly, setReadOnly] = useState(false);
  const [action, setAction] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const route = location.pathname.toString().split('/');
    setAction(route[2]);
    const id = action !== 'New' ? route[3] ?? toString() : '';
    setId(id);
    const isReadOnly = ['Detail', 'Delete'].includes(action);
    setReadOnly(isReadOnly);
  }, [action, location]);

  return { readOnly, id, action };
};

export default useFormhelper;
