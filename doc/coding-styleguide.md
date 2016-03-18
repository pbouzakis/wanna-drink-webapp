# Coding Styleguide

This is a work in progress. We are documenting the styleguide as we standardize or agree upon convention.

## JavaScript

- Indentation: **4 spaces**
- Single quotes over double quotes
    + **Exception** HTML quoting is double.
- Whitespace after start curly and before end curly.
    + Ex: `var obj = { band: 'ddf', style: 'punk' };`
    + **Exception** JSX expressions
        * Ex: `<button onClick={this._handleClick}>Click me</button>`
- Prefer one class (which should be the `export default`) per module.

