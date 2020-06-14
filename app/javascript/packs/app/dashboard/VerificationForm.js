import React, {useState} from 'react'
import DonorForm from "./DonorForm"
import ClinicForm from './ClinicForm'

const VerificationForm = (props) => {

    const [input, setInput] = useState("")

    const [requestType, setRequestType] = useState("donor")

    return(
        <div className="jumbotron bg-light">
            <div className="container w-50">

                <div className="row">
                    <div className="col">
                        <label htmlFor="verificationFor">Request</label>
                        <select onChange={(e)=>{
                            console.log(`chnge`)
                            console.log(e.target.name)
                            console.log(e.target.value)

                            setInput({...input, [e.target.name]: e.target.value})
                            setRequestType(e.target.value)
                        }} name="type">
                            <option value="donor">To be a verified donor</option>
                            <option value="clinic">To be a verified clinic</option>
                        </select>
                    </div>
                </div>

                {requestType=="donor" ? <DonorForm/> : <ClinicForm/>}

            </div>
        </div>
    )
}

export default VerificationForm