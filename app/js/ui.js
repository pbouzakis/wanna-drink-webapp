import 'whatwg-fetch';
import React from 'react';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            styles: ''
        };
    }

    render() {
        return (
            <main>
                <h2>Hey there!</h2>
                <button className="btn" onClick={() => this._handleFetchClick()}>Fetch Styles</button>
                { this.state.styles }
                <LoginForm />
            </main>
        );
    }

    _handleFetchClick() {
        fetch('/api/styles').then(this._showStyles.bind(this), this._logError);
    }

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
                    <button className="btn" onClick={this._handleLoginClick.bind(this)}>Submit</button>
                </form>
                <h4>Need to create account</h4>
                <button className="btn" onClick={() => this._handleCreateClick()}>Create Account</button>
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
    React.render(<App />, document.getElementById("app"));
}
