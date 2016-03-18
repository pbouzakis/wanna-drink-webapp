import "tracekit"; // Create global TraceKit ref.
import { autobind } from "core-decorators";
import { App } from "spak";
import { logger } from "spak/decorators";

@logger("uncaught-errors")
export default class UncaughtErrors {
    listen() {
        TraceKit.collectWindowErrors = true;
        TraceKit.remoteFetching = false;
        // Tell trackeit to let us know about window.onerror
        TraceKit.report.subscribe(this._handleReport);
    }

    handleActionError(error) {
        this.handleSystemError(error, "Action");
    }

    handleSystemError(error, type = "System") {
        this._logAndReportError(error, type);
    }

    _logAndReportError(error, type) {
        this.logger.info(`Handling: ${type} error.`);
        this._handleReport(error);
    }

    @autobind
    _handleReport(error) {
        this.logger.error(error);
        App.events.publish('ui.requestModal', {
            title: 'Oops! Something Went Wrong :(',
            message: error.message
        });
    }
}
