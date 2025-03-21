export default class ClientDto {
  id: string;
  name: string;
  email: string;
  isActivated: boolean;
  constructor(model: { name:string, email: string; _id: string; isActivated: boolean }) {
   
    this.id = model._id;
    this.name = model.name;
    this.email = model.email;
    this.isActivated = model.isActivated
  }
}
