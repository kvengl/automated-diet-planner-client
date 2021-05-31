import React, { useState } from 'react'
import MainContainer from '../containers/MainContainer'
import UserProfileContainer from '../containers/UserProfileContainer'
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
import './css/Home.css'

function Home({ user, clearStore }) {
    document.title = 'Diet planner'
    const [selectedMenuKey, setSelectedMenuKey] = useState('main')
    const changeMenuItem = ({ key }) => {
        if (key === 'exit') {
            clearStore()
        } else {
            setSelectedMenuKey(key)
        }
    }
    return (
        <div className="Home">
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
                    {(user.role === 'admin' || user.role === 'moderator') ? 'Обращения' : 'Обратная связь'}
                </Menu.Item>
                <Menu.Item key="tutorial" icon={<InfoCircleOutlined />}>
                    Руководство пользователя
          </Menu.Item>
                <Menu.Item key="exit" icon={<ImportOutlined style={{ color: 'crimson' }} />}>
                    Выйти
          </Menu.Item>
            </Menu>
            <section className='Home-component'>
                {selectedMenuKey === 'main' && <MainContainer />}
                {selectedMenuKey === 'account' && <UserProfileContainer />}
            </section>
        </div>
    )
}

export default Home