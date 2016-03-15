import 'whatwg-fetch';
import React from 'react';

class App extends React.Component {
    render() {
        return (
            <main>
                <h2>Hey there!</h2>
                <button onClick={() => this._handleFetchClick()}>Fetch Styles</button>
            </main>
        );
    }

    _handleFetchClick() {
        fetch('/beer-styles').then(this._log, this._logError);
    }

    _log(...args) {
        console.log(...args);
    }

    _logError(...args) {
        console.error(...args);
    }
}

export function renderUI() {
    React.render(<App />, document.getElementById("app"));
}
