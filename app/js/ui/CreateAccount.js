import React from 'react';
import classNames from 'classnames';
import { App } from 'spak';
import { autobind, preventDefault } from './decorators';
import BeerStylesSelect from './BeerStylesSelect';
import FormErrorMsg from './FormErrorMsg';

@FormErrorMsg.mixin
export default class CreateAccount extends React.Component {
    constructor() {
        super();
        this.state = {
            zipcode: '',
            latitude: '',
            longitude: '',
        };
    }

    render() {
        return (
            <div className={classNames('cacct', { 'cacct--showing': this.props.isVisible })}>
                {this.renderErrorMessage()}

                <form className="row">
                    <div className="col s12">
                        <h2 className="shadowed-box__header">Create Account</h2>
                        <label htmlFor="username">User Name</label>
                        <input type="text" id="username" name="username" />
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" />
                        <label htmlFor="fav-beers">Favorite Beers</label>
                        <input type="text" id="fav-beers" name="fav-beers" />

                        <i className="material-icons small" onClick={this._handleZipCodeClick}>location_on</i>
                        <label htmlFor="zipcode">Zip Code</label>
                        <input type="text" id="zipcode" name="zipcode" value={this.state.zipcode} />
                        <input type="text" id="latitude" className="hide" name="latitude" value={this.state.latitude} />
                        <input type="text" id="longitude" className="hide" name="longitude" value={this.state.longitude} />

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

    @autobind
    _callGeolocationCurrentPos(callback) {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                callback(position.coords.latitude, position.coords.longitude);
            });
        } else {
            console.warn('Geolocation not available');
        }
    }

    @autobind
    _handleGeocoderData(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            if (results[0]) {
                try {
                    var address = results[0].address_components;
                    var zipcode = address[address.length - 1].long_name;
                    this.setState({ zipcode });
                } catch (e) {
                    console.error(e);
                }
            }
            if (results[1]) {
                try {
                    var loc = results[1].geometry.location;
                    this.setState({
                        latitude: loc.lat(),
                        longitude: loc.lng(),
                    });
                } catch (e) {
                    console.error(e);
                }
            }
        } else {
            console.error('Geocoder failed due to: ' + status);
        }
    }

    @autobind
    _handleGeolocate(lat, lng) {
        var geocoder = new google.maps.Geocoder,
            latLong = { lat, lng };
        geocoder.geocode({'location': latLong}, this._handleGeocoderData);
    }

    @autobind @preventDefault
    _handleZipCodeClick() {
        // Our API backend will want to use a Zipcode to get a lat long to save &
            // potentially display a map to confirm with the user
        // Reason being is we'll want a lat/long to work off of usually - like when user is 'mobile'
            // and wants to see availability of their preferences where they are on their phone etc.

        // We need a zipcode input for UX reason or a 'get zipcode' button
            // we actually really care about the lat/long but will populate the zipcode field
            // which will implicitly act as confirmation from the user
        // If they only enter a zipcode we'll get a lat/long on the back end

        this._callGeolocationCurrentPos(this._handleGeolocate);
    }
}
