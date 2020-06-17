import React, { useState, useEffect } from 'react'
import axios from "axios";
import BarLoader from 'react-spinners/BarLoader'
const token = document.querySelector("[name=csrf-token]").content;
axios.defaults.headers.common["X-CSRF-TOKEN"] = token;

const ClinicForm = (props)=> {
       const [error, setError] = useState(false);
       const [errorMessage, setErrorMessage] = useState("");

       const [loading, setLoading] = useState(false);
       const [loadingMessage, setloadingMessage] = useState(
         "Everything looks good! Processing your form..."
       );
       const [submitted, setSubmitted] = useState(false);
       const [success, setSuccess] = useState(false);
       const [successMessage, setSuccessMessage] = useState("");
    const [input, setInput] = useState({
        authorizer_id: 30,
        verification_for: 'clinic'
    })

    const trackInput = (value, field) => {
        setInput(prevInput => {
            return {
                ...prevInput,
                [field]: value
            }
        })
    }

    useEffect(()=> {
        console.log(input)
    }, [input])

    const handleClick = (e)=> {

      e.preventDefault();
      setError(false);

      if (submitted) {
        setError(true);
        setSuccess(false);
        return setErrorMessage(
          "Sorry, you may not submit another request until your current one is reviewed."
        );
      }

        if (!input.mobile || input.mobile.length < 8) {
            setError(true)
            return setErrorMessage("Please check that you gave a valid number.")
        }

        axios
          .post("/api/v1/verifications", { verification: input })
          .then((res) => {
            setLoading(false);
            setSuccess(true);
            setSubmitted(true);
            setSuccessMessage(
              "Your verification request has been received. Please allow the team up to 7 working days to get back to you."
            );
          })
          .catch((err) => {
            console.log(`There was an error in posting`);
            console.log(err);
            setError(true);
            setLoading(false);
            setErrorMessage(
              "Sorry, there was an error processing your request. Please try again, or contact us @ lifelines.team@gmail.com for additional support."
            );
          });
    }

    return (
      <div className="container">
        <h3>Request to be a Verified Clinic</h3>

        <div>
          <p>
            As a verified clinic, you will need to assist in verification
            requests for your clients in our database.
          </p>
          <p>However, you will reap the following benefits:</p>
          <ul>
            <li>
              Appeals posted from your account will be more visible and trusted
              by users with a verified badge
            </li>
            <li>
              Your clients will have more options to verify their donor
              eligibility
            </li>
            <li>Play a part in saving more animals' lives!</li>
          </ul>
          <p>
            For Lifelines to work effectively, we require the cooperation of as
            many veterinary clinics as possible. Hence, no matter how small your
            clinic is, we would love to partner up.
          </p>
        </div>

        <h3>How do I verify my clinic?</h3>
        <div>
          <p>We aim to make the process as easy as possible.</p>

          <p>Please check the following conditions:</p>

          <ul>
            <li>You are an AVS-registered veterinary centre</li>
            <li>
              You are signed in with an email account associated with your
              business. This is what we will use to verify your account.
            </li>
          </ul>

          <p>
            If you have fulfilled both conditions, leave a number at which we
            can contact you at, and click on the "Verify My Account" button
            below, and our team will try to verify you ASAP. If more information
            is required, we might call or email you. If not, your account should
            be verified in 5-7 working days.
          </p>
        </div>

        <div className="row my-3">
          <div className="col-5">
            <label htmlFor="mobile">Contact Number</label>
            <input
              id="mobile"
              className="form-control"
              onChange={(e) => trackInput(e.target.value, "mobile")}
              name="mobile"
            />
          </div>
        </div>

        {error && (
          <p className="mt-3 text-danger">{errorMessage}</p>
        )}

        {loading && (
          <div>
            <BarLoader color={"#F5A623"} height={4} width={100} />
            <p className="mt-3 text-warning">{loadingMessage}</p>
          </div>
        )}

        {success && (
          <p className="mt-3 text-success">{successMessage}</p>
        )}

        <button
          onClick={(e) => handleClick(e)}
          className="btn btn-big btn-success btn-block"
        >
          Verify My Account
        </button>
      </div>
    );
}

export default ClinicForm