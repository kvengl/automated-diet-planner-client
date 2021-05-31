import { Table } from 'antd'

function Recommendations({ user, nutrient_norms }) {
    const sex = user.data.anthropometry ? user.data.anthropometry.sex : 'male'
    const height = user.data.anthropometry ? user.data.anthropometry.height : 180
    const weight = user.data.anthropometry ? user.data.anthropometry.weight : 80
    let activity = user.data.anthropometry ? user.data.anthropometry.activity : 'min'
    const age = user.age
    switch (activity) {
        case 'min':
            activity = 1.2
            break
        case 'weak':
            activity = 1.375
            break
        case 'moderate':
            activity = 1.55
            break
        case 'heavy':
            activity = 1.7
            break
        case 'hard':
            activity = 1.9
            break
        default:
            break
    }
    let calories
    if (sex === 'male') {
        calories = (10 * weight + 6.25 * height - 5 * age + 5) * activity
    } else {
        calories = (10 * weight + 6.25 * height - 5 * age - 161) * activity
    }

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
            key: toString(i + 1),
            name: val.russian_name,
            count: i === 0 ? calories + ' ккал' : `${val.data.value} ${val.data.metric}`
        }
    })

    return (
        <div>
            <p className='main__user-recommendations-title'>Рекомендации по нутриентам:</p>
            <Table pagination={{ position: ['topRight'] }} dataSource={data} columns={columns} />
        </div>
    )
}

export default Recommendations