import React from 'react';
import classNames from 'classnames';
import { App } from 'spak';
import { autobind } from './decorators';
import LoginForm from './LoginForm';
import SimpleModal from './SimpleModal';

export default class AppVC extends React.Component {
    constructor() {
        super();
        this.state = {
            hasLoginForm: false,
            modal: null
        };
        this._offs = [
            App.events.on('ui.requestLoginForm', this._showForm),
            App.events.on('ui.requestModal', this._showModal)
        ];
    }

    componentWillUnmount() {
        this._offs.forEach(off => off());
    }

    render() {
        var loginForm = this.state.hasLoginForm ? this._loginForm : null;
        var modal = this.state.modal ? this._renderModal(this.state.modal) : null;

        return (
            <main className={classNames('appvc', this._classes)}>
                <div className="appvc__loader progress">
                    <div className="indeterminate"></div>
                </div>
                {loginForm}
                {modal}
            </main>
        );
    }

    get _loginForm() {
        return (
            <div>
                <LoginForm />
                <div className="ping-api">
                    <h4>Ping api</h4>
                    <button className="btn" onClick={this._handleFetchClick}>Fetch Styles</button>
                </div>
            </div>
        );
    }

    _renderModal({ title, message }) {
        return (
            <SimpleModal
                message={message}
                title={title}
                onComplete={this._closeModal} />
        );
    }

    @autobind
    _closeModal() {
        this.setState({ modal: null });
    }

    get _classes() {
        return {
            'appvc__is-loading': !this.state.hasLoginForm
        };
    }

    @autobind
    _showForm() {
        this.setState({ hasLoginForm: true });
    }

    @autobind
    _showModal(modal) {
        this.setState({ modal });
    }

    @autobind
    _handleFetchClick() {
        fetch('/api/styles').then(this._showStyles, this._handleFetchError);
    }

    @autobind
    _showStyles(response) {
        response.json().then(function(json) {
            // Try catch in place mainly for errors in the data manipulation
            try {
                var stylesData = json.data,
                    styles = [];

                styles = stylesData.map((beer) => {
                    return beer.shortName ? beer.shortName : beer.name;
                });
                styles.sort();

                // TODO - Display these beers differently
                App.events.publish('ui.requestModal', {
                    title: 'Styles of Beers',
                    message: styles.join(', ')
                });
            } catch(e) {
                throw new Error('Could not parse styles of beer. Shame.');
            }
        });
    }

    _handleFetchError(error) {
        throw new Error(`Could not fetch styles of beer: ${error.message}.`);
    }
}
