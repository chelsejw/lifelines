import React from 'react'
import AppealListing from './AppealListing'
import { connect } from 'react-redux';
import { itemsFetchData } from '../../redux/actions'

class AppealResults extends React.Component {
    
    componentDidMount = () => {
        this.props.fetchData('/api/v1/appeals.json');
      }

      render(){
          let results;
          if (this.props.hasErrored) {
            results = <p>Sorry! There was an error loading the items</p>
          }
          if (this.props.isLoading) {
            results = <p>Loading…</p>
          }
        
          results = this.props.items.map((appeal) => {
                  return <AppealListing key={appeal.id} appeal={appeal}/>
        })
        return (
            <div>
              {results}
            </div>
        )
      }
}


const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(AppealResults);