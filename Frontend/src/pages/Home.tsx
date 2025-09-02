import { Button, Col, Flex, Image, Row, theme, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { PATH_AUTH, PATH_GITHUB } from '../constants';
import { Link } from 'react-router-dom';
import { GithubOutlined, LoginOutlined, RocketFilled } from '@ant-design/icons';
import { Container } from '../components';

const { Title, Text } = Typography;

export const HomePage = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const isTablet = useMediaQuery({ maxWidth: 992 });

  return (
    <div
      style={{
        // backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.35) 40%, rgba(255, 255, 255, 1) 40%), url('/grid-3d.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          height: isTablet ? 600 : 800,
          width: '100%',
          padding: isMobile ? '2rem 1rem' : '5rem 0',
          // backgroundColor: 'rgba(255, 255, 255, 0.85)',
        }}
      >
        <Container>
          <Row style={{ alignItems: 'center' }}>
            <Col lg={12}>
              <Text
                style={{
                  color: colorPrimary,
                  fontSize: 16,
                  fontWeight: 700,
                }}
              >
                <RocketFilled /> Kick start your project with
              </Text>
              <Title
                style={{
                  fontSize: isMobile ? 36 : 40,
                  fontWeight: 900,
                  margin: '1.5rem 0',
                }}
              >
                A dynamic and versatile multipurpose{' '}
                <span className="text-highlight">dashboard</span> template built
                using <span className="text-highlight">React</span>,{' '}
                <span className="text-highlight">Vite</span>,{' '}
                <span className="text-highlight">Ant Design</span>, and{' '}
                <span className="text-highlight">Storybook</span>{' '}
              </Title>
              <Text style={{ fontSize: 20, marginBottom: '1.5rem' }}>
                <span className="text-highlight fw-bolder">60+</span> ready made
                components to use.
              </Text>
              <Flex
                gap="middle"
                vertical={isMobile}
                style={{ marginTop: '1.5rem' }}
              >
                <Link to={PATH_AUTH.signin}>
                  <Button
                    icon={<LoginOutlined />}
                    type="primary"
                    size="large"
                    block={isMobile}
                  >
                    Live preview
                  </Button>
                </Link>
                <Link to={PATH_GITHUB.repo}>
                  <Button
                    icon={<GithubOutlined />}
                    type="default"
                    size="large"
                    block={isMobile}
                  >
                    Give us a star
                  </Button>
                </Link>
              </Flex>
            </Col>
            {!isTablet && (
              <Col lg={12}>
                <Image src="/landing-frame.png" alt="dashboard image snippet" />
              </Col>
            )}
          </Row>
        </Container>
      </Flex>
      {/* <Container style={sectionStyles}>
        <Title
          level={2}
          className="text-center"
          style={{ marginBottom: '2rem' }}
        >
          8 dashboard pages available
        </Title>
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {DASHBOARDS.map((dashboard) => (
            <Col key={dashboard.title} xs={24} lg={8} xl={6}>
              <Link to={dashboard.link}>
                <Card
                  hoverable
                  cover={<img src={dashboard.image} alt={dashboard.title} />}
                >
                  <Text className="m-0 text-capitalize">{dashboard.title}</Text>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container> */}
      {/* <Container style={sectionStyles}>
        <Title
          level={2}
          className="text-center"
          style={{ marginBottom: '2rem' }}
        >
          3+ pages available
        </Title>
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {APPS.map((app) => (
            <Col key={app.title} xs={24} sm={12} lg={8} xl={6}>
              <Link to={app.link}>
                <Card hoverable cover={<img src={app.image} alt={app.title} />}>
                  <Text className="m-0 text-capitalize">{app.title}</Text>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container> */}
      {/* <Container style={sectionStyles}>
        <Title
          level={2}
          className="text-center"
          style={{ marginBottom: '2rem' }}
        >
          Other Amazing Features & Flexibility Provided
        </Title>
        <Row
          gutter={[
            { xs: 8, sm: 16, md: 24, lg: 32 },
            { xs: 8, sm: 16, md: 24, lg: 32 },
          ]}
        >
          {FEATURES.map((feature) => (
            <Col key={feature.title} xs={24} md={12} lg={8}>
              <Card style={{ height: '100%' }}>
                <Flex vertical>
                  {createElement(feature.icon, {
                    style: { fontSize: 32, color: colorPrimary },
                  })}
                  <Title level={5} className="text-capitalize">
                    {feature.title}
                  </Title>
                  <Text>{feature.description}</Text>
                </Flex>
              </Card>
            </Col>
          ))}
        </Row>
      </Container> */}
      {/* <Card
        style={{
          width: isMobile ? '95%' : 500,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <Title level={4} style={{ marginTop: 0 }}>
          Haven't found an answer to your question?
        </Title>
        <Text style={{ marginTop: '1rem' }}>
          Connect with us either on discord or email us
        </Text>
        <Flex gap="middle" justify="center" style={{ marginTop: '1rem' }}>
          <Button href="mailto:kelvin.kiprop96@gmail.com" type="primary">
            Email
          </Button>
          <Button target="_blank" href={`${PATH_GITHUB.repo}/issues`}>
            Submit an issue
          </Button>
        </Flex>
      </Card> */}
    </div>
  );
};
