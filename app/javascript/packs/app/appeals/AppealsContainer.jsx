import React from 'react'
import AppealResults from './components/AppealResults'
import { connect } from 'react-redux';
import { fetchAllAppeals } from '../../app/appeals/actions'

class AppealsContainer extends React.Component {
    
    componentDidMount = () => {
        this.props.fetchInitialAppeals('/api/v1/appeals.json');
      }

      render(){
        return (
          <div className="container-fluid">
              <div className="row">

                <AppealResults data={this.props.appeals.data} hasError={this.props.appeals.hasErrored} isLoading={this.props.appeals.isLoading}/>

                <div className="col">

                  
                </div>
              

              </div>
            </div>
        )
      }
}


const mapStateToProps = (state) => {
    return {
        appeals: state.appeals,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchInitialAppeals: (url) => {
          console.log(`Fetch appeals ran`)
          dispatch(fetchAllAppeals(url))
        }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppealsContainer);