import React from 'react';
import classNames from 'classnames';
import { App } from 'spak';
import { autobind, preventDefault } from './decorators';
import CreateAccount from './CreateAccount';
import FormErrorMsg from './FormErrorMsg';

@FormErrorMsg.mixin
export default class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            isCreateAccountVisible: false,
            errors: null
        };
    }
    render() {
        return (
            <div className="login shadowed-box">
                {this.renderErrorMessage()}

                <form className={ classNames('row login__form', this._frmClasses) }>
                    <div className="col s12">
                        <h2 className="shadowed-box__header">Login</h2>
                        <label htmlFor="username">User Name</label>
                        <input ref="username" type="text" id="username" name="username" />
                        <label htmlFor="password">Password</label>
                        <input ref="password" type="password" id="password" name="password" />
                        <button className="btn" onClick={this._handleLoginClick}>Submit</button>
                    </div>
                    <div className="col s6 offset-s6">
                        <h4>Need to create account?</h4>
                        <button className="btn green darken-1" onClick={this._handleCreateClick}>Create Account</button>
                    </div>
                </form>
                <CreateAccount
                    isVisible={this.state.isCreateAccountVisible}
                    onBack={this._handleBackFromCreateAccount}/>
            </div>
        );
    }

    get _frmClasses() {
        return {
            'login__form--hidden': this.state.isCreateAccountVisible
        };
    }

    @autobind @preventDefault
    _handleCreateClick() {
        this.setState({ isCreateAccountVisible: true });
    }

    @autobind @preventDefault
    _handleLoginClick() {
        App.dispatchAction('login', {
            credentials: {
                username: this.refs.username.getDOMNode().value,
                password: this.refs.password.getDOMNode().value
            },
            presenter: this
        });
    }

    @autobind
    _handleBackFromCreateAccount() {
        this.setState({ isCreateAccountVisible: false });
    }
}
