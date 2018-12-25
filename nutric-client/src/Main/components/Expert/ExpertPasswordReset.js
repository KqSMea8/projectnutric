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



class ExpertPasswordReset extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
    }
  }

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
    const { classes } = this.props;
    return (
      <div className={classes.maindiv}>
        <Card className={classes.card}>
        <CardContent>
         <h1 className={classes.centeredText}> Reestablece tu contraseña</h1> <br/>
          <h4 className={classes.centeredText}> Ingresa tu correo electrónico y te enviaremos un correo electrónico con las instrucciones para poder crear una nueva contraseña</h4>
         <TextField onChange={this.handleChange('email')}
          id="outlined-email-input"
          label="Ingresa aquí tu Email"
          className={classes.textField}
          type="email"
          name="email"
          fullWidth
          autoComplete="email"
          margin="normal"
          variant="outlined"
          
        />
        <Button variant="contained" color="secondary" onClick={this.handleClick}> Reestablecer contraseña </Button>
        </CardContent>
      </Card>     
    </div>
    )
  }
}


export default (withStyles(styles)(ExpertPasswordReset))
