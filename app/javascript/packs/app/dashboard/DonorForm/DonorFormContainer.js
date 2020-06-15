import React, { useState, useEffect } from 'react'
import DonorFormViaAdmin from './DonorFormViaAdmin'
import DonorFormViaClinic from './DonorFormViaClinic'
import axios from 'axios'

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


    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(false)
    const [loadingMessage, setloadingMessage] = useState("Everything looks good! Processing your form...")
    const [submitted, setSubmitted] = useState(false)
    const [success, setSuccess] = useState(false)
    const [successMessage, setSuccessMessage] = useState("")

    const submitHandler = (e) => {

      e.preventDefault();
      setError(false)

      if (submitted) {
          setError(true)
          setSuccess(false)
          return setErrorMessage("Sorry, you may not submit another request until your current one is reviewed.")
      }

      if (verificationType=="clinic") {
          if (!input.owner_name || input.owner_name.length < 5) {
            setError(true);
            return setErrorMessage("Owner's name is too short. (Minimum 5 character)");
          } else if (!input.pet_name || input.pet_name.length < 1) {
            setError(true);
            return setErrorMessage("Pet's name is too short. (Minimum 1 character.)");
          } else if (!input.mobile || input.mobile.length < 8) {
            setError(true);
            return setErrorMessage("Please double check your mobile number.");              
          } else if (!input.authorizer_id) {
            setError(true);
            return setErrorMessage("Please select a clinic.");         
          }

        const token = document.querySelector("[name=csrf-token]").content;
        axios.defaults.headers.common["X-CSRF-TOKEN"] = token;
                setLoading(true);

        axios
        .post("/api/v1/verifications", {verification: input})
        .then(res => {
            setLoading(false)
            setSuccess(true)
            setSubmitted(true)
            setSuccessMessage("Your verification request has been received. Please allow the team up to 7 working days to get back to you.")
        })
        .catch(err => {
            console.log(`There was an error in posting`)
            console.log(err)
            setError(true)
            setLoading(false)
            setErrorMessage('Sorry, there was an error processing your form. Please try again, or contact us @ lifelines.team@gmail.com for additional support.')
        })
        }
    }

    useEffect(()=> {
        console.log(input)
    }, [input]);

    useEffect(()=> {
        console.log(error)
        console.log(errorMessage)
    }, [error])

    return (
      <div className="container w-75">
        <div className="mb-3">
          <h2>Is my pet eligible to be a blood donor?</h2>
        </div>
        <div className="mb-4">
          <div>
            <span className="font-weight-bold">General Requirements</span>

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
            <span className="font-weight-bold">Weight Requirements</span>

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
                setInput((prevInput) => {
                  return {
                    ...prevInput,
                    authorizer_id: null,
                    verification_for: "donor",
                  };
                });
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
                setInput((prevInput) => {
                  return {
                    ...prevInput,
                    authorizer_id: 27,
                    verification_for: "donor",
                  };
                });
                setVerificationType("admin");
              }}
              className="btn btn-lg btn-secondary w-90"
            >
              Apply with documents
            </button>
          </div>
        </div>
        {verificationType == "clinic" && (
          <DonorFormViaClinic
            error={error}
            errorMessage={errorMessage}
            tracker={trackInput}
            submit={submitHandler}
            loading={loading}
            loadingMessage={loadingMessage}
            success={success}
            submitted={submitted}
            successMessage={successMessage}
          />
        )}
        {verificationType == "admin" && (
          <DonorFormViaAdmin
            submit={submitHandler}
            error={error}
            errorMessage={errorMessage}
            tracker={trackInput}
            loading={loading}
            submitted={submitted}
            loadingMessage={loadingMessage}
            success={success}
            successMessage={successMessage}
          />
        )}
      </div>
    );
}

export default DonorForm