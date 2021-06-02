import { Table } from 'antd'

function Recommendations({ user, nutrient_norms }) {
    const calories =  user.data.anthropometry ? user.data.anthropometry.calories : null
    const columns = [
        {
            title: 'Компонент',
            dataIndex: 'name',
            key: 'name',
            render: text => <b style={{ color: '#454545' }}>{text}</b>,
        },
        {
            title: 'Количество',
            dataIndex: 'count',
            key: 'count',
        }
    ]

    const data = nutrient_norms.map((val, i) => {
        return {
            key: i,
            name: val.russian_name,
            count: i === 0 ? calories + ' ккал' : `${val.data.value} ${val.data.metric}`
        }
    })

    return (
        <div>
            <p className='main__user-recommendations-title'>Рекомендации по нутриентам:</p>
            {user.data.anthropometry === null ?
                <p className='main__user-recommendations-error'>Вам недоступна таблица с рекомендованными суточными нормами питательных компонентов в рационе. <br />
                Заполните форму <strong>"Антропометрия"</strong></p>
                :
                <Table pagination={{ position: ['topRight'] }} dataSource={data} columns={columns} />
            }
        </div>
    )
}

export default Recommendations