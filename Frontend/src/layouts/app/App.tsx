import {
  Button,
  Dropdown,
  Flex,
  FloatButton,
  Layout,
  MenuProps,
  message,
  theme,
  Tooltip,
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  QuestionOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';
import { useMediaQuery } from 'react-responsive';
import SideNav from './SideNav.tsx';
import HeaderNav from './HeaderNav.tsx';
import FooterNav from './FooterNav.tsx';
import { NProgress } from '../../components';
import { PATH_LANDING } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store.ts';
import AuthContext from '../../context/AuthContext.tsx';
import axiosInstance from '../../services/AxiosInstance.ts';
import Apply from './Apply.tsx';
const { Content } = Layout;

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [collapsed, setCollapsed] = useState(true);
  const [navFill, setNavFill] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const nodeRef = useRef(null);
  const floatBtnRef = useRef(null);
  useSelector((state: RootState) => state.theme);
  const auth = useContext(AuthContext);

  const items: MenuProps['items'] = [
    {
      key: 'user-profile-link',
      label: 'profile',
      icon: <UserOutlined />,
      onClick: () => {
        navigate('/User/Edit/' + auth?.user?.id);
      },
    },
    {
      key: 'user-settings-link',
      label: 'settings',
      icon: <SettingOutlined />,
    },
    {
      key: 'user-help-link',
      label: 'help center',
      icon: <QuestionOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'user-logout-link',
      label: 'logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: () => {
        message.open({
          type: 'loading',
          content: 'signing you out',
        });
        auth?.logout();
        setTimeout(() => {
          navigate(PATH_LANDING.root);
        }, 450);
      },
    },
  ];

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 5) {
        setNavFill(true);
      } else {
        setNavFill(false);
      }
    });
  }, []);

  useEffect(() => {
    if (isMobile) {
      const temp = document.getElementsByClassName(
        'ant-layout-content'
      )[0] as HTMLDivElement;

      const footer = document.getElementsByClassName(
        'ant-layout-footer'
      )[0] as HTMLDivElement;

      // const header = document.getElementsByClassName(
      //   'ant-input-group-wrapper'
      // )[0] as HTMLDivElement;
      //const original = temp.style.display;
      if (!collapsed) {
        console.log(collapsed);
        if (temp) {
          // temp.style.display = 'none';
          // footer.style.display = 'none';
          // header.style.display = 'none';
        }
      } else {
        console.log(collapsed);
        if (temp) {
          temp.style.display = 'block';
          footer.style.display = 'block';
          // header.style.display = 'block';
        }
      }
    }
  }, [collapsed]);

  useEffect(() => {
    // Add the response interceptor here, where `auth` is available
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response, // Just return the response for successful requests
      (error) => {
        // Handle 401 errors
        if (error.response && error.response.status === 401) {
          console.log('401 Unauthorized: Logging out...');
          message.open({
            type: 'error',
            content:
              'Please sign in again because your login session is expired. ',
          });
          auth?.logout(); // Call the logout function from AuthContext
          // Optionally, redirect to login page or show a message
          // window.location.href = '/login';
        }
        return Promise.reject(error); // Re-throw the error for other handlers
      }
    );

    // Clean up the interceptor when the component unmounts
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [auth]); // Re-run effect if `auth` changes (though it typically won't for AuthContext)

  return (
    <>
      <NProgress isAnimating={isLoading} key={location.key} />
      <Layout
        style={{
          minHeight: '100vh',
          // backgroundColor: 'white',
        }}
      >
        <SideNav
          trigger={null}
          collapsible
          setCollapse={setCollapsed}
          collapsed={collapsed}
          onCollapse={(value) => {
            setCollapsed(value);
          }}
          style={{
            overflow: 'auto',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: '#FFFFFF',
            border: 'none',
            transition: 'all .2s',
            borderRight: '1px solid #d9d9d9',
            zIndex: 200,
          }}
        />
        <Layout
          style={{
            background: 'none',
          }}
        >
          <HeaderNav
            style={{
              marginLeft: collapsed ? 0 : '200px',
              padding: '0 2rem 0 0',
              backgroundColor: navFill
                ? 'rgba(255, 255, 255, 0.5)'
                : 'transparent',
              backdropFilter: navFill ? 'blur(8px)' : 'none',
              boxShadow: navFill ? '0 0 8px 2px rgba(0, 0, 0, 0.05)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              gap: 8,
              transition: 'all .25s',
              borderBottom: '1px solid #d9d9d9',
              zIndex: 200,
            }}
          >
            <Flex align="center">
              <Tooltip title={`${collapsed ? 'Expand' : 'Collapse'} Sidebar`}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => {
                    setCollapsed(!collapsed);
                  }}
                  style={{
                    fontSize: '16px',
                    width: 64,
                    height: 64,
                  }}
                />
              </Tooltip>
            </Flex>
            <Flex align="center" gap="small">
              <Apply></Apply>
              <Tooltip title="Messages">
                <Button icon={<MessageOutlined />} type="text" size="large" />
              </Tooltip>

              <Dropdown menu={{ items }} trigger={['click']}>
                <Flex>
                  <img
                    src="/me.jpg"
                    alt="user profile photo"
                    height={36}
                    width={36}
                    style={{ borderRadius, objectFit: 'cover' }}
                  />
                </Flex>
              </Dropdown>
            </Flex>
          </HeaderNav>
          <Content
            style={{
              margin: `0 0 0 ${collapsed ? 0 : isMobile ? 0 : '200px'}`,
              borderRadius: collapsed ? 0 : borderRadius,
              transition: 'all .25s',
              padding: isMobile ? '5px 5px' : '24px 32px',
              // minHeight: 360,
              opacity: !collapsed && isMobile ? 0.5 : 1, // ✅ dim if sidebar is open and on mobile
              pointerEvents: !collapsed && isMobile ? 'none' : 'auto', // ✅ make unclickable
            }}
          >
            <TransitionGroup>
              <SwitchTransition>
                <CSSTransition
                  key={`css-transition-${location.key}`}
                  nodeRef={nodeRef}
                  onEnter={() => {
                    setIsLoading(true);
                  }}
                  onEntered={() => {
                    setIsLoading(false);
                  }}
                  timeout={300}
                  classNames="bottom-to-top"
                  unmountOnExit
                >
                  {() => (
                    <div ref={nodeRef} style={{ background: 'none' }}>
                      {children}
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </TransitionGroup>
            <div ref={floatBtnRef}>
              <FloatButton.BackTop />
            </div>
          </Content>
          <FooterNav
            style={{
              textAlign: 'center',
              marginLeft: collapsed ? 0 : '200px',
              background: 'none',
            }}
          />
        </Layout>
      </Layout>
    </>
  );
};
