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
            <div className="login-frm shadowed-box">
                <form className={ classNames('row login-frm__form', this._frmClasses) }>
                    <div className="col s12">
                        <h2 className="shadowed-box__header">Login</h2>
                        <label for="username">User Name</label>
                        <input type="text" id="username" name="username" />
                        <label for="password">Password</label>
                        <input type="password" id="password" name="password" />
                        <button className="btn" onClick={this._handleLoginClick}>Submit</button>
                    </div>
                    <div className="col s6 offset-s6">
                        <h4>Need to create account?</h4>
                        <button className="btn green darken-1" onClick={this._handleCreateClick}>Create Account</button>
                    </div>
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
        throw new Error("Not implemented: fetch('/api/login')");
    }

    @autobind
    _handleBackFromCreateAccount() {
        this.setState({ isCreateAccountVisible: false });
    }
}
