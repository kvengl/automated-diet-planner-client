import React from 'react'
import './css/Main.css'
import { InfoCircleOutlined } from '@ant-design/icons'
import Anthropometry from './Anthropometry'
import Recommendations from './Recommendations'
import { Collapse } from 'antd'
const { Panel } = Collapse

function Main({ user, nutrient_norms, updateUser }) {
    const isNewUser = user.data.anthropometry === null || user.data.diet_settings === null ? true : false
    return (
        <React.Fragment>
            {isNewUser && (
                <>
                    <div className='main__message'>
                        <InfoCircleOutlined style={{ color: 'orange', marginRight: '4px' }} />
                        <strong>{user.data.auth.username}</strong>, Вам недоступен пункт меню <strong>"Генерация&nbsp;рациона".</strong>
                        <br />Для получения доступа нужно заполнить формы ниже и <strong>сохранить</strong> введённые данные
                    </div>
                </>)
            }
            <div className='main__forms'>
                <div className='main__setting-forms'>
                    <Collapse defaultActiveKey={['0']}>
                        <Panel header="Антропометрия" key="1">
                            <Anthropometry user={user} updateUser={updateUser} />
                        </Panel>
                    </Collapse>
                </div>
                <div className='main__user-recommendations'>
                    <Recommendations nutrient_norms={nutrient_norms} user={user} />
                </div>
            </div>
        </React.Fragment>
    )
}

export default Main