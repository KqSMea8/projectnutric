import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import '../../App.css';
import { setAuthorizationToken, setCurrentUser } from "../store/actions/auth";

import AuthPage from './AuthPage';
import Main from './Main';

// hacer handler para routes no especificadas. ej /weigvuwgeuv que bote error 



const store = configureStore(); 

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  // prevent someone from manually tampering with the key of jwtToken in localStorage
  try {
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
  } catch (e) {
    store.dispatch(setCurrentUser({}));
  }
}


class App extends Component {
  render(){
   return(
    <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login" component={AuthPage}/>
            <Route path="/signup" component={AuthPage}/>
            <Route path="/" component={Main}/>
          </Switch>
        </Router>
    </Provider>
    )
  }
}
  
export default App;
