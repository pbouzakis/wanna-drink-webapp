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

@action('login')
export class Login extends Action {
    exec({ credentials }) {
        this.logger.log('Attempt to login w/ credentials', credentials);
        throw new Error(`NotImplemented: Login "${credentials.username}."`);
    }
}


@action('createAccount')
export class CreateAccount extends Action {
    exec() {
        this.logger.log('Attempt to create account.');
        throw new Error('NotImplemented: CreateAccount.');
    }
}
