import React, { Component, Fragment } from 'react';
import Navbar from '../hooks/navbar';
import PageContext from '../context/pageContext';


class Home extends Component {
    
    state = {

      }
      

    render() { 
        return (
            <PageContext.Provider value={this.state}>
            <Fragment>
                <Navbar />
            </Fragment>
            </PageContext.Provider>
          );
    }
}
 
export default Home;