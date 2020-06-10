import React from 'react'
import { connect } from 'react-redux';
import { trackInputData, postAppealForm, getFormRenderData } from '../../app/forms/actions'

class AppealForm extends React.Component {

    componentDidMount(){
        this.props.getFormData();
    }

      render(){
          
        const fakeInput = {
            user_id: 330,
            status: "open",
        }

        const clinicOptions = this.props.appealForm.formData.clinics.map(clinic=> {
            return <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
        })

        const speciesOptions = this.props.appealForm.formData.species.map(species=> {
            return <option key={species.id} value={species.id}>{species.name}</option>
        })
        
        
        return (
          <div className="container-fluid">
            <form>
                    <input
                    placeholder="Pet's Name"
                    onChange={(e)=> {
                        this.props.trackInput(e.target.value, e.target.name)
                    }}
                    name="pet_name"/>
                    <input
                    placeholder = "Image URL"
                    onChange={(e)=> {
                        this.props.trackInput(e.target.value, e.target.name)
                    }}
                    name="img_url"/>
                    <input

                placeholder = "Description"
                    onChange={(e)=> {
                        this.props.trackInput(e.target.value, e.target.name)
                    }}
                    name="description"/>
                    <select
                    onChange={(e)=> {
                    this.props.trackInput(parseInt(e.target.value), e.target.name)
                }}
                    name="clinic_id">
                        {clinicOptions}
                    </select>
                    <select
                    onChange={(e)=> {
                    this.props.trackInput(parseInt(e.target.value), e.target.name)
                }}
                    name="species_id">
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
        post: (payload)=> {
            console.log(`posting`)
            console.log(`payload`, payload)
            dispatch(postAppealForm(payload))
        },
        getFormData: ()=> {
            dispatch(getFormRenderData())
        }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppealForm);