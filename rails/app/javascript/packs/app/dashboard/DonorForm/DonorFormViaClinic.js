import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BarLoader from 'react-spinners/BarLoader'

const DonorFormViaClinic = (props) => {

    const [clinics, setClinics] = useState([])

    useEffect(()=> {
        axios.get(`/api/v1/users/clinics`)
        .then(res=> {
            setClinics(res.data.clinics)
        })
        .catch(err => console.log(err))
    }, [])

    const clinicOptions = clinics.map(clinic => <option key={clinic.id} value={clinic.user_id}>{clinic.display_name}</option>)

    return (
      <div className="pt-3 pb-5">
        <h3>Verifying through Clinic</h3>

        <form>
          <div className="row">
            <div className="col-8">
              <label htmlFor="fullName">Full Name</label>
              <input
                onChange={(e) => props.tracker(e.target.value, e.target.name)}
                className="form-control"
                id="fullName"
                name="owner_name"
              />
            </div>

            <div className="col-4">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                onChange={(e) => props.tracker(e.target.value, e.target.name)}
                className="form-control"
                id="mobile"
                name="mobile"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4">
              <label htmlFor="petName">Donor Pet's Name</label>
              <input
                onChange={(e) => props.tracker(e.target.value, e.target.name)}
                className="form-control"
                id="petName"
                name="pet_name"
              />
            </div>

            <div className="col-8">
              <label htmlFor="clinic">Clinic</label>
              <select
                className="form-control"
                onChange={(e) => props.tracker(e.target.value, e.target.name)}
                name="authorizer_id"
              >
                <option value="">Select a partner clinic...</option>
                {clinicOptions}
              </select>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="text">Additional Info (optional)</label>
              <input
                onChange={(e) => props.tracker(e.target.value, e.target.name)}
                className="form-control"
                id="text"
                name="details"
              />
            </div>
          </div>

          {props.error && (
            <p className="mt-3 text-danger">{props.errorMessage}</p>
          )}

          {props.loading && (
            <div>
              <BarLoader color={"#F5A623"} height={4} width={100} />
              <p className="mt-3 text-warning">{props.loadingMessage}</p>
            </div>
          )}

          {props.success && (
            <p className="mt-3 text-success">{props.successMessage}</p>
          )}

          <button
            onClick={(e) => props.submit(e)}
            className="mt-3 btn btn-lg btn-danger"
          >
            Request Verification
          </button>
        </form>
      </div>
    );
}

export default DonorFormViaClinic