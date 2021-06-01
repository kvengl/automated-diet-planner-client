import { Form, Input, Button, DatePicker, message } from 'antd'
import './css/UserProfile.css'
import 'moment/locale/ru'
import locale from 'antd/es/date-picker/locale/ru_RU'
import moment from 'moment'

function UserProfile({ user, updateUser }) {
    document.title = 'Профиль | Diet planner'
    const onFinish = values => {
        const { username, password, password_confirm, email, birthday } = values
        new Promise((resolve) => {
            if (/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/.test(email)) return resolve()
            else throw new Error('Неверный формат электронной почты')
        }).then(() => {
            if (username.length >= 3 && username.length <= 16) return true
            else throw new Error('Никнейм должен содержать от 3 до 16 символов')
        }).then(() => {
            if ((!password && !password_confirm) || password === password_confirm) return true
            else throw new Error('Пароли не совпадают')
        }).then(() => {
            if ((!password && !password_confirm) || password.length >= 6) return true
            else throw new Error('Пароль должен содержать минимум 6 символов')
        }).then(() => {
            const new_user = JSON.parse(JSON.stringify(user.data))
            if (password) {
                new_user.auth.password = password
            }
            new_user.auth.username = username
            new_user.auth.email = email
            new_user.birthday = birthday
            updateUser(new_user)
        }).catch(error => message.error(error.message, 3))
    }

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo)
    }

    return (
        <section className='profile-form'>
            <div className='profile-form__content'>
                <p className='profile-form__title'>Редактирование профиля</p>
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
                        className='profile-form__input'
                        label='Логин'
                        name='username'
                        initialValue={user.data.auth.username}
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
                        className='profile-form__input'
                        label='E-mail'
                        name='email'
                        initialValue={user.data.auth.email}
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
                        initialValue={moment(user.data.auth.birthday)}
                        rules={[
                            {
                                required: true,
                                message: 'Выберите год и месяц рождения',
                            },
                        ]}
                    >
                        <DatePicker locale={locale} format='MM.YYYY' className='profile-form__input' placeholder='' picker='month' />
                    </Form.Item>

                    <Form.Item
                        className='profile-form__input'
                        label='Пароль'
                        initialValue=''
                        name='password'
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        className='profile-form__input'
                        label='Подтвердите пароль'
                        initialValue=''
                        name='password_confirm'
                    >
                        <Input.Password />
                    </Form.Item>
                    <Button type='primary' htmlType='submit'>
                        Изменить данные
                        </Button>
                </Form>
            </div>
        </section>
    )
}

export default UserProfile