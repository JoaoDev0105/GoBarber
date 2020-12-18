import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns'

import Appointment from '../models/Appointments';
// import { parseISO } from 'date-fns';

// import AppointmentsRepository from '../repositories/AppointmentsRepository';
// import CreateAppointmentService from '../services/CreateAppointmentService';




const appointments: Appointment[] = [];

const appointmentsRouter = Router();
// const appointmentsRepository = new AppointmentsRepository();
appointmentsRouter.post('/', (request, response) => {
  
  const { provider, date } = request.body;
  
  const parseDate = startOfHour(parseISO(date));
  const findAppointamentInSameDate = appointments.find(appointment => 
     isEqual(parseDate,  appointment.date),
  );
  
  if(findAppointamentInSameDate) {
    return response
    .status(400)
    .json({ message: 'This appointment is already booked'});
  }

  const appointment = new Appointment(provider, parseDate);

  appointments.push(appointment);

  return response.json(appointment);
});



export default appointmentsRouter;