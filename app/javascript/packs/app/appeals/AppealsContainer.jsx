import React from 'react'
import AppealListing from './components/AppealListing'
import { connect } from 'react-redux';
import { appealsFetchData } from '../../app/appeals/actions'

class AppealsContainer extends React.Component {
    
    componentDidMount = () => {
        this.props.fetchAppeals('/api/v1/appeals.json');
      }

      render(){
          let results;
          if (this.props.appeals.hasErrored) {
            results = <p>Sorry! There was an error loading the items</p>
          }
          if (this.props.appeals.isLoading) {
            results = <p>Loading…</p>
          }
          results = this.props.appeals.data.map((appeal) => {
                  return <AppealListing key={appeal.id} appeal={appeal}/>
        })
        return (

          <div className="container-fluid">
              <div className="row">

                <div className="col">
                  <h3>Look for Appeals</h3>
                  <ul>
                    {results}
                  </ul>
                </div>

                <div className="col">

                  Hello put your appeals here

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
        fetchAppeals: (url) => {
          console.log(`Fetch appeals ran`)
          dispatch(appealsFetchData(url))
        }
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppealsContainer);