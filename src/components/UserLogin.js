import React from 'react'
import { Form, Input, Button } from 'antd'
import Logo from './Logo'
import './UserLogin.css'
import { Link } from 'react-router-dom'

function UserLogin({ userLogin }) {
    document.title = 'Авторизация | Diet planner'
    
    const onFinish = values => {
        userLogin(values.username, values.password)
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    return (
        <section className='login-form'>
            <div className='login-form__logo'>
                <Logo />
            </div>
            <div className='login-form__content'>
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
                        className="login-form__input"
                        label='Логин'
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Введите логин',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        className="login-form__input"
                        label='Пароль'
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Введите пароль',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <div className="login-form__btns">
                        <Button type='primary' htmlType='submit'>
                            Войти
                        </Button>
                        <Link to={`${window.URL_PREFIX}register`}>
                            <Button className='login-form__btn-register' type='default'>
                                Зарегистрироваться
                            </Button>
                        </Link>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default UserLogin