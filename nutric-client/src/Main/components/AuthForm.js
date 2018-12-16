import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName:"",
      mail:"",
      password:""
    };
  }
  
  handleChange=(e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  
  handleSubmit=(e) => {
    e.preventDefault();
    const authType= this.props.signUp? "signup":"login"
    this.props
      .onAuth(authType, this.state)
      .then(()=>{
          //te debería redirigir a un subdomain app.nutric.io/
          this.props.history.push('/')
      })
      .catch(()=>{
        return;
      })
  }
  
  render(){
    const {firstName, mail, password}=this.state;
    const {heading, buttonText, signUp, errors, history, removeError}=this.props;
    history.listen(()=>{
      removeError();
    })
    return (
      <div>
        <div className='row'>
         {errors.message && <div className="mx-auto alert alert-danger justify-content-center">{errors.message}</div>}
        </div>  
          <div className="row justify-content-md-center text-center">
            <div className="col-md6">
              <form onSubmit={this.handleSubmit}>
                <h2>{heading}</h2>
                
    {/*=====SIGN UP=======*/}
    
                {signUp && (
                  <div>
                    <label htmlFor="password">Nombre:</label>
                    <input 
                        className="form-control"
                        id="firstName"
                        name="firstName"
                        onChange={this.handleChange}
                        type="text"
                    />
                  </div>
                )}
                <label htmlFor="mail">Correo electrónico:</label>
                <input 
                  className="form-control"
                  id="mail"
                  name="mail"
                  onChange={this.handleChange}
                  value={mail}
                  type="text"
                />
                <label htmlFor="password">Contraseña:</label>
                <input 
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={this.handleChange}
                  type="password"
                />
                <button className="btn btn-primary btn-block btn-lg">
                  {buttonText}
                </button>
                
                {!signUp && (
                    <Link to='/signup'>
                      <button className="btn btn-info btn-block btn-lg">
                        Quiero crearme una cuenta
                       </button>
                    </Link>
                )}
                {signUp && (
                    <Link to='/login'>
                      <button className="btn btn-info btn-block btn-lg">
                        Ya tengo una cuenta  
                      </button>
                    </Link>
                )}
              </form>
            </div>
          </div>
      </div>
    )
  }
}

export default AuthForm;