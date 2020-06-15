import React from 'react'

const DonorFormViaAdmin = (props) => {
    return (
      <div className="pt-3 pb-5">
        <h3>Verifying through Documents</h3>
        <div className="row">
          <div className="col">
            <label htmlFor="doc1">Document</label>
            <input required="required" className="form-control" id="doc1" name="url" />
          </div>
        </div>
      </div>
    );
}

export default DonorFormViaAdmin