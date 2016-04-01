import React from 'react';

export default class FormErrorMsg extends React.Component {
    render() {
        return (
            <div className="form-error-msg card-panel white-text red darken-1">
                <h6>{this._errorTitle}</h6>
                <ul>
                    {this.props.errors.map((error) => (
                        <li className="form-error-msg__txt">{error}</li>
                    ))}
                </ul>
            </div>
        );
    }

    get _errorTitle() {
        return this.props.title || 'Oops! Something isn\'t right.';
    }

    // Provide a mixin decorator for showing the message.
    static mixin(target) {
        Object.defineProperties(target.prototype, {
            showErrorMessage: {
                value(errors) {
                    this.setState({ errors });
                }
            },
            renderErrorMessage: {
                value() {
                    return this._hasError
                        ? <FormErrorMsg errors={this.state.errors} />
                        : null;
                }
            },
            _hasError: {
                get() {
                    return Array.isArray(this.state.errors) && this.state.errors.length > 0;
                }
            }
        });
    }
}
