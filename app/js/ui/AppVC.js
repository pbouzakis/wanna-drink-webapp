import React from 'react';
import classNames from 'classnames';
import { App } from 'spak';
import { autobind } from "./decorators";
import LoginForm from './LoginForm';

export default class AppVC extends React.Component {
    constructor() {
        super();
        this.state = {
            styles: '',
            hasLoginForm: false
        };
        this._off = App.events.on('ui.requestLoginForm', this._showForm);
    }

    componentWillUnmount() {
        this._off();
    }

    render() {
        var loginForm = this.state.hasLoginForm ? this._loginForm : null;

        return (
            <main className={ classNames('appvc', this._classes) }>
                <div className="appvc__loader progress">
                    <div className="indeterminate"></div>
                </div>
                { loginForm }
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
                    <pre>{ this.state.styles }</pre>
                </div>
            </div>
        );
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
    _handleFetchClick() {
        fetch('/api/styles').then(this._showStyles, this._logError);
    }

    @autobind
    _showStyles(...args) {
        console.log(args);
        try {
            var styles = JSON.stringify(args[0]['body']);
            this.setState({ styles });
        } catch(e) {
            this.setState({ hasError: true });
        }
    }

    _logError(...args) {
        console.error(...args);
    }
}
