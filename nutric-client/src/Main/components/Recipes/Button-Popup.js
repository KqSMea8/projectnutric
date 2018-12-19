   import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Input from '@material-ui/core/Input';
import {apiCall} from '../../services/api'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import classNames from 'classnames';
import MenuItem from '@material-ui/core/MenuItem';

import tacutacu from '../../images/tacutacu.jpg'


const styles  = theme => ({
    dialogPaper: {
        minHeight: '85vh',
        maxHeight: '85vh',
    },
    card: {
        maxWidth: 345,
  },
    media: {
         height: 140,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 2000,
  },
})
const selectCategory= [
  {
    value: 'Postre',
    label: 'Postre',
  },
  {
    value: 'Desayuno',
    label: 'Desayuno',
  },
  {
    value: 'Comida',
    label: 'Comida',
  },
];





class ButtonPopup extends Component {
  state = {
    open: false,
    multiline:"",
    recipeName: "",
    duration:"",
    patient:"",
    category: '',
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const { currentUserId } = this.props
    const {recipeName, category, duration} = this.state;
  
       
    apiCall("post", `/api/experts/${currentUserId}/recipes/`,{
      recipeName:recipeName,
      category:category,
      duration:duration
    })
    .then(res => {
      console.log(res)
    let path = `/recetas`;
    this.props.history.push(path);
    })
    .catch(err => {
      console.log(err)
    });
  }
  
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {currentUserId}=this.props
    const { classes } = this.props;

    
    return (
      <div>
        <Button variant="outlined" color="secondary" onClick={this.handleClickOpen}>
          <Add/> Agregar nueva receta
        </Button> 
        <Dialog
          classes={{paper:classes.dialogPaper}}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Crea una nueva receta</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <Grid container direction="row" justify="space-between" alignItems="baseline">
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                  
{/* //////////////////////////// NOMBRE DE LA RECETA//////////////////////////////////////////////////////////////////////////*/}
                 
                  <Grid item md={6} xs={12}>  
                    <Grid container justify="space-between" alignItems="center">
                      <Grid item md={3} xs={4}> Nombre: </Grid>
                      <Grid item md={7} xs={8}>
                          <Input
                          type="string"
                          placeholder="Tacu Tacu a la Norteña"
                          value = {this.state.recipeName}
                          onChange = {this.handleChange('recipeName')}
                          
                        />
                        </Grid>
                      <Grid item md={2} xs={4}></Grid>      
                      
{/* //////////////////////////// PORCIONES//////////////////////////////////////////////////////////////////////////*/}
                      
                      <Grid item md={3} xs={4}> Porciones: </Grid>
                      <Grid item md={4} xs={8}>
                      
                          <Input
                          type="string"
                          placeholder="3 platos"
                        />
                        </Grid>              
                      <Grid item md={5} xs={4}></Grid>
                      
{/* //////////////////////////// DROPDOWN SELECCIONAR CATEGORIA//////////////////////////////////////////////////////////////////////////*/}

                      <Grid item md={3} xs={4}> Categoria: </Grid>
                      <Grid item md={9} xs={8}>                        
                       <TextField
                          select
                          className={classNames(classes.margin, classes.textField)}
                          value={this.state.category}
                          onChange={this.handleChange('category')}
                          InputProps={{
                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                          }}
                        >
                          {selectCategory.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </TextField>  
                      </Grid>
{/* //////////////////////////// DURACION PROMEDIO //////////////////////////////////////////////////////////////////////////*/}
                      
                      <Grid item md={3} xs={4}> Duracion: </Grid>
                      <Grid item md={4} xs={8}>
                      
                          <Input
                          type="string"
                          placeholder="45 minutos"
                          value={this.state.duration}
                          onChange={this.handleChange('duration')}                          
                        />
                        </Grid>              
                      <Grid item md={5} xs={4}></Grid>
                      
                    </Grid>
                  </Grid>  
{/* //////////////////////////// CARD DE IMAGEN Y BOTONES //////////////////////////////////////////////////////////////////////////*/}

                  <Grid item md={6} xs={12} align="center">
                     <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia 
                        
                          className={classes.media}
                          image= {tacutacu}
                          title="Tacu Tacu a la Norteña"
                        />
                        <CardContent>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <Button variant="contained" size="medium" color="primary" className={classes.margin}>
                          Editar Imagen
                        </Button>
                        <Button variant="contained" size="medium" color="secondary" className={classes.margin}>
                          Eliminar receta
                        </Button>
                      </CardActions>
                    </Card>
                  
                  </Grid>

                </Grid>
                <Grid container direction="row" justify="center" alignItems="baseline" spacing={40}>
                  <Grid item md={2} xs={4}>Categoria</Grid>
                  <Grid item md={10} xs={8}>

                  </Grid>
                  <Grid item md={2} xs={4}></Grid>
                  <Grid item md={4} xs={8}>
  
                  </Grid>
                  <Grid item md={2} xs={4}></Grid>
                  <Grid item md={4} xs={8}>

                  </Grid>
                  <Grid item md={2} xs={4}></Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Instrucciones:"
                      multiline
                      rowsMax="4"
                      value={this.state.notes}
                      onChange={this.handleChange('notes')}
                      margin="normal"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} variant="contained" color="primary">
              Guardar Receta
            </Button>
            <Button onClick={this.handleClose} variant="contained" color="secondary">
              Cerrar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ButtonPopup.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return{
    patients: state.patients,
    currentUserId: state.currentUser.user.id
  };
};
  
export default connect(mapStateToProps, null)(withStyles(styles)(ButtonPopup));