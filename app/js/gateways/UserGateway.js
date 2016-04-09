import ApiGateway from "./ApiGateway";

export default class UserGateway extends ApiGateway {
    login(credentials) {
        throw new Error(`NotImplemented: UserGateway#login "${credentials.username}."`);
    }

    logout() {
        throw new Error('NotImplemented: UserGateway#logout.');
    }

    createAccount(form) {
        let formData = new FormData();
        for (let prop in form) {
            formData.append(prop, form[prop]);
        }
        this.fetch('/account', {
            method: 'POST',
            body: formData
        });
    }
}
