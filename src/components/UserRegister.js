import React from 'react'
import { Form, Input, Button, DatePicker, message } from 'antd'
import Logo from './Logo'
import './UserRegister.css'
import { Link } from 'react-router-dom'

function UserRegister({ createUser }) {
    document.title = 'Регистрация | Diet planner'

    const onFinish = values => {
        const username = values.username
        const password = values.password
        const password_confirm = values.password_confirm
        const email = values.email
        const birthday = values.birthday

        new Promise((resolve) => {
            if (username && password && password_confirm && email && birthday) resolve()
            else throw new Error('Необходимо заполнить все обязательные поля')
          }).then(() => {
            if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)) return true
            else throw new Error('Неверный формат электронной почты')
          }).then(() => {
            if (username.length >= 3 && username.length <= 16) return true
            else throw new Error('Никнейм должен содержать от 3 до 16 символов')
          }).then(() => {
            if (password === password_confirm) return true
            else throw new Error('Пароли не совпадают')
          }).then(() => {
            if (password.length >= 6) return true
            else throw new Error('Пароль должен содержать минимум 6 символов')
          }).then(() => {
            let data = {
              username,
              email,
              password,
              birthday
            }
            createUser(data)
          }).catch(error => message.error(error.message, 3))

        console.log('Success:', values)
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    return (
        <section className='register-form'>
            <div className='register-form__logo'>
                <Logo />
            </div>
            <div className='register-form__content'>
                <Form
                    layout='vertical'
                    name='basic'
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        className='register-form__input'
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
                        className='register-form__input'
                        label='E-mail'
                        name='email'
                        rules={[
                            {
                                required: true,
                                message: 'Введите адрес электронной почты',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label='Год и месяц рождения'
                        name='birthday'
                        rules={[
                            {
                                required: true,
                                message: 'Выберите год и месяц рождения',
                            },
                        ]}
                    >
                        <DatePicker className='register-form__input' placeholder='' picker='month' />
                    </Form.Item>

                    <Form.Item
                        className='register-form__input'
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

                    <Form.Item
                        className='register-form__input'
                        label='Подтвердите пароль'
                        name='password_confirm'
                        rules={[
                            {
                                required: true,
                                message: 'Введите пароль',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <div className='register-form__btns'>
                        <Button type='primary' htmlType='submit'>
                            Зарегистрироваться
                        </Button>

                        <Link to={`${window.URL_PREFIX}login`}>Авторизация</Link>
                    </div>
                </Form>
            </div>
        </section>
    )
}

export default UserRegister