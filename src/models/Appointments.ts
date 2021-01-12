import { uuid } from 'uuidv4';
// A forma de como deve ser representado é de forma de classe

class Appointment {
  id: string;

  provider: string;
  
  date: Date;

  constructor ({ provider, date }: Omit<Appointment, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Appointment;