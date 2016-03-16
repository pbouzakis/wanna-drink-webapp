import React from 'react';
import classNames from 'classnames';
import { autobind, preventDefault } from './decorators';
import CreateAccount from './CreateAccount';

export default class LoginForm extends React.Component {
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
