import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AppealElement from './AppealElement'
import {Link} from 'react-router-dom'

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
        <h2 className="mb-4" >Your Appeals</h2>
            {userAppeals.length > 0 ? appealElements : <h4 className="text-secondary">You do not currently have any appeals. <Link to="/new/appeal">Make a new appeal?</Link></h4>}
        </div>
    )
}

export default AppealsSummary