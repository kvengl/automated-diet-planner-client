import React, { useEffect, useState } from 'react'
import './App.css'
import 'antd/dist/antd.css'
import UserController from './components/UserController'
import MainContainer from './containers/MainContainer'
import UserProfileContainer from './containers/UserProfileContainer'
import {
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  EditOutlined,
  InfoCircleOutlined,
  MailOutlined,
  ImportOutlined
} from '@ant-design/icons';

import { Menu } from 'antd'


function App({ user, userRefresh, clearStore }) {
  useEffect(() => {
    userRefresh()
  }, [userRefresh])

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

    const changeMenuItem = ({ key }) => {
      if (key === 'exit') {
        clearStore()
      } else {
        setSelectedMenuKey(key)
      }
    }
    return (
      <div className='App'>
        <div className="App__content">
          <Menu
            onClick={changeMenuItem}
            defaultSelectedKeys={[selectedMenuKey]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="light"
            inlineCollapsed
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
            <Menu.Item danger key="diet" disabled={user.data.anthropometry === null || user.data.diet_settings === null ? true : false} icon={<UnorderedListOutlined />}>
              Сгенерировать меню
          </Menu.Item>
            <Menu.Item key="report" icon={<MailOutlined />}>
              Обратная связь
            </Menu.Item>
            <Menu.Item key="tutorial" icon={<InfoCircleOutlined />}>
              Руководство пользователя
          </Menu.Item>
            <Menu.Item key="exit" danger icon={<ImportOutlined />}>
              Выйти
          </Menu.Item>
          </Menu>
          <section className='App__content-component'>
            {selectedMenuKey === 'main' && <MainContainer />}
            {selectedMenuKey === 'account' && <UserProfileContainer />}
          </section>
        </div>
      </div>
    )
  }
  else {
    return (<div className='App'>

    </div>)
  }
}

export default App