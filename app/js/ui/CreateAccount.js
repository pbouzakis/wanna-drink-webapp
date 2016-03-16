import React from 'react';
import classNames from 'classnames';
import { autobind, preventDefault } from './decorators';

export default class CreateAccount extends React.Component {
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
