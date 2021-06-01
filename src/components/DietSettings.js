import { useState } from 'react'
import { Form, Button, Select, message, InputNumber } from 'antd'
const { Option } = Select

function DietSettings({ user, products, product_categories, updateUser }) {
    const number_meals = user.data.diet_settings ? user.data.diet_settings.number_meals : 3
    const financial_opportunities = user.data.diet_settings ? user.data.diet_settings.financial_opportunities : 800
    const [product_categories_excluded, set_product_categories_excluded] = useState(user.data.diet_settings ? user.data.diet_settings.product_categories_excluded : [])
    const [food_excluded, set_food_excluded] = useState(user.data.diet_settings ? user.data.diet_settings.food_excluded : [])

    const onFinish = values => {
        const new_user = JSON.parse(JSON.stringify(user.data))
        new_user.diet_settings = { financial_opportunities: values.financial_opportunities, number_meals: values.number_meals, food_excluded, product_categories_excluded: values.product_categories_excluded }
        updateUser(new_user)
    }
    const onFinishFailed = () => {
        message.error('Выберите пол', 3)
    }

    return (
        <div className='main__diet-settings'>
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
                    className='main__diet-settings-input'
                    label='Количество приёмов пищи'
                    name='number_meals'
                    initialValue={number_meals}
                    rules={[
                        {
                            required: true,
                            message: ''
                        }
                    ]}
                >
                    <InputNumber min={1} max={7} />
                </Form.Item>

                <Form.Item
                    className='main__diet-settings-input'
                    label='Финансовые возможности (₽)'
                    name='financial_opportunities'
                    initialValue={financial_opportunities}
                    rules={[
                        {
                            required: true,
                            message: ''
                        }
                    ]}
                >
                    <InputNumber min={100} max={5000} />
                </Form.Item>

                <Form.Item
                    className='main__diet-settings-input'
                    label='Исключить следующие категории продуктов'
                    name='product_categories_excluded'
                    initialValue={product_categories_excluded}
                >
                    <Select allowClear mode='multiple' onChange={value => { 
                        set_product_categories_excluded(value)
                        const copy_food_excluded = food_excluded.slice()
                        food_excluded.forEach((val, i) => {
                            const index = products.findIndex(el => val === el.name)
                            if (index !== -1 && value.includes(products[index].category)) {
                                copy_food_excluded.splice(i, 1)
                            }
                        })
                        set_food_excluded(copy_food_excluded)
                    }}>
                        {product_categories.map(val => <Option key={val._id} value={val.name}>{val.name}</Option>)}
                    </Select>
                </Form.Item>
                Исключить конкретные продукты
                <Select allowClear style={{width: '100%'}} mode='multiple' onChange={value => set_food_excluded(value)} value={food_excluded}>
                    {products.filter(val => !product_categories_excluded.includes(val.category)).map(val => <Option key={val._id} value={val.name}>{val.name}</Option>)}
                </Select>

                <div className='main__diet-settings-btn'>
                    <Button type='primary' htmlType='submit'>
                        Сохранить
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export default DietSettings