import React from 'react'
import { Form, Button, Select, Slider, message } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons';
import './Main.css'

const { Option } = Select

function Main({ user, updateUser }) {
    const onFinish = values => {
        const { sex, height, weight, neck_girth, waist_girth, forearm_girth, wrist_girth, hip_girth } = values
        const new_user = JSON.parse(JSON.stringify(user.data))
        new_user.anthropometry = { sex, height, weight, neck_girth, waist_girth, forearm_girth, wrist_girth, hip_girth }
        updateUser(new_user)
    }

    const onFinishFailed = errorInfo => {
        message.error('Выберите пол', 3)
    }
    const isNewUser = user.data.anthropometry === null || user.data.diet_settings === null ? true : false
    return (
        <React.Fragment>
            {isNewUser && (
                <>
                    <div className='main__message'>
                        <InfoCircleOutlined style={{ color: 'orange', marginRight: '4px' }} />
                        <strong>{user.data.auth.username}</strong>, Вам недоступен пункт меню <strong>"Генерация&nbsp;рациона"</strong>.
                        <br />Для получения доступа нужно заполнить формы ниже и <strong>сохранить</strong> введённые данные
                    </div>
                </>)
            }
            <div className='main__anthropometry'>
                <p className="main__anthropometry-title">Ваша антропометрия</p>
                <Form
                    layout="vertical"
                    name='basic'
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        className="main__anthropometry-input"
                        label='Пол'
                        name='sex'
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                        initialValue={user.data.anthropometry ? user.data.anthropometry.sex :  null}
                    >
                        <Select>
                            <Option value="male">Мужской</Option>
                            <Option value="female">Женский</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        className="main__anthropometry-input"
                        label='Рост (см)'
                        name='height'
                        initialValue={user.data.anthropometry ? user.data.anthropometry.height :  180}
                    >
                        <Slider
                            marks={{ 50: '50', 272: '272' }}
                            min={50}
                            max={272}
                        />
                    </Form.Item>

                    <Form.Item
                        className="main__anthropometry-input"
                        label='Вес (кг)'
                        name='weight'
                        initialValue={user.data.anthropometry ? user.data.anthropometry.weight :  80}
                    >
                        <Slider
                            marks={{ 15: '15', 180: '180' }}
                            min={15}
                            max={180}
                        />
                    </Form.Item>

                    <Form.Item
                        className="main__anthropometry-input"
                        label='Обхват шеи (см)'
                        name='neck_girth'
                        initialValue={user.data.anthropometry ? user.data.anthropometry.neck_girth : 40}
                    >
                        <Slider
                            marks={{ 20: '20', 50: '50' }}
                            min={20}
                            max={50}
                        />
                    </Form.Item>

                    <Form.Item
                        className="main__anthropometry-input"
                        label='Обхват талии (см)'
                        name='waist_girth'
                        initialValue={user.data.anthropometry ? user.data.anthropometry.waist_girth : 60}
                    >
                        <Slider
                            marks={{ 30: '30', 150: '150' }}
                            min={30}
                            max={150}
                        />
                    </Form.Item>

                    <Form.Item
                        className="main__anthropometry-input"
                        label='Обхват предплечья (см)'
                        name='forearm_girth'
                        initialValue={user.data.anthropometry ? user.data.anthropometry.forearm_girth : 23}
                    >
                        <Slider
                            marks={{ 15: '15', 35: '35' }}
                            min={15}
                            max={35}
                        />
                    </Form.Item>

                    <Form.Item
                        className="main__anthropometry-input"
                        label='Обхват запястья (см)'
                        name='wrist_girth'
                        initialValue={user.data.anthropometry ? user.data.anthropometry.wrist_girth : 17}
                    >
                        <Slider
                            marks={{ 13: '13', 23: '23' }}
                            min={13}
                            max={23}
                        />
                    </Form.Item>

                    <Form.Item
                        className="main__anthropometry-input"
                        label='Обхват бёдер (см)'
                        name='hip_girth'
                        initialValue={user.data.anthropometry ? user.data.anthropometry.hip_girth : 90}
                    >
                        <Slider
                            marks={{ 75: '75', 130: '130' }}
                            min={75}
                            max={130}
                        />
                    </Form.Item>

                    <div className="main__anthropometry-btn">
                        <Button type='primary' htmlType='submit'>
                            Сохранить
                        </Button>

                    </div>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default Main