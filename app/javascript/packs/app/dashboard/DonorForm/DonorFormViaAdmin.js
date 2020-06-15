import React, { useState } from 'react'
import BarLoader from "react-spinners/BarLoader";

const DonorFormViaAdmin = (props) => {

    const [urls, setUrls] = useState(Array(5).fill(""))

     const openWidget = (documentNumber) => {
       cloudinary.openUploadWidget(
         {
           cloudName: "dwbuqa4dx",
           uploadPreset: "m7t9mejb",
           sources: ["local", "url"],
         },
         (error, result) => {
           if (error) {
             console.log(`Err,`, error);
           }
           if (result.event == "success") {
             console.log(`Result,`, result);
             setUrls((prevState) => {
               let updatedArr = [...prevState];
               updatedArr[documentNumber] = result.info.url;
               return updatedArr;
             });
           }
         }
       );
     };


    return (
      <div className="pt-3 pb-5">
        <h3>Verifying through Documents</h3>
        <div className="row">
          <div className="col">
            <label htmlFor="doc1">
              Document 1 <span className="text-danger">*</span>
              <span onClick={() => openWidget(0)} className="ml-2 btn-link">
                {urls[0] !== "" ? "Change" : "Upload"}
              </span>
            </label>
            <input
              disabled="disabled"
              placeholder=""
              value={urls[0]}
              className="form-control"
              id="doc1"
              name="url"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="doc1">
              Document 2
              <span onClick={() => openWidget(1)} className="ml-2 btn-link">
                {urls[1] !== "" ? "Change" : "Upload"}
              </span>
            </label>
            <input
              disabled="disabled"
              placeholder=""
              value={urls[1]}
              className="form-control"
              id="doc2"
              name="url"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="doc3">
              Document 3
              <span onClick={() => openWidget(2)} className="ml-2 btn-link">
                {urls[2] !== "" ? "Change" : "Upload"}
              </span>
            </label>
            <input
              disabled="disabled"
              placeholder=""
              value={urls[2]}
              className="form-control"
              id="doc3"
              name="url"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="doc4">
              Document 4
              <span onClick={() => openWidget(3)} className="ml-2 btn-link">
                {urls[3] !== "" ? "Change" : "Upload"}
              </span>
            </label>
            <input
              disabled="disabled"
              placeholder=""
              value={urls[3]}
              className="form-control"
              id="doc4"
              name="url"
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="doc5">
              Document 5
              <span onClick={() => openWidget(4)} className="ml-2 btn-link">
                {urls[4] !== "" ? "Change" : "Upload"}
              </span>
            </label>
            <input
              disabled="disabled"
              placeholder=""
              value={urls[4]}
              className="form-control"
              id="doc5"
              name="url"
            />
          </div>
        </div>

        <p className="text-danger">* Required Fields</p>

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

        <div>
          <button
            onClick={(e) => props.submit(e, urls)}
            className="btn btn-lg btn-dark btn-block"
          >
            Submit
          </button>
        </div>
      </div>
    );
}

export default DonorFormViaAdmin