import { Menu } from 'antd';
import {
  PlaySquareOutlined,
  UserOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  const { current } = props;

  return (
    <Menu selectedKeys={[current]} mode="horizontal" theme="dark">
      <Menu.Item key="video" icon={<PlaySquareOutlined />}>
        <Link to={`/video`}>Video</Link>
      </Menu.Item>
      <Menu.Item key="profile" icon={<ProfileOutlined />}>
        <Link to={`/profile`}>Me</Link>
      </Menu.Item>
      <Menu.Item key="user" icon={<UserOutlined />}>
        <Link to={`/users`}>Users</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Nav;
