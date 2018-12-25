import React, {Component} from 'react';
import {connect} from 'react-redux';


import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import "antd/dist/antd.css";
import { DatePicker } from "antd";
import GoogleApiWrapper from './LocationGoogleMaps';

const styles = theme => ({
  card: {
    minWidth: 275,
    marginBottom: 20,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
    textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
    inputField: {
      width: '60%',
      marginTop:10,
      marginLeft: 5,
    },
    group: {
      marginTop:15,
      marginBottom:10,
      marginLeft:5,
      width: 'auto',
      height: 'auto',
      display: 'flex',
      flexWrap: 'nowrap',
      flexDirection: 'row'
    },
});



class ExpertProfile extends Component{
  constructor(props){
 
    super(props)
      const {currentUserName} = this.props
      const {currentUserMail} = this.props
      this.state = {
        name: currentUserName,
        mail:currentUserMail,
        apellidos:"",
        documento:"",
        birthDate:"",
        celular:'',
        email:'',
        gender:'Male',
      }
  }

  
    handleChange = name => event => {
      this.setState({
      [ name]: event.target.value,
      });
    };
    
    handleFormControlChange = event => {
    this.setState({ gender: event.target.value });
     };
    
  render(){
  const { classes } = this.props;
  

  return (
    <div style={{marginBottom: 50}}>
    <h2> Mi perfil</h2> 
        <Card className={classes.card}>
        <CardContent>
          <Typography variant="h5" component="h2">
            
               <Grid container >
      <Grid container  >
        <Grid container  >
          <TextField
            label="Nombre"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
          />
         
          <TextField
            label="Apellidos"
            className={classes.textField}
            value={this.state.apellidos}
            onChange={this.handleChange('apellidos')}
          />
          <TextField
            label="Doc de Identidad"
            className={classes.textField}
            value={this.state.documento}
            onChange={this.handleChange('documento')}
          />
         
          <RadioGroup
            aria-label="Sex"
            className={classes.group}
            value={this.state.gender}
            onChange={this.handleFormControlChange}
          > 
            <FormControlLabel value="Male" control={<Radio style={{padding: '0 12px'}} />} label="Hombre" />
            <FormControlLabel value="Female" control={<Radio style={{padding: '0 12px'}} />} label="Mujer" />
          </RadioGroup>
        </Grid>  
        <Grid container  >
          <TextField
            label="Nacionalidad"
            className={classes.textField}
            value={this.state.nacionalidad}
            onChange={this.handleChange('nacionalidad')}
          />
         
          <TextField
            label="Celular"
            className={classes.textField}
            value={this.state.celular}
            onChange={this.handleChange('celular')}
          />
          <TextField
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
          />
          <DatePicker
            value={this.state.birthDate}
            onChange={this.handleDateChange}
            format={"DD/MMMM/YYYY"}
            placeholder="Fecha de nacimiento"
            showToday={false}
            disabledDate={this.disabledDate}
            allowClear={false}
            className={classes.inputField}
          />
        </Grid>  
      </Grid>
    </Grid>
          </Typography>
        </CardContent>
      </Card>     
    </div> 
    )
}
}


function mapStateToProps(state){
  return{
    
    currentUserName: state.currentUser.user.firstName,
    currentUserMail: state.currentUser.user.email
  };
};
  
export default connect(mapStateToProps,) (withStyles(styles)(ExpertProfile))
  


