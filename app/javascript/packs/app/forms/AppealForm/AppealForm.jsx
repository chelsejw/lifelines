import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { trackInputData, postAppealForm, getFormRenderData, getEditFormData, trackEditFormInput, sendPatchAppealRequest } from './actions'
import ClipLoader from "react-spinners/ClipLoader";
import ErrorPage from '../../layouts/ErrorPage'

const AppealForm = (props) => {

  useEffect(()=> {
        props.getFormData();
        
        //If this isn't the new appeal form, we want to get the original of the appeal we want to edit.
        if ( props.match.path!=="/new/appeal") {
            props.getEditFormData(props.match.params.id)
        }

  }, [])

  const [imgUrl, setImgUrl] = useState("")
  const [uploadStatus, setUploadStatus] = useState("")

  const openWidget = () => {

        cloudinary.openUploadWidget({
                cloudName: "dwbuqa4dx",
                uploadPreset: "m7t9mejb",
                sources: ["local", "url"],
            },
            (error, result) => {
                if (error) {
                    console.log(`Err,`, error)
                    return setUploadStatus('failed');
                }
                if (result.event == "success") {
                    console.log(`Result,`, result);
                    setImgUrl(result.info.url);
                    props.trackInput(result.info.url, 'img_url')
                    setUploadStatus('success')
                }
            }
        );
    }
        const isEditForm = props.match.path!=="/new/appeal"

        if (isEditForm && props.appealForm.formData.user_id!==props.auth.currentUser.user.id){
          return <ErrorPage message="You are not authorised to edit this appeal"/>
        }

        const clinicOptions = props.appealForm.formData.clinics.map((clinic,index)=> {
            if (isEditForm && clinic.id==props.appealForm.edit.defaultSelect.clinic.id) {
            return <option selected="selected" key={clinic.id} value={clinic.id}>{clinic.name}</option>;
            }
            else if (index==0) {
                return (
                  <option selected="selected" key={clinic.id} value={clinic.id}>
                    {clinic.name}
                  </option>
                );
            } 
            return <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
        })

        const speciesOptions = props.appealForm.formData.species.map((species, index)=> {
            if (isEditForm && species.id==props.appealForm.edit.defaultSelect.species.id) {
                return (
                  <option selected="selected" key={species.id} value={species.id}>{species.name}</option>
                );
            } else if (index==0) {
                return <option selected="selected" key={species.id} value={species.id}>{species.name} </option>
            }
            return <option key={species.id} value={species.id}>{species.name}</option>
        })
        
        
        
        return (
          <div className="jumbotron bg-light">
            <div className="container w-50">
              {props.appealForm.isLoading && (
                <ClipLoader
                  size={150}
                  color={"#123abc"}
                  loading={props.appealForm.isLoading}
                />
              )}
              {props.appealForm.patch.submitted && "Successfully updated!"}

              {props.appealForm.hasErrored && "Sorry there was an error!!"}

              {props.appealForm.edit.hasErrored &&
                `Sorry, an error has occured. Error (${props.appealForm.edit.errorDetails.statusCode}): ${props.appealForm.edit.errorDetails.statusText}`}
              <form>
                <div className="row my-4">
                  <div className="col">
                    <label for="inputPet">Pet's Name</label>
                    <input
                      className="form-control"
                      defaultValue={
                        isEditForm
                          ? props.appealForm.edit.editInput.pet_name
                          : ""
                      }
                      id="inputPet"
                      placeholder="Pet's Name"
                      onChange={(e) => {
                        isEditForm
                          ? props.trackEditInput(
                              e.target.value,
                              e.target.name
                            )
                          : props.trackInput(
                              e.target.value,
                              e.target.name
                            );
                      }}
                      required
                      name="pet_name"
                    />
                  </div>
                </div>

                <div className="row my-2">
                  <div className="col">
                    <label for="description">Description</label>

                    <input
                      required
                      id="description"
                      className="form-control"
                      defaultValue={
                        isEditForm
                          ? props.appealForm.edit.editInput.description
                          : ""
                      }
                      placeholder="Description"
                      onChange={(e) => {
                        props.trackInput(e.target.value, e.target.name);
                      }}
                      name="description"
                    />
                  </div>
                </div>

                <div className="row my-4">
                  <div className="col">
                    <label for="clinic">Clinic</label>
                    <select
                      id="clinic"
                      className="form-control"
                      onChange={(e) => {
                        isEditForm
                          ? props.trackEditInput(
                              e.target.value,
                              e.target.name
                            )
                          : props.trackInput(
                              e.target.value,
                              e.target.name
                            );
                      }}
                      defaultValue={{ value: 338, label: "Clinic" }}
                      name="clinic_id"
                    >
                      {clinicOptions}
                    </select>
                  </div>
                  <div className="col">
                    <label for="species">Species</label>

                    <select
                      id="species"
                      className="form-control"
                      onChange={(e) => {
                        isEditForm
                          ? props.trackEditInput(
                              e.target.value,
                              e.target.name
                            )
                          : props.trackInput(
                              e.target.value,
                              e.target.name
                            );
                      }}
                      name="species_id"
                    >
                      {speciesOptions}
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <label htmlFor="imgInput">
                      Image
                      <span
                        onClick={openWidget}
                        className="btn-link btn-sm"
                      >
                        Upload
                      </span>
                    </label>
                    <input
                      className="form-control"
                      name="img_url"
                      disabled="disabled"
                      id="imgInput"
                      value={imgUrl}
                      placeholder="Use the upload button!"
                    />
                  </div>
                </div>

                {isEditForm && (
                  <div className="row">
                    <div className="col-4">
                      <label for="status">Status</label>

                      <select
                        id="status"
                        className="form-control"
                        onChange={(e) => {
                          isEditForm
                            ? props.trackEditInput(
                                e.target.value,
                                e.target.name
                              )
                            : props.trackInput(
                                e.target.value,
                                e.target.name
                              );
                        }}
                        name="status"
                      >
                        <option
                          value="open"
                          selected={
                            props.appealForm.edit.editInput.status ==
                            "open"
                              ? "selected"
                              : ""
                          }
                        >
                          Open
                        </option>
                        <option
                          value="closed"
                          selected={
                            props.appealForm.edit.editInput.status ==
                            "closed"
                              ? "selected"
                              : ""
                          }
                        >
                          Closed
                        </option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="row my-4">
                  <button
                    type="submit"
                    className="btn btn-lg btn-danger btn-block"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`clicked submit button`);
                      isEditForm
                        ? props.patch(
                            props.appealForm.edit.editInput,
                            props.appealForm.edit.editInput.id
                          )
                        : props.post(
                            props.appealForm.inputData,
                            props.auth.currentUser.id
                          );
                    }}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      }




const mapStateToProps = (state) => {
    return {
        appealForm: state.appealForm,
        auth: state.auth
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        trackInput: (input, field) => {
            console.log(`track input triggered for ${field}`)
            dispatch(trackInputData(input,field));
        },
        trackEditInput: (input, field) => {
            dispatch(trackEditFormInput(input,field))
        },
        post: (payload, userId)=> {
            console.log(`posting`)
            console.log(`payload`, payload)
            dispatch(postAppealForm(payload, userId))
        },
        patch: (payload, id) => {
          console.log(`in patch function`)
          console.log(`initial payload is ${payload}`)
            dispatch(sendPatchAppealRequest(payload, id))
        },
        getFormData: ()=> {
            dispatch(getFormRenderData())
        },
        getEditFormData: (appealId) => {
            dispatch(getEditFormData(appealId))
        }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppealForm);