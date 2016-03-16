import React from 'react';
import AppVC from './AppVC';

export function renderUI() {
    React.render(<AppVC />, document.getElementById("app"));
}
