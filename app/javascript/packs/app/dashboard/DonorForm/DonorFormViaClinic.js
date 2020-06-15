import React from 'react'

const DonorFormViaClinic = (props) => {
    return (
      <div className="pt-3 pb-5">
        <h3>Verifying through Clinic</h3>
        <div className="row">
          <div className="col-8">
            <label htmlFor="fullName">Full Name</label>
            <input className="form-control" id="fullName" name="owner_name" />
          </div>

          <div className="col-4">
            <label htmlFor="mobile">Mobile Number</label>
            <input className="form-control" id="mobile" name="mobile" />
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <label htmlFor="petName">Donor Pet's Name</label>
            <input className="form-control" id="petName" name="pet_name" />
          </div>

          <div className="col-8">
            <label htmlFor="clinic">Clinic</label>
            <input className="form-control" id="clinic" name="authorizer_id" />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="text">Additional Info (optional)</label>
            <input className="form-control" id="text" name="text" />
          </div>
        </div>
      </div>
    );
}

export default DonorFormViaClinic