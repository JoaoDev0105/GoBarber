import { isEqual } from 'date-fns';
import Appointment from '../models/Appointments';

//Date Transfer Object - DTO
interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor(){
    this.appointments = [];
  }

  public all (): Appointment[] {
    return this.appointments;
  }

  public findByDate(date:Date): Appointment | null {
    const findAppointamentInSameDate = this.appointments.find(appointment => 
      isEqual(date,  appointment.date),
   );
    return findAppointamentInSameDate || null;
  }
  //  Estrutura de parametros nomeados
  public create({ provider, date }: CreateAppointmentDTO): Appointment {
    const appointment = new Appointment({ provider, date });

    this.appointments.push(appointment);

    return appointment;
  }

}

export default AppointmentsRepository;