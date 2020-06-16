import React, { useEffect, useState } from 'react'
import axios from 'axios'
const AppealsSummary = (props) => {

    const [userAppeals, setUserAppeals] = useState([])

    useEffect(()=> {
        axios.get('/api/v1/appeals/user')
        .then(res => setUserAppeals(res.data) )
        .catch(err => console.log(err))
    }, [])

    const appealElements = userAppeals.map(appeal => {
        return <li>{appeal.id} Your appeal for ${appeal.pet_name} </li>
    })

    return (
        <div>
        <h1>Your Appeals</h1>
        <ul>
            {appealElements}
        </ul>
        </div>
    )
}

export default AppealsSummary