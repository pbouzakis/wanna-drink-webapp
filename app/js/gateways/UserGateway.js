import ApiGateway from "./ApiGateway";

export default class UserGateway extends ApiGateway {
    login(credentials) {
        throw new Error(`NotImplemented: UserGateway#login "${credentials.username}."`);
    }

    logout() {
        throw new Error('NotImplemented: UserGateway#logout.');
    }

    createAccount() {
        throw new Error('NotImplemented: UserGateway#createAccount.');
    }
}
