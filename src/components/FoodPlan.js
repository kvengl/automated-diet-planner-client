import { useState } from 'react'
import { Button, Card, Select, InputNumber, message } from 'antd'
import './css/FoodPlan.css'
import { DeleteOutlined, PlusOutlined, SaveOutlined, EditOutlined } from '@ant-design/icons'

const { Option } = Select

function FoodPlan({ user, true_products, products, updateUser }) {
    const [loadStatus, setLoadStatus] = useState(false)
    const [cards, setCards] = useState(user.data.food_plan ? user.data.food_plan : [])
    const [edited_card, set_edited_card] = useState(user.data.food_plan ? (user.data.food_plan.find(val => val.isEdit === true) || null) : null)
    const [calories, set_calories] = useState(user.data.anthropometry.calories)

    document.title = 'Подбор оптимального содержания продуктов | Diet Planner'

    const saveForm = () => {
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
                min_value: 10,
                max_value: 100,
                isEdit: true
            }
            new_cards.push(obj)
            setCards(new_cards)
            set_edited_card(obj)
        } else {
            message.error('Завершите редактирование', 3)
        }
    }

    const onChange = (value, name) => {
        if (!value) return
        const obj = Object.assign({}, edited_card)
        obj[name] = value
        set_edited_card(obj)
    }

    const saveCard = i => {
        if (!edited_card.product_name)
            return message.error('Вы не выбрали продукт')
        const isFind = cards.findIndex((val, j) => val.product_name === edited_card.product_name && j !== i) === -1 ? false : true
        if (isFind)
            return message.error('Такой продукт уже выбран в другой карточке')
        if (edited_card.min_value > edited_card.max_value)
            return message.error('Минимальная массовая доля больше максимальной')
        if (edited_card.min_value === null)
            return message.error('Ошибка в поле минимальной массовой доли')
        if (edited_card.max_value === null)
            return message.error('Ошибка в поле максимальной массовой доли')
        const product = products.findIndex(val => val.name === edited_card.product_name)   
        const new_cards = [...cards]
        edited_card.isEdit = false
        edited_card.product_image = products[product].image
        edited_card.product_src = products[product].src
        new_cards[i] = edited_card
        setCards(new_cards)
        set_edited_card(null)
    }

    const cancelCard = i => {
        set_edited_card(cards[i])
    }

    const deleteCard = i => {
        const new_cards = [...cards]
        new_cards.splice(i, 1)
        setCards(new_cards)
        set_edited_card(null)
    }

    const editCard = i => {
        const obj = Object.assign({}, cards[i])
        obj.isEdit = true
        set_edited_card(obj)
        const new_cards = [...cards]
        new_cards[i].isEdit = true
        setCards(new_cards)
    }

    const optimization = () => {
        setLoadStatus(true)
        setTimeout(() => setLoadStatus(false), 5000)
    }

    return (
        <div className='foodPlan'>
            <p className='foodPlan__title'>Формирование оптимального содержания продуктов в рационе</p>
            {cards.length === 0 && <p>
                Добавляйте продукты, которые хотите видеть в своём рационе, указывая допустимые пределы изменения массовой доли (в граммах). <br />
                Оптимизационный алгоритм подберёт оптимальное содержание массовых долей в добавленных продуктах.
            </p>}
            <div style={{display: 'block', marginBottom: '12px'}}>
            Килокалории: <InputNumber min={700} max={5000} value={calories} onChange={value => set_calories(value)} />
            </div>
            <div style={{display: 'flex', width: '400px', justifyContent: 'space-between'}}>
                <div>
                    <Button disabled={loadStatus ? true : false} type='primary' icon={<PlusOutlined/>} onClick={addCard}>Добавить продукт</Button>
                    <Button loading={loadStatus} disabled={cards.length === 0 || edited_card ? true : false} type='default' onClick={optimization} style={{ marginLeft: '8px' }}>Оптимизация</Button>
                </div>
                <Button onClick={saveForm} style={{ display: cards.length === 0 && 'none' }} icon={<SaveOutlined/>}></Button>
            </div>
            {cards.map((val, i) =>
                val.isEdit ?
                <Card key={String(i)} style={{ width: '400px', marginTop: '12px' }}>
                    Продукт
                        <Select showSearch value={edited_card.product_name} style={{ width: '100%', marginBottom: '4px' }} onChange={value => onChange(value, 'product_name')}>
                        {true_products.map((el, i) => <Option key={String(i)} value={el}>{el}</Option>)}
                    </Select>
                        Минимальная массовая доля (гр)
                        <InputNumber min={10} value={edited_card.min_value} style={{ display: 'block', width: '100%', marginBottom: '4px' }} onChange={e => onChange(e, 'min_value')} />
                        Максимальная массовая доля (гр)
                        <InputNumber min={10} value={edited_card.max_value} max={1000} style={{ display: 'block', width: '100%', marginBottom: '12px' }} onChange={e => onChange(e, 'max_value')} />
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button type='default' onClick={() => cancelCard(i)}>Сбросить изменения</Button>
                            <div>
                                <Button style={{marginRight: '8px'}} type='primary' onClick={() => saveCard(i)} icon={<SaveOutlined/>}>Сохранить</Button>
                                <Button type='default' danger onClick={() => deleteCard(i)} icon={<DeleteOutlined/>}></Button>
                            </div>
                        </div>
                </Card>
                :
                <Card extra={<a target='_blank' rel='noreferrer' href={val.product_src}>FitAudit</a>}  title={val.product_name} key={String(i)} style={{ width: '400px', marginTop: '12px' }}>
                    <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                        <a href={val.product_src} target='_blank' rel='noreferrer'><img src={val.product_image} alt={val.product_name}></img></a>
                        <div style={{marginLeft: '24px'}}>
                            <strong>Минимальное:</strong> {val.min_value} г<br/>
                            <strong style={{color: 'orange'}}>Оптимальное:</strong> ?<br/>
                            <strong style={{color: 'red'}}>Максимальное:</strong> {val.max_value} г
                           
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                        <Button onClick={() => editCard(i)} disabled={loadStatus ? true : false} icon={<EditOutlined/>}>Редактировать</Button>
                        <Button type='default' danger onClick={() => deleteCard(i)} icon={<DeleteOutlined/>}></Button>
                    </div>
                </Card>
            ).reverse()}

        </div>
    )
}

export default FoodPlan