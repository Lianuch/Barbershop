export default class ClientDto {
  id: string;
  email: string;
  isActivated: boolean;
  constructor(model: { email: string; _id: string; isActivated: boolean }) {

    this.id = model._id;
    this.email = model.email;
    this.isActivated = model.isActivated
  }
}
