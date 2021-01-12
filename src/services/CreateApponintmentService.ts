import { startOfHour } from 'date-fns';

import Appointment from '../models/Appointments';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  
  private appointmentsRepository: AppointmentsRepository;
//  recebendo o tipo de variavel de outra classe
  constructor(appointmentsRepository: AppointmentsRepository){
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: Request): Appointment {
   
    const appointmentDate = startOfHour(date);
    
    const findAppointamentInSameDate = this.appointmentsRepository.findByDate(
      appointmentDate,
    );
    if (findAppointamentInSameDate){
      throw Error ('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;