import React, { Component } from 'react';
import { apiCall } from '../../services/api'


import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';


const styles = theme => ({
  card: {
    minWidth: 275,
    marginBottom: 20,
  },

  title: {
    fontSize: 14,
  },

  textField: {
    marginLeft: "auto",
    marginRight: "auto",
    width: '100%',
    textAlign: "center"
  },

  inputField: {
    width: '60%',
    marginTop: 10,
    marginLeft: 5,
  },

  maindiv: {
    margin: "0 auto",
  },
  centeredText: {
    textAlign: 'center'
  },

});



class ExpertPasswordUpdate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      update: false,
      isLoading: true,
      error: false,
    }
  }

  async componentDidMount() {
    console.log(this.props.match.params.token)
    await apiCall("get", `/api/experts/reset`, {
        params: {
          resetPasswordToken: this.props.match.params.token,
        },
      }).then(response => {
        console.log(response);
        if (response.data.message === 'password reset link a-ok') {
          this.setState({
            firstName: response.data.firstName,
            update: false,
            isLoading: false,
            error: false,
          });
        }
        else {
          this.setState({
            update: false,
            isLoading: false,
            error: true,
          });
        }
      })
      .catch(error => {
        console.log("error");
      });
  }

  updatePassword = e => {
    e.preventDefault();
    apiCall("put", `/api/experts/updatePassword/`, {
        firstName: this.state.firstName,
        password: this.state.password,
      })
      .then(response => {
        console.log(response.data);
        if (response.data.message === 'password updated') {
          this.setState({
            updated: true,
            error: false,
          });
        }
        else {
          this.setState({
            updated: false,
            error: true,
          });
        }
      })
      .catch(error => {
        console.log(error.data);
      });
  };


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClick = (e) => {
    const { email } = this.state

    apiCall("post", `/api/experts/forgot_password/`, {
        email: email
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      });
  }

  render() {
    const { password, error, isLoading, updated } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.maindiv}>
        <Card className={classes.card}>
        <CardContent>
          <form className="password-form" onSubmit={this.updatePassword}>
            <TextField

              id="password"
              label="password"
              onChange={this.handleChange('password')}
              value={password}
              type="password"
            />
            <Button> Update Password</Button>
          </form>
        </CardContent>
      </Card>     
    </div>
    )
  }
}


export default (withStyles(styles)(ExpertPasswordUpdate))
