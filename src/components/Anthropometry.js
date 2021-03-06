import React, { useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { Form, Button, Select, Slider, message } from 'antd'
const { Option } = Select

function Anthropometry({ user, updateUser }) {
    const [height, setHeight] = useState(user.data.anthropometry ? user.data.anthropometry.height : 180)
    const [weight, setWeight] = useState(user.data.anthropometry ? user.data.anthropometry.weight : 80)
    const [neck_girth, setNeck_girth] = useState(user.data.anthropometry ? user.data.anthropometry.neck_girth : 40)
    const [waist_girth, setWaist_girth] = useState(user.data.anthropometry ? user.data.anthropometry.waist_girth : 60)
    const [forearm_girth, setForearm_girth] = useState(user.data.anthropometry ? user.data.anthropometry.forearm_girth : 23)
    const [wrist_girth, setWrist_girth] = useState(user.data.anthropometry ? user.data.anthropometry.wrist_girth : 17)
    const [hip_girth, setHip_girth] = useState(user.data.anthropometry ? user.data.anthropometry.hip_girth : 90)

    const onFinish = values => {
        let { sex, activity } = values
        const new_user = Object.assign({}, user.data)
        const age = user.age
        let coeff;
        switch (activity) {
            case 'min':
                coeff = 1.2
                break
            case 'weak':
                coeff = 1.375
                break
            case 'moderate':
                coeff = 1.55
                break
            case 'heavy':
                coeff = 1.7
                break
            case 'hard':
                coeff = 1.9
                break
            default:
                break
        }
        let calories
        if (sex === 'male') {
            calories = parseInt((10 * weight + 6.25 * height - 5 * age + 5) * coeff)
        } else {
            calories = parseInt((10 * weight + 6.25 * height - 5 * age - 161) * coeff)
        }
        new_user.anthropometry = { sex, height, weight, neck_girth, waist_girth, forearm_girth, wrist_girth, hip_girth, activity, calories }
        updateUser(new_user)
    }

    const markStyle = {
        marginTop: '-34px',
        fontSize: '12px',
        color: '#454545',
        fontWeight: 'bold'
    }

    return (
        <div className='main__anthropometry'>
            <Form
                layout='vertical'
                name='basic'
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={() => message.error('Выберите пол', 3)}
            >
                <Form.Item
                    className='main__anthropometry-input'
                    label='Пол'
                    name='sex'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    initialValue={user.data.anthropometry ? user.data.anthropometry.sex : null}
                >
                    <Select>
                        <Option value='male'>Мужской</Option>
                        <Option value='female'>Женский</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    className='main__anthropometry-input'
                    label='Степень физической активности'
                    name='activity'
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                    tooltip={{
                        title: ReactHtmlParser(`
                        <strong>Минимальная активность:</strong> сидячая работа, не требующая значительных физических нагрузок<br/>
                        <strong>Слабый уровень активности:</strong> интенсивные упражнения не менее 20 минут один-три раза в неделю. Это может быть езда на велосипеде, бег трусцой, баскетбол, плавание, катание на коньках и т.д.<br/>
                        <strong>Умеренный уровень активности:</strong> интенсивная тренировка не менее 30-60 мин три-четыре раза в неделю<br/>
                        <strong>Тяжёлая или трудоёмкая активность:</strong> интенсивные упражнения и занятия спортом 5-7 дней в неделю. Трудоемкие занятия также подходят для этого уровня, они включают строительные работы (кирпичная кладка, столярное дело и т. д.), занятость в сельском хозяйстве и т.п.<br/>
                        <strong>Экстремальный уровень:</strong> включает чрезвычайно активные и/или очень энергозатратные виды деятельности: занятия спортом с почти ежедневным графиком и несколькими тренировками в течение дня; очень трудоемкая работа, например, сгребание угля или длительный рабочий день на сборочной линии. Зачастую этого уровня активности очень трудно достичь<br/>
                    `)
                    }}
                    initialValue={user.data.anthropometry ? user.data.anthropometry.activity : null}
                >
                    <Select>
                        <Option value='min'>Минимальная активность</Option>
                        <Option value='weak'>Слабый уровень активности</Option>
                        <Option value='moderate'>Умеренный уровень активности</Option>
                        <Option value='heavy'>Тяжёлая или трудоёмкая активность</Option>
                        <Option value='hard'>Экстремальный уровень</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    className='main__anthropometry-input'
                    label={`Рост`}
                    name='height'
                    initialValue={height}
                >
                    <Slider
                        tooltipVisible={false}
                        value={height}
                        onChange={value => setHeight(value)}
                        marks={{
                            [height]: {
                                style: markStyle,
                                label: height + ' см'
                            }
                        }}
                        min={50}
                        max={272}
                    />
                </Form.Item>

                <Form.Item
                    className='main__anthropometry-input'
                    label='Масса тела'
                    name='weight'
                    initialValue={weight}
                >
                    <Slider
                        tooltipVisible={false}
                        value={height}
                        onChange={value => setWeight(value)}
                        marks={{
                            [weight]: {
                                style: markStyle,
                                label: weight + ' кг'
                            }
                        }}
                        min={15}
                        max={180}
                    />
                </Form.Item>

                <Form.Item
                    className='main__anthropometry-input'
                    label='Обхват шеи'
                    name='neck_girth'
                    initialValue={neck_girth}
                >
                    <Slider
                        tooltipVisible={false}
                        value={neck_girth}
                        onChange={value => setNeck_girth(value)}
                        marks={{
                            [neck_girth]: {
                                style: markStyle,
                                label: neck_girth + ' см'
                            }
                        }}
                        min={20}
                        max={50}
                    />
                </Form.Item>

                <Form.Item
                    className='main__anthropometry-input'
                    label='Обхват талии'
                    name='waist_girth'
                    initialValue={waist_girth}
                >
                    <Slider
                        tooltipVisible={false}
                        value={waist_girth}
                        onChange={value => setWaist_girth(value)}
                        marks={{
                            [waist_girth]: {
                                style: markStyle,
                                label: waist_girth + ' см'
                            }
                        }}
                        min={30}
                        max={150}
                    />
                </Form.Item>

                <Form.Item
                    className='main__anthropometry-input'
                    label='Обхват предплечья'
                    name='forearm_girth'
                    initialValue={forearm_girth}
                >
                    <Slider
                        tooltipVisible={false}
                        value={forearm_girth}
                        onChange={value => setForearm_girth(value)}
                        marks={{
                            [forearm_girth]: {
                                style: markStyle,
                                label: forearm_girth + ' см'
                            }
                        }}
                        min={15}
                        max={35}
                    />
                </Form.Item>

                <Form.Item
                    className='main__anthropometry-input'
                    label='Обхват запястья'
                    name='wrist_girth'
                    initialValue={wrist_girth}
                >
                    <Slider
                        tooltipVisible={false}
                        value={wrist_girth}
                        onChange={value => setWrist_girth(value)}
                        marks={{
                            [wrist_girth]: {
                                style: markStyle,
                                label: wrist_girth + ' см'
                            }
                        }}
                        min={13}
                        max={23}
                    />
                </Form.Item>

                <Form.Item
                    className='main__anthropometry-input'
                    label='Обхват бёдер'
                    name='hip_girth'
                    initialValue={hip_girth}
                >
                    <Slider
                        tooltipVisible={false}
                        value={hip_girth}
                        onChange={value => setHip_girth(value)}
                        marks={{
                            [hip_girth]: {
                                style: markStyle,
                                label: hip_girth + ' см'
                            }
                        }}
                        min={75}
                        max={130}
                    />
                </Form.Item>

                <div className='main__anthropometry-btn'>
                    <Button type='primary' htmlType='submit'>
                        Сохранить
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default Anthropometry