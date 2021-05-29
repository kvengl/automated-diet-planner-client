import React, { useEffect, useState } from 'react'
import './App.css'
import 'antd/dist/antd.css'
import UserController from './components/UserController'
import MainContainer from './containers/MainContainer'
import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  EditOutlined,
  InfoCircleOutlined,
  MailOutlined,
} from '@ant-design/icons';

import { Menu, Button } from 'antd'
const { SubMenu } = Menu


function App({ user, userRefresh }) {
  useEffect(() => {
    userRefresh()
  }, [userRefresh])

  const [collapsed, toggleCollapsed] = useState(true)
  const [selectedMenuKey, setSelectedMenuKey] = useState('main')

  if (user.status === 'unregistered') {
    return (
      <div className='App'>
        <UserController user={user} />
      </div>
    )
  }
  else if (user.status !== 'unknown') {
    document.title = 'Diet planner'
    return (
      <div className='App'>
        <Menu
          onClick={({ key }) => setSelectedMenuKey(key)}
          defaultSelectedKeys={[selectedMenuKey]}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
        >
          <Menu.Item key="main" icon={<HomeOutlined />}>
            Главная страница
          </Menu.Item>
          <Menu.Item key="account" icon={<UserOutlined />}>
            Управление аккаунтом
          </Menu.Item>
          {(user.role === 'admin' || user.role === 'moderator') &&
            <Menu.Item key="recipes" icon={<EditOutlined />}>
              Управление рецептами
          </Menu.Item>
          }
          <Menu.Item key="diet" icon={<UnorderedListOutlined />}>
            Сгенерировать меню
          </Menu.Item>
          <Menu.Item key="report" icon={<MailOutlined />}>
            Обратная связь
            </Menu.Item>
          <Menu.Item key="tutorial" icon={<InfoCircleOutlined />}>
            Руководство пользователя
            </Menu.Item>
        </Menu>
        <section className='content'>
          {selectedMenuKey === 'main' && <MainContainer/>}
        </section>
      </div>
    )
  }
  else {
    return (<div className='App'>

    </div>)
  }
}

export default App