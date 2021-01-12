import { Router } from 'express';
import { parseISO } from 'date-fns'

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateApponintmentService';


const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository(); // Instanciando a classe

// SoC: Separtion of Concerns (Separação de preoucupações)

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.json(appointments);
});

// Rota para criação do repositorio 
appointmentsRouter.post('/', (request, response) => {

  try { // criando a requisição da rota de create sem a responsabilidade 
    const { provider, date } = request.body;

    const parseDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({ date: parseDate, provider });

    return response.json(appointment);
  } catch (err) { // tratando o erro fora da regra de negocio
    return response.status(400).json({ error: err.message });
  }
});
 


export default appointmentsRouter;