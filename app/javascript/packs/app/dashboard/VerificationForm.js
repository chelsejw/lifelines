import React, {useState} from 'react'
import DonorForm from "./DonorForm/DonorFormContainer"
import ClinicForm from './ClinicForm'

const VerificationForm = (props) => {

    const [input, setInput] = useState("")

    const [requestType, setRequestType] = useState("donor")

    return(
        <div>
            <div className="container">
            <div className="row mx-auto my-4">
                <div className="col">
                <div className="row">
                    <div className="col">
                    <button onClick={()=> setRequestType("donor")} className="w-90 btn btn-lg btn-danger">Donor Verification</button>
                    </div>
                    <div className="col">
                    <button onClick={()=> setRequestType('clinic')}className="btn-lg btn w-90 btn-success">Clinic Verification</button>
                    </div>
                </div>
                </div>
                </div>
            <div>
            {requestType=="donor" ? <DonorForm/> : <ClinicForm/>}

            </div>
            </div>


        </div>
    )
}

export default VerificationForm