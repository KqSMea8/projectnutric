import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";

class TimeDisplay extends Component {
  state = {
    currentTime: new Date()
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      currentTime: new Date()
    });
  }


  render() {
    return (
      <Typography color="inherit" style={{ width: "100%", textAlign: "center" }}>
        {this.state.currentTime.toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true
        })}
      </Typography>
    );
  }
}


export default TimeDisplay;
