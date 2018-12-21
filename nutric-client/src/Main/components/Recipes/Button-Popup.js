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
import SearchBar from './Rec.SearchBar';


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
    category: '',
    selectedFile: null,
    ingredients: [             
      {type:"1 vaso de bebida de soya sin azúcar", 
      calories_kcal:Math.random() * 300,
      protein_g:Math.random() * 25,
      carbs_g:Math.random() * 50,
      fat_g:Math.random() * 30
              }],
    instructions :["hola"]        
  };

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  fileSelectedHandler = event => {
   this.setState ({
     selectedFile: event.target.files[0]
   })
  }
  
  fileUploadHandler = () => {
      let formData = new FormData();
      let file = this.state.selectedFile
      let { currentUserId } = this.props
      formData.append("display", file)
      const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }}
      console.log(formData)
      apiCall("post", `/api/experts/${currentUserId}/recipes/`,{
        display: formData,
        recipeName: 'hola'
      },config
      
      )
      .then(res => {
        console.log(res)
  });
    
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let { currentUserId } = this.props
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
  
  addNewRecipeButton = (selected,  identifier) => {
    const ingredients = this.state.ingredients
    console.log(this.state.ingredients)
    const updated = ingredients.push({
        type: selected.foodName,
        calories_kcal:selected.calories_kcal,
        protein_g:selected.protein_g,
        carbs_g:selected.carbs_g,
        fat_g:selected.fat_g}
      )
    this.setState({
      ingredients: ingredients
           
    })
  
    console.log(this.state.ingredients)
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
  handleChangeArray = name => event => {
    this.setState({
      ...this.state.instructions,[name]: event.target.value,
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
                    
                  

{/* //////////////juanhiena////////////// DESCRIPCION //////////////////////////////////////////////////////////////////////////*/}
                      
                      <Grid item md={3} xs={6}>Descripción </Grid>
                      <Grid item md={8} xs={6}>
                              <TextField
                                id="filled-multiline-flexible"
                                multiline
                                rowsMax="4"
                                value={this.state.description}
                                onChange={this.handleChange('description')}
                                className={classes.textField}
                                margin="normal"
                                variant="filled"
                              />
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
                        <Button variant="contained" size="small" color="primary" className={classes.margin} onClick = {this.fileUploadHandler}>
                          Subir imagen
                        </Button>
                        <Button variant="contained" size="small" color="secondary" className={classes.margin}>
                          Eliminar receta
                        </Button>
                        </CardContent>
                      </CardActionArea>
                      <CardActions>
                        <input type="file" name="display" onChange={this.fileSelectedHandler}/>
                      </CardActions>
                    </Card>
                  
                  </Grid>

                </Grid>
{/* //////////////////////////// ESPACITO ENTRE LA PRIMERA MTIAD Y LA SEGUNDA (no funcionaba el puto margin-top y tenia que solucionar) //////////////////////////////////////////////////////////////////////////*/}
                <Grid container xs={12} > <br/> </Grid>
                <Grid container direction="row" justify="space-between" alignItems="flex-start" spacing={40} styles={{marginTop:'20'}}>
                  <Grid item md={6} xs={12}>  
                  
                    
                      Ingredientes:
                      <SearchBar selectedInputIdentifier={[]} selectedFood={this.state.selectedFood} addNewRecipeButton={this.addNewRecipeButton}/>
              
                    
                  </Grid>  
                  <Grid item md={6} xs={12}>  
                 
                      <ol>Instrucciones:
                            <li><TextField
                              
                              id="standard-name"
                              className={classes.textField}
                              value={this.state.instructions}
                              placeholder="Primer instrucción"
                              onChange={this.handleChangeArray('instructions')}
                            />
                            </li>
                      </ol>
                      
                    { console.log(this.state.instructions)}
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