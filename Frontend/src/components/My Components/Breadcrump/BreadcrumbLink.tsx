import { HomeOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const BreadcrumbLink = () => {
  const location = useLocation();
  const temp = [...'Home', location.pathname.toString().split('/')];
  const [link, setLink] = useState(temp);
  useEffect(() => {
    setLink([...location.pathname.split('/')]);
  }, [location]);
  const item = link.map((x, i) => {
    if (i === 0) {
      return {
        title: (
          <Link to="/">
            <HomeOutlined />
          </Link>
        ),
      };
    } else {
      return { title: x };
    }
  });

  return <Breadcrumb style={{ marginLeft: '16px' }} items={item}></Breadcrumb>;
};
