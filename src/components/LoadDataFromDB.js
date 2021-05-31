import React, { useEffect, useState } from "react"
import { Skeleton } from 'antd'
import Home from "../containers/Home"

function LoadDataFromDBGate({ nutrient_norms, getNutrientNorms }) {
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if (nutrient_norms.length === 0) {
            console.group("Получение данных из справочников...")
            getNutrientNorms()
        } else {
            setLoaded(true)
            console.groupEnd("DICTIONARY")
        }
    }, [getNutrientNorms, nutrient_norms.length])

    if (loaded) {
        return (
            <Home />
        )
    } else {
        return (
            <Skeleton />
        )
    }
}

export default LoadDataFromDBGate