import axiosInstance from '../../services/AxiosInstance';

interface ChatListItem {
  id: 'string';
  name: 'string';
  password: 'string';
  permission: 'string';
}

export const GetChatList = async () => {
  const response = await axiosInstance.get('ChatList');
  const temp = response.data;
  const data: ChatListItem[] = JSON.parse(JSON.stringify(temp));
  return data;
};

export default ChatListItem;
