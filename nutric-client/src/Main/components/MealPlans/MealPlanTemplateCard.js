import React from 'react';
import PropTypes from 'prop-types';
import '../../../App.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import InfoIcon from '@material-ui/icons/Info';
import PopupMealPlanTemplate from './PopupMealPlanTemplate';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};


function MealPlanTemplateCard(props) {
  const { classes, image, imageTitle, mealPlanTemplateName, calories, protein, carbs, fat, popupRemove, show} = props;
  return (
    
    <Grid item style={{height: '100%', minHeight: '70px'}} xs={4} >
      <Card className='mptCard'>
      
      {/* ========= BOTONES DE DELETE E INFO ==========*/}
        <Grid container className='mptCardButtons' justify='center' alignItems='center' >
          <PopupMealPlanTemplate popupRemove={popupRemove}/>
          <IconButton disableRipple onClick={show}> {/*redirigir a edicion de dieta o ver detalles en popup?*/}
            <InfoIcon style={{ color: "blue" }} />
          </IconButton>
        </Grid>
      {/* =============================================*/}  
        
        <Grid container style={{height: '100%'}} > 
          <Grid item md={5} style={{height: "100%"}}>
            <CardMedia 
              image={image}
              title={imageTitle}
              style={{height: "100%"}}
            />
          </Grid>
          <Grid item md={7} style={{padding: '8px 5px 0px 5px'}}>
            <Grid container style={{height: '100%'}}>
              <Grid item xs={12}>
                <Typography variant={'subtitle1'}>{mealPlanTemplateName}</Typography>
              </Grid>
              <Grid item xs={12} >
                <Grid container alignContent={'center'} style={{height: '100%', textAlign: 'center', alignItems: 'center'}}>
                  <Grid item xs={3}>
                    <Typography style={{fontSize: 'small'}}>{calories}kcal</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography style={{fontSize: 'small'}}>{protein}gr</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography style={{fontSize: 'small'}}>{carbs}gr</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography style={{fontSize: 'small'}}>{fat}gr</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        
        
        
        
      </Card>
    </Grid>
  );
}

MealPlanTemplateCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MealPlanTemplateCard);

