import React from 'react';
import { Page, Text, View, Document, StyleSheet, BlobProvider } from '@react-pdf/renderer';

// Create styles
const newstyles = StyleSheet.create({
  page: {
    display: "grid",
    padding: 30,
  },
  header: {
    display: "flex",
    flexFlow: "row wrap",
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
    backgroundColor: "red"
  },
  subHeader: {
    flexGrow: 1,
    alignSelf: "flex-start"
  },
  mealTitle: {
    display: "flex",
    flexFlow: "row wrap",
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "green",
  },
  footer: {
    display: "flex",
    flexFlow: "row wrap",
    flexDirection: 'row',
    alignItems: 'stretch',
    backgroundColor: "orange",
  },
  subFooter: {
    flexGrow: 1,
    alignSelf: "flex-start"
  },
  sign: {
    borderTopWidth: 2,
    borderTopColor: '#112131',
    borderTopStyle: 'solid',
  },
  centerText: {
    alignText: "center"
  },
  dayPlan: {
    color: "gray",
    fontSize: 10
  }
});


class PDF extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPDF: false
    }
  }

  componentDidMount() {
    setInterval(() => { this.setState({ showPDF: true }) }, 500);
  }


  render() {
    const MyDocument = (
      <Document title={this.props.plan.mealPlanName}>
            <Page size="A4" style={newstyles.page} orientation="landscape">
              {/*hedaer*/}
              <View style={newstyles.header}>
                <View style={newstyles.subHeader}>
                  <Text>{"Nutric.io"}</Text>
                </View>
                <View style={newstyles.subHeader}>
                  <Text>{"Paciente: Juan O'leary"}</Text>
                </View>
                <View style={newstyles.subHeader}>
                  <Text>{"Telefono: 999 999 999 \r\nCorreo: juanoleary@gane.com"}</Text>
                </View>
              </View>
              {/*contenido*/}
              <View style={newstyles.mealTitle}>
                <Text style={newstyles.centerText}>{"Plan Alimenticio: "+this.props.plan.mealPlanName}</Text>
              </View>
              {this.props.plan.days.map((day,dindex)=>{ return(
                <View style={newstyles.dayPlan} key={dindex}>
                  <Text>{day.dayName}</Text>
                    {day.meals.map((meal,mindex)=>{ return(
                    <View key={dindex+"-"+mindex}>
                      <View>
                        <Text>{"Comida : "+ meal.mealName}</Text>
                        <Text>{"Hora : "+ meal.mealTime}</Text>
                        {meal.recipes.map((recipe,rindex)=>{ return (
                          <View key={dindex+"-"+mindex+"-"+rindex}>
                            <Text>{"\u2022 "+ recipe.type}</Text>
                          </View>
                        )})}
                      </View>
                    </View>
                    )})}
                </View>
                  )})}
              {/*footer*/}
              <View style={newstyles.footer}>
                <View style={newstyles.subFooter}>
                  <Text>{"Próxima Consulta: 02/02/2008 5:30pm"}</Text>
                </View>
                <View style={newstyles.subFooter, newstyles.sign}>
                  <Text style={{paddingTop:"5px"}}>{"Firma: María Matayuca"}</Text>
                </View>
              </View>
            </Page>
          </Document>
    )
    return (
      <div>
        {this.state.showPDF && (
          <BlobProvider document={MyDocument}>
            {({ blob, url }) => (
              <a href={url} target="_blank">Previsualizar</a>
            )}
          </BlobProvider>
        )}
      </div>
    )
  }
}
export default PDF;
