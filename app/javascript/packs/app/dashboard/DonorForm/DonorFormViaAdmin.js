import React, { useState } from 'react'

const DonorFormViaAdmin = (props) => {

    const [imgUrls, setImgUrls] = useState(Array(5).fill(""))

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
             return setUploadStatus("failed");
           }
           if (result.event == "success") {
             console.log(`Result,`, result);
             setImgUrls((prevState) => {
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
                {imgUrls[0] !== "" ? "Change" : "Upload"}
              </span>
            </label>
            <input
              disabled="disabled"
              placeholder=""
              value={imgUrls[0]}
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
                {imgUrls[1] !== "" ? "Change" : "Upload"}
              </span>
            </label>
            <input
              disabled="disabled"
              placeholder=""
              value={imgUrls[1]}
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
                {imgUrls[2] !== "" ? "Change" : "Upload"}
              </span>
            </label>
            <input
              disabled="disabled"
              placeholder=""
              value={imgUrls[2]}
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
                {imgUrls[3] !== "" ? "Change" : "Upload"}
              </span>
            </label>
            <input
              disabled="disabled"
              placeholder=""
              value={imgUrls[3]}
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
                {imgUrls[4] !== "" ? "Change" : "Upload"}
              </span>
            </label>
            <input
              disabled="disabled"
              placeholder=""
              value={imgUrls[4]}
              className="form-control"
              id="doc5"
              name="url"
            />
          </div>
        </div>

        <p className="text-danger">* Required Fields</p>

        <div>
            <button className="btn btn-lg btn-dark btn-block">Submit</button>
        </div>
      </div>
    );
}

export default DonorFormViaAdmin