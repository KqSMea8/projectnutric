import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import '../../App.css';
import { setAuthorizationToken, setCurrentUser, authUser } from "../store/actions/auth";

import AuthPage from './AuthPage';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from "./Dashboard";
import Main from './Main';
import NoMatch from '../components/NoMatch';

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
