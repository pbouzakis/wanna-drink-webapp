import React from 'react';
import classNames from 'classnames';
import { App } from 'spak';
import { autobind, preventDefault } from './decorators';

export default class CreateAccount extends React.Component {
    constructor() {
        super();
        this.state = {
            zipcode: ''
        };
    }

    componentDidMount() {
        $('#fav-styles').material_select();
    }

    componentWillUnmount() {
        $('#fav-styles').material_select('destroy');
    }

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
                        <i className="material-icons small" onClick={this._handleZipCodeClick}>location_on</i>
                        <label htmlFor="zipcode">Zip Code</label>
                        <input type="text" id="zipcode" name="zipcode" value={this.state.zipcode} />
                        <label htmlFor="fav-styles">Favorite Styles</label>
                        <select id="fav-styles" name="fav-styles">
                            <option value="" disabled>Choose your option</option>
                            <option>IPA</option>
                            <option>other</option>
                        </select>
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

    @autobind @preventDefault
    _handleZipCodeClick() {
        // People will know their zipcode which we can save - but also maybe we want a lat/long really?
        // Our API backend will want to use a Zipcode to get a lat long to save &
            // potentially display a map to confirm with the user
        // Reason being is we'll want a lat/long to work off of usually - like when user is 'mobile'
            // and wants to see availability of their preferences where they are on their phone etc.

        // tl;dr - We need a zipcode input for UX reason or a 'get zipcode' button
        // we actually really care about the lat/long but will populate the zipcode field
        // which will implicitly act as confirmation from the user
        // if they enter zipcode we'll have an approximate lat/long which we can use for the time being

        var geocoder = new google.maps.Geocoder,
            // TODO - set up browser geoloaction callback which will give us lat/long
            lat = '40.7083161',
            lng = '-73.9474741';
        var latLong = {lat: parseFloat(lat), lng: parseFloat(lng)};

        // TODO - This seems incorrect ;)
        var that = this;

        geocoder.geocode({'location': latLong}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    try {
                        var address = results[0].address_components;
                        var zipcode = address[address.length - 1].long_name;
                        // TODO - Address use of 'that' var
                        that.setState({ zipcode });
                    } catch (e) {
                        console.error(e);
                    }
                }
                if (results[1]) {
                    try {
                        var loc = results[1].geometry.location;
                        var lat = loc.lat(),
                            lng = loc.lng();
                        console.log("This is where we want to save lat long:");
                        console.log(lat);
                        console.log(lng);
                    } catch (e) {
                        console.error(e);
                    }
                }
            } else {
                // window.alert('Geocoder failed due to: ' + status);
            }
        });
    }
}
