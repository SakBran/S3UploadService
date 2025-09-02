import { useContext } from 'react';
import { Avatar, List } from 'antd';
import './ChatList.css';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import ChatListItem from './ChatListItem';

type Props = {
  dataList: ChatListItem[];
};
const ChatList = ({ dataList }: Props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <List
      style={{ maxHeight: '500px', overflowY: 'auto' }}
      itemLayout="horizontal"
      size="small"
      dataSource={dataList}
      renderItem={(item, index) => (
        <List.Item
          className="hoverable-item"
          style={{ cursor: 'pointer' }}
          onClick={() =>
            navigate(`/Test/Edit/${auth?.user?.id}-AND-${item.id}`)
          }
        >
          <List.Item.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
              />
            }
            title={item.name}
            description={item.permission}
          />
        </List.Item>
      )}
    />
  );
};

export default ChatList;
