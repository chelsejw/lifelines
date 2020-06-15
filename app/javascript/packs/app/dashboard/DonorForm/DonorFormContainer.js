import React, { useState } from 'react'
import DonorFormViaAdmin from './DonorFormViaAdmin'
import DonorFormViaClinic from './DonorFormViaClinic'

const DonorForm = (props)=> {

    const [verificationType, setVerificationType] = useState(null)
    const [input, setInput] = useState({})

    const trackInput = (value, field) => {
        return setInput(prevInputs => {
            return {
            ...prevInputs,
            [field]: value
            }
        })
    }

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
              <li>
                Able to tolerate restraint and venipuncture (collection of blood
                from vein)
              </li>
              <li>1 to 8 years old</li>
              <li>Male or nulliparous (never pregnant) female</li>
              <li>Up to date on vaccination</li>
              <li>On heartworm preventive and tick/flea control</li>
              <li>No history of receiving blood transfusion</li>
              <li>
                Not on any medications that could pose a problem for the
                recipient
              </li>
            </ul>
          </div>
          <div>
            <span class="font-weight-bold">Weight Requirements</span>

            <ul>
              <li>Dogs: Weighs at least 30kg</li>
              <li>Cats: Weighs at least 5kg</li>
            </ul>
          </div>
        </div>

        <div className="mb-3">
          <h2>What details do I need to give?</h2>
          <p>
            If you have visited a veterinary clinic that is partnered with us in
            the last year, you may apply by indicating 'clinic' and providing
            your full name, mobile and pet's name. Do ensure it correlates with
            the details your vet has, or your verification might be rejected.
          </p>
          <p>
            If you have not visited a veterinary clinic in the past year, or the
            clinic you have visited is not on our list of partners, you may
            submit documents like medical records and ownership proof of your
            pet. Do ensure you attach at least one document.
          </p>
        </div>

        <div className="row mb-3">
          <div className="col-6 text-center">
            <button
              onClick={() => {
                trackInput({ ...input, authorizer_id: 27 });
                setVerificationType("clinic");
              }}
              className="btn btn-lg btn-dark w-90"
            >
              Apply through a partner clinic
            </button>
          </div>
          <div className="col-6 text-center">
            <button
              onClick={() => {
                trackInput({ ...input, authorizer_id: 27 });
                setVerificationType("admin");
              }}
              className="btn btn-lg btn-secondary w-90"
            >
              Apply with documents
            </button>
          </div>
        </div>
        {verificationType=="clinic" ? <DonorFormViaClinic/> : <DonorFormViaAdmin/>}
      </div>
    );
}

export default DonorForm