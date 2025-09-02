import { Avatar } from 'antd';
import ChatListItem from './ChatListItem';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

type Props = {
  dataList: ChatListItem[];
};
const ChatListMobile = ({ dataList }: Props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: 'flex',
        overflowX: 'auto',
        gap: '1rem',
        padding: '1rem',
      }}
    >
      {[...dataList].map((_, index) => (
        <div
          key={index}
          style={{ minWidth: 80, textAlign: 'center', cursor: 'pointer' }}
          onClick={() => navigate(`/Test/Edit/${auth?.user?.id}-AND-${_.id}`)}
        >
          <Avatar
            size={64}
            src={`https://i.pravatar.cc/150?img=${index + 1}`}
          />
          <div
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
            }}
          >
            {_.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatListMobile;
