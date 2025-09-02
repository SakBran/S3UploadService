import { Layout } from 'antd';
import { useRef } from 'react';

const { Header } = Layout;

type HeaderNavProps = React.HTMLAttributes<HTMLDivElement>;

const HeaderNav = ({ ...others }: HeaderNavProps) => {
  const nodeRef = useRef(null);

  return <Header ref={nodeRef} {...others} />;
};

export default HeaderNav;
