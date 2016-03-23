import React from 'react';
import classNames from 'classnames';
import { App } from 'spak';
import { autobind, preventDefault } from './decorators';
import BeerStylesSelect from './BeerStylesSelect';

export default class CreateAccount extends React.Component {
    render() {
        return (
            <div className={classNames('cacct', { 'cacct--showing': this.props.isVisible })}>
                <form className="row">
                    <div className="col s12">
                        <h2 className="shadowed-box__header">Create Account</h2>
                        <label htmlFor="username">User Name</label>
                        <input type="text" id="username" name="username" />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" />
                        <label htmlFor="fav-beers">Favorite Beers</label>
                        <input type="text" id="fav-beers" name="fav-beers" />
                        <label htmlFor="fav-style">Favorite Style</label>
                        <BeerStylesSelect />
                        <button className="btn" onClick={this._handleClick}>Create</button>
                    </div>
                    <div className="col s6 offset-s6">
                        <h4>Nevermind take me back.</h4>
                        <button className="btn green darken-1" onClick={this._handleBack}>Back</button>
                    </div>
                </form>
            </div>
        );
    }

    @autobind @preventDefault
    _handleClick() {
        // TODO supply account info.
        App.dispatchAction('createAccount');
    }

    @autobind @preventDefault
    _handleBack() {
        this.props.onBack();
    }
}
