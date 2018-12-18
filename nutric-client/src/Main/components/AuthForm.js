import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Alert } from 'antd';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Favorite from '@material-ui/icons/Favorite';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class AuthForm extends Component {
  constructor(props){
    super(props);
    this.state={
      firstName:"",
      lastName:"",
      mail:"",
      password:"",
      remember:false
    };
  }
  
  handleChange=(e) => {
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  
  handleChangeCheckbox = event => {
    this.setState({ remember: event.target.checked });
  };
  
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
    const {firstName, lastName, mail, password}=this.state;
    const {heading, buttonText, signUp, errors, history, removeError}=this.props;
    history.listen(()=>{
      removeError();
    })
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {heading}
            </Typography>
            <Grid container>
             {errors.message && 
              <Grid item xs={12}>
                <Alert
                  message="Error"
                  description={errors.message}
                  type="error"
                  showIcon
                />
              </Grid>}
            </Grid>  
            <form className={classes.form} onSubmit={this.handleSubmit}>
            {signUp && (
              <div>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="firstName">Nombre</InputLabel>
                  <Input onChange={this.handleChange} id="firstName" name="firstName" autoComplete="firstName" autoFocus />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="lastName">Apellidos</InputLabel>
                  <Input onChange={this.handleChange} id="lastName" name="lastName" autoComplete="lastName"  />
                </FormControl>
              </div>
            )}
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="mail">Correo electrónico</InputLabel>
                <Input onChange={this.handleChange} id="mail" name="mail" autoComplete="mail" autoFocus />
              </FormControl>
              <FormControl margin="normal" required fullWidth>
                <InputLabel htmlFor="password">Contraseña</InputLabel>
                <Input onChange={this.handleChange} name="password" type="password" id="password" autoComplete="current-password" />
              </FormControl>
              {!signUp &&
              <FormControlLabel
                control={
                  <Checkbox onChange={this.handleChangeCheckbox} icon={<FavoriteBorder />} checkedIcon={<Favorite />} value="checkedH" />
                }
                label="Recuérdame siempre"
              />
              }
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                {buttonText}
              </Button>
            </form>
            {signUp ? (
            <Grid container>
              <Grid item xs={12}>
                <Link to='/login'>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="default"
                    className={classes.submit}
                  >
                    ¡Ya tengo una cuenta!
                  </Button>
                </Link>
              </Grid>
            </Grid>
            ) : 
            <Grid container>
              <Grid item xs={12}>
                <Link to='/signup'>
                  <Button
                    fullWidth
                    variant="outlined"
                    color="default"
                    className={classes.submit}
                  >
                    Quiero crearme una cuenta
                  </Button>
                </Link>
              </Grid>
            </Grid>
            }
          </Paper>
      </main>
    )
  }
}

AuthForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AuthForm);