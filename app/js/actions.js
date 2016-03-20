import { App, Action } from 'spak';

// Class decorator for setting componentName getter.
// When registered this will be the default name of the action for dispatch.
function action(defaultName) {
    return (target) => {
        target.prototype.ns = defaultName; // Action base class wants a namespace.
        Object.defineProperty(target.prototype, 'componentName', {
            get: () => defaultName,
            enumerable: true
        });
    };
}

@action('launchApp')
export class LaunchApp extends Action {
    exec({ presenter }) {
        presenter.showStartingUp();

        // Simulate longer start/load time.
        setTimeout(() => {
            if (App.session().isAuthenticated) {
                presenter.showHome();
            } else {
                presenter.showLogin();
            }
        }, 1500);
    }
}
