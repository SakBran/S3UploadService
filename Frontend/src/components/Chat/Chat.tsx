import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import ChatBox from './ChatBox';
import ChatList from './ChatList';
import { useMediaQuery } from 'react-responsive';
import ChatListMobile from './ChatListMobile';
import ChatListItem, { GetChatList } from './ChatListItem';

const Chat: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [chatList, setChatList] = React.useState<ChatListItem[]>([]);
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const chatList = await GetChatList();
        setChatList(chatList);
      } catch (error) {
        console.error('Error fetching chat list:', error);
      }
    };
    fetchChatList();
  }, []);
  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 8,
        padding: isMobile ? '0.5rem' : '2rem',
        paddingBottom: '1rem',
      }}
    >
      <Row>
        <Col xs={24} md={24} lg={0}>
          <ChatListMobile dataList={chatList} />
        </Col>
      </Row>
      <Row>
        <Col xs={24} md={24} lg={{ span: 18, push: 6 }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: 600,
              borderRadius: 8,
            }}
          >
            <ChatBox></ChatBox>
          </div>
        </Col>
        <Col xs={0} md={0} lg={{ span: 6, pull: 18 }}>
          <div
            style={{
              padding: '0 1rem',
            }}
          >
            <ChatList dataList={chatList} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Chat;
