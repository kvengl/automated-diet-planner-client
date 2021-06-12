import { useState } from 'react'
import { Button, Card, Select, InputNumber, message, Table } from 'antd'
import './css/FoodPlan.css'
import { DeleteOutlined, PlusOutlined, SaveOutlined, EditOutlined } from '@ant-design/icons'

const { Option } = Select

function FoodPlan({ user, true_products, products, optimal_products, status, statistic, updateUser, start_optimization, set_optimal_products, set_optimal_statistic }) {
    console.log(statistic)
    const [cards, setCards] = useState(user.data.food_plan ? user.data.food_plan : [])
    const [edited_card, set_edited_card] = useState(null)
    const [calories, set_calories] = useState(user.data.anthropometry.calories)
    const [volume, set_volume] = useState(1200)

    document.title = 'Подбор оптимального содержания продуктов | Diet Planner'

    const saveForm = () => {
        if (edited_card) {
            message.error('Завершите редактирование карточки')
            return
        }
        const new_user = Object.assign({}, user.data)
        new_user.food_plan = cards
        updateUser(new_user)
    }

    const addCard = () => {
        if (!edited_card) {
            const new_cards = [...cards]
            const obj = {
                product_name: '',
                product_image: '',
                product_src: '',
                min_value: 0,
                max_value: 100,
                isEdit: true
            }
            new_cards.push(obj)
            setCards(new_cards)
            set_edited_card(obj)
            set_optimal_products(null)
        } else {
            message.error('Завершите редактирование', 3)
        }
    }

    const onChange = (value, name) => {
        if (value === undefined || value === null) return
        const obj = Object.assign({}, edited_card)
        obj[name] = value
        set_edited_card(obj)
        set_optimal_products(null)
    }

    const saveCard = i => {
        if (!edited_card.product_name)
            return message.error('Вы не выбрали продукт')
        const isFind = cards.findIndex((val, j) => val.product_name === edited_card.product_name && j !== i) === -1 ? false : true
        if (isFind)
            return message.error('Такой продукт уже выбран в другой карточке')
        if (edited_card.min_value >= edited_card.max_value)
            return message.error('Минимальная массовая доля больше или равна максимальной')
        if (edited_card.min_value === null)
            return message.error('Ошибка в поле минимальной массовой доли')
        if (edited_card.max_value === null)
            return message.error('Ошибка в поле максимальной массовой доли')
        const product = products.findIndex(val => val.name === edited_card.product_name)
        const new_cards = cards.map(val => Object.assign({}, val))
        const card = Object.assign({}, edited_card)
        card.isEdit = false
        card.product_image = products[product].image
        card.product_src = products[product].src
        new_cards[i] = card
        setCards(new_cards)
        set_edited_card(null)
    }

    const cancelCard = i => set_edited_card(cards[i])

    const deleteCard = i => {
        const new_cards = [...cards]
        new_cards.splice(i, 1)
        setCards(new_cards)
        set_edited_card(null)
        set_optimal_products(null)
    }

    const editCard = i => {
        if (edited_card) return message.error('Завершите редактирование карточки')
        const new_cards = cards.map(val => Object.assign({}, val))
        const obj = Object.assign({}, new_cards[i], { isEdit: true })
        set_edited_card(obj)
        new_cards[i].isEdit = true
        setCards(new_cards)
    }

    const optimization = () => start_optimization(cards, calories, volume)

    const columns = [
        {
            title: 'Компонент',
            dataIndex: 'name',
            key: 'name',
            render: text => <b style={{ color: '#454545' }}>{text}</b>,
        },
        {
            title: 'Фактическое содержание',
            dataIndex: 'fact',
            key: 'fact',
        },
        {
            title: 'Рекомендуемое содержание',
            dataIndex: 'recommend',
            key: 'recommend',
        },
        {
            title: 'Отклонение',
            dataIndex: 'deviation',
            key: 'deviation',
        },
    ]

    const data = statistic
    const vol = optimal_products && optimal_products.reduce((sum, curr) => sum + curr, 0)

    const variance = statistic && +(statistic.reduce((sum, curr, i) => {
        if (i === 0)
            return sum
        return sum + curr.deviation ** 2
    }, 0) / statistic.length - 1).toFixed(2)

    const standard_deviation = statistic && +Math.sqrt(variance).toFixed(2)

    return (
        <div className='foodPlan'>
            <p className='foodPlan__title'>Формирование оптимального содержания продуктов в рационе</p>
            {cards.length === 0 && <p>
                Добавляйте продукты, которые хотите видеть в своём рационе, указывая допустимые пределы изменения массовой доли (в граммах). <br />
                Оптимизационный алгоритм подберёт оптимальное содержание массовых долей в добавленных продуктах.
            </p>}
            <section style={{display: 'flex'}}>
                <div style={{ width: '400px' }}>
                    <div style={{ display: 'block', marginBottom: '12px' }}>
                        Килокалории: <InputNumber min={700} max={5000} value={calories} onChange={value => set_calories(value)} />
                    </div>
                    <div style={{ display: 'block', marginBottom: '12px' }}>
                        Объём рациона (г): <InputNumber min={100} max={50000} value={volume} onChange={value => set_volume(value)} />
                    </div>
                    <div style={{ display: 'flex', width: '400px', justifyContent: 'space-between' }}>
                        <div>
                            <Button disabled={status ? true : false} type='primary' icon={<PlusOutlined />} onClick={addCard}>Добавить продукт</Button>
                            <Button loading={status} disabled={cards.length === 0 || edited_card ? true : false} type='default' onClick={optimization} style={{ marginLeft: '8px' }}>Оптимизация</Button>
                        </div>
                        <Button onClick={saveForm} icon={<SaveOutlined />}></Button>
                    </div>
                </div>
                { optimal_products && <div style={{marginLeft: '12px', fontSize: '20px'}}>
                    <strong>Дисперсия:</strong> {variance}
                    <br/>
                    <strong>СКО:</strong> {standard_deviation}
                    <br/>
                    <strong>Объём рациона:</strong> {vol} г / {volume} г
                </div> }
            </section>
            <div style={{ display: 'flex' }}>
                <div>
                    {cards.map((val, i) =>
                        val.isEdit ?
                            <Card key={String(i)} style={{ width: '400px', marginTop: '12px' }}>
                                Продукт
                        <Select showSearch value={edited_card.product_name} style={{ width: '100%', marginBottom: '4px' }} onChange={value => onChange(value, 'product_name')}>
                                    {true_products.map((el, i) => <Option key={String(i)} value={el}>{el}</Option>)}
                                </Select>
                        Минимальная массовая доля (гр)
                        <InputNumber min={0} value={edited_card.min_value} style={{ display: 'block', width: '100%', marginBottom: '4px' }} onChange={e => onChange(e, 'min_value')} />
                        Максимальная массовая доля (гр)
                        <InputNumber min={10} value={edited_card.max_value} max={15000} style={{ display: 'block', width: '100%', marginBottom: '12px' }} onChange={e => onChange(e, 'max_value')} />
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button type='default' onClick={() => cancelCard(i)}>Сбросить изменения</Button>
                                    <div>
                                        <Button style={{ marginRight: '8px' }} type='primary' onClick={() => saveCard(i)} icon={<SaveOutlined />}>Сохранить</Button>
                                        <Button type='default' danger onClick={() => deleteCard(i)} icon={<DeleteOutlined />}></Button>
                                    </div>
                                </div>
                            </Card>
                            :
                            <Card extra={<a target='_blank' rel='noreferrer' href={val.product_src}>FitAudit</a>} title={val.product_name} key={String(i)} style={{ width: '400px', marginTop: '12px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                                    <a href={val.product_src} target='_blank' rel='noreferrer'><img src={val.product_image} alt={val.product_name}></img></a>
                                    <div style={{ marginLeft: '24px' }}>
                                        <strong>Минимальное:</strong> {val.min_value} г<br />
                                        <strong style={{ color: 'orange' }}>Оптимальное:</strong> {optimal_products ? optimal_products[i] + ' г' : '?'}<br />
                                        <strong style={{ color: 'red' }}>Максимальное:</strong> {val.max_value} г
                            </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button onClick={() => editCard(i)} disabled={status ? true : false} icon={<EditOutlined />}>Редактировать</Button>
                                    <Button type='default' danger onClick={() => deleteCard(i)} icon={<DeleteOutlined />}></Button>
                                </div>
                            </Card>
                    ).reverse()}
                </div>
                {optimal_products && <Table style={{ marginLeft: '16px', width: '100%', marginTop: '12px' }} pagination={false} dataSource={data} columns={columns} />}
            </div>
        </div>
    )
}

export default FoodPlan