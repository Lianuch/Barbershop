export default class ClientDto {
  id: string;
  name: string;
  email: string;
  isActivated: boolean;
  role: string;
  constructor(model: { name:string, email: string; _id: string; isActivated: boolean, role: string }) {
   
    this.id = model._id;
    this.name = model.name;
    this.email = model.email;
    this.isActivated = model.isActivated
    this.role = model.role
  }
}
