import React, { useEffect, useState } from 'react';
import { Breadcrumb, BreadcrumbProps, Space, Tooltip, Typography } from 'antd';

import './styles.css';
import { HomeOutlined } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
  breadcrumbs?: BreadcrumbProps['items'];
} & React.HTMLAttributes<HTMLDivElement>;

export const PageHeader = ({ breadcrumbs, title, ...others }: Props) => {
  const location = useLocation();
  const temp = [...'Home', location.pathname.toString().split('/')];
  const [link, setLink] = useState(temp);
  useEffect(() => {
    setLink([...location.pathname.split('/')]);
  }, [location]);
  const item = link.map((x, i) => {
    if (i === 0) {
      return {
        key: 'home',
        title: (
          <Link to="/">
            <HomeOutlined />
          </Link>
        ),
      };
    } else if (i === link.length - 1) {
      return {
        key: `breadcrumb-${i}`,
        title: (
          <Tooltip
            placement="topLeft"
            title={x.length > 10 ? x : undefined}
            arrow={true}
          >
            <Typography.Text type="secondary">
              {x.length > 10 ? '...' : x}
            </Typography.Text>
          </Tooltip>
        ),
      };
    } else {
      return {
        key: `breadcrumb-${i}`,
        title: <Typography.Text type="secondary">{x}</Typography.Text>,
      };
    }
  });
  return (
    <>
      <Helmet>
        <title>TMIS | {title}</title>
      </Helmet>

      <div {...others}>
        <Space direction="vertical" size="small">
          <Breadcrumb items={item} className="page-header-breadcrumbs" />
          <Typography.Title
            level={5}
            style={{
              paddingTop: 15,
              paddingBottom: 20,
              margin: 0,
              textTransform: 'capitalize',
            }}
          >
            {title}
          </Typography.Title>
        </Space>
        {/* <Divider orientation="right" plain>
          <span style={{ textTransform: 'capitalize' }}>{title}</span>
        </Divider> */}
      </div>
    </>
  );
};
