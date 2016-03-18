import React from 'react';
import { autobind } from './decorators';

export default class SimpleModal extends React.Component {
    componentDidMount() {
        $(this.refs.modal.getDOMNode())
            .openModal(this._modalOpts);
    }

    render() {
        return (
            <div ref="modal" className="modal modal-fixed-footer">
                <div className="modal-content">
                    <h2>{this.props.title}</h2>
                    <p>{this.props.message}</p>
                </div>
                <div className="modal-footer">
                    <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat ">Ok</a>
                </div>
            </div>
        );
    }

    get _modalOpts() {
        return { complete: this._handleModalComplete };
    }

    @autobind
    _handleModalComplete() {
        if (typeof this.props.onComplete === "function") {
            this.props.onComplete();
        }
    }
}
