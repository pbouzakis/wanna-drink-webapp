import 'whatwg-fetch';
import React from 'react';
import { autobind } from 'core-decorators';
import classNames from 'classnames';
import { App } from 'spak';

// Decorator to prevent default
function preventDefault(target, key, descriptor) {
    var fn = descriptor.value;
    descriptor.value = function (ev, ...args) {
        ev.preventDefault();
        return fn.call(this, ev, ...args);
    };
    return descriptor;
}

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

class CreateAccount extends React.Component {
    componentDidMount() {
        $('#fav-styles').material_select();
    }

    componentWillUnmount() {
        $('#fav-styles').material_select('destroy');
    }

    render() {
        return (
            <div className={ classNames('cacct', { 'cacct__is-showing': this.props.isVisible }) }>
                <h2>Create Account</h2>
                <form>
                    <label for="username">User Name</label>
                    <input type="text" id="username" name="username" />
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" />
                    <label for="fav-beers">Favorite Beers</label>
                    <input type="text" id="fav-beers" name="fav-beers" />
                    <label for="fav-styles">Favorite Styles</label>
                    <select id="fav-styles" name="fav-styles">
                        <option value="" disabled selected>Choose your option</option>
                        <option>IPA</option>
                        <option>other</option>
                    </select>
                    <button className="btn" onClick={this._handleClick}>Create</button>

                    <h4>Oh yeah I do have an account</h4>
                    <button className="btn" onClick={this._handleBack}>Back to Login</button>
                </form>
            </div>
        );
    }

    @autobind @preventDefault
    _handleClick() {
        console.log('create account!');
    }

    @autobind @preventDefault
    _handleBack() {
        this.props.onBack();
    }
}

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            isCreateAccountVisible: false
        };
    }
    render() {
        return (
            <div className="login-frm">
                <form className={ classNames('login-frm__form', this._frmClasses) }>
                    <h3>Login</h3>

                    <label for="username">User Name</label>
                    <input type="text" id="username" name="username" />
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" />
                    <button className="btn" onClick={this._handleLoginClick}>Submit</button>

                    <h4>Need to create account</h4>
                    <button className="btn" onClick={this._handleCreateClick}>Create Account</button>
                </form>
                <CreateAccount
                    isVisible={ this.state.isCreateAccountVisible }
                    onBack={ this._handleBackFromCreateAccount }/>
            </div>
        );
    }

    get _frmClasses() {
        return {
            'login-frm__form-is-hidden': this.state.isCreateAccountVisible
        };
    }

    @autobind @preventDefault
    _handleCreateClick() {
        this.setState({ isCreateAccountVisible: true });
    }

    @autobind @preventDefault
    _handleLoginClick() {
        console.log("TODO: fetch('/api/login')");
    }

    @autobind
    _handleBackFromCreateAccount() {
        this.setState({ isCreateAccountVisible: false });
    }
}

export function renderUI() {
    React.render(<AppVC />, document.getElementById("app"));
}
