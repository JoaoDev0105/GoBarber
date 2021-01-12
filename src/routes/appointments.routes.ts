import { Router } from 'express';
import { startOfHour, parseISO} from 'date-fns'

 import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository(); // Instanciando a classe
  
  // SoC: Separtion of Concerns (Separação de preoucupações)

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

appointmentsRouter.post('/', (request, response) => {
  
  const { provider, date } = request.body;
  
  const parseDate = startOfHour(parseISO(date));
   
  const findAppointamentInSameDate = appointmentsRepository.findByDate(
    parseDate,
  );

  if(findAppointamentInSameDate) {
    return response
    .status(400)
    .json({ message: 'This appointment is already booked'});
  }

  const appointment = appointmentsRepository.create(provider, parseDate);

  

  return response.json(appointment);
});



export default appointmentsRouter;