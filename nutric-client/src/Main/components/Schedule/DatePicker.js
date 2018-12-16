import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { TimePicker } from "antd";
import { DatePicker } from "antd";

import moment from "moment";
import "moment/locale/es";

export default class ScheduleInputTime extends React.Component {
  state = {
    scheduledTimeStart: null,
    scheduledTimeEnd: null,
    scheduledTimeDuration: 45,
    endTime: moment()
      .add(15 - (moment().minute() % 15), "minutes")
      .add(45, "minutes"),
    startTime: moment().add(15 - (moment().minute() % 15), "minutes"),
    date: moment().set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
  };

  handleTimeChange = name => time => {
    this.setState({
      [name]: time
    });
  };

  handleDateChange = date => {
    const newDate = date.set({ hour: 0, minute: 0, second: 0, millisecond: 0 });
    this.setState({ date: newDate });
  };
  disabledDate = current => {
    return (
      current &&
      current <
        moment()
          .subtract(1, "days")
          .endOf("day")
    );
  };

  getDisabledHours = () => {
    var hours = [];
    for (var i = 0; i < moment().hour(); i++) {
      hours.push(i);
    }
    return hours;
  };

  getDisabledHoursEnd = () => {
    var hours = [];
    for (var i = 0; i < this.state.startTime.hour(); i++) {
      hours.push(i);
    }
    return hours;
  };

  getDisabledMinutes = selectedHour => {
    var minutes = [];
    if (selectedHour === moment().hour()) {
      for (var i = 0; i < moment().minute(); i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  getDisabledMinutesEnd = selectedHour => {
    var minutes = [];
    if (selectedHour === this.state.startTime.hour()) {
      for (var i = 0; i < this.state.startTime.minute() + 1; i++) {
        minutes.push(i);
      }
    }
    return minutes;
  };

  render() {
    return (
      <div>
        <DatePicker
          value={this.state.date}
          onChange={this.handleDateChange}
          format={"DD/MMMM/YYYY"}
          placeholder="Fecha"
          showToday={false}
          disabledDate={this.disabledDate}
          allowClear={false}
        />
        <br />
        <TimePicker
          use12Hours
          value={this.state.startTime}
          onChange={this.handleTimeChange("startTime")}
          format={"h:mm a"}
          placeholder="Inicio"
          disabledHours={this.getDisabledHours}
          disabledMinutes={this.getDisabledMinutes}
          minuteStep={5}
          allowEmpty={false}
        />
        <TimePicker
          use12Hours
          value={this.state.endTime}
          onChange={this.handleTimeChange("endTime")}
          format={"h:mm a"}
          placeholder="Fin"
          disabledHours={this.getDisabledHoursEnd}
          disabledMinutes={this.getDisabledMinutesEnd}
          minuteStep={5}
          allowEmpty={false}
        />
        <h1>
          Duración:{" "}
          {moment(this.state.endTime).diff(this.state.startTime, "minutes")}{" "}
          minutos
        </h1>
        <h1>
          Duración: {moment(this.state.date).diff(this.state.startTime, "days")}{" "}
          días
        </h1>
      </div>
    );
  }
}
