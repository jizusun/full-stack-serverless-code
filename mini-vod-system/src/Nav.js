import { Menu } from 'antd';
import { PlaySquareOutlined, UserOutlined } from '@ant-design/icons';


const Nav = (props) => {
    const {current} = props

    return (
      <Menu selectedKeys={[current]} mode="horizontal" theme='dark'>
        <Menu.Item key="app" icon={<PlaySquareOutlined />}>
            Upload
        </Menu.Item>
        <Menu.Item key="app" icon={<UserOutlined />}>
            Users
        </Menu.Item>
      </Menu>
    );
}

export default Nav