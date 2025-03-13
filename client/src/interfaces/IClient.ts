export default interface IClient {
    id: string;
    name: string;
    email: string;
    isActivated: boolean;
    activationLink?: string;
    visits: any[];
}