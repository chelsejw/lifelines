import React, { useState } from 'react'

const DonorForm = (props)=> {

    const [authorizerId, setAuthorizerId] = useState("")

    return (
        <div className="container w-75">
                <div className="mb-3">
                    <h2>Is my pet eligible to be a blood donor?</h2>
                </div>
                <div className="mb-4">
                    <div>
                    <span class="font-weight-bold">General Requirements</span>

                        <ul>
                            <li>Good temperament and health</li>
                            <li>Able to tolerate restraint and venipuncture (collection of blood from vein)</li>
                            <li>1 to 8 years old</li>
                            <li>Male or nulliparous (never pregnant) female</li>
                            <li>Up to date on vaccination</li>
                            <li>On heartworm preventive and tick/flea control</li>
                            <li>No history of receiving blood transfusion</li>
                            <li>Not on any medications that could pose a problem for the recipient</li>

                        </ul>

                        </div>
                    <div>
                    <span class="font-weight-bold">Weight Requirements</span>

                    <ul>
                        <li>Dogs: Weighs at least 30kg</li>
                        <li>Cats: Weighs at least 5kg</li>

                    </ul>

                    </div>



                    {/* <div className="table-responsive-sm">

                    <table className="table table-bordered">
                    <thead className="bg-danger text-white">
                        <tr>
                        <th scope="col" colSpan="8">General Requirements</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>Good temperament and health</td>
                        <td>Able to tolerate restraint and venipuncture (collection of blood from vein)</td>
                        <td>1 to 8 years old</td>
                        <td>Male or nulliparous (never pregnant) female</td>
                        <td>Up to date on vaccinations</td>
                        <td>On heartworm preventive and tick/flea control</td>
                        <td>No history of receiving blood transfusion</td>
                        <td>Not on any medications that could pose a problem for the recipient</td>
                        </tr>
                        </tbody>
                        <thead className="bg-secondary">
                        <tr>
                        <th colSpan="4"scope="col">For dogs</th>
                        <th colSpan="4"scope="col">For cats</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td colSpan="4">Weighs at least 20kg</td>
                        <td colSpan="4">Weighs at least 5kg</td>
                        </tr>
                        </tbody>
                    </table>

                    </div> */}
                    
                </div>
            
                <div className="mb-3">
                    <h2>What details do I need to give?</h2>
                    <p>If you have visited a veterinary clinic that is partnered with us in the last year, you may apply by indicating 'clinic' and providing your full name, mobile and pet's name. Do ensure it correlates with the details your vet has, or your verification might be rejected.</p>
                    <p>If you have not visited a veterinary clinic in the past year, or the clinic you have visited is not on our list of partners, you may submit documents like medical records and ownership proof of your pet. Do ensure you attach at least one document.</p>
                </div>

                <div className="row mb-3">
                    <div className="col-6 text-center">

                    <button className="btn btn-lg btn-dark w-90">
                        Apply through a partner clinic
                    </button>
                    </div>
                    <div className="col-6 text-center">

                    <button className="btn btn-lg btn-secondary w-90">
                        Apply with documents
                    </button>
                    </div>
                </div>
        </div>
        
           

    )
}

export default DonorForm