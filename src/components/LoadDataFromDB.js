import React, { useEffect, useState } from 'react'
import { Skeleton } from 'antd'
import Home from '../containers/Home'

function LoadDataFromDB({ user, nutrient_norms, products, product_categories, getNutrientNorms, getProducts, getProductCategories }) {
    const [loaded, setLoaded] = useState(false)
    const [loadStatus, setLoadStatus] = useState('Загрузка...')
    useEffect(() => {
        if (nutrient_norms.length === 0) {
            console.group('Получение данных из справочников...')
            getNutrientNorms()
            setLoadStatus('Получение норм нутриентов...')
        } else {
            if (products.length === 0) {
                getProducts()
                setLoadStatus('Получение списка продуктов...')
            } else {
                if (product_categories.length === 0) {
                    getProductCategories()
                    setLoadStatus('Получение списка категорий продуктов...')
                } else {
                    setLoaded(true)
                    console.groupEnd('DICTIONARY')
                }
            }
        }
    }, [user, getNutrientNorms, getProducts, getProductCategories, nutrient_norms.length, products.length, product_categories.length, loaded])

    if (loaded) {
        return (
            <Home />
        )
    } else {
        return (
            <>
                <Skeleton />
                {loadStatus}
            </>
        )
    }
}

export default LoadDataFromDB