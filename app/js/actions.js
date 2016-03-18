import { App } from 'spak';

export class LaunchApp {
    get componentName() { return 'launchApp' }

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
