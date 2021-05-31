import './css/Main.css'
import { InfoCircleOutlined } from '@ant-design/icons'
import Anthropometry from './Anthropometry'
import DietSettings from './DietSettings'
import Recommendations from './Recommendations'
import { Collapse } from 'antd'
const { Panel } = Collapse

function Main({ user, nutrient_norms, products, product_categories, updateUser }) {
    const isNewUser = user.data.anthropometry === null || user.data.diet_settings === null ? true : false
    return (
        <>
            {isNewUser && (
                <>
                    <div className='main__message'>
                        <InfoCircleOutlined style={{ color: 'orange', marginRight: '4px' }} />
                        <strong>{user.data.auth.username}</strong>, Вам недоступен пункт меню <strong>"Генерация&nbsp;рациона".</strong>
                        <br />Для получения доступа нужно заполнить формы ниже и <strong>сохранить</strong> введённые данные
                    </div>
                </>)
            }
            <div className='main__forms'>
                <div className='main__setting-forms'>
                    <Collapse defaultActiveKey={['0']}>
                        <Panel header="Антропометрия" key="1">
                            <Anthropometry user={user} updateUser={updateUser} />
                        </Panel>
                    </Collapse>
                    <Collapse style={{ marginTop: '8px' }} defaultActiveKey={['0']}>
                        <Panel header="Настройка диеты" key="1">
                            <DietSettings products={products} product_categories={product_categories} user={user} updateUser={updateUser} />
                        </Panel>
                    </Collapse>

                    <div className='main__sources'>
                        <p>Источники информации для базы данных <strong>Diet Planner:</strong></p>
                        <div style={{ display: 'flex' }}>
                            <a rel="noreferrer" target='_blank' href='https://fitaudit.ru/'><div className='main__sources-fit-audit' /></a>
                            <a rel="noreferrer" target='_blank' href='https://tvoirecepty.ru/'><img alt="лого сайта fit-audit" className='main__sources-tvoirecepty' src='images/tvoirecepty.png' /></a>
                        </div>

                    </div>
                </div>
                <div className='main__user-recommendations'>
                    <Recommendations nutrient_norms={nutrient_norms} user={user} />
                </div>
            </div>
        </>
    )
}

export default Main