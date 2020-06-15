import React, { useState } from 'react'

const DonorFormViaClinic = (props) => {
    return (
      <div className="pt-3 pb-5">
        <h3>Verifying through Clinic</h3>

        <form>
          <div className="row">
            <div className="col-8">
              <label htmlFor="fullName">Full Name</label>
              <input
                required="required"
                onChange={(e) => props.tracker(e.target.value, e.target.name)}
                className="form-control"
                id="fullName"
                name="owner_name"
              />
            </div>

            <div className="col-4">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                required="required"
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
                required="required"
                onChange={(e) => props.tracker(e.target.value, e.target.name)}
                className="form-control"
                id="petName"
                name="pet_name"
              />
            </div>

            <div className="col-8">
              <label htmlFor="clinic">Clinic</label>
              <input
                required="required"
                onChange={(e) => props.tracker(e.target.value, e.target.name)}
                className="form-control"
                id="clinic"
                name="authorizer_id"
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <label htmlFor="text">Additional Info (optional)</label>
              <input
                onChange={(e) => props.tracker(e.target.value, e.target.name)}
                className="form-control"
                id="text"
                name="text"
              />
            </div>
          </div>

          {props.error && <p className="mt-3 text-danger">{props.errorMessage}</p>}

          <button

            onClick={(e)=> props.submit(e)}
            className="mt-3 btn btn-lg btn-danger"
          >
            Request Verification
          </button>
        </form>
      </div>
    );
}

export default DonorFormViaClinic