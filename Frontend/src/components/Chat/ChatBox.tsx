import React, { useState, useRef, useEffect, useContext } from 'react';
import {
  Input,
  Button,
  Upload,
  Image,
  Typography,
  message as AntMessage,
  Spin,
  Modal,
} from 'antd';
import { SendOutlined, UploadOutlined } from '@ant-design/icons';
import mqtt from 'mqtt';
import axiosInstance from '../../services/AxiosInstance';
import AuthContext from '../../context/AuthContext';
import { useParams } from 'react-router-dom';
import useFileUploadNoCrop from '../../hooks/useFileUploadWithoutCrop';
import envConfig from '../../config';

const { Text } = Typography;

interface ChatMessage {
  type: 'text' | 'image';
  content: string;
  sender: string | undefined;
}

const ChatBox: React.FC = () => {
  const auth = useContext(AuthContext);
  const { id } = useParams<{ id: string }>();
  const FixedRoomNo = id; // Change this as needed
  const [text, setText] = useState('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<mqtt.MqttClient | null>(null);
  const [loading, setLoading] = useState(true);
  const { fileList, beforeUpload, onPreview, onChange } = useFileUploadNoCrop();

  const topic = 'chat-app-room2'; // Change this as needed

  useEffect(() => {
    setLoading(true);
    const client = mqtt.connect('wss://broker.emqx.io:8084/mqtt');
    clientRef.current = client;

    client.on('connect', () => {
      client.subscribe(topic);
    });

    client.on('message', (_topic, messageBuffer) => {
      try {
        const room: string = JSON.parse(messageBuffer.toString());

        // if (room !== FixedRoomNo) return; // Only handle messages for the fixed room
        (async () => {
          const res = await axiosInstance.get(`chat?room=${FixedRoomNo}`);
          setChatMessages(res.data);
          setLoading(false);
        })();
      } catch (e) {
        console.error('Error parsing message', e);
        setLoading(false);
      }
    });

    return () => {
      client.end();
    };
  }, []);

  const sendTextMessage = () => {
    if (!text.trim()) return;
    // setChatMessages((prev) => [...prev, msg]);
    setText('');
    const message = {
      room: FixedRoomNo,
      sender: auth?.user?.id,
      type: 'text',
      content: text,
    };
    (async () => {
      await axiosInstance.post('chat', message);

      if (clientRef.current) {
        clientRef.current.publish(topic, JSON.stringify(message.room), {
          retain: true,
        });
      }
    })();
  };

  const sendImageMessage = (filename: string) => {
    const url = `${envConfig.imageUrl}${filename}`;

    AntMessage.success('Image added to chat (preview only)');

    const message = {
      room: FixedRoomNo,
      sender: auth?.user?.id,
      type: 'image',
      content: url,
    };

    (async () => {
      await axiosInstance.post('chat', message);

      if (clientRef.current) {
        clientRef.current.publish(topic, JSON.stringify(message.room), {
          retain: true,
        });
      }
    })();

    //return false; // prevent default upload behavior
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <>
      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '12px',
          // margin: '2px',
          backgroundColor: '#ffffff',
          borderRadius: 8,
          marginBottom: 12,
          border: '1px solid #d9d9d9',
          height: '400px',
        }}
      >
        <Spin
          style={{
            display: 'flex',
            justifyContent: 'center', // horizontal center
            alignItems: 'center', // vertical center
            height: '100vh', // full viewport height to allow vertical centering
          }}
          spinning={loading}
        >
          {chatMessages.map((msg, index) => {
            const isMine = msg.sender === auth?.user?.id;
            return (
              <div
                key={index}
                style={{
                  marginBottom: 8,
                  display: 'flex',
                  justifyContent: isMine ? 'flex-end' : 'flex-start',
                }}
              >
                {msg.type === 'text' ? (
                  <div
                    style={{
                      background: isMine ? '#1890ff' : '#f0f0f0',
                      color: isMine ? 'white' : 'black',
                      padding: '8px 12px',
                      borderRadius: 6,
                      maxWidth: '80%',
                      textAlign: 'left',
                    }}
                  >
                    <Text style={{ color: isMine ? 'white' : 'black' }}>
                      {msg.content}
                    </Text>
                  </div>
                ) : (
                  <Image
                    src={msg.content}
                    width={200}
                    alt="chat-img"
                    style={{
                      borderRadius: 6,
                      border: '1px solid #888',
                      alignSelf: isMine ? 'flex-end' : 'flex-start',
                    }}
                  />
                )}
              </div>
            );
          })}
          <div ref={scrollRef} />
        </Spin>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <Input
          placeholder="Enter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={sendTextMessage}
        />
        <Upload
          beforeUpload={beforeUpload}
          onPreview={onPreview}
          onChange={(info) => {
            onChange(info);
            if (info.file.status === 'done') {
              const url = info.file.xhr.responseURL;
              const filename = new URL(url).searchParams.get('filename');
              const webpFilename = filename?.split('.')[0] + '.webp';
              if (webpFilename) {
                sendImageMessage(webpFilename);
              }
              setLoading(false);
            } else if (info.file.status === 'uploading') {
              setLoading(true);
            } else if (info.file.status === 'error') {
              setLoading(false);
              Modal.error({
                title: 'Fail',
                content: 'File uploade failed...',
              });
            }
          }}
          showUploadList={false}
          action={
            envConfig.baseUrl +
            'Upload/Postupload?filename=' +
            fileList[fileList.length - 1]?.name
          }
          accept="image/*"
        >
          <Button icon={<UploadOutlined />} />
        </Upload>
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={sendTextMessage}
        />
      </div>
    </>
  );
};

export default ChatBox;
