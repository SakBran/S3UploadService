import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useActivateLink = () => {
  const location = useLocation();
  const [link, setLink] = useState('');
  useEffect(() => {
    const tempLinkArray = location.pathname.split('/');
    setLink('/' + tempLinkArray[1] + '/' + tempLinkArray[2]);
  }, [location]);

  return { link };
};

export default useActivateLink;
