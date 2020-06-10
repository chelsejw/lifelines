import React from 'react'
import { connect } from 'react-redux';
import { trackInputData, postAppealForm, getFormRenderData, getEditFormData, trackEditFormInput } from '../../app/forms/actions'

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
            user_id: 330,
            status: "open",
        }

        const clinicOptions = this.props.appealForm.formData.clinics.map(clinic=> {
            if (isEditForm && clinic.id==this.props.appealForm.edit.defaultSelect.clinic.id) {
                return
            }
            return <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
        })

        const speciesOptions = this.props.appealForm.formData.species.map(species=> {
            if (isEditForm && species.id==this.props.appealForm.edit.defaultSelect.species.id) {
                return
            }
            return <option key={species.id} value={species.id}>{species.name}</option>
        })
        
        
        return (
          <div className="container-fluid">
            <form>
                    <input
                    defaultValue = {isEditForm && this.props.appealForm.edit.editInput.pet_name}
                    placeholder="Pet's Name"
                    onChange={(e)=> {
                        isEditForm ? this.props.trackEditInput(e.target.value, e.target.name) : this.props.trackInput(e.target.value, e.target.name)
                    }}
                    name="pet_name"/>
                    <input
                    defaultValue = {isEditForm && this.props.appealForm.edit.editInput.img_url}                    
                    placeholder = "Image URL"
                    onChange={(e)=> {
                        isEditForm ? this.props.trackEditInput(e.target.value, e.target.name) : this.props.trackInput(e.target.value, e.target.name)
                    }}
                    name="img_url"/>
                    <input
                    defaultValue = {isEditForm && this.props.appealForm.edit.editInput.description}     
                placeholder = "Description"
                    onChange={(e)=> {
                        this.props.trackInput(e.target.value, e.target.name)
                    }}
                    name="description"/>
                    <select
                    onChange={(e)=> {
                        isEditForm ? this.props.trackEditInput(e.target.value, e.target.name) : this.props.trackInput(e.target.value, e.target.name)
                    }}
                defaultValue = {{value: 338, label: "Clinic"}}
                    name="clinic_id">
                                                {isEditForm && <option value={this.props.appealForm.edit.defaultSelect.clinic.id}>{this.props.appealForm.edit.defaultSelect.clinic.name}</option>}
                        {clinicOptions}
                    </select>
                    <select
                    onChange={(e)=> {
                        isEditForm ? this.props.trackEditInput(e.target.value, e.target.name) : this.props.trackInput(e.target.value, e.target.name)
                    }}
                    name="species_id">
                        {isEditForm && <option value={this.props.appealForm.edit.defaultSelect.species.id}>{this.props.appealForm.edit.defaultSelect.species.name}</option>}
                        {speciesOptions}
                    </select>

                    <button type="submit" className="btn btn-primary"
                    onClick={(e)=>{
                        e.preventDefault();
                        console.log(`clicked submit button`)
                        this.props.post({...fakeInput, ...this.props.appealForm.inputData});
                    }}
                    >submit</button>
                </form>
              {this.props.appealForm.isLoading && "Submitting Appeal......"}

              {this.props.appealForm.hasErrored && "Sorry there was an error!!"}

              {this.props.appealForm.edit.hasErrored && `Sorry, an error has occured. Error (${this.props.appealForm.edit.errorDetails.statusCode}): ${this.props.appealForm.edit.errorDetails.statusText}`}

            </div>
        )
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
        getFormData: ()=> {
            dispatch(getFormRenderData())
        },
        getEditFormData: (appealId) => {
            dispatch(getEditFormData(appealId))
        }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppealForm);