import { autobind } from 'core-decorators';
import { App } from 'spak';

// TODO Check errors for 401 not authenticated.

export default class ApiGateway {
    fetch(endpoint) {
        return this._publishBeforeFetch(endpoint)
            .then(() => this._sendFetch(endpoint))
            .then(this._handleFetchResponse)
            .finally(() => this._publishFetched(endpoint));
    }

    _sendFetch(endpoint) {
        return global.fetch(`/api${endpoint}`);
    }

    @autobind
    _handleFetchResponse(response) {
        return response.json()
            .then((json) => {
                App.events.publish('api.fetchResponded', json, response);
                return json;
            });
    }

    _publishBeforeFetch(endpoint) {
        return App.events.publish.when('api.beforeFetch', endpoint);
    }

    _publishFetched(endpoint) {
        App.events.publish('api.fetched', endpoint);
    }
}
