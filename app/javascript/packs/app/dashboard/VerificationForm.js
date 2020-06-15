import React, {useState} from 'react'
import DonorForm from "./DonorForm/DonorFormContainer"
import ClinicForm from './ClinicForm'
import {connect} from 'react-redux'
const VerificationForm = (props) => {

    const [input, setInput] = useState("")

    const [requestType, setRequestType] = useState("donor")
      if (props.auth.currentUser.profile.verified) {
        return (
          <div className="py-3 container">
            <h3>You are already verified.</h3>
            <p>Good job!</p>
          </div>
        );
      }
    if (props.auth.currentUser.pendingVerifications) {
        return (
            <div className="py-3 container">
            <h3>You have a pending verification.</h3>
            <p>Kindly wait for us to process that before submitting another request.</p>
            </div>
        )
    }
             return (
               <div>
                 <div className="container">
                   <div className="row mx-auto my-4">
                     <div className="col">
                       <div className="row">
                         <div className="col">
                           <button
                             onClick={() => setRequestType("donor")}
                             className="w-90 btn btn-lg btn-danger"
                           >
                             Donor Verification
                           </button>
                         </div>
                         <div className="col">
                           <button
                             onClick={() => setRequestType("clinic")}
                             className="btn-lg btn w-90 btn-success"
                           >
                             Clinic Verification
                           </button>
                         </div>
                       </div>
                     </div>
                   </div>
                   <div>
                     {requestType == "donor" ? <DonorForm /> : <ClinicForm />}
                   </div>
                 </div>
               </div>
             );
}
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(VerificationForm);
