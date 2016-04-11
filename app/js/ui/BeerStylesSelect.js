import React from 'react';
import { autobind } from './decorators';

export default class BeerStylesSelect extends React.Component {
    constructor() {
        super();
        this.state = {
            options: [<option value="" disabled>Choose your option</option>],
        };
    }

    get() {
        return this.refs.favStyle.getDOMNode().value
    }

    componentDidMount() {
        this._fetchBeerStyles()
        $('#fav-style').material_select();
    }

    componentWillUnmount() {
        $('#fav-style').material_select('destroy');
    }

    @autobind
    _fetchBeerStyles() {
        fetch('/api/styles').then(this._handleFetchStyles, this._handleFetchError);
    }

    // May need re-think this as a select only has one option - hence changed to "Favorite Style" singular
    @autobind
    _populateStyleSelect(json) {
        // Try catch in place mainly for errors in the data manipulation
        try {
            var stylesData = json.data,
                styles = [];

            // TODO - Sort beers - maybe alphabetical?
            styles = stylesData.map((beer) => {
                return {name: (beer.shortName ? beer.shortName : beer.name), id: beer.id};
            });

            for (let i = 0; i < styles.length; i++) {
                let option = styles[i];
                this.state.options.push(
                    <option key={i} value={option.id}>{option.name}</option>
                );
            }
            this.forceUpdate();
            // TODO - Is this okay here??
            $('#fav-style').material_select();
        } catch(e) {
            throw new Error('Could not parse styles of beer. Shame.');
        }
    }

    @autobind
    _handleFetchStyles(response) {
        response.json().then(this._populateStyleSelect);
    }

    _handleFetchError(error) {
        throw new Error(`Could not fetch styles of beer: ${error.message}.`);
    }

    render() {
        return (
            <select ref="favStyle" id="fav-style" name="fav-style">{this.state.options}</select>
        )
    }
}