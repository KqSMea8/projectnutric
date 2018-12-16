import React from 'react';
import {Link} from 'react-router-dom';
import Navbar from '../containers/Navbar'


//El homepage vendría a ser el landing de nutric
const Homepage = ({currentUser}) => {
    console.log(currentUser);
    if(!currentUser.isAuthenticated){
      return(
        <div>
          <Navbar/>
          <div className="home-hero">
            <h1>Sea un buen nutrizionistaz</h1>
            <h4>¿Nuevo en Nutric.io?</h4>
            <Link to="/signup" className="btn btn-danger">
              Regístrate
            </Link>
          </div>   
        </div>
      );
    }
    return (
      <div>
        CLARO PIIIII
      </div>
    )
}
 export default Homepage