import 'whatwg-fetch';
import React from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';
import { App } from 'spak';

class AppVC extends React.Component {
    constructor() {
        super();
        this.state = {
            styles: '',
            hasLoginForm: false
        };
        this._off = App.events.on("ui.requestLoginForm", this._showForm);
    }

    componentWillUnmount() {
        this._off();
    }

    render() {
        var loginForm = this.state.hasLoginForm ? this._loginForm : null;

        return (
            <main className={classNames('appvc', this._classes)}>
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
                <h4>Ping api</h4>
                <button className="btn" onClick={this._handleFetchClick}>Fetch Styles</button>
                { this.state.styles }
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

class LoginForm extends React.Component {
    render() {
        return (
            <div>
                <h3>Login</h3>
                <form>
                    <label for="username">User Name</label>
                    <input type="text" id="username" name="username" />
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" />
                    <button className="btn" onClick={this._handleLoginClick}>Submit</button>
                </form>
                <h4>Need to create account</h4>
                <button className="btn" onClick={this._handleCreateClick}>Create Account</button>
            </div>
        );
    }

    _handleCreateClick() {
        console.log("TODO: Show account form");
    }

    _handleLoginClick(event) {
        event.preventDefault();
        console.log("TODO: fetch('/api/login')");
    }
}

export function renderUI() {
    React.render(<AppVC />, document.getElementById("app"));
}
