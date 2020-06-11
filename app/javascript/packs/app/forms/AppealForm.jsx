import React from 'react'
import { connect } from 'react-redux';
import { trackInputData, postAppealForm, getFormRenderData, getEditFormData, trackEditFormInput, sendPatchAppealRequest } from '../../app/forms/actions'
import ClipLoader from "react-spinners/ClipLoader";

class AppealForm extends React.Component {

    componentDidMount(){
        this.props.getFormData();
        
        //If this isn't the new appeal form, we want to get the original of the appeal we want to edit.
        if ( this.props.match.path!=="/appeals/new") {
            this.props.getEditFormData(this.props.match.params.id)
        }
    }

      render(){

        const isEditForm = this.props.match.path!=="/appeals/new"

        let fakeInput = {
            user_id: 1,
            status: "open",
        }

        const clinicOptions = this.props.appealForm.formData.clinics.map((clinic,index)=> {
            if (isEditForm && clinic.id==this.props.appealForm.edit.defaultSelect.clinic.id) {
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

        const speciesOptions = this.props.appealForm.formData.species.map((species, index)=> {
            if (isEditForm && species.id==this.props.appealForm.edit.defaultSelect.species.id) {
                return (
                  <option selected="selected" key={species.id} value={species.id}>{species.name}</option>
                );
            } else if (index==0) {
                return <option selected="selected" key={species.id} value={species.id}>{species.name} </option>
            }
            return <option key={species.id} value={species.id}>{species.name}</option>
        })
        
        
        return (
          <div className="container-fluid">
            <div className="jumbotron bg-light">
              {this.props.appealForm.isLoading && (
                <ClipLoader
                  size={150}
                  color={"#123abc"}
                  loading={this.props.appealForm.isLoading}
                />
              )}

              {this.props.appealForm.hasErrored && "Sorry there was an error!!"}

              {this.props.appealForm.edit.hasErrored &&
                `Sorry, an error has occured. Error (${this.props.appealForm.edit.errorDetails.statusCode}): ${this.props.appealForm.edit.errorDetails.statusText}`}
              <form>
                <div className="row my-4">
                  <div className="col">
                    <label for="inputPet">Pet's Name</label>
                    <input
                      className="form-control"
                      defaultValue={
                        isEditForm
                          ? this.props.appealForm.edit.editInput.pet_name
                          : ""
                      }
                      id="inputPet"
                      placeholder="Pet's Name"
                      onChange={(e) => {
                        isEditForm
                          ? this.props.trackEditInput(
                              e.target.value,
                              e.target.name
                            )
                          : this.props.trackInput(
                              e.target.value,
                              e.target.name
                            );
                      }}
                      required
                      name="pet_name"
                    />
                  </div>
                  <div className="col">
                    <label for="inputImg">Image URL</label>
                    <input
                      id="inputImg"
                      required
                      className="form-control"
                      defaultValue={
                        isEditForm
                          ? this.props.appealForm.edit.editInput.img_url
                          : ""
                      }
                      placeholder="Image URL"
                      onChange={(e) => {
                        isEditForm
                          ? this.props.trackEditInput(
                              e.target.value,
                              e.target.name
                            )
                          : this.props.trackInput(
                              e.target.value,
                              e.target.name
                            );
                      }}
                      name="img_url"
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
                          ? this.props.appealForm.edit.editInput.description
                          : ""
                      }
                      placeholder="Description"
                      onChange={(e) => {
                        this.props.trackInput(e.target.value, e.target.name);
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
                          ? this.props.trackEditInput(
                              e.target.value,
                              e.target.name
                            )
                          : this.props.trackInput(
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
                          ? this.props.trackEditInput(
                              e.target.value,
                              e.target.name
                            )
                          : this.props.trackInput(
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

                <div className="row my-4">
                  <button
                    type="submit"
                    className="btn btn-lg btn-danger btn-block"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log(`clicked submit button`);
                      isEditForm
                        ? this.props.patch(this.props.appealForm.edit.editInput)
                        : this.props.post({
                            ...fakeInput,
                            ...this.props.appealForm.inputData,
                          });
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
}



const mapStateToProps = (state) => {
    return {
        appealForm: state.appealForm,
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
        post: (payload)=> {
            console.log(`posting`)
            console.log(`payload`, payload)
            dispatch(postAppealForm(payload))
        },
        patch: (payload) => {
            dispatch(sendPatchAppealRequest(payload))
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