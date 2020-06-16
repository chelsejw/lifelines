import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AppealElement from './AppealElement'

const AppealsSummary = (props) => {

    const [userAppeals, setUserAppeals] = useState([])

    useEffect(()=> {
        axios.get('/api/v1/appeals/user')
        .then(res => setUserAppeals(res.data) )
        .catch(err => console.log(err))
    }, [])

    const appealElements = userAppeals.map(appeal => {
        return <AppealElement appeal={appeal}/>
    })

    return (
        <div>
        <h1>Your Appeals</h1>
            {appealElements}
        </div>
    )
}

export default AppealsSummary