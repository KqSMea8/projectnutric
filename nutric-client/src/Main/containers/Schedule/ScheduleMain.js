import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPatients} from '../../store/actions/patients';
import {fetchAppointments} from '../../store/actions/appointments';
import BigCalendar from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'

import Grid from '@material-ui/core/Grid';
import Popup from '../../components/Schedule/Popup'

const DragAndDropCalendar = withDragAndDrop(BigCalendar)
require('moment/locale/es.js');

const localizer = BigCalendar.momentLocalizer(moment)

const events=[
  {
    id: 13,
    title: 'Multi-day Event',
    start: new Date(2018,12, 20, 19, 30, 0),
    end: new Date(2018,12, 22, 2, 0, 0),
  },
  {
    id: 14,
    title: 'Today',
    start: new Date(new Date().setHours(new Date().getHours() - 3)),
    end: new Date(new Date().setHours(new Date().getHours() + 3)),
  },
]

class ScheduleMain extends Component{
  constructor(props) {
    super(props)
    this.state = {
      events: []
    }
    this.moveEvent = this.moveEvent.bind(this)
    this.newEvent = this.newEvent.bind(this)
  }
  
  componentDidMount(){
    const { currentUserId } = this.props;
    this.props.fetchAppointments(currentUserId, console.log('was fetched'));
    this.props.fetchPatients(currentUserId, console.log('was fetched'));
  }
  
  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    // alert(`${event.title} was resized to ${start}-${end}`)
  }

  newEvent(event) {
    let idList = this.state.events.map(a => a.id)
    let newId = Math.max(...idList) + 1
    let hour = {
      id: newId,
      title: 'New Event',
      allDay: event.slots.length == 1,
      start: event.start,
      end: event.end,
    }
    this.setState({
      events: this.state.events.concat([hour]),
    })
  }
  render(){
    const {headerTitle}=this.props
    const {appointments}=this.props
    const appointmentsList = appointments.map(function(appointment){
      return {id: appointment._id, title: "Consulta", start: moment(appointment.scheduledInfo.scheduledTimeStart).toDate(), end: moment(appointment.scheduledInfo.scheduledTimeEnd).toDate()}
    })
    return(
      <div>
        <div>{headerTitle}</div>
        <Grid container justify="space-between" alignItems="baseline" spacing={16}>
          <Grid item xs={6}>
              <div>Acá va la tabla de schedule</div>
          </Grid>
          <Grid item xs={6} align="right">
              <Popup/>
          </Grid>
          <Grid item xs={12}>
            <div style={{height: "700px"}}>
                <DragAndDropCalendar
                  selectable
                  localizer={localizer}
                  events={appointmentsList}
                  onEventDrop={this.moveEvent}
                  resizable
                  onEventResize={this.resizeEvent}
                  onSelectSlot={this.newEvent}
                  defaultView={BigCalendar.Views.WEEK}
                />
            </div>
          </Grid>
        </Grid>
      </div>
    )
  }
};

function mapStateToProps(state){
  return{
    appointments: state.appointments,
    patients: state.patients,
    currentUserId: state.currentUser.user.id
  };
};

export default connect(mapStateToProps, { fetchAppointments, fetchPatients})(ScheduleMain);
