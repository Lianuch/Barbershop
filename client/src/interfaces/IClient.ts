export default interface IClient {
    id: string;
    email: string;
    isActivated: boolean;
    activationLink?: string;
    visits: any[];
}