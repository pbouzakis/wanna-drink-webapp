import { App } from "spak";

export class LaunchApp {
    get componentName() { return "launchApp" }

    exec({ presenter }) {
        presenter.showStartingUp();

        if (App.session().isAuthenticated) {
            presenter.showHome();
        } else {
            presenter.showLogin();
        }
    }
}
