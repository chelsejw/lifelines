import React, {useState} from 'react'
import DonorForm from "./DonorForm"
import ClinicForm from './ClinicForm'

const VerificationForm = (props) => {

    const [input, setInput] = useState("")

    const [requestType, setRequestType] = useState("donor")

    return(
        <div className="jumbotron bg-light">
            <div className="container w-75">

                <h3 onClick={()=> setRequestType("donor")} className="btn-link">Donor Verification</h3>
                <h3 onClick={()=> setRequestType('clinic')}className="btn-link">Clinic Verification</h3>


                {requestType=="donor" ? <DonorForm/> : <ClinicForm/>}

            </div>
        </div>
    )
}

export default VerificationForm