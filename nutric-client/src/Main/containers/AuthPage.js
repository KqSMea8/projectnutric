import React, {Component} from 'react';
import { connect } from 'react-redux';
import '../../App.css';
import { Route, Switch } from 'react-router-dom';
import { removeError } from '../store/actions/errors';
import { authUser } from '../store/actions/auth'
import AuthForm from '../components/AuthForm';

class AuthPage extends Component{
  render(){
    const { errors, authUser, removeError } = this.props;
    
    return(
      <div>
        <Switch>
          <Route 
            exact 
            path="/login" 
            render={props => {
              return(
                <AuthForm 
                  removeError={removeError} 
                  errors={errors} 
                  onAuth={authUser} 
                  buttonText="Inicia Sesión" 
                  heading="Bienvenido, extranjero" 
                  {...props}
                />
              );
            }}
          />
          <Route 
            exact 
            path="/signup" 
            render={props => {
              return(
                <AuthForm 
                  removeError={removeError} 
                  errors={errors} 
                  onAuth={authUser} 
                  signUp 
                  buttonText="Registro" 
                  heading="Únete a Nutric.io" 
                  {...props} 
                />
              );
            }}
          />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    errors: state.errors
  }
}

export default connect(mapStateToProps, { authUser, removeError })(AuthPage);